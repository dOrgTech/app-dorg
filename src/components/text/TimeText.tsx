import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

interface TimeTextProps {
  time: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    text: {
      display: "flex",
      flexDirection: "row",
      padding: 16,
      borderRadius: 4,
      alignItems: "center",
    },
  })
);

export const TimeText: React.FC<TimeTextProps> = ({ time }) => {
  const classes = useStyles();
  return <Typography className={classes.text}>{time}</Typography>;
};
