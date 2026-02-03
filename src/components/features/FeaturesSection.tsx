import React from 'react';
import { FeatureCard } from '../ui/FeatureCard';

/**
 * Features Section
 * Three feature cards with icons
 */
export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: '/images/flower-feature-1.png',
      title: 'Hoa tươi mỗi ngày',
      description: 'Chúng tôi chỉ sử dụng hoa tươi được nhập về hàng ngày.',
    },
    {
      icon: '/images/flower-feature-2.png',
      title: 'Giao hàng nhanh',
      description: 'Giao hàng trong ngày cho các đơn hàng nội thành.',
    },
    {
      icon: '/images/flower-feature-3.png',
      title: 'Giá cả hợp lý',
      description: 'Chất lượng cao với giá cả phải chăng cho mọi người.',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container-fluid">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-['Lato'] text-2xl md:text-3xl lg:text-[34px] text-[#282C2F] leading-tight tracking-wide">
            Hoa và cây cảnh là chuyên môn của chúng tôi.{' '}
            <br className="hidden md:block" />
            Chúng tôi mang đến giá cả hợp lý.
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
