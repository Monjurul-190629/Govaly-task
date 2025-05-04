import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 border-4 border-t-4 border-dashed border-pink-600 rounded-full animate-spin"></div>
                <span className="text-xl font-semibold text-pink-600">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;
