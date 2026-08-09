import React from 'react';
import { bundles } from '@/lib/data';
import BundlesClient from './BundlesClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Elite Book Bundles",
  description: "Master your craft with our curated 'Blueprints for Success'. Get multiple high-fidelity guides at an unbeatable value.",
  openGraph: {
    title: "Premium Book Bundles | KrishnaStores",
    description: "Save big on our elite collection of programming and growth bundles.",
  }
};

const BundlesPage = () => {
  return <BundlesClient bundles={bundles} />;
};

export default BundlesPage;
