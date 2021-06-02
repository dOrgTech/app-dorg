import { useEffect } from "react";
import {
  dOrgProjectFactory,
  getDOrgProjectContract,
  provider,
} from "../contracts";

const projectCreatedListener = async (
  projectAddress: string,
  gnosisSafeAddress: string
) => {
  const dOrgProject = getDOrgProjectContract(projectAddress);
  const projectName = await dOrgProject.projectName();
  const payees = await Promise.all([0, 1, 2].map((i) => dOrgProject.payee(i)));
  const shares = await Promise.all(payees.map((p) => dOrgProject.shares(p)));
  const totalShares = await dOrgProject.totalShares();
  const balance = await provider.getBalance(projectAddress);

  console.log("ProjectCreated", {
    projectAddress,
    gnosisSafeAddress,
    projectName,
    payees,
    shares,
    totalShares,
    balance,
  });
};

export const useContractListener = () => {
  useEffect(() => {
    dOrgProjectFactory.on("ProjectCreated", projectCreatedListener);
  }, []);
};
