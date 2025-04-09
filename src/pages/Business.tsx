
import React from 'react';
import CategoryPage from './CategoryPage';
import { businessNews } from '@/data/newsData';

const Business = () => {
  return <CategoryPage title="Business News" news={businessNews} />;
};

export default Business;
