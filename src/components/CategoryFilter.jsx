import React from 'react';

const CATEGORIES = [
  { id: 'general', label: 'General' },
  { id: 'technology', label: 'Technology' },
  { id: 'sports', label: 'Sports' },
  { id: 'business', label: 'Business' },
  { id: 'health', label: 'Health' },
];

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3 py-6">
      <div className="flex flex-wrap justify-center gap-3 p-2 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 shadow-sm">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              px-6 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 relative group
              ${activeCategory === category.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 -translate-y-0.5' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-blue-600 border border-gray-100 shadow-sm hover:shadow-md'}
            `}
          >
            {category.label}
            {activeCategory === category.id && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
