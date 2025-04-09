
import React from 'react';
import { Newspaper } from 'lucide-react';

const breakingNews = [
  "PM addresses the nation on Independence Day celebrations",
  "COVID-19 cases see significant drop nationwide",
  "India's GDP grows 7.8% in Q1 of 2025-26 fiscal year",
  "National cricket team wins series against Australia"
];

const BreakingNews = () => {
  return (
    <div className="bg-aajtak text-white py-2">
      <div className="news-container flex items-center">
        <div className="flex items-center min-w-fit">
          <Newspaper className="h-4 w-4 mr-2" />
          <span className="font-bold text-sm">BREAKING</span>
          <span className="ml-2 mr-4">|</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block">
            {breakingNews.map((news, index) => (
              <span key={index} className="mr-12">
                {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
