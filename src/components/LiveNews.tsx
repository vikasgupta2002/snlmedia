
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  highlights: string;
  image_url: string;
  created_at: string;
}

const LiveNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch news from Supabase ordered by creation date (newest first)
        const { data, error } = await supabase
          .from('news_articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching news:', error);
        } else {
          setNews(data || []);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    // Set up real-time subscription
    const channel = supabase
      .channel('public:news_articles')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'news_articles' 
        }, 
        (payload) => {
          console.log('Real-time update:', payload);
          fetchNews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Function to split highlights into an array
  const formatHighlights = (highlights: string): string[] => {
    return highlights.split('|').filter(item => item.trim() !== '');
  };

  // Render loading skeletons
  if (loading) {
    return (
      <div id="news-container" className="space-y-6">
        <p className="text-xl font-bold">Loading news...</p>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-6" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Render actual news articles
  return (
    <div id="news-container" className="space-y-6">
      {news.length === 0 ? (
        <p className="text-center text-muted-foreground py-10">No news articles available</p>
      ) : (
        news.map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.summary}</p>
                {article.highlights && (
                  <ul className="list-disc list-inside mb-4 space-y-1">
                    {formatHighlights(article.highlights).map((highlight, index) => (
                      <li key={index} className="text-sm">{highlight}</li>
                    ))}
                  </ul>
                )}
                <p className="text-xs text-muted-foreground">
                  Published: {new Date(article.created_at).toLocaleString()}
                </p>
              </div>
              {article.image_url && (
                <img 
                  src={article.image_url} 
                  alt={article.title} 
                  className="w-full h-auto object-cover"
                  style={{maxWidth: '100%', height: 'auto'}}
                />
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default LiveNews;
