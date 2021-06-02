import React from "react";
import { Button, ButtonProps, styled } from "@material-ui/core";
import { COLORS } from "../../utils/colors";

const StyledButton = styled(Button)({
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
});

export const BasicButton: React.FC<ButtonProps> = (props) => {
  return <StyledButton variant="contained" {...props} />;
};
