import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

interface AvatarCardProps {
  name: string;
  address: string;
  image: string;
  metwork?: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    profileContainer: {
      width: "auto",
      marginLeft: 8,
    },
  })
);

export const AvatarCard: React.FC<AvatarCardProps> = ({
  name,
  address,
  image,
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row">
      <img src={image} alt="avatar" />
      <Grid container direction="column" className={classes.profileContainer}>
        <Grid item>
          <Typography variant="body1" color="textSecondary" noWrap>
            {name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" color="textPrimary" noWrap>
            {address}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
