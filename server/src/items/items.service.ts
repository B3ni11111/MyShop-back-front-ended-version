import { Injectable, NotFoundException } from '@nestjs/common';
import itemsData from '../data/items.json';

@Injectable()
export class ItemsService {
  private items = itemsData.flatMap((category) =>
    category.category.subCategory.flatMap((sub) => sub.items),
  );

  findAll() {
    return this.items;
  }

  findOne(id: number) {
    for (const entry of itemsData) {
      for (const subCat of entry.category.subCategory) {
        const item = subCat.items.find((i) => i.id === id);
        if (item) {
          return {
            ...item,
            brandBanner: subCat.brandBanner,
            categoryName: entry.category.categoryName,
            categoryPath: entry.category.path,
          };
        }
      }
    }
    throw new NotFoundException(`Item with id ${id} not found`);
  }

  findAllWithCategories() {
    return itemsData;
  }
}
