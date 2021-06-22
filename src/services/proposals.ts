import { getDOrgProjectFactoryContract } from "../contracts";
import { getSigner } from "./ethereum";
import { BigNumber } from "ethers";

export async function createNewProposal(metadataURI: string) {
  const signer = getSigner();
  const dOrgProjectFactory = getDOrgProjectFactoryContract(signer);
  const results = await dOrgProjectFactory.newProposal(metadataURI);
  return dOrgProjectFactory.newProposal(metadataURI, {
    gasLimit: 1000000,
  });
}

export async function allProposals() {
  const signer = getSigner();
  const dOrgProjectFactory = getDOrgProjectFactoryContract(signer);
  const projIndex = await dOrgProjectFactory.proposalIndex.call(signer);
  const results = await dOrgProjectFactory.getProposals(
    BigNumber.from(1),
    projIndex
  );
  return results;
}
