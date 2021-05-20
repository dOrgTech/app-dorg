const PaymentSplitter = artifacts.require("PaymentSplitter");
const Clones = artifacts.require("Clones");
module.exports = function (deployer) {
  deployer.deploy(PaymentSplitter,["0xa2e1624116Ac3C9deC0e4F0d697063f30c732F2D"],[1])
  .then(function() {
    return deployer.deploy(Clones, PaymentSplitter.address);
  });
};
