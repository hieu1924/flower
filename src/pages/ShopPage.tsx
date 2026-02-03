import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Shop Page - NatNat Flower Shop Style (Improved Version)
 * Product catalog page with enhanced UI/UX
 * Features: Real countdown timer, category filters, hover effects, animations
 */

// Product Card for Shop
interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const ShopProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  originalPrice,
  discount,
  isNew,
  isBestseller,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-[#F5F1ED] rounded-2xl mb-4 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {discount && (
            <span className="px-3 py-1 bg-[#E85A4F] text-white font-['Lato'] font-bold text-xs rounded-full">
              {discount}
            </span>
          )}
          {isNew && (
            <span className="px-3 py-1 bg-[#4CAF50] text-white font-['Lato'] font-bold text-xs rounded-full">
              NEW
            </span>
          )}
          {isBestseller && (
            <span className="px-3 py-1 bg-[#F9A825] text-white font-['Lato'] font-bold text-xs rounded-full">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`absolute top-3 right-3 z-10 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-[#282C2F] hover:text-white transition-colors" aria-label="Add to wishlist">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-[#282C2F] hover:text-white transition-colors" aria-label="Quick view">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>

        {/* Placeholder Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-16 h-16 text-[#282C2F]/10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 4.12 13.38 3 12 3S9.5 4.12 9.5 5.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z"/>
          </svg>
        </div>
        <img
          src={image}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />

        {/* Add to Cart Button (appears on hover) */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button 
            onClick={handleAddToCart}
            className={`w-full py-3 font-['Lato'] font-semibold text-sm rounded-full transition-all duration-300 ${
              isAddedToCart 
                ? 'bg-[#4CAF50] text-white' 
                : 'bg-[#282C2F] text-white hover:bg-[#1a1d1f]'
            }`}
          >
            {isAddedToCart ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-['Lora'] text-lg md:text-xl text-[#282C2F] group-hover:text-[#E85A4F] transition-colors cursor-pointer">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="font-['Lato'] font-bold text-lg text-[#282C2F]">
            {price}
          </p>
          {originalPrice && (
            <p className="font-['Lato'] text-sm text-[#737373] line-through">
              {originalPrice}
            </p>
          )}
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-[#F9A825]' : 'text-gray-300'}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
          <span className="font-['Lato'] text-xs text-[#737373] ml-1">(24)</span>
        </div>
      </div>
    </div>
  );
};

// Category Filter Button
interface CategoryButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 font-['Lato'] font-medium text-sm rounded-full transition-all duration-300 ${
      isActive
        ? 'bg-[#282C2F] text-white'
        : 'bg-white text-[#282C2F] border border-[#E5E5E5] hover:border-[#282C2F]'
    }`}
  >
    {label}
  </button>
);

