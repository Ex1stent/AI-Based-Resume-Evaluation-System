// API base URL - configured via environment
// In development: http://127.0.0.1:8001/api
// In production (Vercel): Set VERCEL_API_BASE_URL environment variable
export const API_BASE_URL =
  (typeof window !== 'undefined' && (window as any).API_BASE_URL) ||
  import.meta.env.VITE_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://127.0.0.1:8001/api';

