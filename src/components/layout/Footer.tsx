import React from 'react';
import { useSiteContent } from '../../hooks';
import { fallbackSiteContent } from '../../data';
import { getImagePath } from '../../utils';

/**
 * Footer Component
 * Footer matching Figma design (dynamic content from Google Sheets)
 * - Dark background
 * - Logo centered
 * - Links: Privacy Policy, Terms & Conditions
 * - Copyright
 */
export const Footer: React.FC = () => {
  const { data: siteContent } = useSiteContent(fallbackSiteContent);

  return (
    <footer className="bg-[#282C2F] text-white">
      <div className="container-fluid py-16 md:py-20">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src={getImagePath('logo.svg')} 
              alt="Flower Lab" 
              className="h-12 md:h-14 w-auto brightness-0 invert"
            />
          </div>
          
          {/* Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-8">
            <a 
              href="#privacy" 
              className="font-['Inter'] text-sm text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {siteContent?.footer?.privacyText || 'Chính sách bảo mật'}
            </a>
            <span className="hidden md:block text-white/40">|</span>
            <a 
              href="#terms" 
              className="font-['Inter'] text-sm text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {siteContent?.footer?.termsText || 'Điều khoản sử dụng'}
            </a>
          </div>
          
          {/* Copyright */}
          <p className="font-['Inter'] text-sm text-white/80">
            {siteContent?.footer?.copyright || '© 2026 Bản quyền thuộc NatNat Flower Shop'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
