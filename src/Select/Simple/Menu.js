import React from "react";
import { findDOMNode } from "react-dom";
import Paper from "material-ui/Paper";
import { MenuItem } from "material-ui/Menu";
import { withTheme } from "material-ui/styles";
import Highlighter from "react-highlight-words";
import { List as VirtualList } from "react-virtualized";

// View ----------------------------------------------------------
export function Menu({
  rootRef,
  itemCount,
  virtualListProps,
  notFoundProps,
  ...props
}) {
  return (
    <Paper
      square
      ref={ref => {
        rootRef(findDOMNode(ref));
      }}
      {...props}
    >
      {virtualListProps.rowCount > 0 ? (
        <VirtualList {...virtualListProps} />
      ) : (
        <NotFoundItem {...notFoundProps} />
      )}
    </Paper>
  );
}

export var Item = withTheme(({ theme, text, ...props }) => {
  return (
    <MenuItem {...props}>
      <Highlighter
        highlightStyle={{
          background: "none",
          textDecoration: "underline"
        }}
        {...text}
      />
    </MenuItem>
  );
});

function NotFoundItem({ text, ...props }) {
  return (
    <MenuItem {...props}>
      No result for <b style={{ marginLeft: "0.5ch" }}>{text}</b>
    </MenuItem>
  );
}

export default Menu;
