
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// Define the NewsArticle type using the Database type
type NewsArticle = Database['public']['Tables']['news_articles']['Row'];

const TrendingNewsSection = () => {
  const [trendingArticles, setTrendingArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error: supabaseError } = await supabase
          .from('news_articles')
          .select('*')
          .eq('is_trending', true)
          .order('created_at', { ascending: false })
          .limit(5);

        if (supabaseError) {
          console.error('Error fetching trending news:', supabaseError);
          setError('Failed to load trending articles');
        } else {
          setTrendingArticles(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingArticles();

    // Set up real-time subscription for trend changes
    const channel = supabase
      .channel('trending-news-changes')
      .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'news_articles',
            filter: 'is_trending=eq.true' 
          }, 
          (payload) => {
            console.log('New trending article added:', payload);
            fetchTrendingArticles();
          }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Loading state
  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">Trending Now</h2>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start space-x-3 mb-4">
              <Skeleton className="h-16 w-16 rounded-md" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">Trending Now</h2>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  // No trending articles
  if (trendingArticles.length === 0) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">Trending Now</h2>
          <p className="text-muted-foreground">No trending news at the moment</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-4">Trending Now</h2>
        {trendingArticles.map((article) => (
          <Link key={article.id} to={`/news/${article.id}`}>
            <div className="flex items-start space-x-3 mb-4 group">
              <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={article.image_url || 'https://picsum.photos/id/1/200/200'} 
                  alt={article.title} 
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-aajtak transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {article.category || 'Trending'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default TrendingNewsSection;
