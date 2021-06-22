export interface Proposal {
  title?: string;
  createdAt?: number;
  voters?: string[];
  forVotes?: number;
  againstVotes?: number;
  totalVotes?: number;
}
