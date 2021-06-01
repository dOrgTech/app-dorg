import React from "react";
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import { COLORS } from "./utils/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: COLORS.green["600"],
    },
    text: {
      primary: COLORS.green["600"],
      secondary: "#1E293B",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Spartan",
    h1: {
      color: COLORS.blueGray["900"],
      fontSize: 32,
      fontWeight: 700,
    },
    h2: {
      color: COLORS.blueGray["700"],
      fontSize: 24,
      fontWeight: 700,
    },
    h4: {
      color: COLORS.blueGray["700"],
      fontSize: 16,
      fontWeight: 600,
    },
    body1: {
      fontSize: 14,
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: 12,
      fontWeight: 600,
    },
    subtitle2: {
      color: COLORS.blueGray["500"],
      fontSize: 12,
      fontWeight: 600,
    },
  },
});

export const ThemeProvider: React.FC = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
