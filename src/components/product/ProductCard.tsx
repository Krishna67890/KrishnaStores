"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Heart, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { Product } from "@/types/store";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { toggleWishlist, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(card, {
        y: -10,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderColor: product.category === 'game' ? "rgba(139, 92, 246, 0.5)" :
                     product.category === 'web' ? "rgba(16, 185, 129, 0.5)" :
                     "rgba(37, 99, 235, 0.5)",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(card, {
        y: 0,
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        borderColor: "rgba(255, 255, 255, 0.08)",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [product.category]);

  const isGame = product.category === "game";
  const isWeb = product.category === "web";
  const isBook = product.category === "book";

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 shadow-2xl",
        isGame && "hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]",
        isWeb && "hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
        isBook && "hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black/40 border-b border-white/5">
        <div ref={imageRef} className="w-full h-full relative">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-opacity duration-700 opacity-80 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className={cn(
            "px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border backdrop-blur-md",
            isBook && "bg-blue-500/10 text-blue-400 border-blue-500/20",
            isGame && "bg-purple-500/10 text-purple-400 border-purple-500/20",
            isWeb && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          )}>
            {product.category}
          </span>
        </div>

        {/* Wishlist Toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={cn(
            "absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-xl backdrop-blur-md border transition-all duration-300",
            isWishlisted
              ? "bg-red-500 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              : "bg-black/20 border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/50"
          )}
        >
          <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-black text-white tracking-tight mb-2 group-hover:text-white transition-colors duration-300 line-clamp-1 uppercase">
          {product.title}
        </h3>
        <p className="text-[11px] text-slate-400 mb-6 line-clamp-2 leading-relaxed font-medium">
          {product.shortDescription}
        </p>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white tracking-tighter">
              ₹{product.priceINR}
              {product.priceUSD && (
                <span className="text-slate-500 text-[10px] ml-1 font-bold">
                  / ${product.priceUSD}
                </span>
              )}
            </span>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="w-10 h-10 flex items-center justify-center bg-white/5 text-white rounded-xl hover:bg-white/10 border border-white/10 transition-all"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={product.gumroadUrl || product.itchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95",
                isGame ? "bg-purple-600 text-white hover:bg-purple-500 shadow-purple-900/20" :
                isWeb ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-900/20" :
                "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/20"
              )}
            >
              GET <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
