
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type NewsArticle = Database['public']['Tables']['news_articles']['Row'];

const TrendingNewsSection = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('news_articles')
          .select('*')
          .eq('is_trending', true)
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) {
          console.error('Error fetching trending news:', error);
        } else {
          setArticles(data || []);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingArticles();

    // Set up real-time subscription for trending news updates
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

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-bold">
            <TrendingUp className="mr-2 h-5 w-5 text-aajtak" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex gap-3 border-b pb-3 last:border-b-0 last:pb-0">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div className="w-full">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (articles.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-bold">
            <TrendingUp className="mr-2 h-5 w-5 text-aajtak" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 text-center">
          <p className="text-muted-foreground">No trending news available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-bold">
          <TrendingUp className="mr-2 h-5 w-5 text-aajtak" />
          Trending Now
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <ul className="space-y-4">
          {articles.map((article, index) => (
            <li key={article.id} className="border-b pb-3 last:border-b-0 last:pb-0">
              <Link to={`/news/${article.id}`} className="group">
                <div className="flex gap-3">
                  <span className="text-aajtak font-bold">{index + 1}</span>
                  <div>
                    <p className="font-medium group-hover:text-aajtak transition-colors line-clamp-2">{article.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(article.created_at || '').toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TrendingNewsSection;
