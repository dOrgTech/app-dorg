// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./PaymentSplitterInitializable.sol";

contract dOrgProject is Initializable {
    PaymentSplitterInitializable splitter;

    function initialize(address[] memory payees, uint256[] memory shares_) public initializer {
        splitter = new PaymentSplitterInitializable();
        splitter.initialize(payees, shares_);
    }
}
