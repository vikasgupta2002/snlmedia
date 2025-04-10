
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// Define the NewsArticle type using the Database type
type NewsArticle = Database['public']['Tables']['news_articles']['Row'];

interface LatestNewsSliderProps {
  isBreaking?: boolean;
}

const LatestNewsSlider = ({ isBreaking = false }: LatestNewsSliderProps) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let query = supabase
          .from('news_articles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
          
        // If isBreaking is true, filter by is_breaking
        if (isBreaking) {
          query = query.eq('is_breaking', true);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) {
          console.error('Error fetching latest news:', supabaseError);
          setError('Failed to load news articles');
        } else {
          setArticles(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticles();

    // Auto slide
    const interval = setInterval(() => {
      if (articles.length > 1) {
        nextSlide();
      }
    }, 5000);

    // Set up real-time subscription for new articles
    const channel = supabase
      .channel('latest-news-changes')
      .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'news_articles',
            filter: isBreaking ? 'is_breaking=eq.true' : undefined
          }, 
          (payload) => {
            console.log('New article added:', payload);
            fetchLatestArticles();
          }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [isBreaking]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="mb-8">
        <Card className="overflow-hidden rounded-lg">
          <CardContent className="p-0">
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <Skeleton className="w-full h-full" />
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mb-8">
        <Card className="overflow-hidden rounded-lg">
          <CardContent className="p-6 text-center">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No articles
  if (articles.length === 0) {
    return (
      <div className="mb-8">
        <Card className="overflow-hidden rounded-lg">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              {isBreaking ? "No breaking news available at the moment" : "No news articles available"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Slider with articles
  return (
    <div className="relative overflow-hidden rounded-lg mb-8">
      <div 
        className="flex transition-transform duration-500 ease-in-out" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {articles.map((article) => (
          <div key={article.id} className="min-w-full">
            <Link to={`/news/${article.id}`}>
              <Card className="border-0 rounded-none">
                <CardContent className="relative p-0 aspect-[16/9] md:aspect-[21/9]">
                  <img 
                    src={article.image_url || 'https://picsum.photos/id/1/800/450'} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                    <div className="flex items-center mb-2">
                      <span className="text-xs font-medium bg-aajtak px-2 py-0.5 rounded-sm mr-2">
                        {article.category || (isBreaking ? 'Breaking' : 'News')}
                      </span>
                      <span className="text-xs opacity-75">
                        {new Date(article.created_at || '').toLocaleString()}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold leading-tight">{article.title}</h2>
                    {article.summary && (
                      <p className="text-sm text-white/80 mt-1 line-clamp-2 hidden md:block">{article.summary}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>

      {articles.length > 1 && (
        <>
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full opacity-70 hover:opacity-100"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full opacity-70 hover:opacity-100"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
            {articles.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentSlide === index ? "bg-white" : "bg-white/50"
                )}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LatestNewsSlider;
