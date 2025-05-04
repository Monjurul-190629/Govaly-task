import React from 'react';

const ErrorPage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-300 via-red-500 to-red-700 text-center text-white">
      <div className="p-6 bg-white bg-opacity-20 rounded-lg shadow-xl">
        <h1 className="text-5xl font-extrabold mb-4">Oops!</h1>
        <p className="text-xl mb-6">Something went wrong!</p>
        <p className="text-lg italic">{message}</p>
        <div className="mt-6">
          <a
            href="/"
            className="px-6 py-2 bg-white text-red-700 rounded-lg shadow-md hover:bg-red-200 transition-all duration-300"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
