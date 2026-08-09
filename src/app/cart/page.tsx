import React from 'react';
import CartClient from './CartClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your selected premium eBooks before proceeding to checkout.",
};

const CartPage = () => {
  return <CartClient />;
};

export default CartPage;
