import React from "react";
import { Button, ButtonProps, makeStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      boxShadow: "none",
      borderRadius: 8,
      textTransform: "none",
      color: "#FFFFFF",
      fontWeight: "bold",
    },
  })
);

export const ActiveButton: React.FC<ButtonProps> = ({
  className,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Button
      color="primary"
      className={[classes.button, className].join(" ")}
      variant="contained"
      {...props}
    />
  );
};
