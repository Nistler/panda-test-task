const sortByField = (field, data, sortingKey) => {
  const sortingDirection = sortingKey === "ascending" ? 1 : -1;
  return [...data].sort((a, b) => {
    if (a[field] > b[field]) {
      return sortingDirection;
    }
    if (a[field] < b[field]) {
      return -sortingDirection;
    }
    return 0;
  });
};

export const tableSort = (field, data, sortingState) => {
  let sortKey;
  switch (field) {
    case "sort-by-last-name":
      sortKey = "lastName";
      break;
    case "sort-by-phone":
      sortKey = "phone";
      break;
    default:
      sortKey = "firstName";
      break;
  }
  const sortingKey =
    sortingState[sortKey] === "ascending" ? "descending" : "ascending";
  const newSortingState = {
    firstName: "unsorted",
    lastName: "unsorted",
    phone: "unsorted",
    [sortKey]: sortingKey,
  };

  return {
    sortedList: sortByField(sortKey, data, sortingKey),
    newSortingState,
  };
};
