import { Signer } from "ethers";
import { DOrgProject__factory, DOrgProjectFactory__factory } from "./models";
import { Provider } from "@ethersproject/providers";

const DORG_PROJECT_FACTORY_RINKEBY_ADDRESS = process.env
  .REACT_APP_RINKEBY_CONTRACT as string;

export const getDOrgProjectFactoryContract = (provider: Provider | Signer) =>
  DOrgProjectFactory__factory.connect(
    DORG_PROJECT_FACTORY_RINKEBY_ADDRESS,
    provider
  );

export const getDOrgProjectContract = (
  signer: Signer,
  contractAddress: string
) => DOrgProject__factory.connect(contractAddress, signer);
