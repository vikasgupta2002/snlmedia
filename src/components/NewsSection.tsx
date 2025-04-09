
import React from 'react';
import { Button } from '@/components/ui/button';
import NewsCard from '@/components/NewsCard';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface NewsSectionProps {
  title: string;
  path: string;
  news: {
    id: number;
    title: string;
    image: string;
    category?: string;
    timestamp: string;
  }[];
}

const NewsSection = ({ title, path, news }: NewsSectionProps) => {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="news-section-title">{title}</h2>
        <Link to={path}>
          <Button variant="ghost" size="sm" className="text-sm font-medium text-aajtak hover:bg-aajtak/10">
            More <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
    </section>
  );
};

export default NewsSection;
