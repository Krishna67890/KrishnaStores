import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn about how we look after your personal data when you visit our website.",
};

const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-8 text-center">Privacy <span className="premium-gradient-text">Policy</span></h1>
        <p className="text-white/40 text-center mb-16">Last Updated: August 02, 2026</p>

        <div className="glass-card p-8 md:p-12 space-y-10 text-white/70 leading-relaxed">
          <section>
            <div className="flex items-center gap-3 mb-4 text-white">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Introduction</h2>
            </div>
            <p>
              Welcome to KrishnaBookStores. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-white">
              <Eye className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Data We Collect</h2>
            </div>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
              <li><strong>Financial Data:</strong> includes payment card details (processed via secure third-party gateways).</li>
              <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-white">
              <Lock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">How We Use Your Data</h2>
            </div>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>To register you as a new customer and manage your account.</li>
              <li>To process and deliver your orders including managing payments.</li>
              <li>To deliver relevant website content and advertisements to you.</li>
              <li>To use data analytics to improve our website, products, and services.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-white">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Data Security</h2>
            </div>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section className="pt-10 border-t border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
              <br />
              <strong>Email:</strong> krishna.coders12@gmail.com
              <br />
              <strong>Address:</strong> Maharashtra, India
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
