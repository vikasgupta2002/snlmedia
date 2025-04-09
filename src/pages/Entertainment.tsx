
import React from 'react';
import CategoryPage from './CategoryPage';
import { entertainmentNews } from '@/data/newsData';

const Entertainment = () => {
  return <CategoryPage title="Entertainment News" news={entertainmentNews} />;
};

export default Entertainment;
