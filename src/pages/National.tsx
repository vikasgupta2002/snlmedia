
import React from 'react';
import CategoryPage from './CategoryPage';
import { nationalNews } from '@/data/newsData';

const National = () => {
  return <CategoryPage title="National News" news={nationalNews} />;
};

export default National;
