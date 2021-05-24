import React from "react";
import { Grid, Typography } from "@material-ui/core";
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

export const CreateProjectView: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Typography variant="h1">Projects</Typography>
        <div className={classes.grow} />
      </Grid>

      <Typography variant="h2" className={classes.proposalTitle}>
        Create a New Project
      </Typography>

      <CreateProjectForm />
    </div>
  );
};
