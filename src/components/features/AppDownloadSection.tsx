import React from 'react';
import { Button } from '../ui/Button';
import { useSiteContent } from '../../hooks';
import { fallbackSiteContent } from '../../data';
import { getImagePath } from '../../utils';

/**
 * App Download Section
 * Mobile app promotion section (dynamic content from Google Sheets)
 */
export const AppDownloadSection: React.FC = () => {
  const { data: siteContent } = useSiteContent(fallbackSiteContent);

  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Phone Image */}
        <div className="relative bg-[#F9E7B9] min-h-[400px] lg:min-h-[590px]">
          <img
            src={getImagePath('cta-phone-1.png')}
            alt="Mobile App"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 h-[350px] md:h-[450px] lg:h-[520px] w-auto object-contain"
          />
        </div>

        {/* Right Side - Content */}
        <div className="bg-white py-16 px-8 lg:px-20 flex items-center">
          <div className="max-w-lg">
            <h2 className="font-['Lora'] text-3xl md:text-4xl lg:text-5xl text-[#282C2F] mb-6 leading-snug">
              {siteContent?.app?.title || 'Chúng tôi luôn bên bạn'}
            </h2>
            
            <p className="font-['Lato'] text-base text-[#282C2F] leading-relaxed tracking-wide mb-4">
              {siteContent?.app?.description || 'Tải ứng dụng của chúng tôi để đặt hoa nhanh chóng và nhận nhiều ưu đãi độc quyền. Theo dõi đơn hàng dễ dàng và nhận thông báo về các khuyến mãi mới nhất.'}
            </p>
            
            <p className="font-['Lato'] text-xl md:text-2xl text-[#282C2F] mb-8">
              {siteContent?.app?.platformText || 'Có sẵn trên iOS và Android'}
            </p>
            
            <Button>{siteContent?.app?.ctaText || 'Tải ứng dụng'}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
