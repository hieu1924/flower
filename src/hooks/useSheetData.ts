/**
 * Custom React hooks for fetching data from Google Sheets
 */

import { useState, useEffect, useCallback } from 'react';
import {
  fetchAllData,
  fetchProducts,
  fetchCategories,
  fetchTestimonials,
  fetchFeatures,
  fetchSiteContent,
  fetchSiteConfig,
  fetchBestsellers,
  fetchInstagram,
  fetchAbout,
  fetchHowItWorks,
  isApiEnabled,
} from '../services/sheetsApi';
import { fixImagePath } from '../utils';
import type {
  AllDataResponse,
  Product,
  Category,
  Testimonial,
  Feature,
  SiteContent,
  SiteConfig,
  BestsellerProduct,
  InstagramPost,
  AboutSection,
  HowItWorksStep,
} from '../types';

// ==================== IMAGE PATH FIXER ====================
/**
 * Fix image paths in data from API
 * Converts /images/xxx.png to correct base URL path
 */
function fixDataImagePaths<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map(item => fixDataImagePaths(item)) as T;
  }
  
  if (data && typeof data === 'object') {
    const fixed: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      // Fix common image field names
      if (['image', 'imageUrl', 'icon', 'images'].includes(key)) {
        if (typeof value === 'string') {
          fixed[key] = fixImagePath(value);
        } else if (Array.isArray(value)) {
          fixed[key] = value.map(v => typeof v === 'string' ? fixImagePath(v) : v);
        } else {
          fixed[key] = value;
        }
      } else if (typeof value === 'object' && value !== null) {
        fixed[key] = fixDataImagePaths(value);
      } else {
        fixed[key] = value;
      }
    }
    return fixed as T;
  }
  
  return data;
}

// ==================== GENERIC HOOK ====================
interface UseDataResult<T> {
  data: T;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useData<T>(
  fetcher: () => Promise<T>,
  fallback: T
): UseDataResult<T> {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    console.log('[useData] Checking API status...');
    if (!isApiEnabled()) {
      console.log('[useData] API disabled, using fallback');
      setLoading(false);
      return;
    }

    console.log('[useData] API enabled, fetching data...');
    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      console.log('[useData] Fetched result:', result);
      if (result !== null && result !== undefined) {
        const hasData = Array.isArray(result) 
          ? result.length > 0 
          : typeof result === 'object' && Object.keys(result as object).length > 0;
        if (hasData) {
          console.log('[useData] Setting data from API');
          // Fix image paths in API data
          const fixedData = fixDataImagePaths(result);
          setData(fixedData);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('[useData] Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ==================== SPECIFIC HOOKS ====================

/**
 * Fetch all data at once - most efficient for initial load
 */
export function useAllData(fallback: Partial<AllDataResponse> = {}) {
  const defaultFallback: AllDataResponse = {
    products: [],
    categories: [],
    testimonials: [],
    features: [],
    siteContent: {},
    siteConfig: {},
    bestsellers: [],
    instagram: [],
    about: [],
    howItWorks: [],
    ...fallback,
  };

  return useData(
    async () => {
      const data = await fetchAllData();
      return data || defaultFallback;
    },
    defaultFallback
  );
}

/**
 * Fetch products with fallback
 */
export function useProducts(fallback: Product[] = []) {
  return useData(fetchProducts, fallback);
}

/**
 * Fetch categories with fallback
 */
export function useCategories(fallback: Category[] = []) {
  return useData(fetchCategories, fallback);
}

/**
 * Fetch testimonials with fallback
 */
export function useTestimonials(fallback: Testimonial[] = []) {
  return useData(fetchTestimonials, fallback);
}

/**
 * Fetch features with fallback
 */
export function useFeatures(fallback: Feature[] = []) {
  return useData(fetchFeatures, fallback);
}

/**
 * Fetch site content with fallback
 */
export function useSiteContent(fallback: SiteContent = {}) {
  return useData(fetchSiteContent, fallback);
}

/**
 * Fetch site config with fallback
 */
export function useSiteConfig(fallback: SiteConfig = {}) {
  return useData(fetchSiteConfig, fallback);
}

/**
 * Fetch bestsellers with fallback
 */
export function useBestsellers(fallback: BestsellerProduct[] = []) {
  return useData(fetchBestsellers, fallback);
}

/**
 * Fetch Instagram posts with fallback
 */
export function useInstagram(fallback: InstagramPost[] = []) {
  return useData(fetchInstagram, fallback);
}

/**
 * Fetch about sections with fallback
 */
export function useAbout(fallback: AboutSection[] = []) {
  return useData(fetchAbout, fallback);
}

/**
 * Fetch how it works steps with fallback
 */
export function useHowItWorks(fallback: HowItWorksStep[] = []) {
  return useData(fetchHowItWorks, fallback);
}
