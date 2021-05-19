import React from "react";
import { styled, Typography } from "@material-ui/core";
import { COLORS } from "../../utils/colors";

interface TimeTextProps {
  time: string;
}

const StyledTypography = styled(Typography)({
  color: COLORS.blueGray["700"],
  fontSize: 12,
  fontWeight: 600,
  fontFamily: "IBM Plex Mono",
});

export const TimeText: React.FC<TimeTextProps> = ({ time }) => {
  return <StyledTypography>{time}</StyledTypography>;
};
