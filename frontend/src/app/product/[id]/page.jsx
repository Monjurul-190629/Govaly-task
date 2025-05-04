'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import getProductById from '@/lib/getProductById';
import axios from 'axios';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  const { id } = useParams();


  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    postcode: '',
    address: '',
    productId : id
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  const { image, name, description, type, price } = product;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePay = async (e) => {
    e.preventDefault();
    console.log('Buyer Info:', formData);
  
    try {
      const res = await axios.post('http://localhost:5000/api/init', formData);
      if (res.data && res.data.GatewayPageURL) {
        // Redirect to the payment gateway
        window.location.href = res.data.GatewayPageURL;
      } else {
        console.error('Payment initialization failed:', res.data);
      }
    } catch (error) {
      console.error('Error during payment initialization:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-700">
        Product Details
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Product Info */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 hover:shadow-xl transition duration-300">
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
          <p className="text-gray-600 mt-2 leading-relaxed font-semibold">{description}</p>
          <div className="mt-4 font-bold">
            <span className="text-sm text-gray-500">Type:</span>
            <p className="text-gray-700 font-bold">{type}</p>
          </div>
          <div className="mt-4 text-xl text-pink-500 font-semibold">
            Price: {price} taka
          </div>
        </div>

        {/* Right - Buyer Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Buyer Information</h3>
          <form className="space-y-4" onSubmit={handlePay}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full placeholder-gray-500 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none text-gray-500 focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full placeholder-gray-500 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none text-gray-500 focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full placeholder-gray-500 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none text-gray-500 focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="text"
              name="postcode"
              placeholder="Post Code"
              value={formData.postcode}
              onChange={handleChange}
              className="w-full placeholder-gray-500 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none text-gray-500 focus:ring-2 focus:ring-pink-400"
              required
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full placeholder-gray-500 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none text-gray-500 focus:ring-2 focus:ring-pink-400"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full placeholder-pink-400 bg-gradient-to-r from-pink-500 to-pink-500 hover:from-pink-700  hover:to-pink-600 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
