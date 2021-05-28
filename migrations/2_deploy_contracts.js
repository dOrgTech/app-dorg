const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");

module.exports = function (deployer) {
  let treasuryWallet = "0x15344EcDc2c4EDFCB092E284d93c20F0529FD8a6"
  // Development
  // let gnosisLogic = "0xb4A7C7da1631CF60A2Cf23ABc86986f99a1A7f70"
  // Rinkeby
  let gnosisLogic = "0x6851D6fDFAfD08c0295C392436245E5bc78B0185"
  deployer.deploy(dOrgProjectFactory, treasuryWallet, gnosisLogic)
};
