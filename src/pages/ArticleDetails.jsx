import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ArticleDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-8 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const { title, description, content, urlToImage, source, publishedAt, url, author } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 font-medium transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to News
      </button>

      <article className="bg-white rounded-3xl shadow-sm overflow-hidden">
        {urlToImage && (
          <div className="w-full h-[400px] overflow-hidden">
            <img 
              src={urlToImage} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-blue-600 text-white text-sm font-bold px-4 py-1.5 rounded-full">
              {source.name}
            </span>
            <span className="text-gray-400 text-sm">{formattedDate}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
            {title}
          </h1>

          {author && (
            <p className="text-gray-600 mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                {author.charAt(0)}
              </span>
              By <span className="font-bold text-gray-900">{author}</span>
            </p>
          )}

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8 border-l-4 border-blue-600 pl-6 py-2 italic">
              {description}
            </p>
            
            <p className="text-gray-800 leading-loose mb-10 text-lg">
              {content ? content.replace(/\[\+\d+ chars\]/, '') : 'No full content available for this preview.'}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-8 border-t border-gray-100">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-blue-600 text-white font-bold py-4 px-10 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Read Full Article
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center bg-gray-100 text-gray-700 font-bold py-4 px-10 rounded-full hover:bg-gray-200 transition-all"
            >
              More Headlines
            </button>
          </div>
        </div>
      </article>
    </main>
  );
};

export default ArticleDetails;
