
import React from 'react';
import Header from '@/components/Header';
import BreakingNews from '@/components/BreakingNews';
import LatestNewsSlider from '@/components/LatestNewsSlider';
import CategoryNews from '@/components/CategoryNews';
import TrendingNewsSection from '@/components/TrendingNewsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BreakingNews />
      <main className="flex-grow">
        <div className="news-container py-6">
          <div className="mb-8">
            <LatestNewsSlider isBreaking={true} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CategoryNews 
                category="National" 
                containerId="national-news"
              />
              
              <CategoryNews 
                category="International" 
                containerId="international-news"
              />
              
              <CategoryNews 
                category="Sports" 
                containerId="sports-news"
              />
              
              <CategoryNews 
                category="Entertainment" 
                containerId="entertainment-news"
              />
            </div>
            
            <div className="space-y-8">
              <TrendingNewsSection />
              
              <CategoryNews 
                category="Business" 
                containerId="business-news"
                limit={2}
              />
              
              <CategoryNews 
                category="Technology" 
                containerId="technology-news"
                limit={2}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
