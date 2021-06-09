export enum ProjectStatus {
  ACTIVE,
  PENDING,
}

export interface Project {
  name: string;
  members: string[];
  status: ProjectStatus;
  logo?: string;
  totalInvoiced?: number;
  totalUnit?: string;
}
