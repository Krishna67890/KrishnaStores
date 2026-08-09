"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Upload,
  Plus,
  Trash2,
  Book as BookIcon,
  IndianRupee,
  Type,
  AlignLeft,
  CheckCircle2,
  Loader2,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import Book3D from '@/components/books/Book3D';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddBookPage = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    category: 'Programming',
    coverImage: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'book-covers');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setFormData(prev => ({ ...prev, coverImage: data.secure_url }));
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) return;

    setIsSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, 'books'), {
        ...formData,
        price: parseFloat(formData.price),
        createdAt: serverTimestamp(),
        slug: formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        featured: false,
      });
      console.log('Book added with ID: ', docRef.id);
      router.push('/admin');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. Please check your Firebase configuration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin"
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black">Add New eBook</h1>
          <p className="text-white/40 text-sm">Create a high-fidelity listing for your new masterpiece.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-8 space-y-6 border-white/5">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                <Type className="w-3 h-3" /> Book Title
              </label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Mastering Next.js 15"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Author & Price Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <BookIcon className="w-3 h-3" /> Author
                </label>
                <input
                  required
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="e.g. Krishna"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <IndianRupee className="w-3 h-3" /> Price (INR)
                </label>
                <input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="499"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                <AlignLeft className="w-3 h-3" /> Description
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your book's value proposition..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>

            {/* Cover Upload */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Book Cover</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                  previewImage ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                }`}
              >
                {isUploading ? (
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                ) : previewImage ? (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    <span className="text-sm font-bold text-emerald-500">Image Uploaded</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-white/20 mb-2" />
                    <span className="text-xs font-bold text-white/40">Drop cover image or click to browse</span>
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isUploading || isSubmitting}
            className="w-full btn-premium py-5 rounded-2xl flex items-center justify-center gap-3 text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                Publish eBook
              </>
            )}
          </button>
        </form>

        {/* 3D Preview Section */}
        <div className="sticky top-8">
          <div className="glass-card p-8 border-white/5 flex flex-col items-center">
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-[0.3em] mb-12 self-start">Live 3D Preview</h2>

            <div className="w-full max-w-[300px]">
              <Book3D
                title={formData.title || "Book Title"}
                author={formData.author || "Author Name"}
                coverImage={previewImage || undefined}
              />
            </div>

            <div className="mt-12 w-full space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Status</span>
                <span className="text-amber-500 text-xs font-black uppercase">Draft</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Visibility</span>
                <span className="text-white/80 text-xs font-black uppercase">Public</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Format</span>
                <span className="text-white/80 text-xs font-black uppercase">eBook (PDF/EPUB)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;
