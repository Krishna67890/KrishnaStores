"use client";

import React, { useState, useEffect } from "react";
import { products } from "@/data/products";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  category?: string;
}

const ProductGrid = ({ products, category }: ProductGridProps) => {
  const [filter, setFilter] = useState("ALL");
  const [sort, setSort] = useState("FEATURED");

  const filteredProducts = products
    .filter((p) => {
      if (category && p.category !== category) return false;
      if (filter === "ALL") return true;
      return p.tags.some((tag: string) => tag.toUpperCase() === filter);
    })
    .sort((a, b) => {
      if (sort === "PRICE_LOW") return a.priceINR - b.priceINR;
      if (sort === "PRICE_HIGH") return b.priceINR - a.priceINR;
      return (a.featured ? -1 : 1) - (b.featured ? -1 : 1);
    });

  useEffect(() => {
    gsap.from(".product-grid-item", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
    });
  }, [filter, sort]);

  const allTags = Array.from(new Set(products.flatMap((p: Product) => p.tags.map((t: string) => t.toUpperCase()))));

  return (
    <div className="w-full">
      {/* Premium Dark Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 border-b border-white/5 pb-12">
        <div className="flex flex-wrap gap-4">
          {["ALL", ...allTags].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={cn(
                "px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 border",
                filter === t
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "bg-white/5 text-slate-400 border-white/10 hover:border-white/30 hover:text-white"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] shrink-0">Filter By:</span>
          <div className="relative w-full md:w-64">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3.5 rounded-2xl outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option value="FEATURED">Featured Elite</option>
              <option value="PRICE_LOW">Price: Ascending</option>
              <option value="PRICE_HIGH">Price: Descending</option>
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              ↓
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-grid-item">
            <ProductCard product={product} />
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-40 text-center bg-white/5 rounded-[3rem] border border-dashed border-white/10">
            <p className="text-slate-500 text-sm font-black uppercase tracking-[0.4em]">Zero matches in current sector</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductGrid;
