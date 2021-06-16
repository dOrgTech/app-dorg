const dOrgProjectFactory = artifacts.require("dOrgProjectFactory");

module.exports = function (deployer, network) {

  var gnosisLogic;
  console.log(network)

  if(network === 'development'){
    // You must deploy gnosis locally
    // cd into safe-contracts directory then run
    // npx hardhat deploy --network localhost
    // paste the address of the GnosisSafe contract here
    gnosisLogic = "0xb4A7C7da1631CF60A2Cf23ABc86986f99a1A7f70";
  }
  
  if(network === 'rinkeby-fork'){
    gnosisLogic = "0x6851D6fDFAfD08c0295C392436245E5bc78B0185"
  }

  if(network === 'rinkeby'){
    gnosisLogic = "0x6851D6fDFAfD08c0295C392436245E5bc78B0185"
  }

  deployer.deploy(dOrgProjectFactory, gnosisLogic);
};
