# app-dorg
📱Internal interface for dOrg operations


## Contracts

`dOrgProjectFactory.sol` -- Factory that makes lighthweight clones of `dOrgProject.sol`. 

- `createProject(projectName, treasuryWallet, finderWallet, projectWallet)`. Default split is [10,10,80] between treasury, finder, project. CloneAddress will be emitted as an event. This is the location of the dOrgProject contract. 

`dOrgProject.sol` -- Wrapper for `PaymentSplitterInitializable.sol`. Stores metadata such as project name. Uses `Initializable.sol` to prevent double-initialization attack.

- `getName()`. Returns project name. 

`PaymentSplitterInitializable.sol` -- OpenZeppelin payment splitter without `constructor()` function, replaced by `initialize()` as lightweight clones cannot have `constructor()` function. Uses `Initializable.sol` to prevent double-initialization attack. 

## To Test

`truffle test`

## To Deploy to Rinkeby

Put a private key mnemonic with rinkeby ether in `.secret`

`truffle migrate --network rinkeby --reset`