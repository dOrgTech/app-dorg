import React from "react";
import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DorgIcon from "../../assets/images/dorg-icon.svg";
import { TimeText } from "../text/TimeText";
import { AvatarGroup } from "../avatar/AvatarGroup";
import { COLORS } from "../../utils/colors";
import { VotingProcess } from "../voting/VotingProcess";
import { Proposal } from "../../store/reducers/proposals/model";

interface ProposalCardProps {
  proposal: Proposal;
}

const useStyles = makeStyles({
  root: {
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
    minHeight: 300,
    boxShadow: "0px 0px 2px 0px #94A3B840, 0px 16px 32px -4px #94A3B840",
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
});

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  const classes = useStyles();

  const { againstVotes, forVotes, totalVotes, title, voters } = proposal;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Grid container direction="row" alignContent="center">
          <Grid item xs={1} alignContent="center">
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

        <Grid container direction="row" className={classes.splitContainer}>
          <Grid
            item
            xs={6}
            alignContent="center"
            className={[classes.splitItem, classes.greyContainer].join(" ")}
          >
            <Typography variant="subtitle2">Expires in:</Typography>
            {/* TODO: calculate and format time left for expire */}
            <TimeText time="00:00:00:00" />
          </Grid>
          <Grid item xs={6} className={classes.splitItem}>
            <Typography variant="subtitle2">Votes:</Typography>
            <AvatarGroup>
              {voters.map((voter, index) => (
                <Avatar src={voter} key={index} alt="avatar" />
              ))}
            </AvatarGroup>
          </Grid>
        </Grid>

        <VotingProcess
          totalVotes={totalVotes}
          againstVotes={againstVotes}
          forVotes={forVotes}
        />
      </CardContent>
    </Card>
  );
};
