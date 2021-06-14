// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract dOrgPersonnel is AccessControl {

    bytes32 public constant MEMBER_ROLE = keccak256("DORG_MEMBER");

    constructor(address[] memory members) {
        for (uint i = 0; i< members.length; i++) {
            _setupRole(MEMBER_ROLE, members[i]);
        }
    }
}
