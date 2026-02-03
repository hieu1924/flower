import React from 'react';
import { Button } from '../ui/Button';
import { useSiteContent, useSiteConfig } from '../../hooks';
import { fallbackSiteContent, fallbackSiteConfig } from '../../data';
import { getImagePath } from '../../utils';

/**
 * Discount Banner Section
 * CTA banner with discount offer (dynamic content from Google Sheets)
 */
export const DiscountBanner: React.FC = () => {
  const { data: siteContent } = useSiteContent(fallbackSiteContent);
  const { data: siteConfig } = useSiteConfig(fallbackSiteConfig);

  const discountPercentage = siteConfig?.discountPercentage || 15;
  const defaultTitle = `Đặt hàng ngay và nhận giảm ${discountPercentage}% phí giao hàng`;

  return (
    <section 
      className="relative py-20 md:py-32"
      style={{
        backgroundImage: `url(${getImagePath('discount-banner.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10 container-fluid text-center">
        <h2 className="font-['Lora'] text-2xl md:text-4xl lg:text-5xl text-[#282C2F] mb-8 max-w-2xl mx-auto leading-tight">
          {siteContent?.discount?.title || defaultTitle}
        </h2>
        
        <Button>{siteContent?.discount?.ctaText || 'Mua ngay'}</Button>
      </div>
    </section>
  );
};

export default DiscountBanner;
