import {
  getDOrgProjectContract,
  getDOrgProjectFactoryContract,
} from "../contracts";
import { Signer } from "ethers";
import { Project } from "../store/reducers/projects/model";
import { getProvider, getSigner } from "./ethereum";

export async function getProjectData(projectAddress: string) {
  const signer = getSigner();
  const dOrgProject = getDOrgProjectContract(signer, projectAddress);
  const projectName = await dOrgProject.projectName();
  const payees = await Promise.all([0, 1, 2].map((i) => dOrgProject.payee(i)));
  const shares = await Promise.all(payees.map((p) => dOrgProject.shares(p)));
  const totalShares = await dOrgProject.totalShares();
  const balance = await signer.provider?.getBalance(projectAddress);

  return {
    projectAddress,
    projectName,
    payees,
    shares,
    totalShares,
    balance,
  };
}

export async function deployProjectContract(
  signer: Signer,
  project: Pick<Project, "name" | "sourcingWallet" | "members" | "threshold">
) {
  const dOrgProjectFactory = getDOrgProjectFactoryContract(signer);
  return dOrgProjectFactory.createProject(
    project.name,
    project.sourcingWallet,
    project.members,
    project.threshold,
    { gasLimit: 1000000 }
  );
}

export async function onProjectCreatedEvent(
  listener: (projectAddress: string, gnosisSafeAddress: string) => void
) {
  const provider = getProvider();
  const dOrgProjectFactory = getDOrgProjectFactoryContract(provider);
  dOrgProjectFactory.on("ProjectCreated", listener);
}
