import React from 'react';
import BlogClient from './BlogClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog & Insights",
  description: "Tutorials, career guides, and professional advice from industry experts at KrishnaBookStores.",
};

const BlogPage = () => {
  const posts = [
    {
      id: 1,
      title: "How to Master React 19: A Developer's Guide",
      excerpt: "React 19 is here with revolutionary features like Actions and the Compiler. Learn how to stay ahead of the curve.",
      author: "Krishna Patil",
      date: "August 12, 2024",
      category: "Programming",
      image: "/blog/react-19.jpg"
    },
    {
      id: 2,
      title: "The Emotional Journey of Heartbreak and Healing",
      excerpt: "Understanding the science behind heartbreak and why self-worth is your greatest asset in moving forward.",
      author: "Aniket S. Kardile",
      date: "August 10, 2024",
      category: "Self-Help",
      image: "/blog/healing.jpg"
    },
    {
      id: 3,
      title: "Building AI Agents with Prompt Engineering",
      excerpt: "A deep dive into how to create intelligent agents that can solve complex tasks using advanced prompting techniques.",
      author: "Admin",
      date: "August 05, 2024",
      category: "AI",
      image: "/blog/ai-agents.jpg"
    }
  ];

  return <BlogClient posts={posts} />;
};

export default BlogPage;
