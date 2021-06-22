import { getDOrgProjectFactoryContract } from "../contracts";
import { Project } from "../store/reducers/projects/model";
import { getProvider, getSigner } from "./ethereum";
import { BigNumber } from "ethers";
import axios from "axios";

export async function getProject(projectID: number) {
  const signer = getSigner();
  const dOrgProjectFactory = getDOrgProjectFactoryContract(signer);
  const results = await dOrgProjectFactory.Projects.call(projectID, 1);
  return results;
}

export async function allProjects() {
  const signer = getSigner();
  const dOrgProjectFactory = getDOrgProjectFactoryContract(signer);
  const projIndex = await dOrgProjectFactory.projectIndex.call(signer);
  const results = await dOrgProjectFactory.getProjects(
    BigNumber.from(1),
    projIndex
  );
  return results;
}

export async function getProjects(startIndex: BigNumber, endIndex: BigNumber) {
  const signer = getSigner();
  const dOrgProjectFactory = getDOrgProjectFactoryContract(signer);
  const results = await dOrgProjectFactory.getProjects(startIndex, endIndex);
  console.log(results);
  return results;
}

export async function getProjectIndex() {
  const signer = getSigner();
  const dOrgProjectFactory = getDOrgProjectFactoryContract(signer);
  const results = await dOrgProjectFactory.projectIndex.call(signer);
  return results;
}
