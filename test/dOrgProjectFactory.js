// Jason Theobald 
// jason@dorg.tech

const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");
const dOrgProject = artifacts.require("dOrgProject");

contract("dOrgProjectFactory", async (accounts) => {
  
  let factory;
  let projectClone;

  let projectName = "Test Project"
  let treasuryWallet = accounts[1];
  let finderWallet = accounts[2];
  let projectWallet = accounts[3];
  let senderWallet = accounts[4];

  let wallets = [treasuryWallet, finderWallet, projectWallet];

  before(async () => {
    factory = await dOrgProjectFactory.deployed()
    result = await factory.createProject(projectName, treasuryWallet, finderWallet, projectWallet)
    const cloneAddress = result.logs[0].args['0']
    projectClone = await dOrgProject.at(cloneAddress);
  })

  // it('Cannot be initialized twice.', async () => {
  //   let tryToReInitialize = projectClone.initialize(projectName, wallets, [10,10,80]);
  //   expect(tryToReInitialize).to.throw(RuntimeError)
  // })

  it('Should have name `Test Project.`', async () => {
    let pName = await projectClone.getName();
    assert(pName, projectName);
  })

  it("Project should have total shares of 100, with breakdown of [10,10,80].", async () => {
    const totalShares = await projectClone.totalShares();
    const shares = await Promise.all(wallets.map(async (wallet) => {
      let share = await projectClone.shares(wallet);
      return share.toNumber();
    }));
    expect(shares).deep.to.equal([10,10,80])
    assert.equal(totalShares.toNumber(),100)
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
    let beforeReleaseBalances = await Promise.all(wallets.map(async (wallet) => await web3.eth.getBalance(wallet)))
    await Promise.all(wallets.map(async (wallet) => projectClone.release(wallet)))
    let afterReleaseBalances = await Promise.all(wallets.map(async (wallet) => await web3.eth.getBalance(wallet)))
    let walletBalances = afterReleaseBalances.map((e,i) => e - beforeReleaseBalances[i])
    expect(walletBalances).deep.to.equal([100000000000000000,100000000000000000,800000000000000000])
  })

});
