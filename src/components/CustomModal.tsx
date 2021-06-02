import React from "react";
import { Modal, ModalProps } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    modalContainer: {
      position: "fixed",
      top: "50%",
      left: "50%",
      maxHeight: "90%",
      backgroundColor: "#FFFFFF",
      transform: `translate(-50%, -50%)`,
      padding: 24,
      paddingTop: 0,
      borderRadius: 8,
    },
  })
);

type CustomModalProps = Omit<ModalProps, "children">;

export const CustomModal: React.FC<CustomModalProps> = ({
  children,
  className,
  ...props
}) => {
  const classes = useStyles();
  console.log("classes", [classes.modalContainer, className].join(" "));
  return (
    <Modal {...props}>
      <div className={[className, classes.modalContainer].join(" ")}>
        {children}
      </div>
    </Modal>
  );
};
