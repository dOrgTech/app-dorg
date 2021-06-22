import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProposalsView } from "./Projects/ProposalsView";

export const ViewRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={ProposalsView} />
    </Switch>
  );
};
