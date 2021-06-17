# app-dorg

📱Internal interface for dOrg operations

## Contracts

`dOrgProjectFactory.sol` -- Factory that makes lighthweight clones of `dOrgProject.sol`.

- `createProject(string projectName, address finderWallet, address[] gnosisOwners, uint256 threshold)`. Creates a multisig gnosis safe with parameters gnosisOwners, threshold. Then, creates a dOrgProject payment splitter that will send 80% of funds to gnosis safe, 10% to treasury, 10% to finder when funds are released.

## To Test

For local testing, you need to deploy GnosisSafe to your localhost. 

1) Run a local RPC server (e.g. ganache)

2) Deploy GnosisSafe contracts to localhost. These are too large to be imported directly.

- `cd safe-contracts`
- `npx hardhat deploy --network localhost`

3) Run tests locally:

- Copy and paste `GnosisSafe` contract address to `migrations/2_deploy_contracts.js` as local dev variable for Gnosis logic.

- `truffle migrate --reset` to deploy

- `truffle test` to run the tests

- `truffle exec test/scripts/populateContract.js` to load sample projects into the contract.

- `truffle exec test/scripts/getProjects.js` to test return of data from the contract.

4) Deploy to rinkeby, run tests, etc.

- Append `--network rinkeby`. Make sure you have your private key mnemonic in `.secret` in project root.