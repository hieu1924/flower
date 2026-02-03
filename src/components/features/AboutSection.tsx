import React from 'react';

/**
 * About Us Section
 * Two columns: Who we are & What we do
 */
export const AboutSection: React.FC = () => {
  const sections = [
    {
      title: 'Who we are',
      content: 'A paragraph or two with information on your product/service or describes a problem your product/service is designed to solve. Provide your customers a story they would enjoy keeping in mind the objectives of your website. Pay special attention to the tone of voice. Try to win the customers\' trust by being positive.',
      image: '/images/about-1.png',
      link: 'See our promise',
    },
    {
      title: 'What we do',
      content: 'A paragraph or two with information on your product/service or describes a problem your product/service is designed to solve. Provide your customers a story they would enjoy keeping in mind the objectives of your website. Pay special attention to the tone of voice. Try to win the customers\' trust by being positive.',
      image: '/images/about-2.png',
      link: 'See our promise',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-[#F5F1ED]">
      <div className="container-fluid">
        {sections.map((section, index) => (
          <div 
            key={index}
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
                {section.link}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
