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
    
    struct Proposal {
        uint256 id;
        address creator; 
        string metadataURI;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 createdAt;
        address[] voters;
        uint256 projectID;
    }

    struct Project {
        uint256 id;
        address finder;
        address[] owners;
        uint256 threshold;
        uint256 proposalID;
        address deployAddress;
    }

    uint256 public projectIndex = 0;
    uint256 public proposalIndex = 0;

    mapping(uint256 => Project) public Projects;
    mapping(uint256 => Proposal) public Proposals;

    constructor(address _gnosisLogic) {
        treasuryWallet = address(0x15344EcDc2c4EDFCB092E284d93c20F0529FD8a6);
        dOrgProjectLogic = address(new dOrgProject());
        gnosisLogic = _gnosisLogic;
    }

    /**
    *
    * Create a proposal.
    *
    **/

    function newProposal(string memory metadataURI) public {
        proposalIndex++;
        address[] memory voters;
        Proposals[proposalIndex] = Proposal(
            proposalIndex,
            msg.sender,
            metadataURI,
            0,
            0,
            block.timestamp,
            voters,
            0
        );
    }

    /**
    * Attach a project to a proposal.
    * Requires: 1) creator of proposal is creating the project
    *           2) project hasn't already been created
    *           3) proposal has enough votes 
    *           4) voting window closed
    **/

    function newProject(
        uint256 proposalID,
        address finder,
        address[] memory owners,
        uint256 threshold
    ) public {
        projectIndex++;

        require(Proposals[proposalID].creator == msg.sender, 'Proposal creator must create project.');
        require(Proposals[proposalID].projectID == 0, 'Project already created');
        require(
            Proposals[proposalID].forVotes > Proposals[proposalID].againstVotes,
            "Proposal not passing."
        );
        /*
        * require(
        *    block.timestamp > Proposals[proposalID].createdAt,
        *    "Voting period has note yet closed."
        *);
        */
        Proposals[proposalID].projectID = projectIndex;
        Projects[projectIndex] = Project(
            projectIndex,
            finder,
            owners,
            threshold,
            proposalID,
            address(0)
        );
        deployProject(projectIndex);
    }

    /**
    * Once project has been attached to proposal, it can be deployed
    * This will generate a deploy address for the project.
    **/

    function deployProject(
        uint256 projectID
    ) private {

        address payable gnosisSafe;
        gnosisSafe = payable(Clones.clone(gnosisLogic));

        GnosisSafe(gnosisSafe).setup(
            Projects[projectID].owners,
            Projects[projectID].threshold,
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
        payees[1] = Projects[projectID].finder;
        payees[2] = gnosisSafe;

        shares[0] = 10;
        shares[1] = 10;
        shares[2] = 80;

        address payable project;
        project = payable(Clones.clone(dOrgProjectLogic));
        dOrgProject(project).initialize(payees, shares);

        Projects[projectID].deployAddress = project;
    }

    function vote(uint256 proposalID, bool approval) public {
        for(uint i = 0; i<Proposals[proposalID].voters.length; i++){
            require(Proposals[proposalID].voters[i] != msg.sender, 'Cannot vote twice.');
        }
        require(
            block.timestamp < Proposals[proposalID].createdAt + 604800,
            "Voting period has closed."
        );
        if (approval == true) {
            Proposals[proposalID].forVotes += 1;
        } else {
            Proposals[proposalID].againstVotes += 1;
        }
        Proposals[proposalID].voters.push(msg.sender);
    }

}
