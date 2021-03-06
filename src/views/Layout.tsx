import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar } from "./AppBar";
import { NavPanel } from "./Panel/NavPanel";
import { ViewRoutes } from "./ViewRoutes";

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
    views: {
      padding: 24,
    },
  })
);

export function Layout() {
  const classes = useStyles();
  const [panelOpen, setPanelOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setPanelOpen(!panelOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar onToggle={handleDrawerToggle} />
      <NavPanel open={panelOpen} onToggle={handleDrawerToggle} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.views}>
          <ViewRoutes />
        </div>
      </main>
    </div>
  );
}
