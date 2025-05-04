'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearchTerm } from '@/features/productsSlice';
import { selectFilteredProducts } from '@/features/searchTerm';
import ProductCard from './ProductCard';
import { MdSearch } from 'react-icons/md';
import { debounce } from 'lodash';
import Loading from '../Loading/Loading';
import ErrorPage from '@/Error/Error';

const ProductList = () => {
    const dispatch = useDispatch();
    const { isLoading, isError, error, searchTerm, products } = useSelector((state) => state.products);
    const filteredProducts = useSelector(selectFilteredProducts);

    // State to store the search term and to trigger the debounced action
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    // Debounced search change handler
    const handleSearchChange = debounce((e) => {
        const newSearchTerm = e.target.value;
        setDebouncedSearchTerm(newSearchTerm);
        dispatch(setSearchTerm(newSearchTerm));
    }, 500); // Adjust the delay as per requirement (500ms in this case)

    // Fetch products on initial render
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Memoize filtered products to avoid unnecessary recalculations
    const memoizedFilteredProducts = useMemo(() => filteredProducts, [filteredProducts]);

    if (isLoading) return <Loading/>;
    if (isError) return <ErrorPage error = {error}/>;
    if (memoizedFilteredProducts.length === 0) return <p>No products found.</p>;

    return (
        <div className="my-12 px-4">
            <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        value={debouncedSearchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by type..."
                        className="w-full pl-10 pr-4 py-2 border border-pink-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-900"
                    />
                    <MdSearch className="absolute left-3 top-2.5 h-5 w-5 text-pink-700 text-3xl" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10">
                {memoizedFilteredProducts.map((product) => (
                    <div key={product._id} className="flex justify-center">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
