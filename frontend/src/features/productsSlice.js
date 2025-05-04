import getProducts from "@/lib/productApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    searchTerm: '',
    isLoading: false,
    isError: false,
    error: ''
};

// In-memory cache for products
let cachedProducts = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const now = Date.now();

    // If we have cached data and it's within the cache duration, use it
    if (cachedProducts && now - lastFetchTime < CACHE_DURATION) {
        return cachedProducts;
    }

    try {
        const products = await getProducts();
        cachedProducts = products; // Cache the fetched data
        lastFetchTime = now; // Update the last fetch time
        return products;
    } catch (err) {
        throw new Error(err.message || "Failed to fetch products");
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            if (!state.isLoading) {  // Prevent unnecessary state updates
                state.isLoading = true;
                state.isError = false;
            }
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            // Only update products if the data has changed
            if (JSON.stringify(state.products) !== JSON.stringify(action.payload)) {
                state.products = action.payload;
            }
            state.isLoading = false;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message || "An error occurred";
        });
    }
});

export const { setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;
