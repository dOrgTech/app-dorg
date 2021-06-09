import React from "react";
import { Button, ButtonProps, makeStyles } from "@material-ui/core";
import { COLORS } from "../../utils/colors";
import { createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      boxShadow: "none",
      borderRadius: 8,
      borderColor: COLORS.blueGray["200"],
      borderStyle: "solid",
      borderWidth: 1,
      textTransform: "none",
      color: COLORS.blueGray["700"],
      backgroundColor: "#FFFFFF",
      fontWeight: 700,

      "&:hover": {
        backgroundColor: "#EEEEEE",
      },
    },
  })
);

export const BasicButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={[classes.button, className].join(" ")}
      {...props}
    />
  );
};
