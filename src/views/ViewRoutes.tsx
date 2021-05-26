import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProjectsView } from "./Projects/ProjectsView";
import { NewProjectView } from "./Projects/NewProjectView";

export const ViewRoutes = () => {
  return (
    <Switch>
      <Route path="/newproject" component={NewProjectView} />
      <Route path="/" component={ProjectsView} />
    </Switch>
  );
};
