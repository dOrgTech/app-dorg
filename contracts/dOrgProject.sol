// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
// Forked from OpenZeppelin
import "./PaymentSplitterInitializable.sol";

/**
 * @dev Creates an instance of `dOrgProject`.
 * Stores `projectName`. `payees`, and `shares` variables are passed to `PaymentSplitterInitializable` `initialize()` function.
 * Both the `dOrgProject` and `PaymentSplitterInitializable` instance use the `Initializable.sol` libray to prevent double initialization attack.
 */

contract dOrgProject is Initializable, PaymentSplitterInitializable {
    function initialize(address[] memory _payees, uint256[] memory _shares)
        public
        payable
        override
        initializer
    {
        PaymentSplitterInitializable.initialize(_payees, _shares);
    }
}
