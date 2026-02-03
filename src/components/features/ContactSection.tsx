import React from 'react';
import { Button } from '../ui/Button';
import { useSiteContent } from '../../hooks';
import { fallbackSiteContent } from '../../data';

/**
 * Contact CTA Section
 * Contact form CTA with background (dynamic content from Google Sheets)
 */
export const ContactSection: React.FC = () => {
  const { data: siteContent } = useSiteContent(fallbackSiteContent);

  return (
    <section 
      className="relative py-20 md:py-32"
      style={{
        backgroundImage: 'url(/images/contact-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative z-10 container-fluid text-center">
        <h2 className="font-['Lora'] text-2xl md:text-4xl text-[#282C2F] mb-8 max-w-md mx-auto leading-snug">
          {siteContent?.contact?.title || 'Liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào'}
        </h2>
        
        <Button>{siteContent?.contact?.ctaText || 'Liên hệ'}</Button>
      </div>
    </section>
  );
};

export default ContactSection;
