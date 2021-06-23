/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project, ProjectStatus } from "./model";
import { allProjects, getProjectIndex } from "../../../services/projects";
import { BigNumber } from "ethers";

interface ProjectsReducerState {
  projects: Project[];
}

const projectsReducerInitialState: ProjectsReducerState = {
  projects: [],
};

export const getAllProjects = createAsyncThunk(
  "projects/getprojects",
  async () => {
    const results = await allProjects();
    return results;
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState: projectsReducerInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      action.payload.map((contractProject) => {
        let project: Project = {
          deployAddress: contractProject.deployAddress,
          owners: contractProject.owners,
        };
        state.projects.push(project);
      });
    });
  },
});
