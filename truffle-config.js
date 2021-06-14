const dotenv = require("dotenv");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");

const mnemonic = fs.readFileSync(".secret");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    rinkeby: {
      provider: () =>
      new HDWalletProvider({
        mnemonic: {
          phrase: mnemonic.toString()
        },
        providerOrUrl: "https://rinkeby.infura.io/v3/811d39a9e58e4555b9b91707fa36bb60",
      }),
      network_id: 4,
      confirmations: 1,
    },
  },
  compilers: {
    solc: {
      version: "0.8.4", // Fetch exact version from solc-bin (default: truffle's version)
      docker: false, // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200,
        },
      },
    },
  },
};
