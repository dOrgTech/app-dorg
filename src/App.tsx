import React from "react";
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import { Provider as ReduxProvider } from "react-redux";
import { reduxStore } from "./store";
import { RootRoutes } from "./RootRoutes";
import { BrowserRouter } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#1AAF71",
      secondary: "#1E293B",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Spartan",
    body1: {
      fontSize: 14,
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: 12,
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <RootRoutes />
        </BrowserRouter>
      </MuiThemeProvider>
    </ReduxProvider>
  );
}

export default App;
