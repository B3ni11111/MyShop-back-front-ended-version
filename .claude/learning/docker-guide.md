# Docker Architecture Guide - MyShop Application

## Overview: What is Docker?

Docker packages your application into **containers** - isolated environments that include everything needed to run your code (OS, dependencies, config). Think of it like shipping containers: standardized boxes that work the same everywhere.

---

## The Big Picture

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR COMPUTER                           │
│                                                             │
│   ┌─────────────────────┐    ┌─────────────────────┐       │
│   │  FRONTEND CONTAINER │    │  BACKEND CONTAINER  │       │
│   │                     │    │                     │       │
│   │   ┌───────────┐     │    │   ┌───────────┐     │       │
│   │   │   NGINX   │     │    │   │  Node.js  │     │       │
│   │   │  (serves  │     │────────│  (NestJS  │     │       │
│   │   │   React)  │     │ /api   │   API)    │     │       │
│   │   └───────────┘     │    │   └───────────┘     │       │
│   │                     │    │                     │       │
│   │    Port 80          │    │    Port 3000        │       │
│   └──────────┬──────────┘    └──────────┬──────────┘       │
│              │                          │                   │
└──────────────┼──────────────────────────┼───────────────────┘
               │                          │
         localhost:80               localhost:3000
               │
        ┌──────┴──────┐
        │   BROWSER   │
        │  (You!)     │
        └─────────────┘
```

---

## File 1: `server/Dockerfile` (Backend - The Simpler One)

Let's start with the backend because it's simpler - just one stage.

```dockerfile
FROM node:20-alpine
```
**Line 1 - Base Image**
- `FROM` = Start building from an existing image (like a template)
- `node:20-alpine` = Node.js version 20 on Alpine Linux
- Alpine = Tiny Linux (~5MB) - keeps your image small
- This gives you: Linux OS + Node.js + npm ready to use

---

```dockerfile
WORKDIR /app
```
**Line 2 - Set Working Directory**
- Creates `/app` folder inside the container
- All following commands run from this folder
- Like doing `mkdir /app && cd /app`

---

```dockerfile
COPY package*.json ./
```
**Line 3 - Copy Package Files**
- `COPY` = Copy files from your computer → into the container
- `package*.json` = Matches `package.json` AND `package-lock.json`
- `./` = Copy to current directory (`/app`)
- **Why separate?** Docker caches each step. If package.json doesn't change, npm install is skipped on rebuild!

---

```dockerfile
RUN npm ci
```
**Line 4 - Install Dependencies**
- `RUN` = Execute a command during build
- `npm ci` = Clean install (faster & stricter than `npm install`)
- Installs all packages from package-lock.json

---

```dockerfile
COPY . .
```
**Line 5 - Copy Source Code**
- Copy EVERYTHING from `./server/` → `/app` in container
- First `.` = source (your computer)
- Second `.` = destination (container's /app)

---

```dockerfile
RUN npm run build
```
**Line 6 - Build the App**
- Compiles TypeScript → JavaScript
- Creates `dist/` folder with production code

---

```dockerfile
EXPOSE 3000
```
**Line 7 - Document the Port**
- **Does NOT actually open the port!** (just documentation)
- Tells humans/tools: "This container uses port 3000"
- The actual port opening happens in docker-compose.yml

---

```dockerfile
CMD ["node", "dist/main"]
```
**Line 8 - Start Command**
- `CMD` = What runs when container starts
- Runs: `node dist/main` (starts your NestJS server)
- Only ONE CMD per Dockerfile (the final one wins)

---

## File 2: `front/Dockerfile` (Frontend - Two Stages)

This uses **multi-stage build** - two separate images, final one is tiny!

### Stage 1: Build Stage

```dockerfile
# Stage 1 - build
FROM node:20-alpine as builder
```
**Line 1-2 - Named Build Stage**
- Same base image as backend
- `as builder` = Name this stage "builder" (we'll reference it later)

---

```dockerfile
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
```
**Lines 3-6 - Same as Backend**
- Set directory, copy packages, install, copy source

---

```dockerfile
RUN npm run build
```
**Line 7 - Build React App**
- Runs Vite build
- Creates `dist/` folder with static files (HTML, CSS, JS)
- This is ALL we need - the rest gets thrown away!

---

### Stage 2: Production Stage

```dockerfile
# Stage 2 - serve with nginx
FROM nginx:alpine
```
**Line 9-10 - Fresh Start!**
- Start from nginx image (NOT from builder!)
- nginx = High-performance web server (~26MB)
- The entire Node.js stage is discarded

---

```dockerfile
COPY --from=builder /app/dist /usr/share/nginx/html
```
**Line 11 - Copy Build Output**
- `--from=builder` = Copy FROM the builder stage
- Take `/app/dist` (built files) → nginx's web folder
- This is the magic: we keep ONLY the build output!

---

```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
```
**Line 12 - Copy Nginx Config**
- Replace default nginx config with ours
- This tells nginx HOW to serve our app

---

```dockerfile
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
**Lines 13-14 - Run Nginx**
- Document port 80 (standard HTTP)
- Start nginx in foreground mode (required for Docker)

