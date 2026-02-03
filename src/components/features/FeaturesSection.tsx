import React from 'react';
import { FeatureCard } from '../ui/FeatureCard';
import { useFeatures, useSiteContent } from '../../hooks';
import { fallbackFeatures, fallbackSiteContent } from '../../data';

/**
 * Features Section
 * Three feature cards with icons (dynamic content from Google Sheets)
 */
export const FeaturesSection: React.FC = () => {
  const { data: features } = useFeatures(fallbackFeatures);
  const { data: siteContent } = useSiteContent(fallbackSiteContent);

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container-fluid">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-['Lato'] text-2xl md:text-3xl lg:text-[34px] text-[#282C2F] leading-tight tracking-wide">
            {siteContent?.features?.title || 'Hoa và cây cảnh là chuyên môn của chúng tôi. Chúng tôi mang đến giá cả hợp lý.'}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id || index}
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
