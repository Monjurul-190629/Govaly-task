'use client';

import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearchTerm } from '@/features/productsSlice';
import { selectFilteredProducts } from '@/features/searchTerm';
import ProductCard from './ProductCard';
import { MdSearch } from 'react-icons/md';
import Loading from '../Loading/Loading';
import ErrorPage from '@/Error/Error';

const ProductList = () => {
    const dispatch = useDispatch();
    const { isLoading, isError, error, searchTerm, products } = useSelector((state) => state.products);

    // Memoize filtered products to avoid recalculating on every render
    const filteredProducts = useSelector(selectFilteredProducts);

    // Fetch products on initial render
    useEffect(() => {
        if (!products.length) {  // Fetch products only if they are not already fetched
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    // Handle search input change and update Redux state directly
    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    // Memoize filtered products to avoid unnecessary recalculations
    const memoizedFilteredProducts = useMemo(() => {
        return filteredProducts;
    }, [filteredProducts]);

    if (isLoading) return <Loading />;
    if (isError) return <ErrorPage error={error} />;
    if (memoizedFilteredProducts.length === 0) return <p>No products found.</p>;

    return (
        <div className="my-12 px-4">
            <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        value={searchTerm}
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
