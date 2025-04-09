
import React from 'react';
import CategoryPage from './CategoryPage';
import { technologyNews } from '@/data/newsData';

const Technology = () => {
  return <CategoryPage title="Technology News" news={technologyNews} />;
};

export default Technology;
