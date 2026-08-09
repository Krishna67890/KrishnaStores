import React from 'react';
import { books, games } from "@/lib/data";
import HomeClient from './HomeClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Krishna Stores | Premium eBooks & Games",
  description: "Empowering the next generation with high-fidelity digital assets. Master development with our eBooks or explore our premium HTML5 games.",
};

export default function Home() {
  return <HomeClient books={books} games={games} />;
}
