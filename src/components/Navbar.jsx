import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <svg 
            viewBox="0 0 24 24" 
            className="w-8 h-8 text-blue-600 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM17 17H7V15H17V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" />
          </svg>
          <div className="flex items-baseline text-2xl tracking-tight">
            <span className="font-light text-gray-400">The</span>
            <span className="font-bold text-black ml-1">News</span>
            <span className="font-bold text-[#2563eb] ml-1">Blog</span>
          </div>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-lg w-full">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 border-none rounded-full py-2.5 px-6 pl-12 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </form>

        {/* Subscribe Button */}
        <div className="hidden md:block">
          <button 
            onClick={() => {
              const element = document.getElementById('subscribe-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              } else {
                // If not on home page, navigate to home and then scroll (simplified here to just show action)
                window.location.href = '/#subscribe-section';
              }
            }}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Subscribe
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
