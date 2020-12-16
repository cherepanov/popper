import R from "ramda";
import React from "react";
import { compose, defaultProps, withState, mapProps } from "recompose";
import Downshift from "downshift";
import { filterItems } from "./utils";
import Popper from "./Popper";

// View ----------------------------------------------------------
function Simple({ selectProps, ...props }) {
  return (
    <Downshift {...props}>
      {autocompleteProps =>
        <div>
          <Popper
            selectProps={selectProps}
            autocompleteProps={autocompleteProps}
          />
        </div>}
    </Downshift>
  );
}

// State ---------------------------------------------------------
const findSelectedItem = ({ value, options }) =>
  R.pipe(R.find(R.propEq("value", value)), R.defaultTo(null))(options);

const itemToString = R.pipe(R.path(["text"]), R.defaultTo(""));

const enhance = compose(
  defaultProps({
    onInputChange: () => {}
  }),
  withState(
    "inputValue",
    "setInputValue",
    R.pipe(findSelectedItem, itemToString)
  ),
  mapProps(({ inputValue, setInputValue, ...selectProps }) => ({
    itemToString,
    inputValue,
    selectedItem: findSelectedItem(selectProps),
    defaultHighlightedIndex: 0,
    itemCount: filterItems(inputValue, selectProps.options).length,
    onStateChange: ({ inputValue, isOpen }) => {
      if (isOpen === false) {
        // reset
        setInputValue(R.pipe(findSelectedItem, itemToString)(selectProps));
        return;
      }
      if (R.isNil(inputValue)) {
        return;
      }
      setInputValue(inputValue);
    },
    onChange: R.pipe(
      R.path(["value"]),
      R.defaultTo(null),
      selectProps.onChange
    ),
    selectProps
  }))
);

export default enhance(Simple);
