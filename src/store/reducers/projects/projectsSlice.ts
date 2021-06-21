import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "./model";
import { deployProjectContract, getProjects } from "../../../services/projects";
import { getSigner } from "../../../services/ethereum";
import { BigNumberish } from "ethers";
import { stat } from "fs";

interface ProjectsReducerState {
  projects: Project[];
}

const projectsReducerInitialState: ProjectsReducerState = {
  projects: [],
};

export const createProject = createAsyncThunk(
  "projects/create",
  async (project: Project) => {
    const signer = getSigner();
    const transaction = await deployProjectContract(signer, project);
    const receipt = await transaction.wait();
    console.log("transaction receipt: ", receipt);
    return project;
  }
);

export const getProjectsByIndex = createAsyncThunk(
  "projects/getprojects",
  async (options: any) => {
    const results: any = await getProjects(
      options.startIndex,
      options.endIndex
    );
    return await results;
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
    ),
      builder.addCase(getProjectsByIndex.fulfilled, (state, action: any) => {
        action.payload.map((x: any) => state.projects.push(x));
      });
  },
});
