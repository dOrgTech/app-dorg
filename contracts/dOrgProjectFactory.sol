// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./dOrgProject.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

/**
 * @dev Creates an instance of `dOrgProjectFactory`.
 */

interface GnosisSafe {
    function setup(
        address[] calldata _owners,
        uint256 threshold,
        address to,
        bytes calldata data,
        address fallbackHandler,
        address paymentToken,
        uint256 payment,
        address payable paymentReceiver
    ) external;
}

contract dOrgProjectFactory {
    address public immutable treasuryWallet;
    address public immutable dOrgProjectLogic;
    address public immutable gnosisLogic;

    event ProjectCreated(address _projectAddress, address _gnosisSafeAddress);

    constructor(address _treasuryWallet, address _gnosisLogic) {
        treasuryWallet = _treasuryWallet;
        dOrgProjectLogic = address(new dOrgProject());
        gnosisLogic = _gnosisLogic;
    }

    function createProject(
        string calldata _projectName,
        address _finderWallet,
        address[] calldata _owners,
        uint256 _threshold
    ) external {
        address payable gnosisSafe;
        gnosisSafe = payable(Clones.clone(gnosisLogic));
        GnosisSafe(gnosisSafe).setup(_owners,_threshold,address(0),"",address(0),address(0),0,payable(address(0)));

        string memory projectName;
        projectName = _projectName;

        address[] memory payees = new address[](3);
        uint256[] memory shares = new uint256[](3);

        payees[0] = treasuryWallet;
        payees[1] = _finderWallet;
        payees[2] = gnosisSafe;

        shares[0] = 10;
        shares[1] = 10;
        shares[2] = 80;

        address payable project;
        project = payable(Clones.clone(dOrgProjectLogic));
        dOrgProject(project).initialize(projectName, payees, shares);

        emit ProjectCreated(project, gnosisSafe);
    }
}
