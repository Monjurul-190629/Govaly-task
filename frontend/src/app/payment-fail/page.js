'use client';

import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FailPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-pink-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          className="flex justify-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <XCircle className="text-red-600 w-16 h-16 drop-shadow-md" />
        </motion.div>

        <h1 className="text-3xl font-extrabold text-red-600 mb-2 tracking-tight">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          Oops! Something went wrong with your payment. Please try again or contact support if the issue persists.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link
            href="/"
            className="px-6 py-2 bg-gray-800 text-white rounded-full font-medium shadow hover:bg-gray-900 transition"
          >
            Go to Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FailPage;
