import React from "react";
import { compose, withProps, withState } from "recompose";
import { all as starwarsNames } from "starwars-names";
import Select from "./Select";

function App({ value, options, setValue }) {
  return (
    <Select
      label="Star Wars Character"
      placeholder="Choose wisely"
      value={value}
      options={options}
      onChange={setValue}
    />
  );
}

const enhance = compose(
  withState("value", "setValue", 5),
  withProps(() => ({
    options: starwarsNames.map((text, value) => ({ text, value }))
  }))
);

export default enhance(App);
