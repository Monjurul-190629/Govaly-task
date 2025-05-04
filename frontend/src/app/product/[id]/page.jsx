'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import getProductById from '@/lib/getProductById';
import axios from 'axios';
import Loading from '@/Component/Loading/Loading';
import ErrorPage from '@/Error/Error';

const ProductInfo = React.memo(({ product }) => {
  const { image, name, description, type, price } = product;
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover rounded-xl mb-6"
        loading="lazy" // Lazy load image
      />
      <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
      <p className="text-gray-700 mt-3 leading-relaxed font-semibold">{description}</p>
      <div className="mt-4 flex justify-between">
        <span className="block text-md text-gray-700 font-semibold">Type</span>
        <p className="text-gray-800 font-semibold">{type}</p>
      </div>
      <div className="mt-4 text-xl text-pink-600 font-bold">
        Price: {price} taka
      </div>
    </div>
  );
});

const BuyerForm = React.memo(({ formData, handleChange, handlePay }) => {
  return (
    <div className="bg-gray-200 rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-6 text-gray-700">Buyer Information</h3>
      <form className="space-y-5" onSubmit={handlePay}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
        />
        <input
          type="text"
          name="postcode"
          placeholder="Post Code"
          value={formData.postcode}
          onChange={handleChange}
          required
          className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          required
          className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
        />
        <button
          type="submit"
          className="w-full cursor-default bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
});

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
    productId: id,
  });

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const productData = await getProductById(id);
      setProduct(productData);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to fetch product');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle payment function
  const handlePay = async (e) => {
    e.preventDefault();
    console.log('Buyer Info:', formData);

    try {
      const res = await axios.post('https://govaly-task-production.up.railway.app/api/init', formData);
      if (res.data?.GatewayPageURL) {
        window.location.href = res.data.GatewayPageURL;
      } else {
        console.error('Payment initialization failed:', res.data);
      }
    } catch (error) {
      console.error('Error during payment initialization:', error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorPage error={error} />;

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-12 text-gray-600">
        Product Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Info */}
        <ProductInfo product={product} />

        {/* Buyer Form */}
        <BuyerForm
          formData={formData}
          handleChange={handleChange}
          handlePay={handlePay}
        />
      </div>
    </div>
  );
};

export default ProductPage;
