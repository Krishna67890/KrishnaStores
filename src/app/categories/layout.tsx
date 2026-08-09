import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Book Categories",
  description: "Browse our premium eBooks by category: Programming, Self-Help, AI, and Career Mastery.",
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
