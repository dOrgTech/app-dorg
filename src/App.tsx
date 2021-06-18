import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { reduxStore } from "./store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";
import { RootPage } from "./views/RootPage";
import { WalletConnection } from "./views/WalletConnection/WalletConnection";
import { useConnectedWallet } from "./services/ethereum";

function App() {
  const connectedWallet = useConnectedWallet();
  return (
    <ReduxProvider store={reduxStore}>
      <ThemeProvider>
        <BrowserRouter>
          {connectedWallet ? <RootPage /> : <WalletConnection />}
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
