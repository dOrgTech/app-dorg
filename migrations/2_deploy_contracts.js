const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");

module.exports = function (deployer) {
  deployer.deploy(dOrgProjectFactory)
};
