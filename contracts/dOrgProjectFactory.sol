// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "./dOrgProject.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract dOrgProjectFactory {

    address immutable dorgproj;

    constructor() {
        dorgproj = address(new dOrgProject());
    }

    function createProject(address finder, address multisig) external returns (address){
        
        address[] memory payees;
        payees[0] = finder;
        payees[1] = multisig;

        uint256[] memory shares;
        shares[0] = 20;
        shares[1] = 80;

        address payable clone;
        clone = payable(Clones.clone(dorgproj));
        dOrgProject(clone).initialize(payees,shares);
        
        return clone;
    }

}