import React from "react";
import { Route } from "react-router-dom";
import { WalletConnection } from "./views/WalletConnection/WalletConnection";
import { Layout } from "./views/Layout";

export const RootRoutes = () => {
  return (
    <>
      <Route path="/auth" component={WalletConnection} />
      <Route path="/" component={Layout} />
    </>
  );
};
