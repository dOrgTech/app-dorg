// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

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

    Project[] projects;
    uint256 projIndex = 0;

    struct Project {
        uint256 id;
        string uri;
        address deployAddress;
    }

    event ProjectCreated(address projectAddress, address gnosisSafeAddress);

    /**
     * @dev Initializes `dOrgProject` instance.
     */

    constructor(address _gnosisLogic) {
        treasuryWallet = address(0x15344EcDc2c4EDFCB092E284d93c20F0529FD8a6);
        dOrgProjectLogic = address(new dOrgProject());
        gnosisLogic = _gnosisLogic;
    }

    function predictProjectDeploymentAddress(bytes32 salt) public view returns(address) {
        address dA = Clones.predictDeterministicAddress(dOrgProjectLogic,salt);
        return dA;
    }

    function newProject(string memory ipfs_path, bytes32 salt) public {
        address dA = Clones.predictDeterministicAddress(dOrgProjectLogic,salt);
        projects.push(Project(projIndex,ipfs_path,dA));
        projIndex += 1;
    }

    function getProject(uint256 i) public view returns(string memory) {
        return projects[i];
    }

    function getProjects() public view returns(Project[] memory) {
        return projects;
    }


    function createProject(
        string calldata projectName,
        address finderWallet,
        address[] calldata owners,
        uint256 threshold
    ) external {
        address payable gnosisSafe;
        gnosisSafe = payable(Clones.clone(gnosisLogic));

        GnosisSafe(gnosisSafe).setup(
            owners,
            threshold,
            address(0),
            "",
            address(0),
            address(0),
            0,
            payable(address(0))
        );

        address[] memory payees = new address[](3);
        uint256[] memory shares = new uint256[](3);

        payees[0] = treasuryWallet;
        payees[1] = finderWallet;
        payees[2] = gnosisSafe;

        shares[0] = 10;
        shares[1] = 10;
        shares[2] = 80;

        address payable project;
        project = payable(Clones.clone(dOrgProjectLogic));
        dOrgProject(project).initialize(projectName, payees, shares);

        emit ProjectCreated(project,gnosisSafe);
    }
}
