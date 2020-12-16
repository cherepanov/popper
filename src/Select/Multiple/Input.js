import R from "ramda";
import React from "react";
import { compose, withHandlers, mapProps } from "recompose";
import MuiInput from "material-ui/Input";
import ArrowDropDown from "material-ui-icons/ArrowDropDown";
import ArrowDropUp from "material-ui-icons/ArrowDropUp";
import Cancel from "material-ui-icons/Cancel";
import IconButton from "material-ui/IconButton";
/*import styled from "styled-components";

const View = styled.div`
 	width: 100%;
	position: relative;

	&::before {
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      content: "";
      position: absolute;
      transition: backgroundColor 200ms cubic-bezier(0.4, 0.0, 0.2, 1) 0ms;
      background-color: rgba(0, 0, 0, 0.42);
	}



	&:hover::after {
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      content: "";
      position: absolute;
      transform: scaleX(0);
      transition: transform 200ms cubic-bezier(0.0, 0.0, 0.2, 1) 0ms;
      background-color: #2962ff;
	}
`;*/

function Input({ rootRef, textFieldProps, actionButtonProps }) {
  return (
    <View ref={rootRef} style={{}}>
      <MuiInput disableUnderline={true} value={"test"} />
      {/*<ActionButton {...actionButtonProps} />*/}
    </View>
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
