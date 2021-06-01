import React from "react";
import { VoteButton } from "./VoteButton";
import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../../utils/colors";
import { Progress } from "../Progress";

interface VotingProcessProps {
  againstVotes: number;
  forVotes: number;
  totalVotes: number;
}

function getPercentage(number: number, total: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.floor((factor * number) / total) / factor;
}

const useStyles = makeStyles({
  title: {
    fontSize: 10,
    color: COLORS.blueGray["700"],
  },
  progressContainer: {
    position: "relative",
    height: 24,
    width: "100%",
  },
  progress: {
    position: "absolute",
    left: 0,
    width: "60%",
  },
  divider: {
    borderRightStyle: "solid",
    borderRightWidth: 2,
    borderRightColor: COLORS.blueGray["200"],
  },
  resultContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    borderRadius: 4,
    padding: 8,
    fontWeight: 700,
    fontSize: 12,
  },
  passingBox: {
    color: COLORS.green["600"],
    backgroundColor: COLORS.green["50"],
  },
  failingBox: {
    color: COLORS.rose["600"],
    backgroundColor: COLORS.rose["50"],
  },
  drawBox: {
    color: COLORS.blueGray["500"],
    backgroundColor: COLORS.blueGray["30"],
  },
  mt4: {
    marginTop: 4,
  },
});

export const VotingProcess: React.FC<VotingProcessProps> = ({
  againstVotes,
  forVotes,
  totalVotes,
}) => {
  const classes = useStyles();

  const upPercentage = getPercentage(forVotes, totalVotes);
  const downPercentage = getPercentage(againstVotes, totalVotes);

  const getBoxClass = () => {
    if (againstVotes > forVotes)
      return { boxClass: classes.failingBox, result: "Failing" };
    if (againstVotes < forVotes)
      return { boxClass: classes.passingBox, result: "Passing" };
    return { boxClass: classes.drawBox, result: "Draw" };
  };

  const { boxClass, result } = getBoxClass();

  return (
    <div>
      <Box display="grid" gridTemplateColumns="48px auto 48px" marginTop="16px">
        <VoteButton down />
        <Box
          display="grid"
          gridTemplateColumns="calc(50% - 1px) 2px calc(50% - 1px)"
          paddingLeft="8px"
          paddingRight="8px"
        >
          <Grid container direction="column">
            <Grid item>
              <Typography className={classes.title} variant="subtitle1">
                {downPercentage * 100}%
              </Typography>
            </Grid>
            <Grid item>
              <Progress
                active={downPercentage > upPercentage}
                color="red"
                progress={downPercentage}
                direction="right"
              />
            </Grid>
            <Grid item>
              <Typography
                className={[classes.title, classes.mt4].join(" ")}
                variant="subtitle2"
              >
                Against
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.divider} />
          <Grid container direction="column">
            <Grid item>
              <Typography
                className={classes.title}
                align="right"
                variant="subtitle1"
              >
                {upPercentage * 100}%
              </Typography>
            </Grid>
            <Grid item>
              <Progress
                active={upPercentage > downPercentage}
                color="green"
                progress={upPercentage}
                direction="left"
              />
            </Grid>
            <Grid item>
              <Typography
                align="right"
                className={[classes.title, classes.mt4].join(" ")}
                variant="subtitle2"
              >
                For
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <VoteButton />
      </Box>

      <Box className={[classes.resultContainer, boxClass].join(" ")}>
        {result}
      </Box>
    </div>
  );
};
