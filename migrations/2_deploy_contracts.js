const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");

module.exports = function (deployer) {
  // Development
  let gnosisLogic = "0xE51abdf814f8854941b9Fe8e3A4F65CAB4e7A4a8";
  // Rinkeby
  // let gnosisLogic = "0x6851D6fDFAfD08c0295C392436245E5bc78B0185"
  deployer.deploy(dOrgProjectFactory, gnosisLogic);
};
