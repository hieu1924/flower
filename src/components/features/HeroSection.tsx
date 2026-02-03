import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useSiteContent } from '../../hooks';
import { fallbackSiteContent } from '../../data';
import { getImagePath } from '../../utils';

/**
 * Hero Section
 * Main hero section with background image (dynamic content from Google Sheets)
 * - Large heading: Lora 32-48px
 * - Subtitle: Lato 16px
 * - CTA Button → navigates to Shop page
 */
export const HeroSection: React.FC = () => {
  const { data: siteContent } = useSiteContent(fallbackSiteContent);

  return (
    <section 
      id="hero"
      className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[750px] flex items-center justify-center"
      style={{
        backgroundImage: `url(${getImagePath('hero-bg.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Content */}
      <div className="relative z-10 container-fluid text-center px-4">
        <div className="max-w-xl mx-auto">
          {/* Heading */}
          <h1 className="font-['Lora'] text-3xl md:text-4xl lg:text-5xl font-normal text-[#282C2F] leading-tight mb-6">
            {siteContent?.hero?.title || 'Làm mới không gian với cây xanh và những bó hoa tinh tế'}
          </h1>
          
          {/* Subtitle */}
          <p className="font-['Lato'] text-base md:text-lg text-[#282C2F] leading-relaxed mb-8 max-w-md mx-auto">
            {siteContent?.hero?.subtitle || 'Tạo khu vườn trong nhà hoàn hảo với các loại cây cảnh, cây nở hoa, cây treo và nhiều hơn nữa!'}
          </p>
          
          {/* CTA Button - Links to Shop */}
          <Link to="/shop">
            <Button>{siteContent?.hero?.ctaText || 'Mua ngay'}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
