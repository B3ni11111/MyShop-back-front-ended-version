import type { oneItemInterface } from "./item";

export type CartItem = oneItemInterface & {
    quantity: number;
};