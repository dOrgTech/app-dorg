const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");

module.exports = function (deployer) {

  console.log("Environment: " + process.env.NODE_ENV)


  // Mainnet treasury wallet.
  let treasuryWallet = "0x15344EcDc2c4EDFCB092E284d93c20F0529FD8a6"
  
  let gnosisLogicAddress;

  if(process.env.NODE_ENV ==='development'){
    // Put the address of your locally deployed GnosisSafe.sol here.
    gnosisLogicAddress = "0xb4A7C7da1631CF60A2Cf23ABc86986f99a1A7f70" 
  }

  if(process.env.NODE_ENV ==='rinkeby'){
    // Rinkeby address of GnosisSafe.sol.
    gnosisLogicAddress = "0xb4A7C7da1631CF60A2Cf23ABc86986f99a1A7f70" 
  }

  deployer.deploy(dOrgProjectFactory, treasuryWallet, gnosisLogicAddress)
};
