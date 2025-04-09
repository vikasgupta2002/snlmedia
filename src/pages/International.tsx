
import React from 'react';
import CategoryPage from './CategoryPage';
import { internationalNews } from '@/data/newsData';

const International = () => {
  return <CategoryPage title="International News" news={internationalNews} />;
};

export default International;
