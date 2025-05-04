import React from 'react';

const ProductCard = ({ product }) => {
    const { image, name, price, description, type } = product;

    return (
        <div className="max-w-sm mx-auto bg-gray-200 p-5 w-[340px] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
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
                    <span className="text-sm text-gray-500">{type}</span>
                </div>
                <div className="flex justify-between mt-4 gap-4">
                    <button
                        onClick={() => alert('Order clicked')}
                        className="w-1/2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                    >
                        Order
                    </button>
                    <button
                        onClick={() => alert('Add to Bookmark clicked')}
                        className="w-1/2 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-300"
                    >
                        Bookmark
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
