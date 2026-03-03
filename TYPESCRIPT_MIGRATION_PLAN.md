# TypeScript Migration Plan

## Overview

Convert the React Shop application from JavaScript to TypeScript for better type safety, IDE support, and maintainability.

## Current State

- ✅ TypeScript already installed (v5.9.3)
- ✅ @types/react and @types/react-dom installed
- ✅ Vite with React plugin configured
- 📝 Need: TypeScript config, type definitions, file conversions

## Migration Strategy

### Phase 1: Configuration & Type Definitions

1. **Create `tsconfig.json`**
   - Configure for React + Vite
   - Enable strict mode for better type safety
   - Set up path resolution

2. **Create `src/types.ts`**
   - Define `Item` interface (product data structure)
   - Define `CartItem` interface (Item + quantity)
   - Define `AppContextType` interface
   - Define `ThemeMode` type ('light' | 'dark')

3. **Create `vite-env.d.ts`**
   - Type declarations for Vite environment
   - Image import declarations

4. **Convert `vite.config.js` → `vite.config.ts`**

### Phase 2: Core Files (Bottom-Up Approach)

1. **Data & Hooks** (no dependencies on components)
   - `itemsData.js` → `itemsData.ts`
   - `hooks/useThemePreference.js` → `useThemePreference.ts`

2. **Utilities**
   - `components/Theme.jsx` → `Theme.tsx`

### Phase 3: Components (Dependency Order)

1. **Leaf Components** (no child component dependencies)
   - `Fav.jsx` → `Fav.tsx` (if still used)
   - `Button.jsx` → `Button.tsx` (if still used)

2. **Context Provider**
   - `App.jsx` → `App.tsx` (with typed context)

3. **Page Components**
   - `components/ShopItems.jsx` → `ShopItems.tsx`
   - `components/Cart.jsx` → `Cart.tsx`
   - `components/ItemPage.jsx` → `ItemPage.tsx`
   - `components/Header.jsx` → `Header.tsx`
   - `components/Footer.jsx` → `Footer.tsx`
   - `components/BetterItem.jsx` → `BetterItem.tsx`
   - `components/ThemeToggle.jsx` → `ThemeToggle.tsx`

4. **Entry Point**
   - `main.jsx` → `main.tsx`
   - Update `index.html` script reference

## Type Definitions Needed

### Item Interface

```typescript
interface Item {
  id: number;
  product: string;
  price: number;
  img: string; // or string (imported image URL)
  info: string;
}
```

### CartItem Interface

```typescript
interface CartItem extends Item {
  quantity: number;
}
```

### AppContextType Interface

```typescript
interface AppContextType {
  itemsData: Item[];
  mode: "light" | "dark";
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (id: number, newQ: number) => void;
  getTotalItems: () => number;
}
```

### ThemeMode Type

```typescript
type ThemeMode = "light" | "dark";
```

## File Conversion Checklist

### Configuration Files

- [ ] `tsconfig.json` - Create
- [ ] `vite.config.ts` - Convert from .js
- [ ] `vite-env.d.ts` - Create
- [ ] `index.html` - Update script reference

### Type Definitions

- [ ] `src/types.ts` - Create

### Data & Hooks

- [ ] `src/itemsData.js` → `itemsData.ts`
- [ ] `src/hooks/useThemePreference.js` → `useThemePreference.ts`

### Components

- [ ] `src/components/Theme.jsx` → `Theme.tsx`
- [ ] `src/App.jsx` → `App.tsx`
- [ ] `src/main.jsx` → `main.tsx`
- [ ] `src/components/ShopItems.jsx` → `ShopItems.tsx`
- [ ] `src/components/Cart.jsx` → `Cart.tsx`
- [ ] `src/components/ItemPage.jsx` → `ItemPage.tsx`
- [ ] `src/components/Header.jsx` → `Header.tsx`
- [ ] `src/components/Footer.jsx` → `Footer.tsx`
- [ ] `src/components/BetterItem.jsx` → `BetterItem.tsx`
- [ ] `src/components/ThemeToggle.jsx` → `ThemeToggle.tsx`

### Optional (if still used)

- [ ] `src/Fav.jsx` → `Fav.tsx`
- [ ] `src/Button.jsx` → `Button.tsx`

## Key Considerations

1. **Image Imports**: Vite imports images as URLs (strings), but TypeScript needs declarations
2. **Context Typing**: Use `createContext<AppContextType | undefined>()` and provide default
3. **Component Props**: Define interfaces for all component props
4. **MUI Theme**: Extend MUI's Theme type if using custom palette properties
5. **React Router**: Use typed hooks (`useParams`, etc.)

## Testing Strategy

1. After each phase, run `npm run build` to catch errors early
2. Test dev server: `npm run dev`
3. Verify all routes work
4. Check TypeScript errors in IDE
5. Ensure no runtime errors

## Estimated Files to Convert

- **Configuration**: 4 files
- **Type Definitions**: 1 file
- **Data/Hooks**: 2 files
- **Components**: ~10 files
- **Total**: ~17 files

## Benefits After Migration

- ✅ Type safety at compile time
- ✅ Better IDE autocomplete and IntelliSense
- ✅ Easier refactoring
- ✅ Self-documenting code
- ✅ Catch bugs before runtime
- ✅ Better team collaboration
