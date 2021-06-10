// Jason Theobald 
// jason@dorg.tech
const truffleAssert = require('truffle-assertions');
const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");
const dOrgProject = artifacts.require("dOrgProject");
const gnosisABI = require('../safe-contracts/deployments/localhost/GnosisSafe.json')['abi'];

contract("dOrgProjectFactory.sol and dOrgProject.sol", async (accounts) => {
  
  let factory;
  let projectClone;

  let projectName = "Test Project"
  let nullAddress = "0x0000000000000000000000000000000000000000";
  let treasuryWallet = "0x15344EcDc2c4EDFCB092E284d93c20F0529FD8a6"
  let senderWallet = accounts[0];
  let finderWallet = accounts[1];
  let wallet1 = accounts[2];
  let wallet2 = accounts[3];
  let maliciousWallet = accounts[5];
  let threshold = 2;

  let gnosisOwners = [wallet1, wallet2];

  beforeAll(async () => {
    factory = await dOrgProjectFactory.deployed()
    result = await factory.createProject(projectName, finderWallet, gnosisOwners, threshold)
    const cloneAddress = result.logs[0].args['0']
    projectClone = await dOrgProject.at(cloneAddress);
    let payees = await Promise.all([0,1,2].map(i=>projectClone.payee(i)))
    console.log("********************************************")
    console.log("Project Address: " + cloneAddress)
    console.log("Gnosis Safe Address: " + payees[2])
    console.log("********************************************")
  })

  it('Project cannot be initialized twice.', async () => {
    let tryToReInitialize = projectClone.initialize(projectName, [maliciousWallet,wallet1,wallet2], [10,10,80]);
    truffleAssert.reverts(tryToReInitialize)
  })

  it('Gnosis safe cannot be initialized twice.', async () => {
    const gnosisSafeAddress = await projectClone.payee(2);
    let gnosisSafe = await new web3.eth.Contract(gnosisABI,gnosisSafeAddress)
    let tryToReInitialize = gnosisSafe.methods.setup([maliciousWallet,finderWallet], 2, nullAddress, "0x", nullAddress, nullAddress, 0, nullAddress).send({from:senderWallet});
    truffleAssert.reverts(tryToReInitialize)
  })

  it('Should have name `Test Project.`', async () => {
    let pName = await projectClone.projectName;
    assert(pName, projectName);
  })

  it("Project should have total shares of 100.", async () => {
    const totalShares = await projectClone.totalShares();
    assert.equal(totalShares.toNumber(),100)
  })

  it("Third payee should be a Gnosis Safe with working getOwners function.", async () => {
    const gnosisSafeAddress = await projectClone.payee(2);
    let g = await new web3.eth.Contract(gnosisABI,gnosisSafeAddress)
    let owners = await g.methods.getOwners().call({from:senderWallet})
    expect(owners).deep.to.equal(gnosisOwners)
  })

  it('Project balance should starts with 0 ETH.', async () => {
    let balance = await web3.eth.getBalance(projectClone.address);
    assert.equal(balance, 0);
  })

  it('Project balance should have 1 ETH after deposit.', async () => {
      await web3.eth.sendTransaction({from: senderWallet, to: projectClone.address, value:1000000000000000000});
      let balance = await web3.eth.getBalance(projectClone.address);
      assert.equal(balance, 1000000000000000000);
  })

  it('Should release correct ammounts to treasury (10%), finder (10%), project (80%).', async () => {
    const gnosisSafeAddress = await projectClone.payee(2);
    let beforeReleaseBalances = await Promise.all([treasuryWallet,finderWallet,gnosisSafeAddress].map(async (wallet) => await web3.eth.getBalance(wallet)))
    await Promise.all([treasuryWallet,finderWallet,gnosisSafeAddress].map(async (wallet) => projectClone.release(wallet)))
    let afterReleaseBalances = await Promise.all([treasuryWallet,finderWallet,gnosisSafeAddress].map(async (wallet) => await web3.eth.getBalance(wallet)))
    let walletBalances = afterReleaseBalances.map((e,i) => e - beforeReleaseBalances[i])
    expect(walletBalances).deep.to.equal([100000000000000000,100000000000000000,800000000000000000])
  })

});
