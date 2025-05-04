import { createSelector } from '@reduxjs/toolkit';

export const selectFilteredProducts = createSelector(
  // Inputs: products and searchTerm from state
  [(state) => state.products.products, (state) => state.products.searchTerm],
  (products, searchTerm) => {
    // Return products as is when searchTerm is empty
    if (!searchTerm) return products;

    // Early exit if searchTerm is unchanged or no products match
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const filtered = products.filter((product) =>
      product.type.toLowerCase().includes(normalizedSearchTerm)
    );

    // Return filtered products or the original list if no matches
    return filtered.length ? filtered : products;
  }
);
