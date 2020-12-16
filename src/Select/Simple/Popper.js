import R from "ramda";
import React from "react";
import { findDOMNode } from "react-dom";
import { Manager, Target, Popper } from "react-popper";
import { compose, withHandlers, mapProps } from "recompose";
import Input from "./Input";
import Menu, { Item } from "./Menu";
import { filterItems } from "./utils";

function View({ isOpen, inputProps, menuProps, ...props }) {
  return (
    <Manager {...props}>
      <Target>
        {targetProps => <PopperInput {...{ inputProps, targetProps }} />}
      </Target>
      {isOpen &&
        <Popper>
          {popperProps => <PopperMenu {...{ menuProps, popperProps }} />}
        </Popper>}
    </Manager>
  );
}

var PopperInput = mapProps(({ targetProps, inputProps }) => ({
  ...inputProps,
  rootRef: targetProps.targetProps.ref
}))(Input);

var PopperMenu = mapProps(({ popperProps, menuProps }) => ({
  ...menuProps,
  rootRef: R.pipe(findDOMNode, popperProps.popperProps.ref),
  style: R.merge(menuProps.style, popperProps.popperProps.style)
}))(Menu);

const enhance = compose(
  withHandlers(() => {
    let inputRef = null;
    return {
      registerInputRef: props => ref => {
        inputRef = ref;
      },
      getWidth: props => () => {
        return inputRef ? inputRef.getBoundingClientRect().width : undefined;
      },
      focusInput: props => () => {
        inputRef.focus();
      }
    };
  }),
  mapProps(
    ({
      selectProps,
      autocompleteProps,
      registerInputRef,
      inputRef,
      getWidth,
      focusInput
    }) => {
      const filteredItems = filterItems(
        autocompleteProps.inputValue,
        selectProps.options
      );

      return {
        isOpen: autocompleteProps.isOpen,
        tag: false,
        inputProps: {
          loading: selectProps.loading,
          textFieldProps: autocompleteProps.getInputProps({
            label: selectProps.label,
            placeholder: selectProps.placeholder,
            inputRef: registerInputRef,
            onChange: e => {
              e.target.value && selectProps.onInputChange(e.target.value);
            },
            onFocus: () => {
              autocompleteProps.openMenu();
            },
            onBlur: () => {
              autocompleteProps.closeMenu();
            }
          }),
          actionButtonProps: {
            open: autocompleteProps.isOpen,
            reset: !!autocompleteProps.selectedItem,
            onToggleClick: () => {
              autocompleteProps.toggleMenu();
              focusInput();
            },
            onCancelClick: () => {
              autocompleteProps.clearSelection();
            }
          }
        },
        menuProps: {
          style: { width: getWidth(), zIndex: 10 },
          // enable scroll with mouse hold + sane behaviour on item click
          onMouseDown: e => {
            e.preventDefault();
          },
          notFoundProps: {
            text: autocompleteProps.inputValue
          },
          virtualListProps: {
            width: getWidth(),
            scrollToIndex: autocompleteProps.highlightedIndex || 0,
            height:
              filteredItems.length < 5 ? 48 * filteredItems.length : 48 * 5,
            rowCount: filteredItems.length,
            rowHeight: 48,
            rowRenderer: ({ index, style, key }) => {
              const item = filteredItems[index];
              const props = autocompleteProps.getItemProps({
                index,
                item,
                text: {
                  searchWords: [autocompleteProps.inputValue],
                  textToHighlight: item.text
                },
                selected: autocompleteProps.highlightedIndex === index,
                style: R.equals(autocompleteProps.selectedItem, item)
                  ? { fontWeight: "bold", ...style }
                  : style
              });
              return <Item key={key} {...props} />;
            }
          }
        }
      };
    }
  )
);

export default enhance(View);
