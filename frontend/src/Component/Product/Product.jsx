"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/productsSlice";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, isLoading, isError, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error}</p>;
    if (!products || products.length === 0) return <p>No products found.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10">
            {products.map((product) => (
                <div key={product._id} className="flex justify-center">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>

    );
};

export default ProductList;
