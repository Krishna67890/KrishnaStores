import React from 'react';
import CheckoutClient from './CheckoutClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase and get instant access to your premium eBooks.",
};

const CheckoutPage = () => {
  return <CheckoutClient />;
};

export default CheckoutPage;
