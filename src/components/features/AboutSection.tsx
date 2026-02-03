import React from 'react';
import { useAbout, useSiteContent } from '../../hooks';
import { fallbackAbout, fallbackSiteContent } from '../../data';

/**
 * About Us Section
 * Two columns: Who we are & What we do (dynamic content from Google Sheets)
 */
export const AboutSection: React.FC = () => {
  const { data: sections } = useAbout(fallbackAbout);
  const { data: siteContent } = useSiteContent(fallbackSiteContent);

  // Sort by displayOrder if available
  const sortedSections = [...sections].sort((a, b) => 
    (a.displayOrder || 0) - (b.displayOrder || 0)
  );

  return (
    <section id="about" className="py-16 md:py-24 bg-[#F5F1ED]">
      <div className="container-fluid">
        {sortedSections.map((section, index) => (
          <div 
            key={section.id || index}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center ${
              index === 1 ? 'mt-16 md:mt-24 lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image */}
            <div className={`${index === 1 ? 'lg:order-2' : ''}`}>
              <img
                src={section.image}
                alt={section.title}
                className="w-full max-w-lg mx-auto rounded-lg"
              />
            </div>

            {/* Content */}
            <div className={`${index === 1 ? 'lg:order-1' : ''}`}>
              <h3 className="font-['Lato'] text-2xl md:text-[34px] text-[#282C2F] mb-6">
                {section.title}
              </h3>
              
              <p className="font-['Lato'] text-base text-[#737373] leading-relaxed tracking-wide mb-6">
                {section.content}
              </p>
              
              <a 
                href="#" 
                className="inline-block font-['Lato'] text-base text-[#282C2F] underline hover:no-underline"
              >
                {section.linkText || siteContent?.about?.link1Text || 'Xem cam kết của chúng tôi'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
