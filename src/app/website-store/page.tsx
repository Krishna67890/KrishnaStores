import React from 'react';
import { books } from '@/lib/data';
import WebsiteStoreClient from './WebsiteStoreClient';

export const metadata = {
  title: 'Website Store | Krishna Stores',
  description: 'Premium website source code and templates.',
};

export default function WebsiteStorePage() {
  const websiteProducts = books.filter(book => book.category === 'Website Store');

  return <WebsiteStoreClient products={websiteProducts} />;
}
