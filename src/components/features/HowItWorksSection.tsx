import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';

/**
 * How It Works Section
 * Explains the process with decorative flowers
 */
export const HowItWorksSection: React.FC = () => {
  const steps = [
    '❉ Bước 1: Chọn hoa yêu thích',
    '❉ Bước 2: Đặt hàng online',
    '❉ Bước 3: Nhận hoa tại nhà',
  ];

  return (
    <section 
      id="how-it-works" 
      className="relative py-16 md:py-24"
      style={{
        backgroundImage: 'url(/images/how-it-works-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80" />
      
      <div className="relative z-10 container-fluid">
        {/* Main Title */}
        <div className="text-center mb-8 md:mb-12">
          <SectionTitle
            title="Từ những bó hoa thủ công đến các bố cục hoa tươi tốt"
            subtitle="Chúng tôi cung cấp dịch vụ hoa tươi chất lượng cao với quy trình đặt hàng đơn giản và giao hàng nhanh chóng."
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Side - Decorative Images */}
          <div className="relative hidden lg:block h-[500px]">
            <img
              src="/images/flower-feature-2.png"
              alt="Flower"
              className="absolute bottom-0 left-0 w-48 h-auto object-contain"
            />
            <img
              src="/images/flower-feature-1.png"
              alt="Flower"
              className="absolute top-1/4 left-1/3 w-40 h-auto object-contain"
            />
            <img
              src="/images/flower-feature-3.png"
              alt="Flower"
              className="absolute bottom-1/4 right-0 w-52 h-auto object-contain"
            />
          </div>

          {/* Right Side - How It Works */}
          <div className="bg-white/90 p-8 rounded-lg">
            <h3 className="font-['Lato'] text-2xl md:text-[34px] text-[#282C2F] mb-2">
              Cách hoạt động
            </h3>
            <p className="font-['Lato'] text-xl text-[#737373] mb-4">
              Đơn giản & Nhanh chóng
            </p>
            <p className="font-['Lato'] text-base text-[#737373] leading-relaxed tracking-wide mb-8">
              Chỉ với 3 bước đơn giản, bạn sẽ nhận được bó hoa tươi đẹp ngay tại cửa nhà.
            </p>

            {/* Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <p 
                  key={index}
                  className="font-['Lato'] text-base text-[#282C2F] tracking-wide"
                >
                  {step}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
