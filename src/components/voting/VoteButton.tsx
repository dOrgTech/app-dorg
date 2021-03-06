import React from "react";
import { Button, ButtonProps } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { COLORS } from "../../utils/colors";
import { ReactComponent as ThumbUpIcon } from "../../assets/icons/thumb-up.svg";
import { ReactComponent as ThumbDownIcon } from "../../assets/icons/thumb-down.svg";

interface VoteButtonProps extends ButtonProps {
  down?: boolean;
}

const useStyles = makeStyles<Theme, { down: boolean }>({
  button: (props) => ({
    backgroundColor: props.down ? COLORS.rose["50"] : COLORS.green["50"],
    color: props.down ? COLORS.rose["600"] : COLORS.green["600"],
    maxWidth: "none",
    minWidth: "auto",
    width: 48,
    height: 48,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: props.down ? COLORS.rose["500"] : COLORS.green["500"],
    borderRadius: 8,
    "&:hover": {
      backgroundColor: props.down ? COLORS.rose["500"] : COLORS.green["500"],
    },
  }),
  icon: (props) => ({
    width: 24,
    height: 24,
    marginTop: props.down ? 4 : undefined,
  }),
});

export const VoteButton: React.FC<VoteButtonProps> = ({
  down = false,
  ...buttonProps
}) => {
  const classes = useStyles({ down });
  const Icon = down ? ThumbDownIcon : ThumbUpIcon;
  return (
    <Button className={classes.button} {...buttonProps}>
      <Icon className={classes.icon} />
    </Button>
  );
};
