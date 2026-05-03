import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTopHeadlines, searchArticles } from '../api/news';
import NewsCard from '../components/NewsCard';
import CategoryFilter from '../components/CategoryFilter';
import SubscribeSection from '../components/SubscribeSection';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const category = searchParams.get('category') || 'general';
  const query = searchParams.get('search') || '';

  const fetchNews = async (signal) => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (query) {
        data = await searchArticles(query, signal);
      } else {
        data = await getTopHeadlines(category, signal);
      }
      setArticles(data || []);
    } catch (err) {
      if (err.name !== 'CanceledError') {
        setError('Failed to fetch news. Please try again later.');
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchNews(controller.signal);
    return () => controller.abort();
  }, [category, query]);

  const handleCategoryChange = (newCategory) => {
    setSearchParams({ category: newCategory });
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
      <div className="aspect-video bg-gray-200 rounded-xl mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-20 bg-gray-100 rounded w-full"></div>
    </div>
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-10 text-center">
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
              {query ? `Search results for "${query}"` : `Top ${category.charAt(0).toUpperCase() + category.slice(1)} News`}
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Stay updated with the latest headlines from around the world.</p>
          </div>
        </div>

        {!query && (
          <CategoryFilter 
            activeCategory={category} 
            onCategoryChange={handleCategoryChange} 
          />
        )}
      </section>

      {error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl max-w-md">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-bold mb-4">{error}</p>
            <button 
              onClick={() => fetchNews(new AbortController().signal)}
              className="bg-red-600 text-white px-8 py-2 rounded-full hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <NewsCard key={article.url + index} article={article} />
          ))}
        </div>
      ) : (
        !error && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <svg className="w-20 h-20 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM7 8h6m-6 4h6m-6 4h6" />
            </svg>
            <h3 className="text-xl font-bold">No articles found</h3>
            <p>Try searching for something else or check your internet connection.</p>
          </div>
        )
      )}

      <SubscribeSection />
    </main>
  );
};

export default Home;
