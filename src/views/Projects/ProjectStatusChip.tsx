import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { ProjectStatus } from "../../store/reducers/projects/model";
import { COLORS } from "../../utils/colors";

interface ProjectStatusProps {
  status: ProjectStatus;
}

const useStyles = makeStyles<Theme, { dark: string; light: string }>({
  container: (props) => ({
    display: "inline-block",
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: props.light,
  }),
  dot: (props) => ({
    display: "inline-block",
    verticalAlign: "middle",
    height: 6,
    width: 6,
    borderRadius: "50%",
    backgroundColor: props.dark,
  }),
  text: (props) => ({
    marginLeft: 4,
    fontWeight: 700,
    fontSize: 12,
    color: props.dark,
  }),
});

export const ProjectStatusChip: React.FC<ProjectStatusProps> = ({ status }) => {
  const getColor = () => {
    if (status === ProjectStatus.ACTIVE)
      return { light: COLORS.green["50"], dark: COLORS.green["600"] };
    return { light: COLORS.amber["50"], dark: COLORS.amber["600"] };
  };

  const classes = useStyles(getColor());

  return (
    <Box className={classes.container}>
      <span className={classes.dot} />
      <span className={classes.text}>Pending</span>
    </Box>
  );
};
