
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type NewsArticle = Database['public']['Tables']['news_articles']['Row'];

interface CategoryNewsProps {
  category: string;
  containerId: string;
  limit?: number;
}

const CategoryNews = ({ category, containerId, limit = 4 }: CategoryNewsProps) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('news_articles')
          .select('*')
          .eq('category', category)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) {
          console.error(`Error fetching ${category} news:`, error);
        } else {
          setArticles(data || []);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();

    // Subscribe to realtime updates for this category
    const channel = supabase
      .channel(`${category}-changes`)
      .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'news_articles',
            filter: `category=eq.${category}`
          }, 
          (payload) => {
            console.log(`New ${category} article:`, payload);
            fetchArticles();
          }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [category, limit]);

  // Loading skeleton
  if (loading) {
    return (
      <div id={containerId} className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="news-section-title">{category}</h2>
          <Link to={`/${category.toLowerCase()}`}>
            <Button variant="ghost" size="sm" className="text-sm font-medium text-aajtak hover:bg-aajtak/10">
              More <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(limit).fill(0).map((_, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-0">
                <div className="aspect-[4/3]">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="p-3">
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-3 w-4/6 mb-4" />
                  <Skeleton className="h-2 w-1/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // No articles found
  if (articles.length === 0) {
    return (
      <div id={containerId} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="news-section-title">{category}</h2>
          <Link to={`/${category.toLowerCase()}`}>
            <Button variant="ghost" size="sm" className="text-sm font-medium text-aajtak hover:bg-aajtak/10">
              More <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <p className="text-muted-foreground text-center py-10">No {category} articles available</p>
      </div>
    );
  }

  // Articles loaded
  return (
    <div id={containerId} className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="news-section-title">{category}</h2>
        <Link to={`/${category.toLowerCase()}`}>
          <Button variant="ghost" size="sm" className="text-sm font-medium text-aajtak hover:bg-aajtak/10">
            More <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {articles.map((article) => (
          <Link key={article.id} to={`/news/${article.id}`}>
            <Card className="news-card h-full">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="aspect-[4/3]">
                  <img 
                    src={article.image_url || 'https://picsum.photos/id/1/800/600'} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="news-card-title">
                    {article.title}
                  </h3>
                  {article.summary && (
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{article.summary}</p>
                  )}
                  <div className="mt-auto">
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(article.created_at || '').toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;
