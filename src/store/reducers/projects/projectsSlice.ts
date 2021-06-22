/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project, ProjectStatus } from "./model";
import {
  deployProjectContract,
  getProjects,
  getProjectIndex,
} from "../../../services/projects";
import { getSigner } from "../../../services/ethereum";
import axios from "axios";

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
    const projIndex = await getProjectIndex();
    const results = await getProjects(1, projIndex);

    const meta: Project[] = [];

    await Promise.all(
      results.map(async (proj) => {
        let status: ProjectStatus = ProjectStatus.PENDING;

        if (proj.deployAddress != "0x0000000000000000000000000000000000000000") {
          status = ProjectStatus.ACTIVE;
        }

        const project: Project = {
          metadataURI: proj.metadataURI,
          metadata: {},
          forVotes: proj.forVotes,
          againstVotes: proj.againstVotes,
          deployAddress: proj.deployAddress,
          status: status,
        };

        await axios.get("https://ipfs.io/ipfs/" + project.metadataURI)
        .then(data => {
          project.metadata = data.data
        }).catch(e => {
          project.metadata.projectName = "Error"
        })

        meta.push(project);
      })
    );
    return meta;
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
        console.log(contractProject);
        const project: Project = {
          metadataURI: contractProject.metadataURI,
          metadata: contractProject.metadata,
        };
        state.projects.push(project);
      });
    });
  },
});
