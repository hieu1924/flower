import React from 'react';
import { Button } from '../ui/Button';

/**
 * App Download Section
 * Mobile app promotion section
 */
export const AppDownloadSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Phone Image */}
        <div className="relative bg-[#F9E7B9] min-h-[400px] lg:min-h-[590px]">
          <img
            src="/images/cta-phone-1.png"
            alt="Mobile App"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 h-[350px] md:h-[450px] lg:h-[520px] w-auto object-contain"
          />
        </div>

        {/* Right Side - Content */}
        <div className="bg-white py-16 px-8 lg:px-20 flex items-center">
          <div className="max-w-lg">
            <h2 className="font-['Lora'] text-3xl md:text-4xl lg:text-5xl text-[#282C2F] mb-6 leading-snug">
              We're with you
            </h2>
            
            <p className="font-['Lato'] text-base text-[#282C2F] leading-relaxed tracking-wide mb-4">
              Provide your customers a story they would enjoy keeping in mind the objectives of your website. Pay special attention to tone of voice. Try to win the customers' trust by being positive.
            </p>
            
            <p className="font-['Lato'] text-xl md:text-2xl text-[#282C2F] mb-8">
              Now available on iOS and Android
            </p>
            
            <Button>Download</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
