import { RootRoutes } from "../RootRoutes";
import React from "react";
import { useContractListener } from "../hooks/listeners/useContractListener";
import { useWalletListener } from "../hooks/listeners/useWalletListener";

export const RootPage = () => {
  useContractListener();
  useWalletListener();

  return <RootRoutes />;
};
