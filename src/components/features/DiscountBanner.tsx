import React from 'react';
import { Button } from '../ui/Button';

/**
 * Discount Banner Section
 * CTA banner with discount offer
 */
export const DiscountBanner: React.FC = () => {
  return (
    <section 
      className="relative py-20 md:py-32"
      style={{
        backgroundImage: 'url(/images/discount-banner.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10 container-fluid text-center">
        <h2 className="font-['Lora'] text-2xl md:text-4xl lg:text-5xl text-[#282C2F] mb-8 max-w-2xl mx-auto leading-tight">
          Đặt hàng ngay và nhận giảm 15% phí giao hàng
        </h2>
        
        <Button>Mua ngay</Button>
      </div>
    </section>
  );
};

export default DiscountBanner;
