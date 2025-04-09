
import React, { useEffect, useState } from 'react';
import { Newspaper } from 'lucide-react';
import { fetchNews } from '@/services/newsService';
import { Skeleton } from '@/components/ui/skeleton';

const BreakingNews = () => {
  const [breakingNews, setBreakingNews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBreakingNews = async () => {
      setLoading(true);
      try {
        // Get a mix of national and international headlines
        const nationalNews = await fetchNews('National');
        const internationalNews = await fetchNews('International');
        
        // Get headlines from both categories and take 4 total
        const headlines = [
          ...nationalNews.slice(0, 2).map(item => item.title),
          ...internationalNews.slice(0, 2).map(item => item.title)
        ];
        
        setBreakingNews(headlines);
      } catch (error) {
        console.error('Error loading breaking news:', error);
        // Fallback to static headlines if API fails
        setBreakingNews([
          "PM addresses the nation on Independence Day celebrations",
          "COVID-19 cases see significant drop nationwide",
          "India's GDP grows 7.8% in Q1 of 2025-26 fiscal year",
          "National cricket team wins series against Australia"
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    loadBreakingNews();
    
    // Refresh breaking news every 30 minutes
    const refreshInterval = setInterval(loadBreakingNews, 30 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="bg-aajtak text-white py-2">
      <div className="news-container flex items-center">
        <div className="flex items-center min-w-fit">
          <Newspaper className="h-4 w-4 mr-2" />
          <span className="font-bold text-sm">BREAKING</span>
          <span className="ml-2 mr-4">|</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap">
          {loading ? (
            <Skeleton className="h-4 w-60 bg-white/20" />
          ) : (
            <div className="animate-marquee inline-block">
              {breakingNews.map((news, index) => (
                <span key={index} className="mr-12">
                  {news}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
