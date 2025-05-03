import getProducts from "@/lib/productApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    error: ''
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const products = await getProducts();
    return products;
})


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = action.payload
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.error?.message
        })
    }
})


export default productsSlice.reducer;