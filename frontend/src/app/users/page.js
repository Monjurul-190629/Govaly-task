'use client'
import React, { useState, useEffect, useMemo } from 'react';
import getUsers from '@/lib/getUsers';
import { Users, Phone, MapPin, Coins } from 'lucide-react';

const PaidUsers = () => {
    const [users, setUsers] = useState([]);  // To hold fetched user data

    // Fetch users when component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers();
            setUsers(data);
        };

        fetchUsers();
    }, []);  // Empty dependency array means this runs only once after the component mounts

    // Memoize the user data to avoid unnecessary re-renders
    const memoizedUsers = useMemo(() => users, [users]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">Paid Users</h1>
                    <p className="text-center text-gray-500 mt-1">List of all users who completed payment</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-purple-700 to-pink-800 text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                    <span className="flex items-center gap-2">
                                        <Users className='w-4 h-4'/><span>Name</span>
                                    </span>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                    <span className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" /> Phone
                                    </span>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                    <span className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" /> Address
                                    </span>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                    <span className="flex items-center gap-2">
                                        <Coins className="w-4 h-4" /> Coins
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {memoizedUsers.length > 0 ? (
                                memoizedUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.address}</td>
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
