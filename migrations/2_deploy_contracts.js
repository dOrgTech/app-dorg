const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");

module.exports = function (deployer) {
  deployer.deploy(dOrgProjectFactory)
    .then(function(c){
      return c.createProject(
      "0x28fd4cD79fa36cD71B37CFbCe592aB86Bf2701dD",
      "0x6Cea126D014D0D7D1A4cB9D72e929BDea39dB9aE"
    )});
};
