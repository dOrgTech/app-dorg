// Jason Theobald
// jason@dorg.tech

// from project root: truffle exec test/scripts/populateContract.js --network rinkeby


const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");
const { create } = require("../../node_modules/ipfs-http-client");
const client = create("http://127.0.0.1:5001");
const proposal = require('../ProposalMetaData.json');

module.exports = async function(callback){

    let factory = await dOrgProjectFactory.deployed();
    const accounts = await web3.eth.getAccounts();
    let senderWallet = accounts[0];
    let finderWallet = accounts[1];
    let wallet1 = accounts[2];
    let wallet2 = accounts[3];
    let gnosisOwners = [wallet1, wallet2];
    let threshold = 2;
    
    for(var i = 0; i<10; i++){
        const ipfsPath = await client.add(JSON.stringify(proposal),{pin:true});
        let res = await factory.newProposal(ipfsPath['path'], {from:accounts[0]}).catch(console.log);
    }

    await Promise.all([1,2,5,7].map(async (x) => {
        await factory.vote(x, true,  {from:accounts[0]})
        await factory.newProject(x, finderWallet, gnosisOwners, threshold, {from:accounts[0]})
        const proj = await factory.Projects.call(x)
    })).catch(console.log)

    callback()
}