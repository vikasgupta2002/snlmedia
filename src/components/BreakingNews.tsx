
import React, { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// Define the NewsArticle type using the Database type
type NewsArticle = Database['public']['Tables']['news_articles']['Row'];

const BreakingNews = () => {
  const [breakingNews, setBreakingNews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
          .from('news_articles')
          .select('title')
          .eq('is_breaking', true)
          .order('created_at', { ascending: false });

        if (supabaseError) {
          console.error('Error fetching breaking news:', supabaseError);
          setError('Failed to load breaking news');
          return;
        }

        // Extract titles from the articles
        const newsTitles = data?.map(article => article.title) || [];
        setBreakingNews(newsTitles);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBreakingNews();

    // Set up real-time subscription for breaking news changes
    const channel = supabase
      .channel('breaking-news-changes')
      .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'news_articles',
            filter: 'is_breaking=eq.true' 
          }, 
          () => {
            console.log('Breaking news updated');
            fetchBreakingNews();
          }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // No breaking news available
  if (!loading && (breakingNews.length === 0 || error)) {
    return (
      <div className="bg-aajtak text-white py-2">
        <div className="news-container flex items-center">
          <div className="flex items-center min-w-fit">
            <Newspaper className="h-4 w-4 mr-2" />
            <span className="font-bold text-sm">BREAKING</span>
            <span className="ml-2 mr-4">|</span>
          </div>
          <div className="overflow-hidden whitespace-nowrap">
            <div className="inline-block">
              <span className="mr-12">
                {error || "No breaking news at the moment"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-aajtak text-white py-2">
      <div className="news-container flex items-center">
        <div className="flex items-center min-w-fit">
          <Newspaper className="h-4 w-4 mr-2" />
          <span className="font-bold text-sm">BREAKING</span>
          <span className="ml-2 mr-4">|</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap relative">
          {loading ? (
            <span>Loading breaking news...</span>
          ) : (
            <>
              <div className="animate-marquee inline-block">
                {breakingNews.map((news, index) => (
                  <span key={index} className="mr-12">
                    {news}
                  </span>
                ))}
              </div>
              <div className="animate-marquee inline-block absolute left-full top-0">
                {breakingNews.map((news, index) => (
                  <span key={`copy-${index}`} className="mr-12">
                    {news}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
