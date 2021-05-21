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
        
        address[] memory payees = new address[](2);
        uint256[] memory shares = new uint256[](2);

        payees[0] = finder;
        payees[1] = multisig;

        shares[0] = 20;
        shares[1] = 80;
        
        address payable clone = payable(Clones.clone(dorgproj));
        dOrgProject(clone).initialize(payees,shares);
        
        return clone;
    }

}