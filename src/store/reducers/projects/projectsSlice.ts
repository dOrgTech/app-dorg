/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "./model";
import { deployProjectContract, getProjects } from "../../../services/projects";
import { getSigner } from "../../../services/ethereum";
import { BigNumberish } from "ethers";
import { stat } from "fs";
import { RemoveCircleOutlineSharp } from "@material-ui/icons";
import { create } from "ipfs-http-client";
import { exception } from "console";

const options: any = "http://127.0.0.1:5001";
const client = create(options);

interface ProjectsReducerState {
  projects: Project[];
}

const retrieveMetaData = async (uri: string) => {
  const stream = client.cat(uri);
  let data = "";
  for await (const chunk of stream) {
    let x: any = chunk;
    data += String.fromCharCode.apply(null, x);
  }
  return JSON.parse(data);
};

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
    const meta: Project[] = [];

      console.log(results)
    await Promise.all(results.map(async (x, i) => {
      const project:Project = {
        metadataURI: x.metadataURI,
        metadata: {}
      }
      try {
        project.metadata = await retrieveMetaData(x.metadataURI);
      } catch(e) {
        project.metadata = {projectName:"failed to load"}
      }
      return meta.push(project)
    }));
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
        console.log(contractProject)
        const project: Project = {
          metadataURI: contractProject.metadataURI,
          metadata: contractProject.metadata
        };
        state.projects.push(project);
      });
    });
  },
});
