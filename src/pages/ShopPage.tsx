import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Shop Page - NatNat Flower Shop Style
 * Product catalog page following Figma wireframe structure
 * Sections: Header, Banner, Promos, Big Discounts, Flash Sale, Recommendation, Footer
 * Colors unified with landing page (#282C2F)
 */

// Product Card for Shop
interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  discount?: string;
}

const ShopProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  discount,
}) => {
  return (
    <div className="group">
      {/* Product Image */}
      <div className="relative aspect-square bg-[#F5F1ED] rounded-lg mb-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-16 h-16 text-[#282C2F]/20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <circle cx="12" cy="12" r="5"/>
          </svg>
        </div>
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      
      {/* Product Info */}
      <div className="space-y-1">
        {discount && (
          <p className="font-['Lato'] font-medium text-sm text-[#737373]">
            {discount}
          </p>
        )}
        <h3 className="font-['Lora'] text-lg md:text-xl text-[#282C2F]">
          {name}
        </h3>
        <p className="font-['Lato'] font-medium text-base text-[#282C2F]">
          {price}
        </p>
        <button className="mt-3 px-6 py-2 bg-[#282C2F] text-white font-['Lato'] font-semibold text-sm rounded-full hover:bg-[#1a1d1f] transition-colors">
          Add to cart
        </button>
      </div>
    </div>
  );
};

const ShopPage: React.FC = () => {
  const promoProducts = [
    { image: '/images/flower-1.png', name: 'Rose Bouquet', price: 'Rp 150.000', discount: '20% OFF' },
    { image: '/images/flower-2.png', name: 'Lily Arrangement', price: 'Rp 180.000', discount: '15% OFF' },
    { image: '/images/flower-3.png', name: 'Tulip Mix', price: 'Rp 120.000', discount: '25% OFF' },
    { image: '/images/flower-4.png', name: 'Sunflower Set', price: 'Rp 95.000', discount: '30% OFF' },
  ];

  const discountProducts = [
    { image: '/images/flower-5.png', name: 'Orchid Collection', price: 'Rp 250.000', discount: '50% OFF' },
    { image: '/images/flower-6.png', name: 'Daisy Bundle', price: 'Rp 85.000', discount: '40% OFF' },
    { image: '/images/flower-7.png', name: 'Carnation Mix', price: 'Rp 110.000', discount: '45% OFF' },
    { image: '/images/flower-8.png', name: 'Hydrangea Set', price: 'Rp 320.000', discount: '35% OFF' },
  ];

  const flashSaleProducts = [
    { image: '/images/flower-9.png', name: 'Peony Bouquet', price: 'Rp 280.000', discount: '60% OFF' },
    { image: '/images/flower-10.png', name: 'Lavender Set', price: 'Rp 75.000', discount: '55% OFF' },
    { image: '/images/flower-11.png', name: 'Jasmine Bundle', price: 'Rp 130.000', discount: '65% OFF' },
    { image: '/images/flower-12.png', name: 'Mixed Bouquet', price: 'Rp 200.000', discount: '70% OFF' },
  ];

  const recommendedProducts = [
    { image: '/images/flower-13.png', name: 'Premium Rose', price: 'Rp 350.000' },
    { image: '/images/flower-14.png', name: 'Exotic Orchid', price: 'Rp 450.000' },
    { image: '/images/flower-15.png', name: 'Garden Mix', price: 'Rp 180.000' },
    { image: '/images/flower-16.png', name: 'Seasonal Special', price: 'Rp 220.000' },
  ];

  // Countdown timer (static for now)
  const timeLeft = { hours: 12, minutes: 45, seconds: 30 };
  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
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
              <Link to="/shop" className="font-['Lato'] font-bold text-[13px] text-[#282C2F] tracking-wide">
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
              <button className="p-2 hover:opacity-70 transition-opacity" aria-label="Cart">
                <svg className="w-5 h-5 text-[#282C2F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6h15l-1.5 9h-12z"/>
                  <circle cx="9" cy="20" r="1"/>
                  <circle cx="18" cy="20" r="1"/>
                  <path d="M3 3h2l.4 2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main>
        {/* Hero Banner */}
        <section className="relative py-16 md:py-24 bg-[#F5F1ED]">
          <div className="container-fluid text-center">
            <p className="font-['Lato'] font-semibold text-lg md:text-xl tracking-wider text-[#282C2F] mb-2">
              WELCOME TO OUR
            </p>
            <h1 className="font-['Lora'] text-3xl md:text-4xl lg:text-5xl text-[#282C2F] mb-8">
              Flower Shop
            </h1>
            <p className="font-['Lato'] text-base md:text-lg text-[#737373] max-w-xl mx-auto">
              Discover our beautiful collection of fresh flowers and arrangements
            </p>
          </div>
        </section>

        {/* Promos Section */}
        <section className="py-12 md:py-16">
          <div className="container-fluid">
            <h2 className="font-['Lora'] text-2xl md:text-3xl text-[#282C2F] mb-8">
              Special Promos
            </h2>
            
            {/* Promo Banner */}
            <div className="relative bg-[#F5F1ED] rounded-2xl overflow-hidden mb-8">
              <div className="aspect-[3/1] flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="font-['Lora'] text-xl md:text-2xl text-[#282C2F]">
                    Special Offers This Week
                  </p>
                  <p className="font-['Lato'] text-[#737373] mt-2">
                    Up to 30% off on selected items
                  </p>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {promoProducts.map((product, index) => (
                <ShopProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Big Discounts Section */}
        <section className="py-12 md:py-16 bg-[#F5F1ED]/50">
          <div className="container-fluid">
            <h2 className="font-['Lora'] text-2xl md:text-3xl text-[#282C2F] mb-8">
              Big Discounts
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {discountProducts.map((product, index) => (
                <ShopProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Flash Sale Section */}
        <section className="py-12 md:py-16">
          <div className="container-fluid">
            <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-8">
              <h2 className="font-['Lora'] text-2xl md:text-3xl text-[#282C2F]">
                Flash Sale
              </h2>
              <div className="font-['Lato'] font-semibold text-lg md:text-xl text-[#282C2F] bg-[#F9E7B9] px-4 py-2 rounded-full">
                {formatTime(timeLeft.hours)} : {formatTime(timeLeft.minutes)} : {formatTime(timeLeft.seconds)}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSaleProducts.map((product, index) => (
                <ShopProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Recommendation Section */}
        <section className="py-12 md:py-16 bg-[#F5F1ED]/50">
          <div className="container-fluid">
            <h2 className="font-['Lora'] text-2xl md:text-3xl text-[#282C2F] mb-8">
              Recommended For You
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product, index) => (
                <ShopProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#282C2F] text-white">
        <div className="container-fluid py-16">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8">
              <img src="/images/logo.svg" alt="Flower Lab" className="h-12 w-auto brightness-0 invert" />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-8">
              <a href="#privacy" className="font-['Lato'] text-sm text-white/80 hover:text-white transition-colors">
                Privacy policy
              </a>
              <span className="hidden md:block text-white/40">|</span>
              <a href="#terms" className="font-['Lato'] text-sm text-white/80 hover:text-white transition-colors">
                Terms and Conditions
              </a>
            </div>
            <p className="font-['Lato'] text-sm text-white/80">
              © 2024 Flower Lab. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShopPage;
