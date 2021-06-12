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

    struct Project {
        string metadataURI;
        uint forVotes;
        uint againstVotes;
        uint createdAt;
        address deployAddress;
    }

    uint256 public projectIndex = 0;
    mapping(uint256 => Project) public Projects;
    mapping(uint256 => mapping(address => bool)) public Votes;
    mapping(uint256 => address[]) public Owners;
    mapping(uint256 => address) public Finders;
    mapping(uint256 => uint) public Thresholds;

    event ProjectCreated(address projectAddress, address gnosisSafeAddress);

    constructor(address _gnosisLogic) {
        treasuryWallet = address(0x15344EcDc2c4EDFCB092E284d93c20F0529FD8a6);
        dOrgProjectLogic = address(new dOrgProject());
        gnosisLogic = _gnosisLogic;
    }

    function newProject(string memory metadataURI, address[] memory owners, address finder, uint threshold) public {
        Owners[projectIndex] = owners;
        Finders[projectIndex] = finder;
        Thresholds[projectIndex] = threshold;
        Projects[projectIndex] = Project(metadataURI,0,0,block.timestamp,address(0));
        projectIndex++;
    }

    function getProject(uint256 i) public view returns(Project memory) {
        return Projects[i];
    }

    function vote(uint256 i, bool approval) public {
        if(!Votes[i][msg.sender]){
            if (approval == true) {
                Projects[i].forVotes += 1;
            }
            if (approval == false){
                Projects[i].againstVotes += 1;
            }
        }
        Votes[i][msg.sender] = approval;
    }

    function deployProject(uint256 i) public {
        require(Projects[i].forVotes > Projects[i].againstVotes);
        require(block.timestamp > Projects[i].createdAt);
        createProject(Finders[i],Owners[i],Thresholds[i]);
    }

    function createProject(
        address finderWallet,
        address[] memory owners,
        uint256 threshold
    ) private {
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
        dOrgProject(project).initialize(payees, shares);

        emit ProjectCreated(project,gnosisSafe);
    }
}
