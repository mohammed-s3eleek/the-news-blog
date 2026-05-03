import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-10">
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">
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

        <div className="text-gray-500 text-sm font-medium">
          Copyright © 2026 The News Blog. All rights reserved.
        </div>

        <div className="flex gap-8 text-sm text-gray-400">
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
