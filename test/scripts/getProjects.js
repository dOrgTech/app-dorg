// Jason Theobald
// jason@dorg.tech

// from project root: truffle exec test/scripts/getProjects.js --network rinkeby

const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");

module.exports = async function(callback){

    let factory = await dOrgProjectFactory.deployed();
    const projects = await factory.getProject(19).catch(console.log);
    console.log(projects)
    callback()
}