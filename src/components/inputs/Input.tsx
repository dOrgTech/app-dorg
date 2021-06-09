import React, { CSSProperties } from "react";
import { Box, TextField, TextFieldProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../../utils/colors";
import { Label } from "./Label";

type InputProps = TextFieldProps & {
  description?: string;
  boxStyle?: CSSProperties;
  fullWidth?: boolean;
};

const useStyles = makeStyles({
  input: {
    padding: "14px 16px",
    color: COLORS.blueGray["700"],
    fontSize: 12,
  },
  inputContainer: {
    borderRadius: 8,
    borderColor: COLORS.blueGray["300"],
    padding: 0,
  },
  description: {
    fontWeight: 300,
    fontSize: 12,
    color: COLORS.blueGray["500"],
    marginBottom: 2,
  },
});

export const Input: React.FC<InputProps> = ({
  description,
  boxStyle = {},
  fullWidth,
  label,
  ...props
}) => {
  const classes = useStyles();
  const containerStyle = {
    width: fullWidth ? "100%" : undefined,
    ...boxStyle,
  };
  return (
    <Box display="inline-flex" flexDirection="column" style={containerStyle}>
      {label ? (
        <Label
          required={props.required}
          text={
            <>
              {label}
              {description ? (
                <span className={classes.description}>{description}</span>
              ) : null}
            </>
          }
        />
      ) : null}
      <TextField
        {...props}
        inputProps={{
          ...props.inputProps,
          className: [props.inputProps?.className, classes.input]
            .join(" ")
            .trim(),
        }}
        InputProps={{
          ...props.InputProps,
          className: [props.InputProps?.className, classes.inputContainer].join(
            " "
          ),
        }}
        variant="outlined"
      />
    </Box>
  );
};
