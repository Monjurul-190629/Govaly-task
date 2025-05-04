'use client';

import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearchTerm } from '@/features/productsSlice';
import { selectFilteredProducts } from '@/features/searchTerm';
import ProductCard from './ProductCard';
import { MdSearch } from 'react-icons/md';
import Loading from '../Loading/Loading';
import ErrorPage from '@/Error/Error';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 80 },
    },
};

const ProductList = () => {
    const dispatch = useDispatch();
    const { isLoading, isError, error, searchTerm, products } = useSelector((state) => state.products);

    const filteredProducts = useSelector(selectFilteredProducts);

    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const memoizedFilteredProducts = useMemo(() => {
        return filteredProducts;
    }, [filteredProducts]);

    if (isLoading) return <Loading />;
    if (isError) return <ErrorPage error={error} />;
    if (memoizedFilteredProducts.length === 0) return <p className="text-center text-gray-500">No products found.</p>;

    return (
        <motion.div
            className="my-12 px-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Search Bar */}
            <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
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
            </motion.div>

            {/* Product Cards */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {memoizedFilteredProducts.map((product) => (
                    <motion.div
                        key={product._id}
                        className="flex justify-center"
                        variants={itemVariants}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default ProductList;