const ShopPage: React.FC = () => {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  // Category Filter State
  const [activeCategory, setActiveCategory] = useState('all');

  // Real countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'bouquets', label: 'Bouquets' },
    { id: 'arrangements', label: 'Arrangements' },
    { id: 'single', label: 'Single Stems' },
    { id: 'plants', label: 'Plants' },
  ];

  const promoProducts = [
    { image: '/images/flower-1.png', name: 'Rose Bouquet', price: 'Rp 150.000', originalPrice: 'Rp 185.000', discount: '20% OFF' },
    { image: '/images/flower-2.png', name: 'Lily Arrangement', price: 'Rp 180.000', originalPrice: 'Rp 210.000', discount: '15% OFF', isNew: true },
    { image: '/images/flower-3.png', name: 'Tulip Mix', price: 'Rp 120.000', originalPrice: 'Rp 160.000', discount: '25% OFF' },
    { image: '/images/flower-4.png', name: 'Sunflower Set', price: 'Rp 95.000', originalPrice: 'Rp 135.000', discount: '30% OFF', isBestseller: true },
  ];

  const discountProducts = [
    { image: '/images/flower-5.png', name: 'Orchid Collection', price: 'Rp 250.000', originalPrice: 'Rp 500.000', discount: '50% OFF', isBestseller: true },
    { image: '/images/flower-6.png', name: 'Daisy Bundle', price: 'Rp 85.000', originalPrice: 'Rp 142.000', discount: '40% OFF' },
    { image: '/images/flower-7.png', name: 'Carnation Mix', price: 'Rp 110.000', originalPrice: 'Rp 200.000', discount: '45% OFF', isNew: true },
    { image: '/images/flower-8.png', name: 'Hydrangea Set', price: 'Rp 320.000', originalPrice: 'Rp 490.000', discount: '35% OFF' },
  ];

  const flashSaleProducts = [
    { image: '/images/flower-9.png', name: 'Peony Bouquet', price: 'Rp 280.000', originalPrice: 'Rp 700.000', discount: '60% OFF' },
    { image: '/images/flower-10.png', name: 'Lavender Set', price: 'Rp 75.000', originalPrice: 'Rp 167.000', discount: '55% OFF' },
    { image: '/images/flower-11.png', name: 'Jasmine Bundle', price: 'Rp 130.000', originalPrice: 'Rp 370.000', discount: '65% OFF', isBestseller: true },
    { image: '/images/flower-12.png', name: 'Mixed Bouquet', price: 'Rp 200.000', originalPrice: 'Rp 667.000', discount: '70% OFF' },
  ];

  const recommendedProducts = [
    { image: '/images/flower-13.png', name: 'Premium Rose', price: 'Rp 350.000', isNew: true },
    { image: '/images/flower-14.png', name: 'Exotic Orchid', price: 'Rp 450.000', isBestseller: true },
    { image: '/images/flower-15.png', name: 'Garden Mix', price: 'Rp 180.000', isNew: true },
    { image: '/images/flower-16.png', name: 'Seasonal Special', price: 'Rp 220.000' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container-fluid py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center gap-3">
              <img src="/images/logo.svg" alt="Flower Lab" className="h-6 md:h-7 w-auto" />
            </Link>
            
            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/" className="font-['Lato'] font-medium text-[13px] text-[#282C2F] tracking-wide hover:opacity-70 transition-opacity">
                HOME
              </Link>
              <Link to="/shop" className="font-['Lato'] font-bold text-[13px] text-[#282C2F] tracking-wide relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#282C2F]">
                PRODUCTS
              </Link>
              <a href="/#about" className="font-['Lato'] font-medium text-[13px] text-[#282C2F] tracking-wide hover:opacity-70 transition-opacity">
                ABOUT US
              </a>
              <a href="/#contact" className="font-['Lato'] font-medium text-[13px] text-[#282C2F] tracking-wide hover:opacity-70 transition-opacity">
                CONTACT
              </a>
            </nav>
            
            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:opacity-70 transition-opacity" aria-label="Search">
                <svg className="w-5 h-5 text-[#282C2F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </button>
              <button className="relative p-2 hover:opacity-70 transition-opacity" aria-label="Cart">
                <svg className="w-5 h-5 text-[#282C2F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6h15l-1.5 9h-12z"/>
                  <circle cx="9" cy="20" r="1"/>
                  <circle cx="18" cy="20" r="1"/>
                  <path d="M3 3h2l.4 2"/>
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E85A4F] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main>
        {/* Hero Banner */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#F5F1ED] to-[#E8DFD8] overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#282C2F]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#282C2F]/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
          
          <div className="container-fluid text-center relative z-10">
            <div className="inline-block px-4 py-1 bg-[#282C2F]/10 rounded-full mb-4">
              <p className="font-['Lato'] font-semibold text-sm tracking-wider text-[#282C2F]">
                ✨ NEW COLLECTION AVAILABLE
              </p>
            </div>
            <h1 className="font-['Lora'] text-4xl md:text-5xl lg:text-6xl text-[#282C2F] mb-6">
              Flower Shop
            </h1>
            <p className="font-['Lato'] text-base md:text-lg text-[#737373] max-w-2xl mx-auto mb-8">
              Discover our beautiful collection of fresh flowers and arrangements. 
              Hand-picked daily for the freshest quality.
            </p>
            
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <CategoryButton
                  key={category.id}
                  label={category.label}
                  isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Promos Section */}
        <section className="py-12 md:py-20">
          <div className="container-fluid">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <span className="font-['Lato'] font-semibold text-sm tracking-wider text-[#E85A4F] uppercase">
                  Limited Time Offer
                </span>
                <h2 className="font-['Lora'] text-2xl md:text-3xl lg:text-4xl text-[#282C2F] mt-2">
                  Special Promos
                </h2>
              </div>
              <Link to="/shop" className="font-['Lato'] font-semibold text-sm text-[#282C2F] flex items-center gap-2 hover:gap-3 transition-all">
                View All
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
            
            {/* Promo Banner */}
            <div className="relative bg-gradient-to-r from-[#282C2F] to-[#3a3f42] rounded-3xl overflow-hidden mb-10">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 translate-y-1/2"></div>
              </div>
              <div className="relative py-12 px-8 md:py-16 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="font-['Lato'] font-bold text-sm tracking-wider text-[#F9E7B9] uppercase mb-2">
                    This Week Only
                  </p>
                  <h3 className="font-['Lora'] text-3xl md:text-4xl text-white mb-2">
                    Up to 30% Off
                  </h3>
                  <p className="font-['Lato'] text-white/70">
                    On selected premium bouquets
                  </p>
                </div>
                <button className="px-8 py-3 bg-white text-[#282C2F] font-['Lato'] font-bold text-sm rounded-full hover:bg-[#F9E7B9] transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {promoProducts.map((product, index) => (
                <ShopProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Big Discounts Section */}
        <section className="py-12 md:py-20 bg-[#FAFAFA]">
          <div className="container-fluid">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <span className="font-['Lato'] font-semibold text-sm tracking-wider text-[#4CAF50] uppercase">
                  Save Big Today
                </span>
                <h2 className="font-['Lora'] text-2xl md:text-3xl lg:text-4xl text-[#282C2F] mt-2">
                  Big Discounts
                </h2>
              </div>
              <Link to="/shop" className="font-['Lato'] font-semibold text-sm text-[#282C2F] flex items-center gap-2 hover:gap-3 transition-all">
                View All
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {discountProducts.map((product, index) => (
                <ShopProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Flash Sale Section */}
        <section className="py-12 md:py-20">
          <div className="container-fluid">
            <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-10">
              <div className="flex-1">
                <span className="font-['Lato'] font-semibold text-sm tracking-wider text-[#E85A4F] uppercase">
                  🔥 Hurry Up!
                </span>
                <h2 className="font-['Lora'] text-2xl md:text-3xl lg:text-4xl text-[#282C2F] mt-2">
                  Flash Sale
                </h2>
              </div>
              
              {/* Countdown Timer */}
              <div className="flex items-center gap-3">
                <span className="font-['Lato'] text-sm text-[#737373] hidden md:block">Ends in:</span>
                <div className="flex items-center gap-2">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#282C2F] rounded-xl flex flex-col items-center justify-center">
                    <span className="font-['Lato'] font-bold text-xl md:text-2xl text-white leading-none">
                      {formatTime(timeLeft.hours)}
                    </span>
                    <span className="font-['Lato'] text-[10px] text-white/60 uppercase">Hrs</span>
                  </div>
                  <span className="font-['Lato'] font-bold text-2xl text-[#282C2F]">:</span>
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#282C2F] rounded-xl flex flex-col items-center justify-center">
                    <span className="font-['Lato'] font-bold text-xl md:text-2xl text-white leading-none">
                      {formatTime(timeLeft.minutes)}
                    </span>
                    <span className="font-['Lato'] text-[10px] text-white/60 uppercase">Min</span>
                  </div>
                  <span className="font-['Lato'] font-bold text-2xl text-[#282C2F]">:</span>
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#E85A4F] rounded-xl flex flex-col items-center justify-center animate-pulse">
                    <span className="font-['Lato'] font-bold text-xl md:text-2xl text-white leading-none">
                      {formatTime(timeLeft.seconds)}
                    </span>
                    <span className="font-['Lato'] text-[10px] text-white/60 uppercase">Sec</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {flashSaleProducts.map((product, index) => (
                <ShopProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-[#F5F1ED] to-[#E8DFD8]">
          <div className="container-fluid">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-['Lora'] text-2xl md:text-3xl text-[#282C2F] mb-4">
                Subscribe for Special Offers
              </h2>
              <p className="font-['Lato'] text-[#737373] mb-6">
                Get exclusive discounts and early access to new collections
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 bg-white rounded-full font-['Lato'] text-[#282C2F] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#282C2F]/20"
                />
                <button className="px-8 py-3 bg-[#282C2F] text-white font-['Lato'] font-bold text-sm rounded-full hover:bg-[#1a1d1f] transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Recommendation Section */}
        <section className="py-12 md:py-20">
          <div className="container-fluid">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <span className="font-['Lato'] font-semibold text-sm tracking-wider text-[#282C2F]/60 uppercase">
                  Just For You
                </span>
                <h2 className="font-['Lora'] text-2xl md:text-3xl lg:text-4xl text-[#282C2F] mt-2">
                  Recommended For You
                </h2>
              </div>
              <Link to="/shop" className="font-['Lato'] font-semibold text-sm text-[#282C2F] flex items-center gap-2 hover:gap-3 transition-all">
                View All
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {recommendedProducts.map((product, index) => (
                <ShopProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#282C2F] text-white">
        <div className="container-fluid py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <img src="/images/logo.svg" alt="Flower Lab" className="h-10 w-auto brightness-0 invert mb-4" />
              <p className="font-['Lato'] text-sm text-white/70 mb-6">
                Fresh flowers delivered to your doorstep. Making every moment beautiful since 2020.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Instagram">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Twitter">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-['Lora'] text-lg text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="font-['Lato'] text-sm text-white/70 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/shop" className="font-['Lato'] text-sm text-white/70 hover:text-white transition-colors">Shop</Link></li>
                <li><a href="/#about" className="font-['Lato'] text-sm text-white/70 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/#contact" className="font-['Lato'] text-sm text-white/70 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Categories */}
            <div>
              <h4 className="font-['Lora'] text-lg text-white mb-4">Categories</h4>
              <ul className="space-y-3">
                <li><a href="#" className="font-['Lato'] text-sm text-white/70 hover:text-white transition-colors">Bouquets</a></li>
                <li><a href="#" className="font-['Lato'] text-sm text-white/70 hover:text-white transition-colors">Arrangements</a></li>
                <li><a href="#" className="font-['Lato'] text-sm text-white/70 hover:text-white transition-colors">Single Stems</a></li>
                <li><a href="#" className="font-['Lato'] text-sm text-white/70 hover:text-white transition-colors">Plants</a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="font-['Lora'] text-lg text-white mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="font-['Lato'] text-sm text-white/70">📍 123 Flower Street, Jakarta</li>
                <li className="font-['Lato'] text-sm text-white/70">📞 +62 812-3456-7890</li>
                <li className="font-['Lato'] text-sm text-white/70">✉️ hello@flowerlab.com</li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-['Lato'] text-sm text-white/60">
              © 2024 Flower Lab. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="font-['Lato'] text-sm text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="font-['Lato'] text-sm text-white/60 hover:text-white transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShopPage;
