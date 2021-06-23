/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Proposal } from "../proposals/model";
import {
  createNewProposal,
  allProposals,
  voteProposal,
} from "../../../services/proposals";

interface ProposalsReducerState {
  proposals: Proposal[];
}

const proposalsInitialReducerState: ProposalsReducerState = {
  proposals: [],
};

export const createProposal = createAsyncThunk(
  "proposals/create",
  async (metadataURI: string) => {
    await createNewProposal(metadataURI);
    return;
  }
);

export const voteOnProposal = createAsyncThunk(
  "proposals/vote",
  async (options: any, thunkAPI) => {
    await voteProposal(options.proposalID, options.vote);
    return;
  }
);

export const getAllProposals = createAsyncThunk(
  "proposals/getproposals",
  async () => {
    const results = await allProposals();
    return results;
  }
);

export const proposalSlice = createSlice({
  name: "proposals",
  initialState: proposalsInitialReducerState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProposals.fulfilled, (state, action) => {
      action.payload.map((contractProposal) => {
        let proposal: Proposal = {
          id: contractProposal.id.toNumber(),
          forVotes: contractProposal.forVotes.toNumber(),
          againstVotes: contractProposal.againstVotes.toNumber(),
          voters: contractProposal.voters,
          createdAt: contractProposal.createdAt.toNumber(),
        };
        state.proposals.push(proposal);
      });
    });
  },
});
