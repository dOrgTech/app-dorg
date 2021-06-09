import React, { useEffect } from "react";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../../utils/colors";
import { Label } from "../inputs/Label";

const useStyles = makeStyles({
  tag: {
    display: "flex",
    alignItems: "center",
    height: 24,
    margin: 2,
    lineHeight: 22,
    backgroundColor: COLORS.green["50"],
    borderRadius: 4,
    boxSizing: "content-box",
    padding: "4px 4px 4px 10px",
    outline: "0",
    overflow: "hidden",
    "&:focus": {
      borderColor: "#40a9ff",
      backgroundColor: "#e6f7ff",
    },
    "& span": {
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.green["600"],
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    "& svg": {
      fontSize: 14,
      cursor: "pointer",
      padding: 4,
    },
  },
  inputWrapper: {
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: COLORS.blueGray["300"],
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 4,
    display: "flex",
    flexWrap: "wrap",

    "&.focused": {
      boxShadow: "0 0 0 2px rgba(24, 144, 255, 0.2)",
    },

    "& input": {
      fontSize: 14,
      height: 32,
      boxSizing: "border-box",
      padding: "4px 6px",
      width: 0,
      minWidth: 30,
      flexGrow: 1,
      border: 0,
      margin: 0,
      outline: 0,
    },
    "& input::placeholder": {
      color: COLORS.blueGray["400"],
      fontWeight: 600,
    },
  },
  listBox: {
    width: 300,
    margin: "2px 0 0",
    padding: 0,
    position: "absolute",
    listStyle: "none",
    backgroundColor: "#fff",
    overflow: "auto",
    maxHeight: 250,
    borderRadius: 4,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    zIndex: 1,

    "& li": {
      padding: "5px 12px",
      display: "flex",

      "& span": {
        flexGrow: 1,
      },

      "& svg": {
        color: "transparent",
      },
    },

    '& li[ariaSelected="true"]': {
      backgroundColor: "#fafafa",
      fontWeight: 600,

      "& svg": {
        color: "#1890ff",
      },
    },

    '& li[data-focus="true"]': {
      backgroundColor: "#e6f7ff",
      cursor: "pointer",

      "& svg": {
        color: "#000",
      },
    },
  },
});

const Tag: React.FC<{ label: string; onDelete?: () => void }> = ({
  label,
  onDelete,
  ...props
}) => {
  const classes = useStyles();
  return (
    <div {...props} className={classes.tag}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
};

interface MultiValueInputProps {
  label: string;
  options?: string[];
  values: string[];
  onChange?: (values: string[]) => void;
}

export const MultiValueInput: React.FC<MultiValueInputProps> = ({
  label,
  options = [],
  values,
  onChange,
}) => {
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    defaultValue: values,
    freeSolo: true,
    multiple: true,
    options,
  });

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);

  const classes = useStyles();

  return (
    <div>
      <Label text={`${label}:`} style={{ textTransform: "capitalize" }} />
      <div {...getRootProps()}>
        <div
          ref={setAnchorEl}
          className={
            focused ? `focused ${classes.inputWrapper}` : classes.inputWrapper
          }
        >
          {value.map((option, index: number) => (
            <Tag key={index} label={option} {...getTagProps({ index })} />
          ))}
          <input
            {...getInputProps()}
            placeholder={
              !value.length ? `Select ${label} to filter` : undefined
            }
          />
        </div>
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listBox} {...getListboxProps()}>
          {groupedOptions.map((option, index: number) => (
            <li key={index} {...getOptionProps({ option, index })}>
              <span>{option}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
