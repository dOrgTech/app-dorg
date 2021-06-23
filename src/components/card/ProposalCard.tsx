import React from "react";
import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DorgIcon from "../../assets/images/dorg-icon.svg";
import { TimeText } from "../text/TimeText";
import { AvatarGroup } from "../avatar/AvatarGroup";
import { COLORS } from "../../utils/colors";
import { ActiveButton } from "../button/ActiveButton";
import { VotingProcess } from "../voting/VotingProcess";
import { Proposal } from "../../store/reducers/proposals/model";
import { generateFromString } from "generate-avatar";
import { createDeflate } from "zlib";

interface ProposalCardProps {
  proposal: Proposal;
}

const useStyles = makeStyles({
  root: {
    borderRadius: 16,
    boxShadow: "0px 0px 2px 0px #94A3B840, 0px 16px 32px -4px #94A3B840",
    cursor: "pointer",
    maxWidth: 400,
    minHeight: 300,
    transform: "translateY(0)",
    transition: "transform 0.25s ease-in-out",
    width: "100%",
    "&:hover": {
      transform: `translateY(-4px)`,
      "& .MuiButton-outlinedPrimary": {
        backgroundColor: COLORS.green["50"],
        border: `1px solid ${COLORS.green["600"]}`,
      },
    },
  },
  content: {
    padding: 24,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
    marginLeft: 12,
  },
  pos: {
    marginBottom: 12,
  },
  splitContainer: {
    marginTop: 16,
  },
  splitItem: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  greyContainer: {
    borderRadius: 8,
    backgroundColor: COLORS.blueGray["50"],
  },
  projectButton: {
    color: COLORS.green["600"],
    marginTop: 16,
    width: "100%",
  },
});

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  const classes = useStyles();

  const { id, againstVotes, forVotes, totalVotes, title, voters, createdAt } =
    proposal;

  const timeString: string = createdAt!.toString();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Grid container direction="row" alignContent="center">
          <Grid item xs={1}>
            <img src={DorgIcon} alt="Dorg Icon" />
          </Grid>
          <Grid item xs={11}>
            <Typography
              variant="h4"
              className={classes.title}
              color="textSecondary"
            >
              {title}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          className={classes.splitContainer}
          alignContent="center"
        >
          <Grid
            item
            xs={6}
            className={[classes.splitItem, classes.greyContainer].join(" ")}
          >
            <Typography variant="subtitle2">Expires in:</Typography>
            {createdAt ? (
              <TimeText time={new Date(createdAt).toString()} />
            ) : null}
          </Grid>
          <Grid item xs={6} className={classes.splitItem}>
            <Typography variant="subtitle2">Votes:</Typography>
            <AvatarGroup>
              {voters ? (
                voters.map((voter, index) => (
                  <Avatar
                    src={`data:image/svg+xml;utf8,${generateFromString(voter)}`}
                    key={index}
                    alt="avatar"
                  />
                ))
              ) : (
                <div />
              )}
            </AvatarGroup>
          </Grid>
        </Grid>
        {forVotes != undefined && againstVotes != undefined ? (
          <VotingProcess
            totalVotes={forVotes + againstVotes}
            againstVotes={againstVotes}
            forVotes={forVotes}
            proposalID={id}
          />
        ) : null}
        <ActiveButton className={classes.projectButton} variant="outlined">
          View Project
        </ActiveButton>
      </CardContent>
    </Card>
  );
};
