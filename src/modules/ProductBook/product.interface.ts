export type Category =
  | 'Fiction'
  | 'Science'
  | 'SelfDevelopment'
  | 'Poetry'
  | 'Religious';

export type IProduct<Category extends string> = {
  title: string;
  author: string;
  price: number;
  category: Category;
  description: string;
  quantity: number;
  inStock: boolean;
};
