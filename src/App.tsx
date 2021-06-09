import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { reduxStore } from "./store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";
import { RootPage } from "./views/RootPage";

// eslint-disable-next-line
const ethereum = (window as any).ethereum;

function App() {
  if (!ethereum) {
    return <h1>Please Install MetaMask</h1>;
  }
  return (
    <ReduxProvider store={reduxStore}>
      <ThemeProvider>
        <BrowserRouter>
          <RootPage />
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
