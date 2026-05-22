export interface MenuItemSize {
  label: string;
  price: number;
  widthInches?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes?: MenuItemSize[];
  category: "pizza" | "burger" | "sides";
  image: string;
  badge?: string;
  popular?: boolean;
  physicalWidthInches?: number;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image: string;
}
