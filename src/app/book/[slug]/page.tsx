import React from 'react';
import { books } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BookDetailClient from './BookDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);

  if (!book) return { title: "Book Not Found" };

  return {
    title: book.title,
    description: book.subtitle || book.description.substring(0, 160),
    openGraph: {
      title: book.title,
      description: book.subtitle,
      images: [book.coverImage],
    },
    twitter: {
      card: "summary_large_image",
      title: book.title,
      description: book.subtitle,
      images: [book.coverImage],
    }
  };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);

  if (!book) {
    notFound();
  }

  return <BookDetailClient book={book} />;
}
