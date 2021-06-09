import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "./model";
import { deployProjectContract } from "../../../services/projects";
import { getSigner } from "../../../services/ethereum";

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
