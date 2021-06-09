import { BigNumberish } from "ethers";

export enum ProjectStatus {
  ACTIVE,
  PENDING,
}

export interface Project {
  name: string;
  members: string[];
  status: ProjectStatus;
  sourcingWallet: string;
  threshold: BigNumberish;
  logo?: string;
  totalInvoiced?: number;
  totalUnit?: string;
}
