import React from 'react';
import { books } from '@/lib/data';
import { Metadata } from 'next';
import CategoryClient from './CategoryClient';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return {
    title: `${decodedCategory} Books`,
    description: `Browse our premium collection of ${decodedCategory} eBooks at KrishnaBookStores.`,
    openGraph: {
      title: `${decodedCategory} Collection | KrishnaBookStores`,
      description: `Premium blueprints for ${decodedCategory} mastery.`,
    }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const filteredBooks = books.filter(
    (b) => b.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  return <CategoryClient category={category} books={filteredBooks} />;
}
