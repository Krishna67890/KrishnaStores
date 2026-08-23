import React from 'react';
import { books } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BookDetailClient from '../../book/[slug]/BookDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = books.find((b) => b.slug === slug && b.category === 'Website Store');

  if (!product) return { title: "Product Not Found" };

  const ogImage = product.coverImage || product.image || '';

  return {
    title: product.title,
    description: product.subtitle || product.description.substring(0, 160),
    openGraph: {
      title: product.title,
      description: product.subtitle,
      images: ogImage ? [ogImage] : [],
    }
  };
}

export default async function WebsiteProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = books.find((b) => b.slug === slug && b.category === 'Website Store');

  if (!product) {
    notFound();
  }

  return <BookDetailClient book={product} />;
}
