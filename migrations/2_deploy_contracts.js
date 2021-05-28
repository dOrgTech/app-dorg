const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");
const dOrgProject = artifacts.require("dOrgProject");

module.exports = function (deployer) {
  let treasuryWallet = "0x15344EcDc2c4EDFCB092E284d93c20F0529FD8a6"
  let gnosisLogic = "0xb4A7C7da1631CF60A2Cf23ABc86986f99a1A7f70"
  deployer.deploy(dOrgProject).then(function(){
    return deployer.deploy(dOrgProjectFactory, treasuryWallet, dOrgProject.address,gnosisLogic)
  })
};
