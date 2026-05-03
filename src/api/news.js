import axios from 'axios';
import { MOCK_ARTICLES } from './mockData';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

const newsApi = axios.create({
  baseURL: BASE_URL,
});

export const getTopHeadlines = async (category = 'general', signal) => {
  try {
    const response = await newsApi.get('/top-headlines', {
      params: {
        category,
        country: 'us',
        apiKey: API_KEY,
      },
      signal,
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching top headlines:', error.response?.data || error.message);
    // Fallback to mock data
    return MOCK_ARTICLES;
  }
};

export const searchArticles = async (query, signal) => {
  try {
    const response = await newsApi.get('/everything', {
      params: {
        q: query,
        sortBy: 'publishedAt',
        apiKey: API_KEY,
      },
      signal,
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error searching articles:', error.response?.data || error.message);
    // Fallback to mock data filtered by query if possible, or just return mock data
    return MOCK_ARTICLES.filter(a => 
      a.title.toLowerCase().includes(query.toLowerCase()) || 
      a.description.toLowerCase().includes(query.toLowerCase())
    ).concat(MOCK_ARTICLES).slice(0, 10);
  }
};

export default newsApi;
