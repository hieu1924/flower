import React from 'react';
import { Button } from '../ui/Button';
import { ProductCard } from '../ui/ProductCard';

/**
 * Bestsellers Section
 * Product grid with bestselling flowers
 */
export const BestsellersSection: React.FC = () => {
  const products = [
    {
      image: '/images/product-1.png',
      name: 'Hoa Hồng Đỏ',
      price: 139000,
    },
    {
      image: '/images/product-2.png',
      name: 'Hoa Tulip',
      price: 82000,
    },
    {
      image: '/images/product-3.png',
      name: 'Bó Biển Vàng',
      price: 144000,
    },
    {
      image: '/images/product-4.png',
      name: 'Hoa Hồng Cam',
      price: 67000,
    },
  ];

  return (
    <section id="bestsellers" className="py-16 md:py-24 bg-white">
      <div className="container-fluid">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-['Lora'] text-2xl md:text-3xl lg:text-5xl text-[#282C2F]">
            Sản phẩm bán chạy
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto mb-12">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button>Mua ngay</Button>
        </div>
      </div>
    </section>
  );
};

export default BestsellersSection;
