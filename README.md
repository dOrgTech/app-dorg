# app-dorg

📱Internal interface for dOrg operations

## Contracts

`dOrgProjectFactory.sol` -- Factory that makes lighthweight clones of `dOrgProject.sol`.

- `createProject(string projectName, address finderWallet, address[] gnosisOwners, uint256 threshold)`. Creates a multisig gnosis safe with parameters gnosisOwners, threshold. Then, creates a dOrgProject payment splitter that will send 80% of funds to gnosis safe, 10% to treasury, 10% to finder when funds are released.

## To Test

For local testing, you need to deploy GnosisSafe to your localhost.

`git clone https://github.com/gnosis/safe-contracts.git`
`yarn hardhat --network localhost deploy`

In `app-dorg` root. In `2_deploy_contracts` make sure local gnosis logic is passed at deployment.
`truffle migrate --network development --reset`
`truffle test`

## To Deploy/Test on Rinkeby

Put a private key mnemonic with rinkeby ether in `.secret`
In `app-dorg` root. In `2_deploy_contracts` make sure rinkeby gnosis logic is passed at deployment.

`truffle migrate --network rinkeby --reset`
`truffle test --network rinkeby`
