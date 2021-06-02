import { ethers } from "ethers";
import { DOrgProject__factory, DOrgProjectFactory__factory } from "./models";

const DORG_PROJECT_FACTORY_RINKEBY_ADDRESS = process.env
  .REACT_APP_RINKEBY_CONTRACT as string;

// eslint-disable-next-line
const ethereum = (window as any).ethereum;
ethereum.request({ method: "eth_requestAccounts" });

export const provider = new ethers.providers.Web3Provider(ethereum, "any");
export const signer = provider.getSigner();

export const dOrgProjectFactory = DOrgProjectFactory__factory.connect(
  DORG_PROJECT_FACTORY_RINKEBY_ADDRESS,
  signer
);

export const getDOrgProjectContract = (contractAddress: string) =>
  DOrgProject__factory.connect(contractAddress, signer);

console.log("dOrgProjectFactory", dOrgProjectFactory);
