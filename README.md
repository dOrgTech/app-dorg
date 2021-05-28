# app-dorg
📱Internal interface for dOrg operations


## Contracts

`dOrgProjectFactory.sol` -- Factory that makes lighthweight clones of `dOrgProject.sol`. 

- `createProject(string projectName, address finderWallet, address[] gnosisOwners, uint256 threshold)`. Creates a multisig gnosis safe with parameters gnosisOwners, threshold. Then, creates a dOrgProject payment splitter that will send 80% of funds to gnosis safe, 10% to treasury, 10% to finder when funds are released.

## To Test

`truffle test`

## To Deploy to Rinkeby

Put a private key mnemonic with rinkeby ether in `.secret`

`truffle migrate --network rinkeby --reset`
