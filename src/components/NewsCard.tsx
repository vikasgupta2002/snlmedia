
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  id: number;
  title: string;
  image: string;
  category?: string;
  timestamp: string;
  featured?: boolean;
  className?: string;
}

const NewsCard = ({ id, title, image, category, timestamp, featured = false, className }: NewsCardProps) => {
  return (
    <Link to={`/news/${id}`}>
      <Card className={cn("news-card h-full", className)}>
        <CardContent className="p-0 flex flex-col h-full">
          <div className={cn("relative", featured ? "aspect-video" : "aspect-[4/3]")}>
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
            {category && (
              <span className="absolute top-2 left-2 text-xs font-medium bg-aajtak text-white px-2 py-0.5 rounded-sm">
                {category}
              </span>
            )}
          </div>
          <div className="p-3 flex flex-col flex-grow">
            <h3 className={cn("news-card-title", featured ? "text-lg" : "text-base")}>
              {title}
            </h3>
            <div className="mt-auto">
              <p className="text-xs text-muted-foreground mt-2">{timestamp}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NewsCard;
