import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ActiveButton } from "../../components/button/ActiveButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { ProposalCard } from "../../components/card/ProposalCard";
import { Proposal } from "../../store/reducers/proposals/model";
import AvatarImg from "../../assets/images/avatar.png";

const proposals: Proposal[] = [
  {
    totalVotes: 10,
    forVotes: 3,
    againstVotes: 7,
    voters: [AvatarImg, AvatarImg, AvatarImg, AvatarImg, AvatarImg, AvatarImg],
    title: "Proposal",
    expire: new Date("2021-07-23"),
  },
  {
    totalVotes: 13,
    forVotes: 7,
    againstVotes: 6,
    voters: [AvatarImg],
    title: "Proposal",
    expire: new Date("2021-07-23"),
  },
  {
    totalVotes: 10,
    forVotes: 5,
    againstVotes: 5,
    voters: [AvatarImg],
    title: "Proposal",
    expire: new Date("2021-07-23"),
  },
];

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
          {proposals.map((proposal, key) => (
            <Grid
              item
              key={`${key}-${proposal.title}`}
              xs={12}
              md={6}
              lg={4}
              xl={4}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <ProposalCard proposal={proposal} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};
