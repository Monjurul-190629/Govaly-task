import { createSelector } from '@reduxjs/toolkit';

export const selectFilteredProducts = createSelector(
  [(state) => state.products.products, (state) => state.products.searchTerm],
  (products, searchTerm) => {
    if (!searchTerm) return products;

    const filtered = products.filter((product) =>
      product.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.length > 0 ? filtered : products;
  }
);
