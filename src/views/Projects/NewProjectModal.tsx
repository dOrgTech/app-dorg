import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { CustomModal } from "../../components/CustomModal";
import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import { Divider } from "../../components/Divider";
import { Input } from "../../components/inputs/Input";
import { Alert } from "../../components/Alert";
import { UploadLogo } from "../../components/inputs/UploadLogo";
import { MultiValueInput } from "../../components/input/MultiValueInput";
import { ActiveButton } from "../../components/button/ActiveButton";
import ChevronRightTwoToneIcon from "@material-ui/icons/ChevronRightTwoTone";
import { BasicButton } from "../../components/button/BasicButton";
import CloseIcon from "@material-ui/icons/Close";
import { useRootDispatch } from "../../store";
import { createProject } from "../../store/reducers/projects/projectsSlice";
import { Project, ProjectStatus } from "../../store/reducers/projects/model";
import { BigNumber } from "ethers";

interface NewProjectModalProps {
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      width: "96%",
      maxWidth: 700,
    },
    fullHeight: {
      height: "100% !important",
      boxSizing: "border-box",
    },
  })
);

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  open,
  handleClose,
}) => {
  const classes = useStyles();
  const dispatch = useRootDispatch();

  const [projectName, setProjectName] = useState("");
  const [sourcingWallet, setSourcingWallet] = useState("");
  const [builders, setBuilders] = useState<string[]>([]);

  const handleSubmit = () => {
    const project: Project = {
      name: projectName,
      members: builders,
      threshold: BigNumber.from(1),
      sourcingWallet,
      status: ProjectStatus.PENDING,
    };
    dispatch(createProject(project));
  };

  return (
    <CustomModal className={classes.modal} open={open} onClose={handleClose}>
      <Box
        display="flex"
        flexDirection="row"
        marginTop="4px"
        alignItems="center"
      >
        <Typography variant="h2">Create a New Project</Typography>
        <Box flexGrow={1} />
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box marginTop={3} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Input required fullWidth label="Client Name" value="Badger" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            required
            fullWidth
            label="Client Email"
            value="admin@badger.io"
          />
        </Grid>
      </Grid>
      <Box marginTop={4} />
      <Typography variant="h3">Project Details</Typography>
      <Box marginTop={2} />
      <Input
        required
        fullWidth
        label="Project Name"
        value={projectName}
        onChange={(evt) => setProjectName(evt.target.value)}
      />
      <Box marginTop={1} />
      <Alert severity="success">
        <b>badger-support.dorg.tech</b> is available
      </Alert>
      <Box marginTop={2} />
      <Grid container spacing={2}>
        <Grid item xs={4} md={3}>
          <UploadLogo required label="Project Logo" />
        </Grid>
        <Grid item xs={8} md={9}>
          <Input
            multiline
            required
            label="Project Description"
            className={classes.fullHeight}
            boxStyle={{ height: "100%" }}
            InputProps={{ className: classes.fullHeight }}
            inputProps={{ className: classes.fullHeight }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Box marginTop={2} />
      <MultiValueInput
        values={["DeFi", "Bitcoin", "Collateral"]}
        label="tags"
      />
      <Box marginTop={2} />
      <Input
        fullWidth
        label="Sourcing Address: "
        description="(If more than one sourcing member, we recommend creating a multisig first)"
        value={sourcingWallet}
        onChange={(evt) => setSourcingWallet(evt.target.value)}
      />
      <Box marginTop={2} />
      <MultiValueInput
        label="Builders"
        values={builders}
        onChange={setBuilders}
      />
      <Box marginTop={2} />
      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <BasicButton size="small" onClick={handleClose}>
          Cancel
        </BasicButton>
        <Box marginLeft={2} />
        <ActiveButton
          size="small"
          endIcon={<ChevronRightTwoToneIcon />}
          onClick={handleSubmit}
        >
          Create Project
        </ActiveButton>
      </Box>
    </CustomModal>
  );
};
