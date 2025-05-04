'use client';

import Link from 'next/link';

export default function PaymentPageClient({ user }) {
    const { name, address, phone, coin, tran_id, paidStatus, email, createdAt } = user;

    return (
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl mx-4">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-semibold text-gray-800">Payment Successful!</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Congrats, {name}. Your payment has been successfully processed.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-700">User Info</h3>
                            <p className="mt-2 text-gray-600"><strong>Name:</strong> {name}</p>
                            <p className="mt-2 text-gray-600"><strong>Email:</strong> {email}</p>
                            <p className="mt-2 text-gray-600"><strong>Phone:</strong> {phone}</p>
                            <p className="mt-2 text-gray-600"><strong>Address:</strong> {address}</p>
                        </div>
                        <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-700">Payment Details</h3>
                            <p className="mt-2 text-gray-600"><strong>Transaction ID:</strong> {tran_id}</p>
                            <p className="mt-2 text-gray-600"><strong>Paid Status:</strong> {paidStatus ? 'Paid' : 'Pending'}</p>
                            <p className="mt-2 text-gray-600"><strong>Coins:</strong> {coin}</p>
                            <p className="mt-2 text-gray-600"><strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="flex justify-center mt-12">
                        <div className="bg-white shadow-xl rounded-lg px-8 py-6 text-center">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">You're all set!</h2>
                            <p className="text-gray-600 mb-6">Head back to your dashboard and explore more features.</p>
                            <Link
                                href="/"
                                className="inline-block px-8 py-3 bg-pink-600 text-white font-medium rounded-full shadow-md hover:bg-pink-700 transition duration-300"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
