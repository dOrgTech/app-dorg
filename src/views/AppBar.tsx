import React from "react";
import { AppBar as MUIAppBar, IconButton, Toolbar } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "./Layout";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { COLORS } from "../utils/colors";
import { AvatarCard } from "../components/avatar/AvatarCard";
import AvatarImg from "../assets/images/avatar.png";
import { useRootSelector } from "../store";
import { getUser } from "../store/reducers/user/selectors";
import { truncate } from "../helpers/strings";

interface MainAppBarProps {
  onToggle: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      boxShadow: "none",
      paddingLeft: 40,
      paddingRight: 40,
      backgroundColor: "#FFFFFF",
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
    toolbar: {
      minHeight: 90,
    },
    searchIcon: {
      color: COLORS.blueGray["500"],
    },
  })
);

export const AppBar: React.FC<MainAppBarProps> = ({ onToggle }) => {
  const classes = useStyles();
  const user = useRootSelector(getUser);
  return (
    <MUIAppBar position="fixed" className={classes.appBar}>
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
        <AvatarCard
          name="Colin Spence"
          address={user.ens || truncate(user.address, 6)}
          image={AvatarImg}
        />
      </Toolbar>
    </MUIAppBar>
  );
};
