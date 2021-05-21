// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "./PaymentSplitterInitializable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract dOrgProjectFactory {

    address immutable splitterImplementation;

    constructor() {
        splitterImplementation = address(new PaymentSplitterInitializable());
    }

    function createProject(address finder, address multisig) external returns (address){
        
        address[] memory payees = new address[](2);
        uint256[] memory shares = new uint256[](2);

        payees[0] = finder;
        payees[1] = multisig;

        shares[0] = 20;
        shares[1] = 80;
        
        address payable clone;
        clone = payable(Clones.clone(splitterImplementation));
        PaymentSplitterInitializable(clone).initialize(payees,shares);
        
        return clone;
    }
}