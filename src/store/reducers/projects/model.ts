export enum ProjectStatus {
  ACTIVE,
  PENDING,
}

export interface Project {
  logo: string;
  name: string;
  totalInvoiced: number;
  totalUnit: string;
  members: string[];
  status: ProjectStatus;
}
