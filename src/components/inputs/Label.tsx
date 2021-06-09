import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../../utils/colors";
import { TextFieldProps } from "@material-ui/core";

const useStyles = makeStyles({
  label: {
    fontWeight: 700,
    fontSize: 12,
    color: COLORS.blueGray["500"],
    marginBottom: 2,
  },
  required: {
    color: COLORS.rose["600"],
  },
});

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: TextFieldProps["label"];
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({ required, text, ...props }) => {
  const classes = useStyles();
  const requiredElement = required ? (
    <span className={classes.required}>*</span>
  ) : null;
  return (
    <span {...props} className={classes.label}>
      {text}
      {requiredElement}
    </span>
  );
};
