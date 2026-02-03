import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useSiteContent } from '../../hooks';
import { fallbackSiteContent } from '../../data';

/**
 * Header Component
 * Navigation header matching Figma design
 * - Top banner: Free shipping message (dynamic from Google Sheets)
 * - Logo + Navigation + CTA Button (Shop Now → /shop)
 */
export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: siteContent } = useSiteContent(fallbackSiteContent);
  
  const navItems = [
    { label: 'TÍNH NĂNG', href: '#features' },
    { label: 'CÁCH HOẠT ĐỘNG', href: '#how-it-works' },
    { label: 'BÁN CHẠY', href: '#bestsellers' },
    { label: 'ĐÁNH GIÁ', href: '#reviews' },
    { label: 'VỀ CHÚNG TÔI', href: '#about' },
  ];
  
  return (
    <header className="sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-[#282C2F] py-1">
        <p className="text-center text-white text-xs md:text-sm font-medium tracking-wide">
          {siteContent?.header?.bannerText || 'MIỄN PHÍ VẬN CHUYỂN CHO ĐƠN HÀNG TỪ 500.000đ'}
        </p>
      </div>
      
      {/* Main Header */}
      <div 
        className="relative"
        style={{
          backgroundImage: 'url(/images/header-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container-fluid py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex-shrink-0 cursor-pointer">
              <img 
                src="/images/logo.svg" 
                alt="Flower Lab" 
                className="h-6 md:h-7 w-auto"
              />
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-['Lato'] font-medium text-[13px] text-[#282C2F] tracking-wide hover:opacity-70 transition-opacity cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <Link to="/shop" className="hidden md:inline-flex">
                <Button size="sm">
                  Mua ngay
                </Button>
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6 text-[#282C2F]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
            <nav className="container-fluid py-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-3 font-['Lato'] font-medium text-sm text-[#282C2F] tracking-wide border-b border-gray-100 last:border-0 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4">
                <Link to="/shop" className="block">
                  <Button size="sm" className="w-full">
                    Mua ngay
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
