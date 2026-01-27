import type { Item } from "./item";

export type CartItem = Item & {
    quantity: number;
};