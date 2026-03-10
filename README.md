# MyShop - React E-commerce Frontend

A React-based e-commerce frontend built with Material-UI, connecting to a NestJS backend API.

## Tech Stack

- React 19
- TypeScript
- Material-UI (MUI)
- React Router DOM
- Vite

## Features

- Browse products by category
- View product details
- Add items to cart
- Favorites list
- Dark/Light theme toggle
- Responsive design

## API Backend

This frontend connects to a NestJS backend hosted on Render:
- **Production API:** https://myshop-server-0mz8.onrender.com

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/B3ni11111/MyShop-react.git
   cd MyShop-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file for custom API URL:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` if you want to use a different API URL.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `B3ni11111/MyShop-react`
4. Vercel will auto-detect Vite settings
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Run deployment:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project

### Environment Variables (Optional)

If you need to override the API URL, add this in Vercel project settings:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://myshop-server-0mz8.onrender.com` |

## Project Structure

```
src/
├── components/      # React components
├── config/          # API configuration
├── hooks/           # Custom React hooks
├── types/           # TypeScript interfaces
├── App.tsx          # Main App component
└── main.tsx         # Entry point with routing
```

## API Endpoints Used

| Endpoint | Description |
|----------|-------------|
| `GET /api/items` | Get all items |
| `GET /api/items/full` | Get items with categories |
| `GET /api/items/:id` | Get single item by ID |

## License

MIT
