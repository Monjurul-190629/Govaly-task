'use client';
import Link from 'next/link';
import { XCircle } from 'lucide-react';

const CancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-pink-200 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <XCircle className="text-red-600 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-red-600 mb-2">Payment canceled</h1>
        <p className="text-gray-600 mb-6">
          Oops! Something went wrong with your payment. Please try again or contact support if the issue persists.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Go to Dashboard
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
