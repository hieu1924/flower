import React from 'react';
import { useTestimonials, useSiteContent } from '../../hooks';
import { fallbackTestimonials, fallbackSiteContent } from '../../data';

/**
 * Reviews/Testimonials Section
 * Customer reviews carousel (dynamic content from Google Sheets)
 */
export const ReviewsSection: React.FC = () => {
  const { data: testimonials } = useTestimonials(fallbackTestimonials);
  const { data: siteContent } = useSiteContent(fallbackSiteContent);

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white">
      <div className="container-fluid">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-['Lato'] text-2xl md:text-3xl text-[#282C2F] leading-normal tracking-wide">
            {siteContent?.reviews?.title || 'Khách hàng nói gì về chúng tôi'}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id || index}
              className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100"
            >
              {/* Rating Stars */}
              <div className="text-[#000] text-base mb-4 tracking-wide text-center">
                {'✦ '.repeat(testimonial.rating || 5).trim()}
              </div>
              
              {/* Name */}
              <h4 className="font-['Lato'] font-normal text-xl text-[#000] mb-4 text-center">
                {testimonial.name}
              </h4>
              
              {/* Testimonial Text */}
              <p className="font-['Lato'] text-base text-[#737373] leading-relaxed tracking-wide text-center">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Arrows (Desktop) */}
        <div className="hidden lg:flex justify-center gap-4 mt-8">
          <button className="w-16 h-0.5 bg-[#282C2F] cursor-pointer hover:bg-[#E85A4F] transition-colors" aria-label="Previous" />
          <button className="w-16 h-0.5 bg-[#282C2F] cursor-pointer hover:bg-[#E85A4F] transition-colors" aria-label="Next" />
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
