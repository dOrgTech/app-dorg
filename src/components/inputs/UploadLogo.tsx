import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Label } from "./Label";
import { Box, Typography } from "@material-ui/core";
import AddAPhotoTwoToneIcon from "@material-ui/icons/AddAPhotoTwoTone";
import { COLORS } from "../../utils/colors";

interface UploadLogoProps {
  label: string;
  required?: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    solidBorder: {
      padding: 2,
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: COLORS.blueGray["300"],
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: COLORS.blueGray["300"],
    },
    icon: {
      color: COLORS.blueGray["500"],
      fontSize: 32,
      marginBottom: 4,
    },
    title: {
      color: COLORS.gray["800"],
    },
    subtitle: {
      textAlign: "center",
      fontSize: 10,
      fontWeight: 400,
      color: COLORS.blueGray["400"],
    },
  })
);

export const UploadLogo: React.FC<UploadLogoProps> = ({ label, required }) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" flex="1">
      <Label text={label} required={required} />
      <div className={classes.solidBorder}>
        <div className={classes.container}>
          <AddAPhotoTwoToneIcon className={classes.icon} />
          <Typography variant="body1" align="center" className={classes.title}>
            Upload Logo
          </Typography>
          <Typography className={classes.subtitle}>Max size of 1 MB</Typography>
          <Typography className={classes.subtitle}>
            Allowed *.jpeg, *.jpg, *png
          </Typography>
        </div>
      </div>
    </Box>
  );
};
