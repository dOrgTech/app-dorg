// Jason Theobald
// jason@dorg.tech

// from project root: truffle exec test/scripts/populateContract.js --network rinkeby

const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");
const { create } = require("../../node_modules/ipfs-http-client");
const client = create("http://127.0.0.1:5001");

module.exports = async function(callback){

    let factory = await dOrgProjectFactory.deployed();
    console.log(factory.address)
    const accounts = await web3.eth.getAccounts();
    let senderWallet = accounts[0];
    let finderWallet = accounts[1];
    let wallet1 = accounts[2];
    let wallet2 = accounts[3];
    let gnosisOwners = [wallet1, wallet2];
    let threshold = 2;
    
    for(var i = 0; i<20; i++){
        const projIndex = await factory.getProjectIndex()
        let proposal = {projectName:"Test Project " + i.toString()}
        const ipfsPath = await client.add(JSON.stringify(proposal));
        let res = await factory.newProject(ipfsPath['path'], gnosisOwners, finderWallet, threshold, {from:accounts[0]}).catch(console.log);
        const proj = await factory.getProject(projIndex).catch(console.log)
        console.log(proj)
    }
    callback()
}