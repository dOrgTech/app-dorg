import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { COLORS } from "../utils/colors";

interface ProgressProps {
  active?: boolean;
  color: "red" | "green";
  direction?: "left" | "right";
  progress: number;
}

const useStyles = makeStyles<Theme, ProgressProps>({
  progressContainer: ({ active, color }) => {
    const bgColor = color === "red" ? COLORS.rose["50"] : COLORS.green["50"];
    const backgroundColor = active ? bgColor : COLORS.blueGray["30"];
    return {
      position: "relative",
      height: 12,
      width: "100%",
      backgroundColor,
    };
  },
  progress: ({ color, progress, direction }) => {
    const backgroundColor =
      color === "red" ? COLORS.rose["600"] : COLORS.green["600"];

    const width = `${progress * 100}%`;
    const position = direction === "left" ? { left: 0 } : { right: 0 };

    return {
      ...position,
      position: "absolute",
      top: 0,
      width,
      height: "100%",
      backgroundColor,
    };
  },
});

export const Progress: React.FC<ProgressProps> = ({
  active = false,
  color,
  direction = "left",
  progress,
}) => {
  const classes = useStyles({ active, color, direction, progress });
  return (
    <div className={classes.progressContainer}>
      <div className={classes.progress} />
    </div>
  );
};
