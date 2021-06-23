export interface Proposal {
  id: number;
  title?: string;
  createdAt?: number;
  voters?: string[];
  forVotes?: number;
  againstVotes?: number;
  totalVotes?: number;
}
