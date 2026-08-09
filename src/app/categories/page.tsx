import { books } from '@/lib/data';
import CategoriesClient from './CategoriesClient';

export default function CategoriesPage() {
  const recommendedBooks = books.slice(0, 3);
  return <CategoriesClient recommendedBooks={recommendedBooks} />;
}
