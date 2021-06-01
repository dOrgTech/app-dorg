import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { reduxStore } from "./store";
import { RootRoutes } from "./RootRoutes";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";

function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <ThemeProvider>
        <BrowserRouter>
          <RootRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
