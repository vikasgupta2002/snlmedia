
import React from 'react';
import Header from '@/components/Header';
import BreakingNews from '@/components/BreakingNews';
import TrendingNews from '@/components/TrendingNews';
import Footer from '@/components/Footer';
import LiveNews from '@/components/LiveNews';

const Sports = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BreakingNews />
      <main className="flex-grow">
        <div className="news-container py-6">
          <h1 className="text-3xl font-bold mb-6 border-b-2 border-aajtak inline-block pb-2">Sports News</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LiveNews />
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

export default Sports;
