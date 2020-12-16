import R from "ramda";
import React from "react";
import TextField from "material-ui/TextField";
import ArrowDropDown from "material-ui-icons/ArrowDropDown";
import ArrowDropUp from "material-ui-icons/ArrowDropUp";
import Cancel from "material-ui-icons/Cancel";
import IconButton from "material-ui/IconButton";
import { LinearProgress } from "material-ui/Progress";

// View ----------------------------------------------------------
function Input({ rootRef, textFieldProps, actionButtonProps, loading }) {
  return (
    <div ref={rootRef} style={{ width: "100%", position: "relative" }}>
      <TextField {...textFieldProps} style={{ width: "100%" }} />
      <ActionButton {...actionButtonProps} />
      {loading &&
        <LinearProgress
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px"
          }}
        />}
    </div>
  );
}

function ActionButton({ reset, onCancelClick, open, onToggleClick }) {
  return reset
    ? <CancelButton onClick={onCancelClick} />
    : <ToggleButton open={open} onClick={onToggleClick} />;
}

function CancelButton(props) {
  return (
    <IconButton
      style={{
        position: "absolute",
        right: "0px"
      }}
      {...props}
    >
      <Cancel />
    </IconButton>
  );
}

function ToggleButton({ open, ...props }) {
  return (
    <IconButton
      style={{
        position: "absolute",
        right: "0px"
      }}
      {...props}
    >
      {open ? <ArrowDropUp /> : <ArrowDropDown />}
    </IconButton>
  );
}

export default Input;
