import React from "react";
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import { Provider as ReduxProvider } from "react-redux";
import { reduxStore } from "./store";
import { Routes } from "./views/Routes";
import { BrowserRouter } from "react-router-dom";

const theme = createMuiTheme({});

function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </MuiThemeProvider>
    </ReduxProvider>
  );
}

export default App;
