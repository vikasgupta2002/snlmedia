
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import BreakingNews from '@/components/BreakingNews';
import Footer from '@/components/Footer';
import { 
  nationalNews,
  internationalNews,
  sportsNews,
  entertainmentNews,
  businessNews,
  technologyNews,
  NewsItem
} from '@/data/newsData';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Share2, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrendingNews from '@/components/TrendingNews';
import NewsCard from '@/components/NewsCard';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const allNews = useMemo(() => [
    ...nationalNews,
    ...internationalNews,
    ...sportsNews,
    ...entertainmentNews,
    ...businessNews,
    ...technologyNews
  ], []);
  
  const newsItem = useMemo(() => 
    allNews.find(item => item.id === parseInt(id || '0')),
    [id, allNews]
  );
  
  const relatedNews = useMemo(() => 
    allNews
      .filter(item => item.category === newsItem?.category && item.id !== newsItem?.id)
      .slice(0, 3),
    [allNews, newsItem]
  );

  if (!newsItem) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow news-container py-6">
          <h1 className="text-3xl font-bold mb-4">News article not found</h1>
          <p className="mb-4">The article you are looking for does not exist or has been removed.</p>
          <Link to="/" className="text-aajtak hover:underline">
            Return to homepage
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BreakingNews />
      <main className="flex-grow">
        <article className="news-container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-2">
                <Link 
                  to={`/${newsItem.category?.toLowerCase()}`} 
                  className="text-sm font-medium bg-aajtak text-white px-2 py-0.5 rounded-sm"
                >
                  {newsItem.category}
                </Link>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {newsItem.title}
              </h1>
              
              <div className="flex items-center text-muted-foreground mb-6">
                <Clock className="mr-2 h-4 w-4" />
                <span className="text-sm">{newsItem.timestamp}</span>
                
                <div className="ml-auto flex items-center space-x-2">
                  <span className="text-sm">Share:</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mb-6">
                <img 
                  src={newsItem.image} 
                  alt={newsItem.title}
                  className="w-full rounded-lg"
                />
              </div>
              
              <div className="prose max-w-none">
                <p className="text-lg font-medium mb-4">
                  {newsItem.summary}
                </p>
                
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
                </p>
                
                <p className="mb-4">
                  Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue.
                </p>
                
                <h2 className="text-xl font-bold mt-6 mb-4">Further Developments</h2>
                
                <p className="mb-4">
                  Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula.
                </p>
                
                <p className="mb-4">
                  Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </p>
                
                <h2 className="text-xl font-bold mt-6 mb-4">Expert Analysis</h2>
                
                <p className="mb-4">
                  Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi pellentesque, mauris interdum porta tincidunt, neque orci molestie mauris, vitae iaculis dolor felis at nunc.
                </p>
                
                <p className="mb-4">
                  Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <TrendingNews />
              
              <Card>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-4">Related News</h3>
                  <Separator className="mb-4" />
                  <div className="space-y-4">
                    {relatedNews.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div>
                          <Link to={`/news/${item.id}`}>
                            <h4 className="font-semibold line-clamp-2 leading-tight text-sm hover:text-aajtak">
                              {item.title}
                            </h4>
                          </Link>
                          <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          <div className="mt-10">
            <h2 className="news-section-title mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allNews.slice(0, 4).map((item) => (
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
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;
