import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../utils/colors";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

interface AlertProps {
  severity: "error" | "success";
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      padding: 16,
      borderRadius: 4,
      alignItems: "center",
    },
    error: {
      color: COLORS.rose["600"],
      backgroundColor: COLORS.rose["50"],
    },
    success: {
      color: COLORS.green["600"],
      backgroundColor: COLORS.green["50"],
    },
    icon: {
      marginRight: 8,
    },
  })
);

export const Alert: React.FC<AlertProps> = ({ severity, children }) => {
  const classes = useStyles();

  const className = severity === "error" ? classes.error : classes.success;
  const icon =
    severity === "error" ? (
      <CancelIcon className={classes.icon} />
    ) : (
      <CheckCircleIcon className={classes.icon} />
    );

  return (
    <div className={[classes.container, className].join(" ")}>
      {icon}
      <span>{children}</span>
    </div>
  );
};
