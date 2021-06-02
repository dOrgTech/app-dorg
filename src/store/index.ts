import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { projectsSlice } from "./reducers/projects/projectsSlice";

export const reduxStore = configureStore({
  reducer: {
    projects: projectsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type RootDispatch = typeof reduxStore.dispatch;

export const useRootDispatch: () => RootDispatch = useDispatch;
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
