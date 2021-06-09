import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../utils/colors";

const useStyles = makeStyles({
  divider: {
    borderBottomStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.blueGray["200"],
  },
});

export const Divider = () => {
  const classes = useStyles();
  return <div className={classes.divider} />;
};
