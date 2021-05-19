import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";

export const reduxStore = configureStore({ reducer: rootReducer });
