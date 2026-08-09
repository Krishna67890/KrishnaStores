import React from 'react';
import ContactClient from './ContactClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Krishna Ajaysing Rajput | Krishna Patil Rajput for support, inquiries, or feedback.",
};

const ContactPage = () => {
  return <ContactClient />;
};

export default ContactPage;
