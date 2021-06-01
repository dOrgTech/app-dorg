export interface Proposal {
  title: string;
  expire: Date;
  voters: string[];
  forVotes: number;
  againstVotes: number;
  totalVotes: number;
}
