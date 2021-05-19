import React, { ReactElement } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { COLORS } from "../../utils/colors";

interface AvatarGroupProps {
  children: ReactElement | ReactElement[];
  max?: number;
}

const useStyles = makeStyles(() =>
  createStyles({
    avatarGroupItem: {
      display: "inline-block",
      marginLeft: -16,
    },
    avatarsContainer: {
      "& > *:not(p)": {
        display: "inline-block",
        marginLeft: -16,
      },
    },
    text: {
      color: COLORS.blueGray["500"],
      fontSize: 10,
      marginLeft: 4,
    },
  })
);

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 4,
}) => {
  const classes = useStyles();

  const elements = React.Children.toArray(children);
  const list = elements.slice(0, max);

  let text = null;
  if (elements.length > max) {
    text = (
      <Typography className={classes.text}>
        +{elements.length - max} more
      </Typography>
    );
  }

  return (
    <Box
      className={classes.avatarsContainer}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {list} {text}
    </Box>
  );
};
