import React from 'react';
import { FileText, Scale, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "By accessing or using the KrishnaBookStores website, you agree to be bound by these Terms of Service.",
};

const TermsOfService = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-8 text-center">Terms of <span className="premium-gradient-text">Service</span></h1>
        <p className="text-white/40 text-center mb-16">Last Updated: August 02, 2026</p>

        <div className="glass-card p-8 md:p-12 space-y-10 text-white/70 leading-relaxed">
          <section>
            <div className="flex items-center gap-3 mb-4 text-white">
              <Scale className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">1. Agreement to Terms</h2>
            </div>
            <p>
              By accessing or using the KrishnaBookStores website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service. These terms apply to all visitors, users, and others who access or use the service.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-white">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">2. Digital Products & Licenses</h2>
            </div>
            <p className="mb-4">
              When you purchase an eBook or digital product from KrishnaBookStores:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <span>You are granted a non-exclusive, non-transferable, personal license to use the content.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <span>You may not redistribute, resell, or share the digital files with others.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <span>The content is protected by copyright laws and intellectual property rights.</span>
              </li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-white">
              <ShieldAlert className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">3. Purchases & Refunds</h2>
            </div>
            <p>
              All purchases made through our platform are final. Due to the nature of digital products, we generally do not offer refunds once the product has been downloaded or accessed. However, we may consider refund requests on a case-by-step basis if there is a technical defect that prevents access.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-white">
              <h2 className="text-2xl font-bold">4. User Accounts</h2>
            </div>
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the terms, which may result in immediate termination of your account on our service.
            </p>
          </section>

          <section className="pt-10 border-t border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
