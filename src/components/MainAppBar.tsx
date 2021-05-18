import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Grid,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "./MainLayout";
import MenuIcon from "@material-ui/icons/Menu";
import AvatarImg from "../assets/images/avatar.png";
import SearchIcon from "@material-ui/icons/Search";
import { COLORS } from "../utils/colors";

interface MainAppBarProps {
  onToggle: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      boxShadow: "none",
      paddingLeft: 40,
      paddingRight: 40,
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    grow: {
      flexGrow: 1,
    },
    profileContainer: {
      width: "auto",
      marginLeft: 8,
    },
    toolbar: {
      minHeight: 90,
    },
    searchIcon: {
      color: COLORS.blueGray["500"],
    },
  })
);

export const MainAppBar: React.FC<MainAppBarProps> = ({ onToggle }) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="transparent" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <SearchIcon className={classes.searchIcon} />
        <div className={classes.grow} />
        <Avatar src={AvatarImg} alt="avatar" />
        <Grid container direction="column" className={classes.profileContainer}>
          <Grid item>
            <Typography variant="body1" color="textSecondary" noWrap>
              Colin Spence
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" noWrap>
              0x7301cf-0eb0aa6
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
