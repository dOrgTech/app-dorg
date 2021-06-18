import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { reduxStore } from "./store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";
import { RootPage } from "./views/RootPage";
import { WalletConnection } from "./views/WalletConnection/WalletConnection";
import { useIsWalletConnected } from "./services/ethereum";

function App() {
  const { connected, loading } = useIsWalletConnected();
  return (
    <ReduxProvider store={reduxStore}>
      <ThemeProvider>
        <BrowserRouter>
          {connected ? <RootPage /> : <WalletConnection loading={loading} />}
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
