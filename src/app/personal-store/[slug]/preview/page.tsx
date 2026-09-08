"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { ArrowLeft, Maximize2, Monitor, Smartphone, Tablet } from 'lucide-react';
import Link from 'next/link';

const PreviewPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const product = products.find(p => p.slug === slug);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] z-[200] flex flex-col">
      {/* Top Bar */}
      <div className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-black/50 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <Link href={`/personal-store/${slug}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit Preview</span>
          </Link>
          <div className="h-6 w-[1px] bg-white/10" />
          <h1 className="text-[12px] font-black uppercase tracking-[0.1em] text-white">
            Preview: <span className="text-purple-500">{product.title}</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
          {[
            { id: 'desktop', icon: Monitor },
            { id: 'tablet', icon: Tablet },
            { id: 'mobile', icon: Smartphone }
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDevice(d.id as any)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                device === d.id ? 'bg-white text-black' : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <d.icon className="w-5 h-5" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-[10px] font-black uppercase text-slate-500">Price</p>
            <p className="text-sm font-black text-white uppercase tracking-tight">₹{product.priceINR}</p>
          </div>
          <Link
            href={`/personal-store/${slug}`}
            className="px-6 py-3 bg-purple-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-purple-500 transition-all shadow-xl shadow-purple-500/20"
          >
            Buy Now
          </Link>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-hidden p-8 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,transparent_70%)]">
        <div
          className={`bg-white rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-700 ease-in-out relative ${
            device === 'desktop' ? 'w-full h-full' :
            device === 'tablet' ? 'w-[768px] h-[1024px] max-h-full' :
            'w-[375px] h-[667px] max-h-full'
          }`}
        >
          {/* Mock Flag UI for Preview - In reality this would load the index.html via iframe if publicly available, but here we show a high-fidelity preview */}
          <div className="absolute inset-0 bg-black flex items-center justify-center">
             <div className="text-center space-y-6">
                <div className="w-24 h-24 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 animate-pulse">Initializing Elite Asset...</p>
             </div>

             {/* Actual Flag Implementation for Demo (Limited) */}
             <iframe
               srcDoc={`
                 <html>
                   <head>
                     <style>
                       body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #000; overflow: hidden; }
                       .flag { width: 300px; height: 200px; position: relative; perspective: 1000px; }
                       .stripe { height: 33.33%; width: 100%; position: relative; }
                       .saffron { background: #FF9933; }
                       .white { background: #FFF; display: flex; justify-content: center; align-items: center; }
                       .green { background: #138808; }
                       .chakra { width: 50px; height: 50px; border: 2px solid #000080; border-radius: 50%; position: relative; animation: rotate 10s linear infinite; }
                       @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                       .wave { width: 100%; height: 100%; position: absolute; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 25%, rgba(0,0,0,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 100%); background-size: 200% 100%; animation: move 3s linear infinite; }
                       @keyframes move { 0% { background-position: 0% 0%; } 100% { background-position: 200% 0%; } }
                       .flag-wrap { animation: swing 2s ease-in-out infinite alternate; transform-origin: left center; }
                       @keyframes swing { from { transform: rotateY(-10deg); } to { transform: rotateY(15deg); } }
                     </style>
                   </head>
                   <body>
                     <div class="flag-wrap">
                       <div class="flag">
                         <div class="stripe saffron"><div class="wave"></div></div>
                         <div class="stripe white">
                           <div class="chakra"></div>
                           <div class="wave"></div>
                         </div>
                         <div class="stripe green"><div class="wave"></div></div>
                       </div>
                     </div>
                   </body>
                 </html>
               `}
               className="w-full h-full border-none opacity-0 transition-opacity duration-1000"
               onLoad={(e) => (e.currentTarget as any).style.opacity = '1'}
             />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="h-16 bg-black border-t border-white/5 px-8 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
        <div className="flex gap-8">
          <span>Resolution: {device === 'desktop' ? '1920x1080' : device === 'tablet' ? '768x1024' : '375x667'}</span>
          <span>FPS: 60 (Locked)</span>
          <span>Security: Secured by KrishnaStores Vault</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live System Active
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
