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
  async (options: { startIndex: number; endIndex: number }) => {
    const results = await getProjects(options.startIndex, options.endIndex);
    return results;
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
    builder.addCase(getProjectsByIndex.fulfilled, (state, action) => {
      action.payload.map((contractProject) => {
        const project: Project = {
          metadataURI: contractProject.metadataURI,
        };
        state.projects.push(project);
      });
    });
  },
});
