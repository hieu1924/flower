import React from 'react';
import { Button } from '../ui/Button';

/**
 * Hero Section
 * Main hero section with background image
 * - Large heading: Lora 32-48px
 * - Subtitle: Lato 16px
 * - CTA Button
 */
export const HeroSection: React.FC = () => {
  return (
    <section 
      id="hero"
      className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[750px] flex items-center justify-center"
      style={{
        backgroundImage: 'url(/images/hero-bg.png)',
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
            Refresh your space{' '}
            <br className="hidden md:block" />
            with lush greenery and exquisite flower bouquets
          </h1>
          
          {/* Subtitle */}
          <p className="font-['Lato'] text-base md:text-lg text-[#282C2F] leading-relaxed mb-8 max-w-md mx-auto">
            Create the perfect indoor jungle with our bold houseplants, blooming plants, hanging plants, and more!
          </p>
          
          {/* CTA Button */}
          <Button>Buy Now</Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
