
import React from 'react';
import CategoryPage from './CategoryPage';
import { sportsNews } from '@/data/newsData';

const Sports = () => {
  return <CategoryPage title="Sports News" news={sportsNews} />;
};

export default Sports;
