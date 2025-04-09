
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BreakingNews from '@/components/BreakingNews';
import FeaturedSlider from '@/components/FeaturedSlider';
import NewsSection from '@/components/NewsSection';
import TrendingNews from '@/components/TrendingNews';
import Footer from '@/components/Footer';
import { NewsItem } from '@/data/newsData';
import { fetchNews, setupDailyNewsRefresh } from '@/services/newsService';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [nationalNews, setNationalNews] = useState<NewsItem[]>([]);
  const [internationalNews, setInternationalNews] = useState<NewsItem[]>([]);
  const [sportsNews, setSportsNews] = useState<NewsItem[]>([]);
  const [entertainmentNews, setEntertainmentNews] = useState<NewsItem[]>([]);
  const [businessNews, setBusinessNews] = useState<NewsItem[]>([]);
  const [technologyNews, setTechnologyNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllNews = async () => {
      setLoading(true);
      try {
        const [national, international, sports, entertainment, business, technology] = await Promise.all([
          fetchNews('National'),
          fetchNews('International'),
          fetchNews('Sports'),
          fetchNews('Entertainment'),
          fetchNews('Business'),
          fetchNews('Technology')
        ]);

        setNationalNews(national);
        setInternationalNews(international);
        setSportsNews(sports);
        setEntertainmentNews(entertainment);
        setBusinessNews(business);
        setTechnologyNews(technology);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };

    // Set up daily news refresh
    setupDailyNewsRefresh();
    
    // Load news immediately
    loadAllNews();
  }, []);

  // Loading skeleton for news sections
  const NewsSectionSkeleton = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="h-48 w-full mb-3" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BreakingNews />
      <main className="flex-grow">
        <div className="news-container py-6">
          <div className="mb-8">
            <FeaturedSlider />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {loading ? (
                <>
                  <NewsSectionSkeleton />
                  <NewsSectionSkeleton />
                  <NewsSectionSkeleton />
                  <NewsSectionSkeleton />
                </>
              ) : (
                <>
                  <NewsSection 
                    title="National" 
                    path="/national" 
                    news={nationalNews}
                  />
                  
                  <NewsSection 
                    title="International" 
                    path="/international" 
                    news={internationalNews}
                  />
                  
                  <NewsSection 
                    title="Sports" 
                    path="/sports" 
                    news={sportsNews}
                  />
                  
                  <NewsSection 
                    title="Entertainment" 
                    path="/entertainment" 
                    news={entertainmentNews}
                  />
                </>
              )}
            </div>
            
            <div className="space-y-8">
              <TrendingNews />
              
              {loading ? (
                <>
                  <div>
                    <Skeleton className="h-8 w-32 mb-4" />
                    <div className="space-y-4">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-4">
                          <Skeleton className="w-24 h-24" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Skeleton className="h-8 w-32 mb-4" />
                    <div className="space-y-4">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-4">
                          <Skeleton className="w-24 h-24" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2 className="news-section-title">Business</h2>
                    <div className="space-y-4">
                      {businessNews.slice(0, 2).map(item => (
                        <div key={item.id} className="flex gap-4">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                          <div>
                            <h3 className="font-semibold line-clamp-2 leading-tight text-sm">{item.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="news-section-title">Technology</h2>
                    <div className="space-y-4">
                      {technologyNews.slice(0, 2).map(item => (
                        <div key={item.id} className="flex gap-4">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                          <div>
                            <h3 className="font-semibold line-clamp-2 leading-tight text-sm">{item.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
