import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

/**
 * SectionTitle Component
 * Typography matching Figma design tokens
 * - Title: Lora 28-48px
 * - Subtitle: Lato 16px gray
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  return (
    <div className={`${alignStyles[align]} ${className}`}>
      <h2 className="font-['Lora'] text-2xl md:text-3xl lg:text-5xl font-normal text-[#282C2F] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-['Lato'] text-base text-[#737373] leading-relaxed tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
