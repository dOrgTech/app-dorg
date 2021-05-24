import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProjectsView } from "./Projects/ProjectsView";
import { CreateProjectView } from "./Projects/CreateProjectView";

export const ViewRoutes = () => {
  return (
    <Switch>
      <Route path="/newproject" component={CreateProjectView} />
      <Route path="/" component={ProjectsView} />
    </Switch>
  );
};
