import { NewsItem } from '@/data/newsData';

// API key would typically be stored in environment variables in a real application
const NEWS_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const BASE_URL = 'https://newsapi.org/v2';

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: {
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }[];
}

// Transform API response to our NewsItem format
const transformArticlesToNewsItems = (articles: NewsApiResponse['articles'], category: string): NewsItem[] => {
  return articles.map((article, index) => ({
    id: Date.now() + index, // Generate unique ID
    title: article.title,
    image: article.urlToImage || `https://picsum.photos/id/${(index + 1) * 10}/800/450`, // Fallback image
    category,
    timestamp: formatTimestamp(article.publishedAt),
    summary: article.description || '',
  }));
};

// Format API timestamp to our relative time format
const formatTimestamp = (timestamp: string): string => {
  const publishedDate = new Date(timestamp);
  const now = new Date();
  
  const diffInHours = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 2) {
    return '1 hour ago';
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return `${Math.floor(diffInHours / 24)} days ago`;
  }
};

// Fetch news with caching
export const fetchNews = async (category: string): Promise<NewsItem[]> => {
  try {
    // Check if we have fresh cached data
    const cachedData = localStorage.getItem(`news_${category.toLowerCase()}`);
    const cachedTimestamp = localStorage.getItem(`news_${category.toLowerCase()}_timestamp`);
    
    const now = new Date().getTime();
    const cacheExpiration = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
    
    // If we have cached data and it's less than 6 hours old, use it
    if (cachedData && cachedTimestamp && now - parseInt(cachedTimestamp) < cacheExpiration) {
      console.log(`Using cached ${category} news data`);
      return JSON.parse(cachedData);
    }
    
    // Otherwise fetch fresh data
    console.log(`Fetching fresh ${category} news data`);
    let query = '';
    
    switch (category.toLowerCase()) {
      case 'national':
        query = 'country=in';
        break;
      case 'international':
        query = 'language=en&excludeDomains=.in';
        break;
      case 'business':
        query = 'category=business&language=en';
        break;
      case 'technology':
        query = 'category=technology&language=en';
        break;
      case 'sports':
        query = 'category=sports&language=en';
        break;
      case 'entertainment':
        query = 'category=entertainment&language=en';
        break;
      default:
        query = 'language=en';
    }
    
    const response = await fetch(`${BASE_URL}/top-headlines?${query}&apiKey=${NEWS_API_KEY}`);
    const data: NewsApiResponse = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(data.status);
    }
    
    const newsItems = transformArticlesToNewsItems(data.articles, category);
    
    // Cache the results
    localStorage.setItem(`news_${category.toLowerCase()}`, JSON.stringify(newsItems));
    localStorage.setItem(`news_${category.toLowerCase()}_timestamp`, now.toString());
    
    return newsItems;
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    
    // If API fails, try to use cached data regardless of age
    const cachedData = localStorage.getItem(`news_${category.toLowerCase()}`);
    if (cachedData) {
      console.log(`Using expired cache for ${category} due to API error`);
      return JSON.parse(cachedData);
    }
    
    // If no cached data, return empty array
    // In a real application, you might want to use fallback data here
    return [];
  }
};

// Function to refresh all news categories
export const refreshAllNews = async (): Promise<void> => {
  const categories = ['National', 'International', 'Business', 'Technology', 'Sports', 'Entertainment'];
  
  for (const category of categories) {
    await fetchNews(category);
  }
  
  console.log('All news categories refreshed');
};

// Set up a daily refresh schedule
export const setupDailyNewsRefresh = (): void => {
  // First check if we've already set this up to avoid duplicates
  if (localStorage.getItem('news_refresh_setup') === 'true') {
    return;
  }
  
  // Schedule refresh every 6 hours
  const refreshInterval = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
  
  // Initial refresh
  refreshAllNews();
  
  // Set up interval for future refreshes
  setInterval(refreshAllNews, refreshInterval);
  
  // Mark as set up
  localStorage.setItem('news_refresh_setup', 'true');
  
  console.log('Daily news refresh scheduled');
};
