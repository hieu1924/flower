import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * Button Component
 * Primary CTA button matching Figma design
 * - Border radius: 122px (full rounded)
 * - Font: Lato Semi-bold 14px
 * - Letter spacing: 2%
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold tracking-wide
    rounded-full cursor-pointer
    transition-all duration-300 ease-out
    border-none outline-none
    hover:opacity-90 hover:transform hover:-translate-y-0.5
    active:transform active:translate-y-0
  `;
  
  const variants = {
    primary: 'bg-[#282C2F] text-white hover:bg-[#1a1d1f]',
    outline: 'bg-transparent border-2 border-[#282C2F] text-[#282C2F] hover:bg-[#282C2F] hover:text-white',
  };
  
  const sizes = {
    sm: 'px-8 py-2.5 text-sm',
    md: 'px-12 py-4 text-sm',
    lg: 'px-14 py-5 text-base',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
