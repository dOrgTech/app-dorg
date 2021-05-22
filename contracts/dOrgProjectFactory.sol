// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "./PaymentSplitterInitializable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract dOrgProjectFactory {

    address immutable splitterImplementation;
    event CloneAddress(address cloneAddress);
    event LogicAddress(address logicAddress);

    constructor() {
        splitterImplementation = address(new PaymentSplitterInitializable());
    }

    function createProject(address treasuryWallet, address finderWallet, address projectWallet) public returns (address){
        
        address[] memory payees = new address[](3);
        uint256[] memory shares = new uint256[](3);

        payees[0] = treasuryWallet;
        payees[1] = finderWallet;
        payees[2] = projectWallet;

        shares[0] = 10;
        shares[1] = 10;
        shares[2] = 80;
        
        address payable clone;
        clone = payable(Clones.clone(splitterImplementation));
        PaymentSplitterInitializable(clone).initialize(payees,shares);
        
        emit CloneAddress(clone);
        emit LogicAddress(splitterImplementation);
        return clone;
    }
}