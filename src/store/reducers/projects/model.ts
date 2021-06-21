import { BigNumber, BigNumberish } from "ethers";

export enum ProjectStatus {
  ACTIVE,
  PENDING,
}

export interface Project {
  id?: string;
  metadataURI: string;
  owners?: string[];
  sourcingWallet?: string;
  threshold?: BigNumberish;
  status?: ProjectStatus;
  name?: string;
  logo?: string;
  totalInvoiced?: BigNumberish;
  totalUnit?: string;
}
