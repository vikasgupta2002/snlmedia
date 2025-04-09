
import React from 'react';
import Header from '@/components/Header';
import BreakingNews from '@/components/BreakingNews';
import FeaturedSlider from '@/components/FeaturedSlider';
import NewsSection from '@/components/NewsSection';
import TrendingNews from '@/components/TrendingNews';
import Footer from '@/components/Footer';
import { 
  nationalNews,
  internationalNews,
  sportsNews,
  entertainmentNews,
  businessNews,
  technologyNews
} from '@/data/newsData';

const Index = () => {
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
            </div>
            
            <div className="space-y-8">
              <TrendingNews />
              
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
