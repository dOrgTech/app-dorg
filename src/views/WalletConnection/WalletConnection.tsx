import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DorgLogoIcon from "../../assets/images/dorg-logo.svg";
import { blueGrey } from "@material-ui/core/colors";
import { requestAccounts } from "../../services/ethereum";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 128,
  },
  divider: {
    width: 100,
    margin: theme.spacing(2),
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.divider,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: blueGrey["700"],
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    color: theme.palette.common.white,
  },
}));

export const WalletConnection = ({ loading }: { loading: boolean }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <>
          <img src={DorgLogoIcon} alt="Project Icon" className={classes.logo} />
          <Box className={classes.divider} />
          <Typography variant="h5" className={classes.title}>
            Connect wallet to sign in:
          </Typography>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={requestAccounts}
          >
            Connect Wallet
          </Button>
        </>
      )}
    </Box>
  );
};
