import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useHistory, useRouteMatch } from "react-router-dom";

interface MenuItemProps {
  icon?: React.ReactChild;
  text: string;
  path: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      padding: 16,
    },
    listItemActive: {
      backgroundColor: "#F0FDF4",
    },
  })
);

export const MenuItem: React.FC<MenuItemProps> = ({ text, icon, path }) => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch(path);

  const handleButtonClick = () => {
    history.push(path);
  };

  const listItemClasses =
    match && match.isExact
      ? [classes.listItemActive, classes.listItem]
      : [classes.listItem];

  return (
    <ListItem
      onClick={handleButtonClick}
      button
      className={listItemClasses.join(" ")}
    >
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText color="primary" primary={text} />
    </ListItem>
  );
};
