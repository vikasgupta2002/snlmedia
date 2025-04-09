
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TrendingItem {
  id: number;
  title: string;
  timestamp: string;
}

const trendingItems: TrendingItem[] = [
  {
    id: 101,
    title: "Government announces new policy for renewable energy sector",
    timestamp: "3 hours ago"
  },
  {
    id: 102,
    title: "Star athlete breaks national record at championship event",
    timestamp: "5 hours ago"
  },
  {
    id: 103,
    title: "Major film wins multiple awards at international festival",
    timestamp: "Yesterday"
  },
  {
    id: 104,
    title: "Health ministry issues new guidelines for pandemic response",
    timestamp: "Yesterday"
  },
  {
    id: 105,
    title: "Stock market reaches all-time high amid positive economic outlook",
    timestamp: "2 days ago"
  }
];

const TrendingNews = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-bold">
          <TrendingUp className="mr-2 h-5 w-5 text-aajtak" />
          Trending Now
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <ul className="space-y-4">
          {trendingItems.map((item, index) => (
            <li key={item.id} className="border-b pb-3 last:border-b-0 last:pb-0">
              <Link to={`/news/${item.id}`} className="group">
                <div className="flex gap-3">
                  <span className="text-aajtak font-bold">{index + 1}</span>
                  <div>
                    <p className="font-medium group-hover:text-aajtak transition-colors line-clamp-2">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TrendingNews;
