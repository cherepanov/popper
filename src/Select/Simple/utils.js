import R from "ramda";

export const filterItems = R.memoize((inputValue, items) => {
  return R.filter(
    i => !inputValue || i.text.toLowerCase().includes(inputValue.toLowerCase()),
    items
  );
});
