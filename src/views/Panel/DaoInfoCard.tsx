import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import DorgLogo from "../../assets/images/dorg-icon.svg";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../../utils/colors";
import { AvatarCard } from "../../components/avatar/AvatarCard";
import { useWallet } from "../../hooks/useWallet";

const TREASURY = process.env.REACT_APP_RINKEBY_DORG_TREASURY as string;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: 8,
      marginBottom: 16,
      padding: 16,
      borderRadius: 8,
      backgroundColor: COLORS.blueGray["50"],
    },
    divider: {
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderTopColor: COLORS.blueGray["200"],
      marginTop: 8,
      marginBottom: 8,
    },
    amount: {
      color: COLORS.blueGray["700"],
      fontWeight: 700,
      fontSize: 16,
    },
    netHoldingAmount: {
      color: theme.palette.text.primary,
      fontWeight: 700,
      fontSize: 20,
    },
    repAmount: {
      fontWeight: 700,
      fontSize: 20,
    },
  })
);

export const DaoInfoCard: React.FC = () => {
  const classes = useStyles();
  const { balance } = useWallet(TREASURY);
  return (
    <Box className={classes.root}>
      <AvatarCard name="dOrg" address="0x7301cf-0eb0aa6" image={DorgLogo} />

      <Box className={classes.divider} />

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2">Cash</Typography>
          <Typography variant="h4">{balance} ETH</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2">Debt</Typography>
          <Typography variant="h4">$29,122</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Net Holdings</Typography>
          <Typography variant="h2" className={classes.netHoldingAmount}>
            $34,671
          </Typography>
        </Grid>
      </Grid>

      <Box className={classes.divider} />

      <Typography variant="subtitle2">Rep</Typography>
      <Typography variant="h2" className={classes.repAmount}>
        1.65M
      </Typography>
    </Box>
  );
};
