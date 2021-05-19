import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ActiveButton } from "../../components/button/ActiveButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { ProposalCard } from "../../components/card/ProposalCard";

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

export const ProjectsView: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Typography variant="h1">Projects</Typography>
        <div className={classes.grow} />
        <ActiveButton startIcon={<AddCircleOutlineIcon />}>
          New Project
        </ActiveButton>
      </Grid>

      <Typography variant="h2" className={classes.proposalTitle}>
        3 Projects Pending Approval:
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="center">
        <Grid
          container
          direction="row"
          spacing={4}
          className={classes.proposalContainer}
        >
          {[1, 2, 3, 4].map((item) => (
            <Grid item key={item} xs={12} md={6} lg={4} xl={3}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <ProposalCard />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};
