import type { oneItemInterface } from "./item";
import type { CartItem } from "./cartItem";

export interface AppContextType {
  fav: oneItemInterface[];
  cart: CartItem[];
  sort: SortOption;
  itemsData: oneItemInterface[];
  resetCart: () => void;
  getTotalItems: () => number;
  addToCart: (item: oneItemInterface) => void;
  toggleFav: (item: oneItemInterface) => void;
  setSort: (sort: SortOption) => void;
  removeFromCart: (itemId: number | string) => void;
  updateQuantity: (id: number | string, newQ: number) => void;
}

export type SortOption = "default" | "lowToHigh" | "highToLow" | "recommended";
