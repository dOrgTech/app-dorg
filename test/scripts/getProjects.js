// Jason Theobald
// jason@dorg.tech

// from project root: truffle exec test/scripts/getProjects.js --network rinkeby

const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");

module.exports = async function(callback){

    let factory = await dOrgProjectFactory.deployed();
    let projectIndex = await factory.getProjectIndex();
    const projects = await factory.getProjects(1,projectIndex.toNumber()).catch(console.log);
    console.log(projects)
    callback()
}