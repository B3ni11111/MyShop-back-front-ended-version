import { CatItem, SubCategory } from "./catItem";

export type CatItemProps =
    | { category: CatItem; isMainCategory: true; subCategory?: never; mainCategoryPath?: never }
    | { subCategory: SubCategory; mainCategoryPath: string; isMainCategory: false; category?: never };
