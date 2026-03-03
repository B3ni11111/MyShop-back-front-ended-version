import { oneItemInterface } from "./item";

export interface subCategoryInterface {
  name: string;
  img: string;
  brandBanner: string;
  path: string;
  items: oneItemInterface[];
}
