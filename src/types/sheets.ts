/**
 * Type definitions for data from Google Sheets
 */

// ==================== PRODUCT TYPES ====================
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  category: 'promo' | 'big-discount' | 'flash-sale' | 'recommendation' | string;
  isNew?: boolean;
  isBestseller?: boolean;
  stock: number;
  description?: string;
}

export interface Category {
  id: string;
  label: string;
  displayOrder?: number;
}

// ==================== CONTENT TYPES ====================
export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  isActive?: boolean;
}

export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  displayOrder?: number;
}

export interface BestsellerProduct {
  id: number;
  image: string;
  name: string;
  price: number;
  displayOrder?: number;
}

export interface InstagramPost {
  id: number;
  imageUrl: string;
  altText?: string;
  displayOrder?: number;
}

export interface AboutSection {
  id: number;
  title: string;
  content: string;
  image: string;
  linkText: string;
  linkUrl?: string;
  displayOrder?: number;
}

export interface HowItWorksStep {
  stepNumber: number;
  emoji: string;
  title: string;
  description?: string;
}

// ==================== SITE CONTENT ====================
export interface SiteContent {
  header?: {
    bannerText?: string;
    navItems?: string;
  };
  hero?: {
    title?: string;
    subtitle?: string;
    ctaText?: string;
  };
  features?: {
    title?: string;
  };
  bestsellers?: {
    title?: string;
    ctaText?: string;
  };
  reviews?: {
    title?: string;
  };
  discount?: {
    title?: string;
    ctaText?: string;
  };
  contact?: {
    title?: string;
    ctaText?: string;
  };
  app?: {
    title?: string;
    description?: string;
    platformText?: string;
    ctaText?: string;
  };
  instagram?: {
    title?: string;
    handle?: string;
    url?: string;
  };
  newsletter?: {
    title?: string;
    subtitle?: string;
    placeholder?: string;
    ctaText?: string;
  };
  shop?: {
    heroTitle?: string;
    heroSubtitle?: string;
    ctaText?: string;
  };
  footer?: {
    privacyText?: string;
    termsText?: string;
    copyright?: string;
  };
  [key: string]: Record<string, string> | undefined;
}

export interface SiteConfig {
  freeShippingThreshold?: number;
  flashSaleDuration?: number;
  discountPercentage?: number;
  instagramHandle?: string;
  instagramUrl?: string;
  companyName?: string;
  currency?: string;
  [key: string]: string | number | undefined;
}

// ==================== API RESPONSE ====================
export interface SheetsApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AllDataResponse {
  products: Product[];
  categories: Category[];
  testimonials: Testimonial[];
  features: Feature[];
  siteContent: SiteContent;
  siteConfig: SiteConfig;
  bestsellers: BestsellerProduct[];
  instagram: InstagramPost[];
  about: AboutSection[];
  howItWorks: HowItWorksStep[];
}

// ==================== CART TYPES ====================
export interface CartItem extends Product {
  quantity: number;
}
