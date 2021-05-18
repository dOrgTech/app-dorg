import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MainAppBar } from "./MainAppBar";
import { NavPanel } from "./NavPanel";
import { ViewRoutes } from "../views/ViewRoutes";

export const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

export function MainLayout() {
  const classes = useStyles();
  const [panelOpen, setPanelOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setPanelOpen(!panelOpen);
  };

  return (
    <div className={classes.root}>
      <MainAppBar onToggle={handleDrawerToggle} />
      <NavPanel open={panelOpen} onToggle={handleDrawerToggle} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ViewRoutes />
      </main>
    </div>
  );
}
