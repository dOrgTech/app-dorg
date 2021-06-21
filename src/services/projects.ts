import {
  getDOrgProjectContract,
  getDOrgProjectFactoryContract,
} from "../contracts";
import { BigNumberish, Signer } from "ethers";
import { Project } from "../store/reducers/projects/model";
import { getProvider, getSigner } from "./ethereum";

export async function getProjectData(projectAddress: string) {
  const signer = getSigner();
  const dOrgProject = getDOrgProjectContract(signer, projectAddress);
  // const projectName = await dOrgProject.projectName();
  const payees = await Promise.all([0, 1, 2].map((i) => dOrgProject.payee(i)));
  const shares = await Promise.all(payees.map((p) => dOrgProject.shares(p)));
  const totalShares = await dOrgProject.totalShares();
  const balance = await signer.provider?.getBalance(projectAddress);

  return {
    projectAddress,
    // projectName,
    payees,
    shares,
    totalShares,
    balance,
  };
}

// string memory metadataURI,
// address[] memory owners,
// address finder,
// uint256 threshold

export async function deployProjectContract(
  signer: Signer,
  project: Pick<
    Project,
    "metadataURI" | "owners" | "sourcingWallet" | "threshold"
  >
) {
  const dOrgProjectFactory = getDOrgProjectFactoryContract(signer);
  return dOrgProjectFactory.newProject(
    project.metadataURI,
    project.owners,
    project.sourcingWallet,
    project.threshold,
    { gasLimit: 1000000 }
  );
}

export async function getProjects(
  startIndex: BigNumberish,
  endIndex: BigNumberish
) {
  const signer = getSigner();
  const dOrgProjectFactory = getDOrgProjectFactoryContract(signer);
  const results = await dOrgProjectFactory.getProjects(startIndex, endIndex);
  return results;
}

export async function onProjectCreatedEvent(
  listener: (projectAddress: string, gnosisSafeAddress: string) => void
) {
  const provider = getProvider();
  const dOrgProjectFactory = getDOrgProjectFactoryContract(provider);
  // dOrgProjectFactory.on("ProjectCreated", listener);
}
