import getUsers from '@/lib/getUsers';
import React from 'react';

const PaidUsers = async () => {
    const users = await getUsers();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">Paid Users</h1>
                    <p className="text-center text-gray-500 mt-1">List of all users who completed payment</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Phone</th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Coins</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.coin}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center px-6 py-4 text-gray-500">No paid users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaidUsers;
