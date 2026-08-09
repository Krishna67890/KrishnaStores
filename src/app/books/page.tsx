import React from 'react';
import { books } from '@/lib/data';
import BooksClient from './BooksClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Premium eBook Collection",
  description: "Invest in yourself with our curated collection of knowledge. Browse all our high-fidelity guides and roadmaps.",
};

const BooksPage = () => {
  const filteredBooks = books.filter(book => book.category !== 'Website Store');
  return <BooksClient books={filteredBooks} />;
};

export default BooksPage;
