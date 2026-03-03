# Plan: Add Dedicated Endpoints for SubCat.tsx and ShopItems.tsx

## Summary
Create dedicated backend endpoints to serve SubCat.tsx and ShopItems.tsx instead of having both fetch the entire dataset from `/api/items/full`.

## New Endpoints

### 1. `GET /api/items/category/:path` (for SubCat.tsx)
Returns a single category with its subcategories.

### 2. `GET /api/items/category/:mainCat/:subCat` (for ShopItems.tsx)
Returns items for a specific subcategory. When `subCat` is "all", returns all items in that category.

## Files to Modify

### 1. `server/src/items/items.service.ts`
Add two methods:

```typescript
findCategory(path: string) {
  const entry = itemsData.find((e) => e.category.path === path);
  if (!entry) {
    throw new NotFoundException(`Category ${path} not found`);
  }
  return entry.category;
}

findSubcategoryItems(mainCat: string, subCat: string) {
  const entry = itemsData.find((e) => e.category.path === mainCat);
  if (!entry) {
    throw new NotFoundException(`Category ${mainCat} not found`);
  }

  if (subCat.toLowerCase() === 'all') {
    return {
      categoryName: entry.category.categoryName,
      items: entry.category.subCategory.flatMap((sub) => sub.items),
    };
  }

  const sub = entry.category.subCategory.find(
    (s) => s.path.toLowerCase() === subCat.toLowerCase(),
  );
  if (!sub) {
    throw new NotFoundException(`Subcategory ${subCat} not found`);
  }
  return sub;
}
```

### 2. `server/src/items/items.controller.ts`
Add two endpoints (before the `:id` route):

```typescript
@Get('category/:path')
findCategory(@Param('path') path: string) {
  return this.itemsService.findCategory(path);
}

@Get('category/:mainCat/:subCat')
findSubcategoryItems(
  @Param('mainCat') mainCat: string,
  @Param('subCat') subCat: string,
) {
  return this.itemsService.findSubcategoryItems(mainCat, subCat);
}
```

### 3. `src/components/SubCat.tsx`
Update to fetch from `/api/items/category/:mainCat`:
- Change fetch URL to `http://localhost:3000/api/items/category/${mainCat}`
- Update state type to hold a single category object
- Remove the `.find()` filtering logic

### 4. `src/components/ShopItems.tsx`
Update to fetch from `/api/items/category/:mainCat/:subCat`:
- Change fetch URL to `http://localhost:3000/api/items/category/${mainCat}/${subCat}`
- Update state to hold the response directly
- Simplify logic since backend does the filtering

## API Response Shapes

### GET /api/items/category/:path
```json
{
  "id": 100,
  "categoryName": "Mobile",
  "categoryImg": "...",
  "path": "mobile",
  "subCategory": [{ "name": "ios", "img": "...", "path": "IOS", "items": [...] }, ...]
}
```

### GET /api/items/category/:mainCat/:subCat
For specific subcategory:
```json
{
  "name": "ios",
  "img": "...",
  "brandBanner": "...",
  "path": "IOS",
  "items": [{ "id": 1, "product": "...", "price": 999, "img": "...", "info": "..." }, ...]
}
```

For "all":
```json
{
  "categoryName": "Mobile",
  "items": [...]
}
```

## Verification
1. Start backend: `cd server && npm run start:dev`
2. Test endpoints:
   - `curl http://localhost:3000/api/items/category/mobile`
   - `curl http://localhost:3000/api/items/category/mobile/IOS`
   - `curl http://localhost:3000/api/items/category/mobile/all`
3. Start frontend: `npm run dev`
4. Test SubCat: Navigate to `/shop/mobile` - verify subcategories display
5. Test ShopItems: Navigate to `/shop/mobile/IOS` - verify items display
6. Test "all": Navigate to `/shop/mobile/all` - verify all category items display
