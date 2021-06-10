// Jason Theobald 
// jason@dorg.tech

const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");
const dOrgProject = artifacts.require("dOrgProject");
const { ethers } = require("ethers");
const { create } = require('ipfs-http-client');
const client = create('http://127.0.0.1:5001');
const fs = require("fs");
let proposal = JSON.parse(fs.readFileSync('./test/proposal.json'));

function validateAddress(address) {
    return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
}

contract("Proposals and Voting.", async (accounts) => {

  let factory;

  before(async () => {
    factory = await dOrgProjectFactory.deployed()
  })

  it('Should return a deterministic address.', async () => {
    const salt = ethers.utils.formatBytes32String("wind cheese moon")
    const address = await factory.predictProjectDeploymentAddress(salt)
    assert(validateAddress(address),true)
  })

  it('Should create new projects without reverting.', async () => {
    const salts = ["face melt string", "one time bird"]
    const newProj = async (salt) => {
        const bsalt = ethers.utils.formatBytes32String(salt);
        const address = await factory.predictProjectDeploymentAddress(bsalt);
        proposal['address'] = address;
        proposal['salt'] = salt;
        const ipfsPath = await client.add(JSON.stringify(proposal));
        const newp = await factory.newProject(ipfsPath['path'], bsalt);
    }
    await newProj(salts[0])
    await newProj(salts[1])
  })

  it('Should return all projects.', async () => {
    const projects = await factory.getProjects()
    assert(typeof(projects),"Array")
    assert(projects.length, 2)
  })

  it('Should return a project by ID.', async () => {
    const project = await factory.getProject(0)
  })

});
