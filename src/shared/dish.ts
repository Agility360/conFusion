import { Comment } from './comment';

export interface Dish {
  id: number;
  name: string;
  image: string;
  category: string;
  label: string;
  price: string;
  featured: boolean;
  description: boolean;
  comments: Comment[];
}
