<<<<<<< HEAD
const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");
let abi = [ { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "shares", "type": "uint256" } ], "name": "PayeeAdded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "PaymentReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "PaymentReleased", "type": "event" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [ { "internalType": "address[]", "name": "payees", "type": "address[]" }, { "internalType": "uint256[]", "name": "shares_", "type": "uint256[]" } ], "name": "initialize", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "totalShares", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalReleased", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "shares", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "released", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "payee", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "account", "type": "address" } ], "name": "release", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]

contract("dOrgProjectFactory", accounts => {
  it("should create a new project", () =>
    dOrgProjectFactory.deployed()
      .then(instance => instance.createProject(accounts[1],accounts[2]))
      .then(cloneAddress => {
        console.log(cloneAddress)
        let contract = new web3.eth.Contract(abi,cloneAddress)
        return web3.eth.getAccounts().then(accounts => {
          return contract.methods.totalShares().call({from:accounts[0]})
        })
      })
      .then(console.log)
)});
=======
// Jason Theobald 
// jason@dorg.tech

const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");
const PaymentSplitterInitializable = artifacts.require("PaymentSplitterInitializable");

contract("dOrgProjectFactory", async (accounts) => {
  
  let factory;
  let projectClone;

  let treasuryWallet = accounts[1];
  let finderWallet = accounts[2];
  let projectWallet = accounts[3];
  let senderWallet = accounts[4];

  let wallets = [treasuryWallet, finderWallet, projectWallet];

  before(async () => {
    factory = await dOrgProjectFactory.deployed()
    result = await factory.createProject(treasuryWallet, finderWallet, projectWallet)
    console.log(result)
    const cloneAddress = result.logs[0].args['0']
    projectClone = await PaymentSplitterInitializable.at(cloneAddress);
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
>>>>>>> clones
