const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");
let abi = [ { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "shares", "type": "uint256" } ], "name": "PayeeAdded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "PaymentReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "PaymentReleased", "type": "event" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [ { "internalType": "address[]", "name": "payees", "type": "address[]" }, { "internalType": "uint256[]", "name": "shares_", "type": "uint256[]" } ], "name": "initialize", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "totalShares", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalReleased", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "shares", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "released", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "payee", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "account", "type": "address" } ], "name": "release", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]

contract("dOrgProjectFactory", accounts => {
  it("should create a new project", () =>
    dOrgProjectFactory.deployed()
      .then(instance => { 
        return instance.createProject.call(
        accounts[1],
        accounts[2]
      )})
      .then(cloneAddress => {
        let contract = new web3.eth.Contract(abi,cloneAddress)
        return web3.eth.getAccounts().then(accounts => {
          return contract.methods.totalShares().send({from:accounts[0]})
        })
      })
      .then(result => console.log(result))
      .catch(e => console.log(e))
)});

// .then(result => {
//   console.log(result)
// assert.equal(
//   balance.valueOf(),
//   10000,
//   "10000 wasn't in the first account"
// );
// }));