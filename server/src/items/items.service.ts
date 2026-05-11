import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument } from './schemas/category.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(CategoryDocument.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll() {
    const categories = await this.categoryModel.find().lean().exec();
    return categories.flatMap((entry) =>
      entry.category.subCategory.flatMap((sub) => sub.items),
    );
  }

  async findOne(id: number) {
    const categories = await this.categoryModel.find().lean().exec();
    for (const entry of categories) {
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

  async findAllWithCategories() {
    return this.categoryModel.find().lean().exec();
  }
}
