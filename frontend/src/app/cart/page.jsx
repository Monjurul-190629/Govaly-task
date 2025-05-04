'use client';

import { useCallback, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CartPage = () => {
    const [bookedProducts, setBookedProducts] = useState([]);

    // Fetch the booked products on mount
    useEffect(() => {
        const fetchBookedProducts = async () => {
            try {
                const res = await axios.get('https://govaly-task-production.up.railway.app/api/book-product');
                setBookedProducts(res.data);
            } catch (error) {
                console.error('Error fetching booked products:', error);
            }
        };
        fetchBookedProducts();
    }, []); // Dependency array empty: fetch only once when the component mounts.

    // Handle product removal
    const handleRemove = useCallback(async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`https://govaly-task-production.up.railway.app/api/book-product/${id}`);
                setBookedProducts((prev) => prev.filter((product) => product._id !== id));
                Swal.fire({
                    title: "Removed!",
                    text: "Your product has been removed.",
                    icon: "success"
                });
            } catch (error) {
                console.error('Error removing product:', error);
                Swal.fire({
                    title: "Error!",
                    text: "There was an error removing the product.",
                    icon: "error"
                });
            }
        }
    }, []); // No dependency array here; `handleRemove` doesn't depend on any state

    // Memoize rendered rows for better performance
    const renderedRows = useMemo(() => {
        if (bookedProducts.length === 0) {
            return (
                <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                        No products booked yet.
                    </td>
                </tr>
            );
        }

        return bookedProducts.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{product.name}</td>
                <td className="p-3 border-b">{product.type}</td>
                <td className="p-3 border-b">{product.price} tk</td>
                <td className="p-3 border-b">{product.description}</td>
                <td className="p-3 border-b">
                    <button
                        onClick={() => handleRemove(product._id)}
                        className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition duration-200"
                    >
                        Remove
                    </button>
                </td>
            </tr>
        ));
    }, [bookedProducts, handleRemove]); // Optimized dependency for `renderedRows`

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Bookmarked Products</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-300 rounded-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border-b">Name</th>
                            <th className="p-3 border-b">Type</th>
                            <th className="p-3 border-b">Price</th>
                            <th className="p-3 border-b">Description</th>
                            <th className="p-3 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedRows}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CartPage;
