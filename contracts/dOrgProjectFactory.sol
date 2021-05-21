// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "./PaymentSplitterInitializable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract dOrgProjectFactory {

    address admin = address(0xD54E9424ea8536e617f72402fB901FBe3358B4d0);
    address immutable splitterImplementation;

    constructor() {
        splitterImplementation = address(new PaymentSplitterInitializable());
    }

    function createProject(address finder, address multisig) external returns (address){
        
        address[] memory payees;
        payees[0] = admin;
        payees[1] = finder;
        payees[2] = multisig;

        uint256[] memory shares;
        shares[0] = 10;
        shares[1] = 10;
        shares[2] = 80;

        address payable clone;
        clone = payable(Clones.clone(splitterImplementation));
        PaymentSplitterInitializable(clone).initialize(payees,shares);
        
        return clone;
    }
}