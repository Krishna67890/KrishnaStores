"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles, Globe, Github, Linkedin } from 'lucide-react';

const ContactClient = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you! Your message has been sent successfully.");
    }, 2000);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/10">
                <img
                  src="/assets/devloper logo.jpg"
                  alt="Krishna Patil Rajput"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6"
          >
            <MessageSquare className="w-4 h-4" /> WE'RE HERE TO HELP
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">Get in <span className="premium-gradient-text">Touch</span></h1>
          <p className="text-xl text-white/60">
            Krishna Ajaysing Rajput | Krishna Patil Rajput
          </p>
          <p className="text-lg text-white/40 mt-2">
            Professional Blueprints for Mastery. Escape Tutorial Hell.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card p-8 border-white/5 bg-gradient-to-br from-primary/5 to-transparent">
              <h3 className="text-2xl font-bold mb-8">Connect With Me</h3>

              <div className="space-y-8">
                <a href="mailto:krishna.coders12@gmail.com" className="flex gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-1">Email</p>
                    <p className="text-lg font-medium group-hover:text-primary transition-colors">krishna.coders12@gmail.com</p>
                  </div>
                </a>

                <a href="https://github.com/Krishna67890" target="_blank" rel="noopener noreferrer" className="flex gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-1">GitHub</p>
                    <p className="text-lg font-medium group-hover:text-primary transition-colors">@Krishna67890</p>
                  </div>
                </a>

                <a href="https://linkedin.com/in/krishna-patil-rajput-b66b03340" target="_blank" rel="noopener noreferrer" className="flex gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-[#0077b5]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0077b5]/20 transition-colors">
                    <Linkedin className="w-6 h-6 text-[#0077b5]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-1">LinkedIn</p>
                    <p className="text-lg font-medium group-hover:text-primary transition-colors">Krishna Patil Rajput</p>
                  </div>
                </a>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-1">Location</p>
                    <p className="text-lg font-medium">Maharashtra, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-white/10">
                 <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-slate-800" />
                      ))}
                    </div>
                    <p className="text-sm text-white/60"><span className="text-white font-bold">10k+</span> students helped</p>
                 </div>
              </div>
            </div>

            <div className="glass-card p-8 border-white/5 flex items-center justify-between">
              <div>
                <p className="font-bold mb-1">Live Chat Support</p>
                <p className="text-sm text-white/40">Available for premium members</p>
              </div>
              <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                 <Globe className="w-6 h-6 text-primary" />
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 md:p-12 border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -z-10" />
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Krishna Patil"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="krishna@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Subject</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer">
                    <option className="bg-background">General Inquiry</option>
                    <option className="bg-background">Purchase Support</option>
                    <option className="bg-background">Book Contribution</option>
                    <option className="bg-background">Technical Issue</option>
                    <option className="bg-background">Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Message</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="How can we help you today?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-premium py-5 text-lg flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-white/40">
                  By submitting this form, you agree to our <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactClient;
