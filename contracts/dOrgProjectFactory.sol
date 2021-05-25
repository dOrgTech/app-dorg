// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "./dOrgProject.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";


/**
* @dev Creates an instance of `dOrgProjectFactory`. 
*/

contract dOrgProjectFactory {

    address public immutable logicImplementation;
    event CloneAddress(address cloneAddress);

    /**
     * @dev Initializes `dOrgProject` instance. 
     */

    constructor() {
        logicImplementation = address(new dOrgProject());
    }

    /**
     * @dev 
     * 1) Creates a `dOrgProject` clone using the `Clones.sol` library. 2) Adds project to project array. 
     * Each account in `payees` is assigned the number of shares at the matching position in the `shares` array.
     * All addresses in `payees` must be non-zero. Both arrays must have the same non-zero length, and there must be no
     * duplicates in `payees`.
     */

    function createProject(string calldata _projectName, address _treasuryWallet, address _finderWallet, address _projectWallet) external{
        
        string memory projectName; 
        projectName = _projectName;

        address[] memory payees = new address[](3);
        uint256[] memory shares = new uint256[](3);

        payees[0] = _treasuryWallet;
        payees[1] = _finderWallet;
        payees[2] = _projectWallet;

        shares[0] = 10;
        shares[1] = 10;
        shares[2] = 80;
        
        address payable clone;
        clone = payable(Clones.clone(logicImplementation));
        dOrgProject(clone).initialize(projectName, payees, shares);
        
        emit CloneAddress(clone);

    }

}