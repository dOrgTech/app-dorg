import React from "react";
import { Route } from "react-router-dom";
import { WalletConnection } from "./WalletConnection/WalletConnection";
import { MainLayout } from "../components/MainLayout";

export const Routes = () => {
  return (
    <>
      <Route path="/auth" component={WalletConnection} />
      <Route path="/" component={MainLayout} />
    </>
  );
};
