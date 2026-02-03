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
      title: 'First feature',
      description: 'Short text describing one of your product or service features.',
    },
    {
      icon: '/images/flower-feature-2.png',
      title: 'Second feature',
      description: 'Short text describing one of your product or service features.',
    },
    {
      icon: '/images/flower-feature-3.png',
      title: 'Third feature',
      description: 'Short text describing one of your product or service features.',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container-fluid">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-['Lato'] text-2xl md:text-3xl lg:text-[34px] text-[#282C2F] leading-tight tracking-wide">
            Plants and flowers are our specialty.{' '}
            <br className="hidden md:block" />
            We make it reasonable.
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
