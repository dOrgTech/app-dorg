// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract dOrgProject is Initializable {
    address project; 
    function initialize(address[] memory payees, uint256[] memory shares_) public initializer {
        project = address(new PaymentSplitter(payees, shares_));
    }
}
