const sortItems = (items) => {
  const purchasedItems = items.filter((item) => item.isPurchased);
  const unpurchasedItems = items.filter((item) => !item.isPurchased);
  const sortedItems = [...unpurchasedItems, ...purchasedItems];
  return sortedItems;
};

export { sortItems };
