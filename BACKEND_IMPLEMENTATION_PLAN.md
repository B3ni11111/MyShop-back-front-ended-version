# Backend Setup Plan for React Shop

## Overview
Set up a backend server with database to handle:
- User management (CRUD operations)
- Items data storage and retrieval
- Authentication

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (file-based, zero setup)
- **ORM:** TypeORM (TypeScript-friendly database interaction)
- **Password hashing:** bcrypt
- **Authentication:** JWT tokens

---

## Database Entities (TypeORM)

### Item Entity
```typescript
@Entity()
export class Item {
  @PrimaryColumn()
  id: string;

  @Column()
  product: string;

  @Column('decimal')
  price: number;

  @Column()
  categoryMain: string;

  @Column()
  categorySecondary: string;

  @Column()
  brand: string;

  @Column()
  img: string;

  @Column('text')
  info: string;
}
```

### User Entity
```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;  // Hashed with bcrypt

  @Column()
  nickname: string;

  @Column({ nullable: true })
  phoneNumber: string;  // For SMS notifications

  @OneToMany(() => CartItem, cartItem => cartItem.user)
  cart: CartItem[];

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### CartItem Entity (join table)
```typescript
@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.cart)
  user: User;

  @ManyToOne(() => Item)
  item: Item;

  @Column()
  quantity: number;
}
```

### Favorite Entity (join table)
```typescript
@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.favorites)
  user: User;

  @ManyToOne(() => Item)
  item: Item;
}
```

---

## Server Folder Structure
```
server/
├── src/
│   ├── entities/           # TypeORM entities
│   │   ├── Item.ts
│   │   ├── User.ts
│   │   ├── CartItem.ts
│   │   └── Favorite.ts
│   ├── routes/             # Express routes
│   │   ├── items.routes.ts
│   │   └── users.routes.ts
│   ├── controllers/        # Route handlers
│   │   ├── items.controller.ts
│   │   └── users.controller.ts
│   ├── middleware/         # Auth middleware
│   │   └── auth.ts
│   ├── data-source.ts      # TypeORM config
│   └── index.ts            # Server entry point
├── database.sqlite         # SQLite database file (auto-created)
├── package.json
└── tsconfig.json
```

---

## API Endpoints

### Items
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/items | Get all items |
| GET | /api/items/:id | Get single item |
| GET | /api/items/category/:main | Get items by category |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/users/register | Create new user |
| POST | /api/users/login | Login, returns JWT token |
| GET | /api/users/me | Get current user (requires auth) |
| PUT | /api/users/me | Update profile (requires auth) |
| DELETE | /api/users/me | Delete account (requires auth) |

### Cart (requires auth)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cart | Get user's cart |
| POST | /api/cart | Add item to cart |
| PUT | /api/cart/:itemId | Update quantity |
| DELETE | /api/cart/:itemId | Remove from cart |

### Favorites (requires auth)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/favorites | Get user's favorites |
| POST | /api/favorites/:itemId | Add to favorites |
| DELETE | /api/favorites/:itemId | Remove from favorites |

---

## Implementation Steps

### Step 1: Setup Server Project
Terminal commands:
```bash
mkdir server
cd server
npm init -y
npm install express cors typeorm reflect-metadata better-sqlite3 bcrypt jsonwebtoken
npm install -D typescript @types/node @types/express @types/bcrypt @types/jsonwebtoken @types/better-sqlite3 ts-node nodemon
npx tsc --init
```

### Step 2: Configure TypeORM
- Create `data-source.ts` with SQLite connection
- Configure TypeScript for decorators

### Step 3: Create Entities
- Item, User, CartItem, Favorite entities
- Define relationships between entities

### Step 4: Seed Items Data
- Create script to import existing itemsData into SQLite

### Step 5: Create Express Server
- Basic server setup with middleware
- Connect to database on startup

### Step 6: Implement Item Routes
- Fetch items from database
- Filter by category

### Step 7: Implement User Routes
- Registration with password hashing
- Login with JWT token generation
- Profile management

### Step 8: Implement Cart & Favorites
- CRUD operations for cart items
- Add/remove favorites

### Step 9: Frontend Integration
- Create API service
- Update React context to use backend
- Add authentication state

---

## Files to Modify/Create

### New Files (server/)
- `server/src/index.ts`
- `server/src/data-source.ts`
- `server/src/entities/*.ts`
- `server/src/routes/*.ts`
- `server/src/controllers/*.ts`
- `server/src/middleware/auth.ts`
- `server/package.json`
- `server/tsconfig.json`
- `server/.env`

### Frontend Files to Update
- `src/App.tsx` - Add auth context
- Create `src/services/api.ts` - API calls
- Update context to fetch from backend

---

## Verification
1. Start server: `cd server && npm run dev`
2. Test with Postman/curl:
   - GET http://localhost:3001/api/items
   - POST http://localhost:3001/api/users/register
3. Start frontend: `npm run dev`
4. Verify items load from backend
5. Test user registration/login flow
