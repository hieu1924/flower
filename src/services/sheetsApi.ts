/**
 * Google Sheets API Service
 * Fetches data from Google Apps Script Web App
 */

import type { 
  AllDataResponse, 
  SheetsApiResponse,
  Product,
  Category,
  Testimonial,
  Feature,
  SiteContent,
  SiteConfig,
  BestsellerProduct,
  InstagramPost,
  AboutSection,
  HowItWorksStep
} from '../types';

// ==================== CONFIGURATION ====================
const API_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL || '';
const CACHE_DURATION = (import.meta.env.VITE_CACHE_DURATION_MINUTES || 5) * 60 * 1000; // Convert to ms
const USE_API = import.meta.env.VITE_USE_SHEETS_API !== 'false';

// ==================== CACHE MANAGEMENT ====================
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheItem<unknown>> = {};

function getFromCache<T>(key: string): T | null {
  const item = cache[key] as CacheItem<T> | undefined;
  if (!item) return null;
  
  const isExpired = Date.now() - item.timestamp > CACHE_DURATION;
  if (isExpired) {
    delete cache[key];
    return null;
  }
  
  return item.data;
}

function setCache<T>(key: string, data: T): void {
  cache[key] = {
    data,
    timestamp: Date.now()
  };
}

// Also save to localStorage for persistence across page loads
function getFromLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(`sheets_cache_${key}`);
    if (!item) return null;
    
    const parsed: CacheItem<T> = JSON.parse(item);
    const isExpired = Date.now() - parsed.timestamp > CACHE_DURATION;
    
    if (isExpired) {
      localStorage.removeItem(`sheets_cache_${key}`);
      return null;
    }
    
    return parsed.data;
  } catch {
    return null;
  }
}

function setLocalStorage<T>(key: string, data: T): void {
  try {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(`sheets_cache_${key}`, JSON.stringify(item));
  } catch {
    // localStorage might be full or disabled
    console.warn('Failed to save to localStorage');
  }
}

// ==================== API FETCHER ====================
async function fetchFromAPI<T>(action: string): Promise<T | null> {
  if (!USE_API || !API_URL) {
    console.warn('Sheets API is disabled or URL not configured');
    return null;
  }
  
  // Check memory cache first
  const memCached = getFromCache<T>(action);
  if (memCached) {
    return memCached;
  }
  
  // Check localStorage cache
  const lsCached = getFromLocalStorage<T>(action);
  if (lsCached) {
    setCache(action, lsCached); // Restore to memory cache
    return lsCached;
  }
  
  try {
    const url = `${API_URL}?action=${action}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: SheetsApiResponse<T> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Unknown API error');
    }
    
    if (result.data) {
      setCache(action, result.data);
      setLocalStorage(action, result.data);
    }
    
    return result.data || null;
  } catch (error) {
    console.error(`Failed to fetch ${action} from Sheets API:`, error);
    return null;
  }
}

// ==================== PUBLIC API ====================

/**
 * Fetch all data at once (most efficient)
 */
export async function fetchAllData(): Promise<AllDataResponse | null> {
  return fetchFromAPI<AllDataResponse>('all');
}

/**
 * Fetch products
 */
export async function fetchProducts(): Promise<Product[]> {
  const data = await fetchFromAPI<Product[]>('products');
  return data || [];
}

/**
 * Fetch categories
 */
export async function fetchCategories(): Promise<Category[]> {
  const data = await fetchFromAPI<Category[]>('categories');
  return data || [];
}

/**
 * Fetch testimonials
 */
export async function fetchTestimonials(): Promise<Testimonial[]> {
  const data = await fetchFromAPI<Testimonial[]>('testimonials');
  return data || [];
}

/**
 * Fetch features
 */
export async function fetchFeatures(): Promise<Feature[]> {
  const data = await fetchFromAPI<Feature[]>('features');
  return data || [];
}

/**
 * Fetch site content
 */
export async function fetchSiteContent(): Promise<SiteContent> {
  const data = await fetchFromAPI<SiteContent>('siteContent');
  return data || {};
}

/**
 * Fetch site config
 */
export async function fetchSiteConfig(): Promise<SiteConfig> {
  const data = await fetchFromAPI<SiteConfig>('siteConfig');
  return data || {};
}

/**
 * Fetch bestsellers
 */
export async function fetchBestsellers(): Promise<BestsellerProduct[]> {
  const data = await fetchFromAPI<BestsellerProduct[]>('bestsellers');
  return data || [];
}

/**
 * Fetch Instagram posts
 */
export async function fetchInstagram(): Promise<InstagramPost[]> {
  const data = await fetchFromAPI<InstagramPost[]>('instagram');
  return data || [];
}

/**
 * Fetch about sections
 */
export async function fetchAbout(): Promise<AboutSection[]> {
  const data = await fetchFromAPI<AboutSection[]>('about');
  return data || [];
}

/**
 * Fetch how it works steps
 */
export async function fetchHowItWorks(): Promise<HowItWorksStep[]> {
  const data = await fetchFromAPI<HowItWorksStep[]>('howItWorks');
  return data || [];
}

/**
 * Clear all caches (useful for admin refresh)
 */
export function clearCache(): void {
  // Clear memory cache
  Object.keys(cache).forEach(key => delete cache[key]);
  
  // Clear localStorage cache
  Object.keys(localStorage)
    .filter(key => key.startsWith('sheets_cache_'))
    .forEach(key => localStorage.removeItem(key));
}

/**
 * Check if API is configured and enabled
 */
export function isApiEnabled(): boolean {
  return USE_API && !!API_URL;
}
