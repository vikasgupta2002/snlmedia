
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NewsItem {
  id: number;
  title: string;
  image: string;
  category: string;
  timestamp: string;
}

const featuredNews: NewsItem[] = [
  {
    id: 1,
    title: "Supreme Court issues new guidelines on electoral bonds",
    image: "https://picsum.photos/id/1/800/450",
    category: "Politics",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    title: "Indian economy shows signs of robust growth in Q1",
    image: "https://picsum.photos/id/20/800/450",
    category: "Business",
    timestamp: "3 hours ago"
  },
  {
    id: 3,
    title: "National cricket team secures victory in World Cup match",
    image: "https://picsum.photos/id/30/800/450",
    category: "Sports",
    timestamp: "5 hours ago"
  },
  {
    id: 4,
    title: "New technological innovations showcased at Tech Summit 2025",
    image: "https://picsum.photos/id/40/800/450",
    category: "Technology",
    timestamp: "Yesterday"
  }
];

const FeaturedSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredNews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredNews.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div 
        className="flex transition-transform duration-500 ease-in-out" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {featuredNews.map((item) => (
          <div key={item.id} className="min-w-full">
            <Card className="border-0 rounded-none">
              <CardContent className="relative p-0 aspect-[16/9] md:aspect-[21/9]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium bg-aajtak px-2 py-0.5 rounded-sm mr-2">
                      {item.category}
                    </span>
                    <span className="text-xs opacity-75">{item.timestamp}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold leading-tight">{item.title}</h2>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

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
        {featuredNews.map((_, index) => (
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
    </div>
  );
};

export default FeaturedSlider;
