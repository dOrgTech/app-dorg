# app-dorg

📱Internal interface for dOrg operations

## Contracts

`dOrgProjectFactory.sol` -- Factory that makes lighthweight clones of `dOrgProject.sol`. It stores a mapping of projects, which are accessed by an incrementing counter. Projects are considered proposals until they are deployed, at which time the `deployAddress` is assigned the location of the `dOrgProject.sol` clone. 

`dOrgProject.sol` -- A payment splitter that sends 10% to finder, 10% to treasury, 80% to a GnosisSafe that has been created with the correct owners and signatory threshold that was passed to the newProject function. 

```

newProject(metadataURI, owners, finder, threshold) -- creates new project proposal and pushes to a mapping.

getProjectIndex() -- returns last created project id

getProject(id) -- returns status of project (votes, whether it's been deployed, metadata URI)

getProjects(startindex,endindex) -- returns array of projects, inclusive indexing (start index must be 1, not 0)

vote(id, boolean) -- vote yes or no (true/false)

getVoters(id)-- see who has voted (but not how, at this point)

getVote(id, voter) -- how a person voted for a specific project

deployProject(id) -- calls createProject to deploy a project that has votes and is passing. 

```

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