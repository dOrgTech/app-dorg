// Jason Theobald
// jason@dorg.tech

const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");
const dOrgProject = artifacts.require("dOrgProject");
const { ethers } = require("ethers");
const { create } = require("ipfs-http-client");
const client = create("http://127.0.0.1:5001");
const fs = require("fs");
let proposal = JSON.parse(fs.readFileSync("./test/ProjectMetadata.json"));
const truffleAssert = require("truffle-assertions");
const gnosisABI =
  require("../safe-contracts/deployments/localhost/GnosisSafe.json")["abi"];

contract(
  "Comprehensive tests for dOrgProjectFactory and dOrgProject contracts.",
  async (accounts) => {
    let factory;
    let projectClone;
    let nullAddress = "0x0000000000000000000000000000000000000000";
    let treasuryWallet = "0x15344EcDc2c4EDFCB092E284d93c20F0529FD8a6";
    let senderWallet = accounts[0];
    let finderWallet = accounts[1];
    let wallet1 = accounts[2];
    let wallet2 = accounts[3];
    let maliciousWallet = accounts[5];
    let threshold = 2;

    let gnosisOwners = [wallet1, wallet2];

    before(async () => {
      factory = await dOrgProjectFactory.deployed();
    });

    it("Should create three new projects.", async () => {
      const ipfsPath = await client.add(JSON.stringify(proposal));
      const proj1 = await factory.newProject(ipfsPath, gnosisOwners, finderWallet, threshold, {from:senderWallet});
      const proj2 = await factory.newProject(ipfsPath, gnosisOwners, finderWallet, threshold, {from:senderWallet});
      const proj3 = await factory.newProject(ipfsPath, gnosisOwners, finderWallet, threshold, {from:senderWallet});
      const proj = await factory.getProjectIndex();
      assert.equal(proj.toNumber(),3)
    });

    it("Should return a project by ID.", async () => {
      const project = await factory.getProject(0);
    });

    it("Should return a list of projects sliced by start index and end index..", async () => {
      const projects = await factory.getProjects(0,2);
      assert.equal(projects.length, 3)
    });

    it("Should vote for project.", async () => {
      const vote = await factory.vote(0, true, {from: senderWallet})
      const project = await factory.getProject(0);
      assert.equal(project['forVotes'],1)
    });

    it("Should return a list of those who voted.", async () => {
      const voters = await factory.getVoters(0);
    });

    it("Should revert if you try to vote twice.", async () => {
      let tryToVoteTwice = Promise.all([1,1].map(async(i)=> await factory.vote(0, true, {from: accounts[i]})));
      await truffleAssert.reverts(tryToVoteTwice);
    });

    it("Should deploy a project.", async () => {
      const d = await factory.deployProject(0);
      const project = await factory.getProject(0);
    });

    it("Should create new project, vote against, try to deploy, and revert.", async () => {
      const ipfsPath = await client.add(JSON.stringify(proposal));
      const newp = await factory.newProject(
        ipfsPath["path"],
        gnosisOwners,
        finderWallet,
        threshold
      );
      const v = await factory.vote(1, false);
      const projIndex = await factory.getProjectIndex()
      await truffleAssert.reverts(factory.deployProject(projIndex));
    });

    it("Should create new project, vote for, try to deploy twice, and revert.", async () => {
      const ipfsPath = await client.add(JSON.stringify(proposal));
      const newp = await factory.newProject(
        ipfsPath["path"],
        gnosisOwners,
        finderWallet,
        threshold
      );
      const v = await factory.vote(2, true);
      await factory.deployProject(2);
      await truffleAssert.reverts(factory.deployProject(2));
    });

    it("Project clone cannot be re-initialized.", async () => {
      const projectCloneAddress = await factory.getProject(0);
      projectClone = await dOrgProject.at(projectCloneAddress.deployAddress);
      let tryToReInitialize = projectClone.initialize(
        [maliciousWallet, accounts[1], accounts[2]],
        [10, 10, 80]
      );
      await truffleAssert.reverts(tryToReInitialize);
    });

    it("Gnosis safe cannot be initialized twice.", async () => {
      const gnosisSafeAddress = await projectClone.payee(2);
      let gnosisSafe = await new web3.eth.Contract(
        gnosisABI,
        gnosisSafeAddress
      );
      let tryToReInitialize = gnosisSafe.methods
        .setup(
          [maliciousWallet, finderWallet],
          2,
          nullAddress,
          "0x",
          nullAddress,
          nullAddress,
          0,
          nullAddress
        )
        .send({ from: senderWallet });
      truffleAssert.reverts(tryToReInitialize);
    });

    it("Project should have total shares of 100.", async () => {
      const totalShares = await projectClone.totalShares();
      assert.equal(totalShares.toNumber(), 100);
    });

    it("Third payee should be a Gnosis Safe with working getOwners function.", async () => {
      const gnosisSafeAddress = await projectClone.payee(2);
      let g = await new web3.eth.Contract(gnosisABI, gnosisSafeAddress);
      let owners = await g.methods.getOwners().call({ from: senderWallet });
      expect(owners).deep.to.equal(gnosisOwners);
    });

    it("Project balance should starts with 0 ETH.", async () => {
      let balance = await web3.eth.getBalance(projectClone.address);
      assert.equal(balance, 0);
    });

    it("Project balance should have 1 ETH after deposit.", async () => {
      await web3.eth.sendTransaction({
        from: senderWallet,
        to: projectClone.address,
        value: 1000000000000000000,
      });
      let balance = await web3.eth.getBalance(projectClone.address);
      assert.equal(balance, 1000000000000000000);
    });

    it("Should release correct ammounts to treasury (10%), finder (10%), project (80%).", async () => {
      const gnosisSafeAddress = await projectClone.payee(2);
      let beforeReleaseBalances = await Promise.all(
        [treasuryWallet, finderWallet, gnosisSafeAddress].map(
          async (wallet) => await web3.eth.getBalance(wallet)
        )
      );
      await Promise.all(
        [treasuryWallet, finderWallet, gnosisSafeAddress].map(async (wallet) =>
          projectClone.release(wallet)
        )
      );
      let afterReleaseBalances = await Promise.all(
        [treasuryWallet, finderWallet, gnosisSafeAddress].map(
          async (wallet) => await web3.eth.getBalance(wallet)
        )
      );
      let walletBalances = afterReleaseBalances.map(
        (e, i) => e - beforeReleaseBalances[i]
      );
      expect(walletBalances).deep.to.equal([
        100000000000000000, 100000000000000000, 800000000000000000,
      ]);
    });
  }
);
