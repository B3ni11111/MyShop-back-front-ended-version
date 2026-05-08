import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  product: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  info: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

@Schema()
export class SubCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  brandBanner: string;

  @Prop({ required: true })
  path: string;

  @Prop({ type: [ItemSchema], required: true })
  items: Item[];
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

@Schema()
export class Category {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  categoryName: string;

  @Prop({ required: true })
  categoryImg: string;

  @Prop({ required: true })
  path: string;

  @Prop({ type: [SubCategorySchema], required: true })
  subCategory: SubCategory[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);

@Schema({ collection: 'itemData' })
export class CategoryDocument extends Document {
  @Prop({ type: CategorySchema, required: true })
  category: Category;
}

export const CategoryDocumentSchema =
  SchemaFactory.createForClass(CategoryDocument);
