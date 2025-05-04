import axios from 'axios';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product }) => {
    const { image, name, price, description, type } = product;


    const handleBooking = async () => {
        try {
            const bookingPayload = {
                productId: product._id,
                userId: "123456789", // Replace with real user ID if logged in
                name: product.name,
                price: product.price,
                type: product.type,
                description: product.description,
                image: product.image,
            };
    
            const result = await axios.post('http://localhost:5000/api/book-product', bookingPayload);
            console.log('Booking success:', result.data);
            alert('Product booked successfully!');
        } catch (error) {
            console.error('Booking error:', error.response?.data || error.message);
            alert('Failed to book product.');
        }
    };
    
    

    return (
        <div className="max-w-sm mx-auto bg-pink-200 p-5 w-[340px] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="aspect-[4/3] w-full">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-56 object-cover rounded-xl"
                />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-600 mt-2">{description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-gray-900">{price} tk</span>
                    <span className="text-md text-gray-500 font-semibold">{type}</span>
                </div>
                <div className="flex justify-between mt-4 gap-4">
                    <Link
                        href={`/product/${product._id}`}
                        className="w-1/2 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-300 text-center"
                    >
                        Order
                    </Link>
                    <button
                        onClick={handleBooking}
                        className="w-1/2 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300"
                    >
                        Bookmark
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
