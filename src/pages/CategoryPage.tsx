
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BreakingNews from '@/components/BreakingNews';
import NewsCard from '@/components/NewsCard';
import TrendingNews from '@/components/TrendingNews';
import Footer from '@/components/Footer';
import { NewsItem } from '@/data/newsData';
import { fetchNews } from '@/services/newsService';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryPageProps {
  title: string;
  category: string;
}

const CategoryPage = ({ title, category }: CategoryPageProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryNews = async () => {
      setLoading(true);
      try {
        const newsData = await fetchNews(category);
        setNews(newsData);
      } catch (error) {
        console.error(`Error loading ${category} news:`, error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCategoryNews();
  }, [category]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BreakingNews />
      <main className="flex-grow">
        <div className="news-container py-6">
          <h1 className="text-3xl font-bold mb-6 border-b-2 border-aajtak inline-block pb-2">{title}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col">
                      <Skeleton className="h-48 w-full mb-3" />
                      <Skeleton className="h-5 w-full mb-2" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {news.map((item) => (
                    <NewsCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      category={item.category}
                      timestamp={item.timestamp}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-8">
              <TrendingNews />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
