'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CartPage = () => {
    const [bookedProducts, setBookedProducts] = useState([]);

    useEffect(() => {
        const fetchBookedProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/book-product');
                setBookedProducts(res.data);
            } catch (error) {
                console.error('Error fetching booked products:', error);
            }
        };

        fetchBookedProducts();
    }, []);

    const handleRemove = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // First, show success message after deletion
                Swal.fire({
                    title: "Remove!",
                    text: "Your file has been Removed.",
                    icon: "success"
                });

                try {
                    // Use DELETE instead of GET
                    const res = await axios.delete(`http://localhost:5000/api/book-product/${id}`);
                    console.log('Response from server:', res); // Log the server's response

                    // Update the state to reflect the deletion
                    setBookedProducts((prev) => prev.filter((product) => product._id !== id));
                } catch (error) {
                    console.error('Error removing product:', error);
                    // Optionally, show an error message using Swal
                    Swal.fire({
                        title: "Error!",
                        text: "There was an error removing the product.",
                        icon: "error"
                    });
                }
            }
        });
    };



    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-600">BookMarked Products</h2>
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
                        {bookedProducts.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="p-3 border-b">{product.name}</td>
                                <td className="p-3 border-b">{product.type}</td>
                                <td className="p-3 border-b">{product.price} tk</td>
                                <td className="p-3 border-b">{product.description}</td>
                                <td className="p-3 border-b">

                                    <button
                                        onClick={() => handleRemove(product._id)}
                                        className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {bookedProducts.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">
                                    No products booked yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CartPage;
