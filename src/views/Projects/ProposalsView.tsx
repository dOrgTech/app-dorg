import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ActiveButton } from "../../components/button/ActiveButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { ProposalCard } from "../../components/card/ProposalCard";
import { Proposal } from "../../store/reducers/proposals/model";
import AvatarImg from "../../assets/images/avatar.png";
import { ProjectsTable } from "./ProjectsTable";
import { NewProjectModal } from "./NewProposalModal";
import { useRootDispatch, useRootSelector } from "../../store";
import { getAllProposals } from "../../store/reducers/proposals/proposalSlice";

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

export const ProposalsView: React.FC = () => {
  const classes = useStyles();
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);

  const handleOpenModal = () => setNewProjectModalOpen(true);
  const handleCloseModal = () => setNewProjectModalOpen(false);

  const proposals = useRootSelector((state) => state.proposals.proposals);
  const dispatch = useRootDispatch();
  console.log(proposals);
  useEffect(() => {
    dispatch(getAllProposals());
  }, []);

  return (
    <div>
      <Grid container>
        <Typography variant="h1">Projects</Typography>
        <div className={classes.grow} />
        <ActiveButton
          size="large"
          onClick={handleOpenModal}
          startIcon={<AddCircleOutlineIcon />}
        >
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

      <Typography variant="h2" className={classes.proposalTitle}>
        Projects Overview
      </Typography>

      <ProjectsTable />

      <NewProjectModal
        open={newProjectModalOpen}
        handleClose={handleCloseModal}
      />
    </div>
  );
};
