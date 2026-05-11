export class CreateItemDto {
  id: number | string;
  product: string;
  price: number;
  img: string;
  info: string;
}

export class UpdateItemDto {
  id?: number | string;
  product?: string;
  price?: number;
  img?: string;
  info?: string;
}

export class ItemResponseDto {
  id: number | string;
  product: string;
  price: number;
  img: string;
  info: string;
  brandBanner?: string;
  categoryName?: string;
  categoryPath?: string;
}

export class SubCategoryDto {
  name: string;
  img: string;
  brandBanner: string;
  path: string;
  items: CreateItemDto[];
}

export class CategoryDto {
  id: number;
  categoryName: string;
  categoryImg: string;
  path: string;
  subCategory: SubCategoryDto[];
}

export class ItemsDataDto {
  category: CategoryDto;
}
