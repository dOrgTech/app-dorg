import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { CreateProjectForm } from "../../components/CreateProjectForm";

const useStyles = makeStyles(() =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    proposalTitle: {
      marginTop: 48,
    },
    proposalContainer: {
      marginTop: 24,
      maxWidth: 1400,
    },
  })
);

export const NewProjectView: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container></Grid>

      <Typography variant="h2" className={classes.proposalTitle}>
        Create New Project
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="center">
        <CreateProjectForm />
      </Box>
    </div>
  );
};
