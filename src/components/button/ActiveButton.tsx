import React from "react";
import { Button, ButtonProps, styled } from "@material-ui/core";

const StyledButton = styled(Button)({
  boxShadow: "none",
  borderRadius: 8,
  textTransform: "none",
  color: "#FFFFFF",
  fontWeight: "bold",
  fontSize: 12,
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 16,
  paddingRight: 16,
});

export const ActiveButton: React.FC<ButtonProps> = (props) => {
  return <StyledButton color="primary" variant="contained" {...props} />;
};
