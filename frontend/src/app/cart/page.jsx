'use client';

import { useCallback, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
            when: 'beforeChildren',
            staggerChildren: 0.1
        }
    }
};

const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100
        }
    }
};

const CartPage = () => {
    const [bookedProducts, setBookedProducts] = useState([]);

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
    }, []);

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
                Swal.fire("Removed!", "Your product has been removed.", "success");
            } catch (error) {
                console.error('Error removing product:', error);
                Swal.fire("Error!", "There was an error removing the product.", "error");
            }
        }
    }, []);

    const renderedRows = useMemo(() => {
        if (bookedProducts.length === 0) {
            return (
                <motion.tr variants={rowVariants}>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                        No products booked yet.
                    </td>
                </motion.tr>
            );
        }

        return bookedProducts.map((product) => (
            <motion.tr
                key={product._id}
                variants={rowVariants}
                className="hover:bg-gray-100 transition-colors duration-200"
            >
                <td className="p-3 border-b">{product.name}</td>
                <td className="p-3 border-b">{product.type}</td>
                <td className="p-3 border-b">{product.price} tk</td>
                <td className="p-3 border-b">{product.description}</td>
                <td className="p-3 border-b">
                    <button
                        onClick={() => handleRemove(product._id)}
                        className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition-transform duration-200 hover:scale-105"
                    >
                        Remove
                    </button>
                </td>
            </motion.tr>
        ));
    }, [bookedProducts, handleRemove]);

    return (
        <motion.div
            className="max-w-6xl mx-auto p-4 py-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h2
                className="text-3xl font-bold mb-6 text-center text-gray-700"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Bookmarked Products
            </motion.h2>

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <motion.table className="w-full text-left" variants={containerVariants}>
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border-b">Name</th>
                            <th className="p-3 border-b">Type</th>
                            <th className="p-3 border-b">Price</th>
                            <th className="p-3 border-b">Description</th>
                            <th className="p-3 border-b">Action</th>
                        </tr>
                    </thead>
                    <motion.tbody variants={containerVariants}>
                        {renderedRows}
                    </motion.tbody>
                </motion.table>
            </div>
        </motion.div>
    );
};

export default CartPage;
