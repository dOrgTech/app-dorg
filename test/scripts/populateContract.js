// Jason Theobald
// jason@dorg.tech

const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");
const { create } = require("../../node_modules/ipfs-http-client");
const client = create("http://127.0.0.1:5001");

module.exports = async function(callback){

    let factory = await dOrgProjectFactory.at(process.env.REACT_APP_RINKEBY_CONTRACT);
    const accounts = await web3.eth.getAccounts()
    let senderWallet = accounts[0];
    let finderWallet = accounts[1];
    let wallet1 = accounts[2];
    let wallet2 = accounts[3];
    let gnosisOwners = [wallet1, wallet2];
    let threshold = 2;
    
    for(var i = 0; i<20; i++){
        let proposal = {projectName:"Test Project " + i.toString()}
        const ipfsPath = await client.add(JSON.stringify(proposal));
        await factory.newProject(ipfsPath, gnosisOwners, finderWallet, threshold, {from:accounts[0]});
    }
    callback()
}