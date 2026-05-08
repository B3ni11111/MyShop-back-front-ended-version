// API Configuration
// Uses environment variable if available, otherwise defaults to localhost
// TODO: Change back to production URL before deployment:
// "https://myshop-server-0mz8.onrender.com"
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

// API endpoints
export const API_ENDPOINTS = {
  items: `${API_BASE_URL}/api/items`,
  itemsFull: `${API_BASE_URL}/api/items/full`,
  itemById: (id: string) => `${API_BASE_URL}/api/items/${id}`,
} as const;
