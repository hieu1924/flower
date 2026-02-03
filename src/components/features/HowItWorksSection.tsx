import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { useHowItWorks, useSiteContent } from '../../hooks';
import { fallbackHowItWorks, fallbackSiteContent } from '../../data';
import { getImagePath } from '../../utils';

/**
 * How It Works Section
 * Explains the process with decorative flowers (dynamic content from Google Sheets)
 */
export const HowItWorksSection: React.FC = () => {
  const { data: steps } = useHowItWorks(fallbackHowItWorks);
  const { data: siteContent } = useSiteContent(fallbackSiteContent);

  // Sort by stepNumber
  const sortedSteps = [...steps].sort((a, b) => 
    (a.stepNumber || 0) - (b.stepNumber || 0)
  );

  return (
    <section 
      id="how-it-works" 
      className="relative py-16 md:py-24"
      style={{
        backgroundImage: `url(${getImagePath('how-it-works-bg.png')})`,
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
            title={siteContent?.howItWorks?.title || 'Từ những bó hoa thủ công đến các bố cục hoa tươi tốt'}
            subtitle={siteContent?.howItWorks?.subtitle || 'Chúng tôi cung cấp dịch vụ hoa tươi chất lượng cao với quy trình đặt hàng đơn giản và giao hàng nhanh chóng.'}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Side - Decorative Images */}
          <div className="relative hidden lg:block h-[500px]">
            <img
              src={getImagePath('flower-feature-2.png')}
              alt="Flower"
              className="absolute bottom-0 left-0 w-48 h-auto object-contain"
            />
            <img
              src={getImagePath('flower-feature-1.png')}
              alt="Flower"
              className="absolute top-1/4 left-1/3 w-40 h-auto object-contain"
            />
            <img
              src={getImagePath('flower-feature-3.png')}
              alt="Flower"
              className="absolute bottom-1/4 right-0 w-52 h-auto object-contain"
            />
          </div>

          {/* Right Side - How It Works */}
          <div className="bg-white/90 p-8 rounded-lg">
            <h3 className="font-['Lato'] text-2xl md:text-[34px] text-[#282C2F] mb-2">
              {siteContent?.howItWorks?.sectionTitle || 'Cách hoạt động'}
            </h3>
            <p className="font-['Lato'] text-xl text-[#737373] mb-4">
              {siteContent?.howItWorks?.sectionSubtitle || 'Đơn giản & Nhanh chóng'}
            </p>
            <p className="font-['Lato'] text-base text-[#737373] leading-relaxed tracking-wide mb-8">
              {siteContent?.howItWorks?.sectionDescription || 'Chỉ với 3 bước đơn giản, bạn sẽ nhận được bó hoa tươi đẹp ngay tại cửa nhà.'}
            </p>

            {/* Steps */}
            <div className="space-y-4">
              {sortedSteps.map((step, index) => (
                <p 
                  key={step.stepNumber || index}
                  className="font-['Lato'] text-base text-[#282C2F] tracking-wide"
                >
                  {step.emoji || '❉'} {step.title}
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
