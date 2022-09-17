const checkItem = (item, searchParams) => {
  for (const param of Object.keys(searchParams)) {
    if (searchParams[param] === "") continue;
    if (
      !item
        .get(param)
        .trim()
        .toLowerCase()
        .includes(searchParams[param].trim().toLowerCase())
    )
      return false;
  }
  return true;
};

const filterItems = (items, searchParams) => {
  const newItems = items.filter((item) => checkItem(item, searchParams));
  return newItems;
};

export default {
  filterItems,
};
