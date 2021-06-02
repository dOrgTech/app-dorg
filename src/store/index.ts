import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const reduxStore = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type RootDispatch = typeof reduxStore.dispatch;

export const useRootDispatch: () => RootDispatch = useDispatch;
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
