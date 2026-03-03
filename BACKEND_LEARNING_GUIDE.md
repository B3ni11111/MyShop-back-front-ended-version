# Backend Learning Guide - React Shop

This guide explains everything you need to understand before building your backend.
Take your time reading through each section.

---

## Table of Contents
1. [The Big Picture](#the-big-picture)
2. [What is a Backend?](#what-is-a-backend)
3. [Express.js - Your Server Framework](#expressjs---your-server-framework)
4. [SQLite - Your Database](#sqlite---your-database)
5. [TypeORM - The Bridge](#typeorm---the-bridge)
6. [Authentication Basics](#authentication-basics)
7. [How It All Connects](#how-it-all-connects)
8. [Glossary](#glossary)

---

## The Big Picture

Right now your app works like this:
```
[React App] ---> [itemsData.ts file] ---> Shows products
     |
     v
[localStorage] ---> Saves cart/favorites (only on YOUR browser)
```

After we add a backend, it will work like this:
```
[React App] <---> [Express Server] <---> [SQLite Database]
     |                   |                      |
     |                   |                      |
  Frontend            Backend              Permanent Storage
(what users see)   (the "brain")         (data saved forever)
```

**Why do we need this?**
- Data is saved permanently (not just in one browser)
- Users can log in from any device
- You control who can access what data
- Multiple users can use the app simultaneously

---

## What is a Backend?

### Frontend vs Backend

| Frontend | Backend |
|----------|---------|
| What users see and interact with | Runs on a server, users never see it |
| React, HTML, CSS, JavaScript | Node.js, Express, databases |
| Runs in the browser | Runs on a computer/server |
| Cannot be trusted (users can modify it) | Trusted code, validates everything |

### What does a backend do?

1. **Receives requests** - "Give me all products" or "Save this user"
2. **Processes them** - Checks permissions, validates data
3. **Talks to database** - Gets or saves data
4. **Sends response** - Returns data or confirmation

### Example Flow: User Adds Item to Cart

```
1. User clicks "Add to Cart" button

2. Frontend sends request to backend:
   POST /api/cart
   Body: { itemId: "123", quantity: 1 }
   Headers: { Authorization: "Bearer <user's token>" }

3. Backend receives request:
   - Checks if user is logged in (validates token)
   - Checks if item exists
   - Saves to database

4. Backend sends response:
   { success: true, message: "Item added to cart" }

5. Frontend updates the UI
```

---

## Express.js - Your Server Framework

### What is Express?

Express is a **framework** for building web servers in Node.js.
It handles receiving requests and sending responses.

### Basic Express Server (Explained Line by Line)

```typescript
// Import express library
import express from 'express';

// Create an "app" - this is your server
const app = express();

// Middleware: Tell Express to understand JSON data
app.use(express.json());

// Define a ROUTE - what happens when someone visits /api/hello
app.get('/api/hello', (req, res) => {
  // req = the incoming REQUEST (what the client sent)
  // res = the RESPONSE (what we send back)

  res.json({ message: 'Hello World!' });
});

// Start the server on port 3001
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
```

### HTTP Methods (Types of Requests)

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Retrieve data | Get all products |
| POST | Create new data | Create new user |
| PUT | Update existing data | Update user profile |
| DELETE | Remove data | Delete account |

### Routes

A route is a URL pattern + HTTP method that triggers specific code:

```typescript
// GET /api/items - Get all items
app.get('/api/items', (req, res) => {
  // Code to get items from database
  res.json(items);
});

// GET /api/items/123 - Get specific item
app.get('/api/items/:id', (req, res) => {
  const itemId = req.params.id; // "123"
  // Code to get that specific item
  res.json(item);
});

// POST /api/users - Create new user
app.post('/api/users', (req, res) => {
  const userData = req.body; // Data sent from frontend
  // Code to create user
  res.json({ success: true });
});
```

### What is req.body, req.params, req.query?

```typescript
// URL: POST /api/users?active=true
// Body: { "email": "test@test.com", "password": "123" }

app.post('/api/users/:id', (req, res) => {
  req.params.id    // URL parameter - the :id part
  req.query.active // Query string - ?active=true
  req.body.email   // Request body - JSON data sent
});
```

### Middleware

Middleware is code that runs BEFORE your route handler.
It's like a security checkpoint.

```typescript
// This middleware runs for EVERY request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Continue to the next middleware or route
});

// This middleware only runs for /api/protected routes
app.use('/api/protected', (req, res, next) => {
  // Check if user is logged in
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Not authorized' });
  }
  next();
});
```

---

## SQLite - Your Database

### What is a Database?

A database is organized storage for your data.
Think of it like a very powerful Excel file.

### What is SQLite?

SQLite is the simplest database:
- It's just a **single file** on your computer (like `database.sqlite`)
- No installation needed
- No server to run
- Perfect for learning and small projects

### SQL Basics

SQL (Structured Query Language) is how you talk to databases.
You won't write SQL directly (TypeORM does it for you), but understanding it helps.

```sql
-- Create a table (like creating an Excel sheet)
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE,
  password TEXT,
  nickname TEXT
);

-- Insert data (add a row)
INSERT INTO users (email, password, nickname)
VALUES ('test@test.com', 'hashedpassword', 'TestUser');

-- Select data (get rows)
SELECT * FROM users;                    -- Get all users
SELECT * FROM users WHERE id = 1;       -- Get user with id 1
SELECT email, nickname FROM users;      -- Get only certain columns

-- Update data
UPDATE users SET nickname = 'NewName' WHERE id = 1;

-- Delete data
DELETE FROM users WHERE id = 1;
```

### Tables and Relationships

**Tables** are like Excel sheets. Each table stores one type of thing.

```
USERS TABLE                    ITEMS TABLE
+----+----------+---------+    +----+----------+-------+
| id | email    | nickname|    | id | product  | price |
+----+----------+---------+    +----+----------+-------+
| 1  | a@a.com  | Alice   |    | 1  | Laptop   | 999   |
| 2  | b@b.com  | Bob     |    | 2  | Phone    | 599   |
+----+----------+---------+    +----+----------+-------+
```

**Relationships** connect tables together:

```
CART_ITEMS TABLE (connects users to items)
+----+---------+---------+----------+
| id | user_id | item_id | quantity |
+----+---------+---------+----------+
| 1  | 1       | 2       | 1        |  <- Alice has 1 Phone
| 2  | 1       | 1       | 2        |  <- Alice has 2 Laptops
| 3  | 2       | 2       | 1        |  <- Bob has 1 Phone
+----+---------+---------+----------+
```

---

## TypeORM - The Bridge

### What is an ORM?

ORM = Object-Relational Mapping

It lets you work with database using TypeScript classes instead of SQL.
TypeORM translates your TypeScript code into SQL commands.

```
Without ORM:
  You write SQL → Database understands

With ORM (TypeORM):
  You write TypeScript → TypeORM converts to SQL → Database understands
```

### Entities

An **Entity** is a TypeScript class that represents a database table.
Each instance of the class is one row in the table.

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()  // This decorator tells TypeORM: "This is a database table"
export class User {

  @PrimaryGeneratedColumn('uuid')  // Auto-generated unique ID
  id: string;

  @Column({ unique: true })  // A column that must be unique
  email: string;

  @Column()  // A regular column
  password: string;

  @Column()
  nickname: string;
}
```

When TypeORM sees this, it creates:
```sql
CREATE TABLE user (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  password TEXT,
  nickname TEXT
);
```

### What are Decorators? (@Something)

Decorators are special markers that add metadata to your code.
They start with `@` symbol.

```typescript
@Entity()           // "This class = database table"
@Column()           // "This property = table column"
@PrimaryColumn()    // "This is the primary key"
@ManyToOne()        // "This connects to another table"
```

Think of decorators as labels that tell TypeORM what to do.

### Relationships in TypeORM

**One-to-Many / Many-to-One**
One user has MANY cart items. Many cart items belong to ONE user.

```typescript
// User.ts
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CartItem, cartItem => cartItem.user)
  cart: CartItem[];  // User can have multiple cart items
}

// CartItem.ts
@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.cart)
  user: User;  // Each cart item belongs to one user

  @ManyToOne(() => Item)
  item: Item;  // Each cart item references one product

  @Column()
  quantity: number;
}
```

### Using TypeORM to Query Data

```typescript
import { AppDataSource } from './data-source';
import { User } from './entities/User';

// Get the repository (helper object for a specific entity)
const userRepository = AppDataSource.getRepository(User);

// Find all users
const allUsers = await userRepository.find();

// Find one user by ID
const user = await userRepository.findOneBy({ id: '123' });

// Find user by email
const user = await userRepository.findOneBy({ email: 'test@test.com' });

// Create new user
const newUser = userRepository.create({
  email: 'new@user.com',
  password: 'hashedPassword',
  nickname: 'NewUser'
});
await userRepository.save(newUser);

// Update user
user.nickname = 'UpdatedName';
await userRepository.save(user);

// Delete user
await userRepository.delete({ id: '123' });
```

---

## Authentication Basics

### Why Authentication?

Authentication = Proving who you are

Without it, anyone could:
- See other users' carts
- Modify other users' data
- Pretend to be someone else

### How Authentication Works (JWT)

JWT = JSON Web Token

It's like a digital ID card that proves you're logged in.

```
1. User logs in with email/password

2. Server verifies credentials

3. Server creates a JWT token:
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   (This contains user ID + expiration, signed by server)

4. Server sends token to frontend

5. Frontend stores token (localStorage or cookie)

6. For future requests, frontend sends token in header:
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

7. Server verifies token and knows who the user is
```

### Password Hashing (bcrypt)

**NEVER store passwords as plain text!**

Hashing = Converting password to unreadable string

```typescript
import bcrypt from 'bcrypt';

// When user registers:
const plainPassword = 'myPassword123';
const hashedPassword = await bcrypt.hash(plainPassword, 10);
// Result: "$2b$10$X4kv5..."  (looks like gibberish)

// When user logs in:
const isMatch = await bcrypt.compare('myPassword123', hashedPassword);
// Returns true if password is correct
```

Why hashing?
- Even if database is stolen, passwords are safe
- You can never "unhash" a password
- Each hash is unique (same password = different hash each time)

### JWT Token Example

```typescript
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';  // Keep this secret!

// Create token when user logs in
const token = jwt.sign(
  { userId: user.id, email: user.email },  // Data to include
  SECRET_KEY,
  { expiresIn: '7d' }  // Token expires in 7 days
);

// Verify token in protected routes
const decoded = jwt.verify(token, SECRET_KEY);
// decoded = { userId: '123', email: 'test@test.com', iat: ..., exp: ... }
```

---

## How It All Connects

### Complete Flow: User Registration

```
FRONTEND                          BACKEND                         DATABASE
    |                                 |                               |
    |  POST /api/users/register       |                               |
    |  { email, password, nickname }  |                               |
    |-------------------------------->|                               |
    |                                 |                               |
    |                        1. Validate data                         |
    |                        2. Check if email exists                 |
    |                                 |-------- SELECT * FROM ------->|
    |                                 |<-------- No user found -------|
    |                        3. Hash password                         |
    |                        4. Create user                           |
    |                                 |-------- INSERT INTO --------->|
    |                                 |<-------- Success -------------|
    |                        5. Generate JWT token                    |
    |                                 |                               |
    |  { success: true, token: "..." }|                               |
    |<--------------------------------|                               |
    |                                 |                               |
    |  Save token to localStorage     |                               |
```

### Complete Flow: Get Cart Items (Protected Route)

```
FRONTEND                          BACKEND                         DATABASE
    |                                 |                               |
    |  GET /api/cart                  |                               |
    |  Authorization: Bearer <token>  |                               |
    |-------------------------------->|                               |
    |                                 |                               |
    |                        1. Auth Middleware:                      |
    |                           - Extract token                       |
    |                           - Verify with jwt.verify()            |
    |                           - Get userId from token               |
    |                                 |                               |
    |                        2. Get cart items                        |
    |                                 |-- SELECT * FROM cart_items -->|
    |                                 |   WHERE user_id = '123'       |
    |                                 |<----- Cart items data --------|
    |                                 |                               |
    |  { items: [...] }               |                               |
    |<--------------------------------|                               |
```

---

## Project File Structure (What Goes Where)

```
React-Shop-MUI--main/
├── src/                    # Frontend (React) - YOU ALREADY HAVE THIS
│   ├── components/
│   ├── types/
│   ├── itemsData.ts        # Will be replaced by API calls
│   └── App.tsx
│
├── server/                 # Backend (NEW) - WE WILL CREATE THIS
│   ├── src/
│   │   ├── entities/       # TypeORM entities (database tables)
│   │   │   ├── Item.ts
│   │   │   ├── User.ts
│   │   │   ├── CartItem.ts
│   │   │   └── Favorite.ts
│   │   │
│   │   ├── routes/         # Express routes (URL handlers)
│   │   │   ├── items.routes.ts
│   │   │   ├── users.routes.ts
│   │   │   ├── cart.routes.ts
│   │   │   └── favorites.routes.ts
│   │   │
│   │   ├── controllers/    # Business logic
│   │   │   ├── items.controller.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── cart.controller.ts
│   │   │   └── favorites.controller.ts
│   │   │
│   │   ├── middleware/     # Middleware (auth checks)
│   │   │   └── auth.ts
│   │   │
│   │   ├── data-source.ts  # TypeORM configuration
│   │   └── index.ts        # Server entry point
│   │
│   ├── database.sqlite     # Your database (auto-created)
│   ├── package.json        # Backend dependencies
│   ├── tsconfig.json       # TypeScript config
│   └── .env                # Secret keys (never commit!)
│
├── package.json            # Frontend dependencies
└── BACKEND_LEARNING_GUIDE.md  # This file
```

---

## Glossary

| Term | Meaning |
|------|---------|
| **API** | Application Programming Interface - a set of URLs your frontend can call |
| **Endpoint** | A specific URL that does something (e.g., `/api/users`) |
| **Route** | Same as endpoint - a URL pattern |
| **Controller** | Code that handles a request and sends a response |
| **Middleware** | Code that runs before the controller (like security checks) |
| **Entity** | A TypeScript class representing a database table |
| **Repository** | TypeORM object for querying a specific entity |
| **JWT** | JSON Web Token - a secure way to prove you're logged in |
| **Hash** | One-way encryption (you can't decrypt it) |
| **CRUD** | Create, Read, Update, Delete - basic database operations |
| **ORM** | Object-Relational Mapping - using code instead of SQL |
| **Decorator** | `@Something` - special markers that add functionality |
| **Migration** | Database version control (changing table structure safely) |

---

## What to Learn Next

1. **Watch these concepts:**
   - Express.js basics (30 min YouTube tutorial)
   - What is REST API (understand GET, POST, PUT, DELETE)
   - TypeORM getting started guide

2. **Try these:**
   - Create a simple Express server that returns "Hello"
   - Understand how `async/await` works in JavaScript
   - Read about environment variables (.env files)

3. **When you're ready:**
   - Come back and we'll build it step by step
   - I'll explain each piece of code as we write it

---

## Commands We'll Use (Preview)

### Setting up the server project:
```bash
# Create server folder
mkdir server
cd server

# Initialize npm project
npm init -y

# Install production dependencies
npm install express cors typeorm reflect-metadata better-sqlite3 bcrypt jsonwebtoken

# Install development dependencies
npm install -D typescript @types/node @types/express @types/bcrypt @types/jsonwebtoken @types/better-sqlite3 ts-node nodemon

# Create TypeScript config
npx tsc --init
```

### Running the servers:
```bash
# Terminal 1: Run backend
cd server
npm run dev

# Terminal 2: Run frontend
npm run dev
```

---

**Take your time with this guide. When you understand these concepts and feel ready, come back and we'll build everything together step by step!**
