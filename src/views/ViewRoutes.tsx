import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProjectsView } from "./Projects/ProjectsView";

export const ViewRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={ProjectsView} />
    </Switch>
  );
};
