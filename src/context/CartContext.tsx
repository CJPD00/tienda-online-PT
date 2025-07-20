import { createContext } from "react";
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
