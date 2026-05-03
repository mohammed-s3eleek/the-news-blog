import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

const newsApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const getTopHeadlines = async (category = 'general', signal) => {
  const response = await newsApi.get('/top-headlines', {
    params: {
      category,
      country: 'us',
    },
    signal,
  });
  return response.data.articles;
};

export const searchArticles = async (query, signal) => {
  const response = await newsApi.get('/everything', {
    params: {
      q: query,
      sortBy: 'publishedAt',
    },
    signal,
  });
  return response.data.articles;
};

export default newsApi;
