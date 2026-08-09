"use client";

import React from 'react';
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import styles from '@/app/home.module.css';
import { motion } from 'framer-motion';

interface FeaturedBooksProps {
    products: any[];
    title: string;
    subtitle: string;
    description: string;
    viewAllLink: string;
    viewAllText: string;
}

const FeaturedBooks = ({ products, title, subtitle, description, viewAllLink, viewAllText }: FeaturedBooksProps) => {
  return (
    <section className="py-32 container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4 justify-center md:justify-start"
            >
              <BookOpen className="w-5 h-5 text-primary" />
              <span className={styles.subTitle}>{subtitle}</span>
            </motion.div>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <p className="text-white/40 text-lg font-medium mt-4">{description}</p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <Link href={viewAllLink} className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-sm font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
              {viewAllText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>
  )
}

export default FeaturedBooks;
