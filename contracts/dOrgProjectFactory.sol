// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "./dOrgProject.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

/**
 * @dev Creates an instance of `dOrgProjectFactory`.
 */

contract dOrgProjectFactory {
    address public immutable treasuryWallet;
    address public immutable dOrgProjectLogic;
    address public immutable gnosisLogic;

    event ProjectAddress(address _projectAddress);
    event GnosisSafeAddress(address _gnosisSafeAddress);

    /**
     * @dev Initializes `dOrgProject` instance.
     */

    constructor(address _treasuryWallet, address _gnosisLogic) {
        treasuryWallet = _treasuryWallet;
        dOrgProjectLogic = address(new dOrgProject());
        gnosisLogic = _gnosisLogic;
    }

    /**
     * @dev
     * 1) Creates a `dOrgProject` clone using the `Clones.sol` library. 2) Adds project to project array.
     * Each account in `payees` is assigned the number of shares at the matching position in the `shares` array.
     * All addresses in `payees` must be non-zero. Both arrays must have the same non-zero length, and there must be no
     * duplicates in `payees`.
     */

    function createProject(
        string calldata _projectName,
        address _finderWallet,
        address[] calldata _owners,
        uint256 _threshold
    ) external {
        address payable gnosisSafe;
        gnosisSafe = payable(Clones.clone(gnosisLogic));

        bytes memory gnosisPayload =
            abi.encodeWithSignature(
                "setup(address[],uint256,address,bytes,address,address,uint256,address)",
                _owners,
                _threshold,
                0,
                address(0),
                0,
                0,
                0
            );
        address(gnosisSafe).call(gnosisPayload);

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

        emit ProjectAddress(project);
        emit GnosisSafeAddress(gnosisSafe);
    }
}
