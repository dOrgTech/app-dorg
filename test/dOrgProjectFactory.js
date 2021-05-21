const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");

contract("dOrgProjectFactory", accounts => {
  it("should create a new project", () =>
    dOrgProjectFactory.deployed()
      .then(instance => { 
        return instance.createProject.call(
        accounts[1],
        accounts[2]
      )})
      .then(e=>console.log(e)))
});

// .then(result => {
//   console.log(result)
// assert.equal(
//   balance.valueOf(),
//   10000,
//   "10000 wasn't in the first account"
// );
// }));