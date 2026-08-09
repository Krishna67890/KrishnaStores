import React from 'react';
import AboutClient from './AboutClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Our Mission",
  description: "Empowering The Next Generation. KrishnaBookStores delivers high-fidelity educational experiences and blueprints for professional mastery.",
};

const AboutPage = () => {
  return <AboutClient />;
};

export default AboutPage;
