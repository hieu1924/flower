import React from 'react';
import { Button } from '../ui/Button';
import { ProductCard } from '../ui/ProductCard';
import { useBestsellers, useSiteContent } from '../../hooks';
import { fallbackBestsellers, fallbackSiteContent } from '../../data';

/**
 * Bestsellers Section
 * Product grid with bestselling flowers (dynamic content from Google Sheets)
 */
export const BestsellersSection: React.FC = () => {
  const { data: products } = useBestsellers(fallbackBestsellers);
  const { data: siteContent } = useSiteContent(fallbackSiteContent);

  // Sort by displayOrder if available
  const sortedProducts = [...products].sort((a, b) => 
    (a.displayOrder || 0) - (b.displayOrder || 0)
  );

  return (
    <section id="bestsellers" className="py-16 md:py-24 bg-white">
      <div className="container-fluid">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-['Lora'] text-2xl md:text-3xl lg:text-5xl text-[#282C2F]">
            {siteContent?.bestsellers?.title || 'Sản phẩm bán chạy'}
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto mb-12">
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={product.id || index}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button>{siteContent?.bestsellers?.ctaText || 'Mua ngay'}</Button>
        </div>
      </div>
    </section>
  );
};

export default BestsellersSection;
