
export type Language = 'ar' | 'en';

export interface Product {
  id: string;
  name: { [key in Language]: string };
  price: number;
  oldPrice?: number;
  category: string;
  subCategory?: string; // e.g., 'men', 'women', 'kids'
  targetAge?: 'adult' | 'child'; // 'adult' for big, 'child' for small
  image: string;
  isLocal: boolean;
  storeUrl?: string;
  description: { [key in Language]: string };
  isNew?: boolean;
  isSale?: boolean;
  sku?: string;
  brand?: string;
}

export interface GlobalStore {
  id: string;
  name: string;
  logo: string;
  url: string;
  description: { [key in Language]: string };
}

export interface Category {
  id: string;
  name: { [key in Language]: string };
  image: string;
  itemCount: number;
  subCategories?: { id: string; name: { [key in Language]: string } }[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
}
