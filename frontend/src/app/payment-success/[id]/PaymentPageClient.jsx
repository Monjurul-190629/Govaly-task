'use client';

import Link from 'next/link';
import { FaCoins, FaCheckCircle } from 'react-icons/fa';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { motion } from 'framer-motion';

export default function PaymentPageClient({ user }) {
    const { name, address, phone, coin, tran_id, paidStatus, email, createdAt } = user;

    return (
        <div className="bg-gradient-to-br from-purple-800 via-pink-600 to-rose-500 min-h-screen flex items-center justify-center px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden"
            >
                {/* Success Banner */}
                <div className="bg-gradient-to-r from-emerald-400 to-teal-800 text-white text-center py-10 px-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        <FaCheckCircle className="text-6xl mx-auto mb-4 drop-shadow-md animate-bounce" />
                    </motion.div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Payment Successful!</h1>
                    <p className="mt-3 text-lg font-medium">Congrats, {name}! Your payment has been confirmed.</p>
                </div>

                {/* Coins Won Section */}
                <div className="bg-yellow-50 text-yellow-800 text-center py-10 px-6">
                    <h2 className="text-3xl font-bold mb-3 flex justify-center items-center gap-2">
                        <BsBoxArrowInUpRight className="text-yellow-600 text-2xl drop-shadow-sm" />
                        You Won
                    </h2>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex justify-center items-center text-5xl font-extrabold gap-3 animate-pulse"
                    >
                        <FaCoins className="text-yellow-500 drop-shadow-xl" />
                        <span className="text-yellow-600">{coin}</span>
                        <span>Coins!</span>
                    </motion.div>
                </div>

                {/* User & Payment Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10 bg-gray-50">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">User Information</h3>
                        <p className="text-gray-700"><strong>Name:</strong> {name}</p>
                        <p className="text-gray-700 mt-2"><strong>Email:</strong> {email}</p>
                        <p className="text-gray-700 mt-2"><strong>Phone:</strong> {phone}</p>
                        <p className="text-gray-700 mt-2"><strong>Address:</strong> {address}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Payment Details</h3>
                        <p className="text-gray-700"><strong>Transaction ID:</strong> {tran_id}</p>
                        <p className="text-gray-700 mt-2"><strong>Status:</strong>
                            <span className={`ml-2 font-semibold ${paidStatus ? 'text-green-600' : 'text-yellow-500'}`}>
                                {paidStatus ? 'Paid' : 'Pending'}
                            </span>
                        </p>
                        <p className="text-gray-700 mt-2"><strong>Date:</strong> {new Date(createdAt).toLocaleDateString()}</p>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center py-10 px-6 bg-gradient-to-r from-fuchsia-100 to-rose-100 rounded-b-3xl"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">You're all set!</h2>
                    <p className="text-gray-600 mb-6">Head back to your dashboard to explore more features and offers.</p>
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                        <Link
                            href="/"
                            className="inline-block px-10 py-3 bg-pink-600 text-white font-semibold rounded-full shadow-lg hover:bg-pink-700 transition duration-300"
                        >
                            Go to Dashboard
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
