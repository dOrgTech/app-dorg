import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "./model";
import { BigNumber } from "ethers";
import { dOrgProjectFactory } from "../../../contracts";

interface ProjectsReducerState {
  projects: Project[];
}

const projectsReducerInitialState: ProjectsReducerState = {
  projects: [],
};

export const createProject = createAsyncThunk(
  "projects/create",
  // Declare the type your function argument here:
  async ({
    project,
    sourcingWallet,
  }: {
    project: Project;
    sourcingWallet: string;
  }) => {
    const threshold = BigNumber.from(1);

    try {
      const transaction = await dOrgProjectFactory.createProject(
        project.name,
        sourcingWallet,
        project.members,
        threshold,
        { gasLimit: 1000000 }
      );

      console.log({ transaction });

      const receipt = await transaction.wait();
      console.log("Got the transaction receipt: ", receipt);

      return project;
    } catch (error) {
      console.warn("Create Project Error", error);
      throw error;
    }
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState: projectsReducerInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      createProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.projects.push(action.payload);
      }
    );
  },
});
