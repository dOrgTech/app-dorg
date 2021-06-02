import React from "react";
import { Button, ButtonProps, styled } from "@material-ui/core";

const StyledButton = styled(Button)({
  boxShadow: "none",
  borderRadius: 8,
  textTransform: "none",
  color: "#FFFFFF",
  fontWeight: "bold",
});

export const ActiveButton: React.FC<ButtonProps> = (props) => {
  return <StyledButton color="primary" variant="contained" {...props} />;
};
