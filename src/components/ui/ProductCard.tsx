import React from 'react';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  className?: string;
}

/**
 * ProductCard Component
 * Bestseller product card from Figma design
 * - Image: 283x390 aspect ratio
 * - Name: Lato Semi-bold 18px
 * - Price: Lato Semi-bold 18px gray
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  className = '',
}) => {
  return (
    <div className={`product-card group cursor-pointer ${className}`}>
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={name}
          className="w-full aspect-[283/390] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="font-['Lato'] font-semibold text-lg text-[#282C2F] tracking-wide">
          {name}
        </h3>
        <p className="font-['Lato'] font-semibold text-lg text-[#737373] tracking-wide">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
