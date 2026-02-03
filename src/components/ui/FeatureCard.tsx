import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

/**
 * FeatureCard Component
 * Feature item with icon from Figma design
 * - Icon: 84x84
 * - Title: Lato Semi-bold 18px
 * - Description: Lato 16px gray
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <img
          src={icon}
          alt={title}
          className="w-20 h-20 object-contain"
        />
      </div>
      
      {/* Title */}
      <h3 className="font-['Lato'] font-semibold text-lg text-[#282C2F] mb-2 tracking-wide">
        {title}
      </h3>
      
      {/* Description */}
      <p className="font-['Lato'] text-base text-[#737373] leading-relaxed tracking-wide max-w-xs mx-auto">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
