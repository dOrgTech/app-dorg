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
        uint256 id;
        string metadataURI;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 createdAt;
        address deployAddress;
    }

    uint256 public projectIndex = 0;
    mapping(uint256 => Project) public Projects;
    mapping(uint256 => mapping(address => bool)) public Votes;
    mapping(uint256 => address[]) public Voters;
    mapping(uint256 => address[]) public Owners;
    mapping(uint256 => address) public Finders;
    mapping(uint256 => uint256) public Thresholds;
    mapping(uint256 => address) public GnosisSafes;

    constructor(address _gnosisLogic) {
        treasuryWallet = address(0x15344EcDc2c4EDFCB092E284d93c20F0529FD8a6);
        dOrgProjectLogic = address(new dOrgProject());
        gnosisLogic = _gnosisLogic;
    }

    function newProject(
        string memory metadataURI,
        address[] memory owners,
        address finder,
        uint256 threshold
    ) public {
        projectIndex++;
        Owners[projectIndex] = owners;
        Finders[projectIndex] = finder;
        Thresholds[projectIndex] = threshold;
        Projects[projectIndex] = Project(
            projectIndex,
            metadataURI,
            0,
            0,
            block.timestamp,
            address(0)
        );
    }

    function getProjectIndex() public view returns (uint256){
        return projectIndex;
    }

    function getProject(uint256 i) public view returns (Project memory) {
        require(Projects[i].id != 0, 'Project does not exist.');
        return Projects[i];
    }

    function getProjectGnosisSafe(uint256 i) public view returns (address) {
        return GnosisSafes[i];
    }

    function getProjects(uint256 startIndex, uint256 endIndex)
        public
        view
        returns (Project[] memory)
    {
        uint256 arraySize = 1 + endIndex - startIndex;
        require(arraySize > 0, 'Invalid start or end index.');
        require(endIndex <= projectIndex, 'End index out of range.');
        Project[] memory projectSlice = new Project[](arraySize);
        for (uint256 i = 0; i < arraySize; i++) {
            projectSlice[i] = Projects[startIndex + i];
        }
        return projectSlice;
    }

    function getVoters(uint256 i) public view returns (address[] memory) {
        return Voters[i];
    }

    function getVote(uint256 i, address voter) public view returns (bool) {
        require(
            Votes[i][voter],
            "This address has not voted on the specified proposal."
        );
        return Votes[i][voter];
    }

    function vote(uint256 i, bool approval) public {
        for(uint v = 0; v<Voters[i].length; v++){
            require(Voters[i][v] != msg.sender, 'Cannot vote twice.');
        }
        require(
            block.timestamp < Projects[i].createdAt + 604800,
            "Voting period has closed."
        );
        if (approval == true) {
            Projects[i].forVotes += 1;
        } else {
            Projects[i].againstVotes += 1;
        }
        Votes[i][msg.sender] = approval;
        Voters[i].push(msg.sender);
    }

    function deployProject(uint256 i) public {
        require(
            Projects[i].forVotes > Projects[i].againstVotes,
            "Project proposal not passing."
        );
        require(
            Projects[i].deployAddress == address(0),
            "Project already deployed."
        );
        /*
         * require(
         *    block.timestamp > Projects[i].createdAt + 604800,
         *    "Voting period has note yet closed."
         * );
         */
        createProject(Finders[i], Owners[i], Thresholds[i], i);
    }

    function createProject(
        address finderWallet,
        address[] memory owners,
        uint256 threshold,
        uint256 i
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

        Projects[i].deployAddress = project;
        GnosisSafes[i] = gnosisSafe;
    }
}
