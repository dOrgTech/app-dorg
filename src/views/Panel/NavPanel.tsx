import React from "react";
import { Hidden, Drawer, List, Box } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import ProjectIcon from "../../assets/images/project.svg";
import DorgLogoIcon from "../../assets/images/dorg-logo.svg";
import { DRAWER_WIDTH } from "../MainLayout";
import { MenuItem } from "../../components/list/MenuItem";
import { DaoInfoCard } from "./DaoInfoCard";

interface NavPanelProps {
  open: boolean;
  onToggle: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    logoContainer: {
      paddingLeft: 16,
      paddingTop: 24,
    },
    list: {
      marginTop: 32,
    },
    listItem: {
      padding: 16,
    },
  })
);

export const NavPanel: React.FC<NavPanelProps> = ({ open, onToggle }) => {
  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <Box display="flex" flexDirection="column" height="100%">
      <div className={classes.logoContainer}>
        <img src={DorgLogoIcon} alt="Project Icon" />
      </div>
      <List className={classes.list}>
        <MenuItem
          path="/"
          text="Projects"
          icon={<img src={ProjectIcon} alt="Project Icon" />}
        />
      </List>
      <Box flexGrow="1" />
      <DaoInfoCard />
    </Box>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={open}
          onClose={onToggle}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{ paper: classes.drawerPaper }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};
