import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
      <div className="text-9xl mb-8">🔍</div>
      <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tight">404</h1>
      <p className="text-2xl text-gray-500 mb-10 max-w-md">
        Oops! The page you're looking for has vanished into thin air.
      </p>
      <Link 
        to="/" 
        className="bg-blue-600 text-white font-bold py-4 px-10 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1"
      >
        Back to Home
      </Link>
    </main>
  );
};

export default NotFound;
