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
      alert("Thank you! Your transmission has been received by the hub.");
    }, 2000);
  };

  return (
    <div className="pt-40 pb-32 bg-[#050505] min-h-screen text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-20 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
                <img
                  src="/important/KrishnaStores%20logo.png"
                  alt="KrishnaStores"
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8 backdrop-blur-md"
          >
            <MessageSquare className="w-4 h-4" /> Uplink Protocol Active
          </motion.div>
          <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter uppercase leading-[0.8] mb-10">
            GET IN<br />
            <span className="text-slate-800">TOUCH.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Krishna Ajaysing Rajput | Krishna Patil Rajput. <br/>
            Professional blueprints for digital mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] -mr-10 -mt-10" />
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-12">Transmission Hub</h3>

              <div className="space-y-10">
                <a href="mailto:krishna.coders12@gmail.com" className="flex gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:border-blue-500/50 transition-all">
                    <Mail className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] mb-2">Direct Mail</p>
                    <p className="text-lg font-black uppercase tracking-tight group-hover:text-blue-500 transition-colors">krishna.coders12@gmail.com</p>
                  </div>
                </a>

                <a href="https://github.com/Krishna67890" target="_blank" rel="noopener noreferrer" className="flex gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] mb-2">Source Code</p>
                    <p className="text-lg font-black uppercase tracking-tight group-hover:text-white transition-colors">@Krishna67890</p>
                  </div>
                </a>

                <a href="https://linkedin.com/in/krishna-patil-rajput-b66b03340" target="_blank" rel="noopener noreferrer" className="flex gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-[#0077b5]/10 border border-[#0077b5]/20 flex items-center justify-center shrink-0 group-hover:bg-[#0077b5] group-hover:text-white transition-all">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] mb-2">Network</p>
                    <p className="text-lg font-black uppercase tracking-tight group-hover:text-[#0077b5] transition-colors">Krishna Patil Rajput</p>
                  </div>
                </a>

                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] mb-2">Sector</p>
                    <p className="text-lg font-black uppercase tracking-tight">Maharashtra, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-12 border-t border-white/5">
                 <div className="flex items-center gap-5">
                    <div className="flex -space-x-4">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0a0a0a] bg-slate-800" />
                      ))}
                    </div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                      <span className="text-white">10k+</span> creators empowered <br/>by our digital protocol
                    </p>
                 </div>
              </div>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-between group hover:bg-white/[0.08] transition-all">
              <div>
                <p className="text-sm font-black uppercase tracking-widest mb-1">Elite Support</p>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Priority for premium members</p>
              </div>
              <button className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                 <Globe className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-10 md:p-16 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[100px] -z-10" />
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Identifier</label>
                    <input
                      required
                      type="text"
                      placeholder="YOUR NAME"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-xs font-black uppercase tracking-[0.2em] focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Uplink Address</label>
                    <input
                      required
                      type="email"
                      placeholder="EMAIL@HUB.COM"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-xs font-black uppercase tracking-[0.2em] focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Sector</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer">
                    <option className="bg-[#050505]">General Inquiry</option>
                    <option className="bg-[#050505]">Asset Support</option>
                    <option className="bg-[#050505]">Collaboration</option>
                    <option className="bg-[#050505]">Technical Protocol</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Transmission Message</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="DESCRIBE YOUR REQUEST..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-xs font-black uppercase tracking-[0.2em] focus:outline-none focus:border-blue-500/50 transition-all resize-none placeholder:text-slate-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-12 py-6 bg-white text-black text-xs font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-2xl active:scale-95 flex items-center justify-center gap-4 group"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      Execute Uplink <Send className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                    </>
                  )}
                </button>

                <p className="text-center text-[9px] font-black text-slate-600 uppercase tracking-widest">
                  Secure end-to-end encrypted transmission. Privacy protocols apply.
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
