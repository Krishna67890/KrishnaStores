import React from 'react';
import { books, galleryImages } from '@/lib/data';
import GalleryClient from './GalleryClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Visual Gallery",
  description: "Inside Our Premium Books. Take a look at the high-quality content, structured roadmaps, and professional layouts.",
};

const GalleryPage = () => {
  // Combine derivation from books and the specific galleryImages array
  const bookDerivedImages = books.flatMap(book =>
    (book.images || []).map((img: string, i: number) => ({
      id: `book-${book.id}-${i}`,
      src: img,
      title: book.title,
      slug: book.slug,
      category: book.category,
      alt: `${book.title} Preview ${i + 1}`
    }))
  );

  const manualGalleryItems = galleryImages.map(img => ({
    id: `manual-${img.id}`,
    src: img.src,
    title: img.title || img.alt,
    slug: img.slug,
    category: img.category,
    alt: img.alt
  }));

  const allItems = [...bookDerivedImages, ...manualGalleryItems];
  // Remove duplicates by src
  const uniqueItems = Array.from(new Map(allItems.map(item => [item.src, item])).values());

  return <GalleryClient items={uniqueItems} />;
};

export default GalleryPage;
