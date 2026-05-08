# Understanding the Server Data Source

## What is the `dist` folder?

`dist` stands for **"distribution"** - it's the compiled output of your TypeScript code.

```
server/
├── src/           ← Your SOURCE code (TypeScript)
│   ├── data/
│   │   └── items.json
│   ├── items/
│   │   ├── items.service.ts
│   │   └── items.controller.ts
│   └── main.ts
│
└── dist/          ← COMPILED code (JavaScript) - auto-generated
    ├── data/
    │   └── items.json   ← copied here during build
    ├── items/
    │   ├── items.service.js
    │   └── items.controller.js
    └── main.js
```

**Key points:**
- `dist/` is **git-ignored** - it's not committed to version control
- It's **regenerated every time you run `npm run build`**
- Node.js runs the JavaScript in `dist/`, not the TypeScript in `src/`
- You should **never manually edit files in `dist/`**

---

## Why are there two copies of `items.json`?

Because the build process **copies** the JSON file from `src/data/` to `dist/data/`.

### The flow:
```
1. You edit:     src/data/items.json
2. You build:    npm run build
3. NestJS:       copies items.json → dist/data/items.json
4. Runtime:      Node reads from dist/data/items.json
```

### Why does this happen?

In `items.service.ts`, the JSON is imported directly:
```typescript
import itemsData from '../data/items.json';
```

When TypeScript compiles this, it becomes a relative path reference. The NestJS build process knows to copy non-TypeScript assets (like JSON files) to maintain the same folder structure.

---

## How do I update the data?

### Currently (JSON file approach):

1. Edit **only** `server/src/data/items.json`
2. Rebuild: `npm run build`
3. Restart the server

**Important:** The data is loaded **at startup time**. Changes to the JSON file require a server restart to take effect.

### In Development Mode:
When running `npm run start:dev`, NestJS watches for changes and auto-restarts, so edits to `items.json` will eventually reload (after a restart).

---

## What changes if I use a Database?

Moving to a database (like PostgreSQL, MongoDB, etc.) changes several things:

### Current Architecture (JSON file):
```
[Server Starts] → [Loads items.json into memory] → [Serves from memory]
                         ↑
                   Happens ONCE at startup
```

### Database Architecture:
```
[Request comes in] → [Query database] → [Return results]
                           ↑
                   Happens on EVERY request
```

### What would change:

| Aspect | JSON File (Now) | Database (Future) |
|--------|-----------------|-------------------|
| **Data location** | `src/data/items.json` | External database server |
| **Updates** | Edit file + rebuild + restart | Update DB directly, instant effect |
| **Build process** | JSON copied to dist | No data in build at all |
| **Connection** | None needed | Need connection string, credentials |
| **Dependencies** | None | Database driver (e.g., `pg`, `mongoose`) |
| **Service code** | `import itemsData from '../data/items.json'` | `await this.itemsRepository.find()` |

### Example migration (to PostgreSQL with TypeORM):

**Before (current):**
```typescript
// items.service.ts
import itemsData from '../data/items.json';

@Injectable()
export class ItemsService {
  private items = itemsData.flatMap(...);

  findAll() {
    return this.items;
  }
}
```

**After (with database):**
```typescript
// items.service.ts
@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async findAll() {
    return this.itemsRepository.find();
  }
}
```

### What you'd need to add:
1. Database server (local or cloud like Supabase, Railway, etc.)
2. ORM package (`@nestjs/typeorm`, `typeorm`, `pg`)
3. Entity classes defining your data schema
4. Database module configuration
5. Migration scripts to seed initial data

### Benefits of a database:
- Live updates without restart
- Data persists independently from code
- Multiple instances can share data
- Proper querying, filtering, pagination
- Better for production deployments

---

## Summary

| Question | Answer |
|----------|--------|
| What is `dist/`? | Auto-generated compiled JavaScript output |
| Why two `items.json`? | Build copies from `src/` to `dist/` |
| Which one to edit? | **Only** `src/data/items.json` |
| After editing? | Rebuild + restart server |
| Database migration? | Replaces file import with DB queries |
