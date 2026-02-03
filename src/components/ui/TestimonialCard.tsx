import React from 'react';

interface TestimonialCardProps {
  image?: string;
  name: string;
  rating: number;
  text: string;
  className?: string;
}

/**
 * TestimonialCard Component
 * Customer review card from Figma design
 * - Rating: 5 stars with ✦ symbol
 * - Name: Lato 20px
 * - Text: Lato 16px gray
 */
export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  image,
  name,
  rating = 5,
  text,
  className = '',
}) => {
  const stars = '✦ '.repeat(rating).trim();
  
  return (
    <div 
      className={`relative p-8 rounded-lg text-center ${className}`}
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay if has background */}
      {image && (
        <div className="absolute inset-0 bg-white/90 rounded-lg" />
      )}
      
      <div className="relative z-10">
        {/* Rating Stars */}
        <div className="text-[#000] text-base mb-4 tracking-wide">
          {stars}
        </div>
        
        {/* Name */}
        <h4 className="font-['Lato'] font-normal text-xl text-[#000] mb-4">
          {name}
        </h4>
        
        {/* Testimonial Text */}
        <p className="font-['Lato'] text-base text-[#737373] leading-relaxed tracking-wide max-w-sm mx-auto">
          {text}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
