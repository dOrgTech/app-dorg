import React from "react";
import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DorgIcon from "../../assets/images/dorg-icon.svg";
import { TimeText } from "../text/TimeText";
import AvatarImg from "../../assets/images/avatar.png";
import { AvatarGroup } from "../avatar/AvatarGroup";

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
});

export const ProposalCard: React.FC = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Grid container direction="row" alignContent="center">
          <Grid item xs={1} alignContent="center">
            <img src={DorgIcon} alt="Dorg Icon" />
          </Grid>
          <Grid item xs={10}>
            <Typography
              variant="h4"
              className={classes.title}
              color="textSecondary"
            >
              Quality Engagement
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" className={classes.splitContainer}>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Expires in:</Typography>
            <TimeText time="02:11:03:05" />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Votes:</Typography>
            <AvatarGroup>
              <Avatar src={AvatarImg} alt="avatar" />
              <Avatar src={AvatarImg} alt="avatar" />
              <Avatar src={AvatarImg} alt="avatar" />
              <Avatar src={AvatarImg} alt="avatar" />
              <Avatar src={AvatarImg} alt="avatar" />
              <Avatar src={AvatarImg} alt="avatar" />
            </AvatarGroup>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
