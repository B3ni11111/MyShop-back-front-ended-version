import { subCategoryInterface } from "./subCategoryInterface";

export interface itemsDataInterface {
  category: {
    id: number;
    categoryName: string;
    categoryImg: string;
    path: string;
    subCategory: subCategoryInterface[];
  };
}
