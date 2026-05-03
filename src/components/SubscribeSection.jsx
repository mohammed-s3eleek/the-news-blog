import React, { useState } from 'react';

const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      // Save to localStorage just for demonstration
      const subscribers = JSON.parse(localStorage.getItem('news_subscribers') || '[]');
      localStorage.setItem('news_subscribers', JSON.stringify([...subscribers, email]));
    }, 1500);
  };

  return (
    <section id="subscribe-section" className="my-20 scroll-mt-24">
      <div className="relative overflow-hidden bg-blue-600 rounded-[3rem] p-8 md:p-16 text-white text-center shadow-2xl shadow-blue-200">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full translate-x-1/3 translate-y-1/3 opacity-20 blur-3xl"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Stay ahead of the curve with our weekly newsletter
          </h2>
          <p className="text-blue-100 text-lg mb-10 opacity-90">
            Join 50,000+ subscribers and get the most important news delivered directly to your inbox.
          </p>

          {status === 'success' ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 animate-bounce-short">
              <svg className="w-16 h-16 mx-auto mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
              <p className="text-blue-100">Check your inbox for a welcome surprise.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm font-bold underline underline-offset-4 hover:text-white transition-colors"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-4 px-6 text-white placeholder:text-blue-200 outline-none focus:ring-2 focus:ring-white/50 transition-all text-lg"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`
                  bg-white text-blue-600 font-black py-4 px-10 rounded-2xl text-lg hover:bg-blue-50 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl
                  ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}
                `}
              >
                {status === 'loading' ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </div>
                ) : 'Subscribe Now'}
              </button>
            </form>
          )}
          
          <p className="mt-8 text-sm text-blue-200 opacity-70">
            No spam, ever. Unsubscribe at any time with one click.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