---

## File 3: `front/nginx.conf` (Web Server Config)

```nginx
server {
    listen 80;
```
**Lines 1-2 - Server Block**
- Define a virtual server
- Listen on port 80 (HTTP)

---

```nginx
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
```
**Lines 3-6 - Serve React App**
- `location /` = Handle ALL requests to root path
- `root` = Where files live (our built React app)
- `try_files` = The SPA magic:
  1. Try to find the exact file (`$uri`)
  2. Try to find a directory (`$uri/`)
  3. Fall back to `/index.html` (React Router handles it!)

**Why?** When you visit `/products/123`, there's no actual file. Nginx serves `index.html`, then React Router reads the URL and shows the right page.

---

```nginx
    location /api {
        proxy_pass http://backend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
```
**Lines 7-11 - API Proxy**
- `location /api` = Any request starting with `/api`
- `proxy_pass` = Forward to `http://backend:3000`
  - `backend` = The container name from docker-compose!
  - Docker creates internal DNS: container names → IP addresses
- `proxy_set_header` = Pass original request info to backend

**Flow:** Browser → nginx (port 80) → `/api/items` → backend (port 3000)

---

## File 4: `docker-compose.yml` (The Orchestrator)

Docker Compose manages MULTIPLE containers as one unit.

```yaml
services:
```
**Line 1 - Services Section**
- List of containers to create

---

```yaml
  frontend:
    build: ./front
```
**Lines 2-3 - Frontend Service**
- `frontend` = Service name (becomes container name)
- `build: ./front` = Build using `./front/Dockerfile`

---

```yaml
    ports:
      - "80:80"
```
**Lines 4-5 - Port Mapping**
- Format: `"HOST:CONTAINER"`
- `"80:80"` = Your computer's port 80 → Container's port 80
- Now `localhost:80` reaches the frontend!

---

```yaml
    depends_on:
      - backend
```
**Lines 6-7 - Dependency**
- Start `backend` BEFORE `frontend`
- Ensures API is ready when frontend starts

---

```yaml
  backend:
    build: ./server
    ports:
      - "3000:3000"
```
**Lines 9-12 - Backend Service**
- `backend` = Service name (used in nginx.conf!)
- Build from `./server/Dockerfile`
- Map port 3000 → 3000

---

## How It All Connects

### The Network Flow

```
1. You type: localhost:80
                ↓
2. Docker maps port 80 → frontend container
                ↓
3. Nginx receives request
                ↓
   ┌────────────────────────────────────┐
   │  Is it /api/* ?                    │
   │                                    │
   │  NO → Serve React files            │
   │       (index.html, JS, CSS)        │
   │                                    │
   │  YES → proxy_pass to backend:3000  │
   │        (Docker internal network)   │
   └────────────────────────────────────┘
                ↓
4. Response back to browser
```

### Docker Internal Network

When you run `docker-compose up`:
1. Docker creates a private network
2. Each service gets a DNS name = service name
3. `frontend` can reach `backend` by name, not IP!

```
┌─────────────── Docker Network ───────────────┐
│                                              │
│   frontend ←──────────────→ backend         │
│   (nginx)    "backend:3000"  (node)         │
│                                              │
└──────────────────────────────────────────────┘
```

---

## Port Summary

| Port | Where | Purpose |
|------|-------|---------|
| 80 (host) | Your computer | Access the app in browser |
| 80 (container) | Frontend | Nginx listens here |
| 3000 (host) | Your computer | Direct API access (optional) |
| 3000 (container) | Backend | Node.js server |

**Why two 3000s?** The `ports: "3000:3000"` creates a tunnel:
- Left (3000) = Your computer
- Right (3000) = Inside the container

---

## Commands Reference

```bash
# Build all images
docker-compose build

# Start all containers
docker-compose up

# Start in background (detached)
docker-compose up -d

# Stop all containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and start
docker-compose up --build
```

---

## Why This Architecture?

| Aspect | Benefit |
|--------|---------|
| Multi-stage build | Frontend image is 26MB instead of 150MB+ |
| Nginx for static files | 10x faster than Node.js for serving files |
| Internal network | Containers talk securely, no exposed ports needed |
| Compose | One command starts everything |
| Separation | Frontend & backend can scale independently |
