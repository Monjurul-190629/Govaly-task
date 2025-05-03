"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/productsSlice";

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, isLoading, isError, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error}</p>;

    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
