import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Product, CartItem } from '../types';
import { useProducts, useCategories, useSiteContent, useSiteConfig } from '../hooks';
import { 
  fallbackProducts, 
  fallbackCategories, 
  fallbackSiteContent, 
  fallbackSiteConfig 
} from '../data';

// ==================== FORMAT HELPERS ====================
const formatPrice = (price: number): string => {
  return `${price.toLocaleString('vi-VN')}đ`;
};

// ==================== COUNTDOWN TIMER COMPONENT ====================
interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (num: number): string => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2 font-mono text-xl md:text-2xl font-bold">
      <div className="bg-gradient-to-br from-[#E85A4F] to-[#d14a3f] text-white px-3 md:px-4 py-2 md:py-3 rounded-xl min-w-[48px] md:min-w-[56px] text-center shadow-lg shadow-[#E85A4F]/30">
        <span className="block">{formatTime(timeLeft.hours)}</span>
        <span className="text-[10px] font-normal opacity-80">giờ</span>
      </div>
      <span className="text-white text-2xl animate-pulse">:</span>
      <div className="bg-gradient-to-br from-[#E85A4F] to-[#d14a3f] text-white px-3 md:px-4 py-2 md:py-3 rounded-xl min-w-[48px] md:min-w-[56px] text-center shadow-lg shadow-[#E85A4F]/30">
        <span className="block">{formatTime(timeLeft.minutes)}</span>
        <span className="text-[10px] font-normal opacity-80">phút</span>
      </div>
      <span className="text-white text-2xl animate-pulse">:</span>
      <div className="bg-gradient-to-br from-[#E85A4F] to-[#d14a3f] text-white px-3 md:px-4 py-2 md:py-3 rounded-xl min-w-[48px] md:min-w-[56px] text-center shadow-lg shadow-[#E85A4F]/30">
        <span className="block">{formatTime(timeLeft.seconds)}</span>
        <span className="text-[10px] font-normal opacity-80">giây</span>
      </div>
    </div>
  );
};

// ==================== PRODUCT CARD COMPONENT ====================
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onWishlist: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onQuickView, onWishlist }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    
    setIsAddingToCart(true);
    setTimeout(() => {
      onAddToCart(product);
      setIsAddingToCart(false);
      setShowAddedFeedback(true);
      setTimeout(() => setShowAddedFeedback(false), 1500);
    }, 500);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist(product);
  };

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div 
      className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#fdf6f3] to-[#f5ebe6]">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=500&fit=crop`;
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions - Bottom */}
        <div className={`absolute bottom-4 left-4 right-4 flex items-center justify-center gap-3 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-3 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center gap-2 text-[#282C2F] font-medium hover:bg-white transition-colors shadow-lg cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Xem nhanh
          </button>
        </div>
        
        {/* Wishlist Button - Top Right */}
        <button
          onClick={handleWishlist}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer ${
            isWishlisted 
              ? 'bg-[#E85A4F] text-white' 
              : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-[#E85A4F] hover:text-white'
          }`}
        >
          <svg className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        
        {/* Badges - Top Left */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.discount && product.discount >= 50 && (
            <span className="bg-gradient-to-r from-[#E85A4F] to-[#ff7b6b] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              -{product.discount}%
            </span>
          )}
          {product.discount && product.discount < 50 && (
            <span className="bg-[#282C2F] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-gradient-to-r from-emerald-500 to-green-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              Mới
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              Hot
            </span>
          )}
        </div>
        
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-[#282C2F] text-white font-bold px-6 py-3 rounded-full text-sm">
              Hết hàng
            </span>
          </div>
        )}
        
        {/* Low Stock Badge */}
        {isLowStock && !isOutOfStock && (
          <span className="absolute bottom-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            Còn {product.stock} sản phẩm
          </span>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <h3 className="font-semibold text-[#282C2F] text-lg mb-3 line-clamp-1 group-hover:text-[#E85A4F] transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-[#E85A4F] font-bold text-xl">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 text-sm line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAddingToCart}
          className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isOutOfStock 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : showAddedFeedback
                ? 'bg-emerald-500 text-white'
                : 'bg-[#282C2F] text-white hover:bg-[#E85A4F] cursor-pointer'
          }`}
        >
          {isAddingToCart ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Đang thêm...</span>
            </>
          ) : showAddedFeedback ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Đã thêm!</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Thêm vào giỏ</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ==================== QUICK VIEW MODAL ====================
interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }: QuickViewModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
      setSelectedImage(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen || !product) return null;

  const images = product.images || [product.image];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn cursor-pointer"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp cursor-default"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Gallery */}
          <div className="md:w-1/2 bg-[#F5F1ED]">
            {/* Main Image */}
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://placehold.co/600x600/F5F1ED/282C2F?text=${encodeURIComponent(product.name)}`;
                }}
              />
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 p-3 justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === idx ? 'border-[#E85A4F] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Info */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex gap-2 mb-4">
              {product.discount && (
                <span className="bg-[#E85A4F] text-white text-sm font-bold px-3 py-1 rounded-full">
                  GIẢM {product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="bg-[#4CAF50] text-white text-sm font-bold px-3 py-1 rounded-full">
                  MỚI
                </span>
              )}
              {product.isBestseller && (
                <span className="bg-[#F9A825] text-white text-sm font-bold px-3 py-1 rounded-full">
                  BÁN CHẠY
                </span>
              )}
            </div>
            
            <h2 className="font-['Lora'] text-3xl font-bold text-[#282C2F] mb-4">
              {product.name}
            </h2>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#E85A4F] font-bold text-2xl">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 text-lg line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
              Hoa tươi đẹp, hoàn hảo cho mọi dịp. Mỗi cành hoa được chọn lọc và sắp xếp cẩn thận để đảm bảo chất lượng cao nhất.
            </p>
            
            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className={`text-sm font-medium ${product.stock <= 5 ? 'text-[#FF5722]' : 'text-[#4CAF50]'}`}>
                  {product.stock <= 5 ? `Chỉ còn ${product.stock} sản phẩm!` : `Còn ${product.stock} sản phẩm`}
                </span>
              ) : (
                <span className="text-sm font-medium text-red-500">Hết hàng</span>
              )}
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium text-[#282C2F]">Số lượng:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-12 h-10 flex items-center justify-center font-medium border-x border-gray-300">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <button
              onClick={() => {
                onAddToCart(product, quantity);
                onClose();
              }}
              disabled={product.stock <= 0}
              className="w-full py-4 bg-[#282C2F] text-white rounded-lg font-semibold hover:bg-[#E85A4F] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Thêm vào giỏ - {formatPrice(product.price * quantity)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== CART DRAWER ====================
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

const CartDrawer = ({ isOpen, onClose, cart, onUpdateQuantity, onRemove }: CartDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        ref={drawerRef}
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-['Lora'] text-xl font-bold text-[#282C2F]">
            Giỏ hàng ({totalItems})
          </h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[calc(100vh-200px)]">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-500">Giỏ hàng trống</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-[#F5F1ED] rounded-xl">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/80x80/F5F1ED/282C2F?text=F`;
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#282C2F] mb-1">{item.name}</h4>
                    <p className="text-[#E85A4F] font-bold text-sm mb-2">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-gray-400 hover:text-[#E85A4F] transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Tạm tính:</span>
              <span className="text-xl font-bold text-[#282C2F]">{formatPrice(total)}</span>
            </div>
            <button className="w-full py-4 bg-[#E85A4F] text-white rounded-lg font-semibold hover:bg-[#d14a3f] transition-colors cursor-pointer">
              Tiến hành thanh toán
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// ==================== TOAST NOTIFICATION ====================
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}

const Toast = ({ message, type, isVisible }: ToastProps) => {
  const bgColor = {
    success: 'bg-[#4CAF50]',
    error: 'bg-[#E85A4F]',
    info: 'bg-[#282C2F]',
  }[type];

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg text-white font-medium shadow-lg transition-all duration-300 ${bgColor} ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-3">
        {type === 'success' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {message}
      </div>
    </div>
  );
};

// ==================== MAIN SHOP PAGE ====================
const ShopPage = () => {
  // Fetch data from Google Sheets (or use fallback)
  const { data: products, loading: productsLoading } = useProducts(fallbackProducts);
  const { data: categories } = useCategories(fallbackCategories);
  const { data: siteContent } = useSiteContent(fallbackSiteContent);
  const { data: siteConfig } = useSiteConfig(fallbackSiteConfig);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false,
  });
  
  // Flash sale ends based on config (default 6 hours from now)
  const flashSaleDuration = siteConfig?.flashSaleDuration || 6;
  const flashSaleEnd = new Date(Date.now() + flashSaleDuration * 60 * 60 * 1000);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleUpdateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
  };

  const handleWishlist = (product: Product) => {
    showToast(`Đã cập nhật yêu thích ${product.name}!`, 'info');
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const promoProducts = products.filter(p => p.category === 'promo');
  const bigDiscountProducts = products.filter(p => p.category === 'big-discount');
  const flashSaleProducts = products.filter(p => p.category === 'flash-sale');
  const recommendedProducts = products.filter(p => p.category === 'recommendation');

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Loading state
  if (productsLoading) {
    return (
      <div className="min-h-screen bg-[#F5F1ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#E85A4F] mx-auto mb-4"></div>
          <p className="text-[#282C2F] font-medium">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#1a1d1f] via-[#282C2F] to-[#3d4347] text-white py-24 md:py-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#E85A4F] rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-pink-400 rounded-full blur-[150px] opacity-15" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#E85A4F]/10 to-purple-500/10 rounded-full blur-3xl" />
        </div>
        
        {/* Floating Flowers Decoration */}
        <div className="absolute top-10 right-10 text-6xl opacity-20 animate-bounce" style={{animationDuration: '3s'}}>🌸</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-20 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>🌺</div>
        <div className="absolute top-1/2 right-1/4 text-4xl opacity-15 animate-bounce" style={{animationDuration: '5s', animationDelay: '2s'}}>🌷</div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              ✨ Miễn phí vận chuyển đơn từ 500.000đ
            </span>
            <h1 className="font-['Lora'] text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-fadeIn leading-tight">
              {siteContent?.shop?.heroTitle || 'CHÀO MỪNG ĐẾN NATNAT FLOWER SHOP'}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
              {siteContent?.shop?.heroSubtitle || 'Khám phá bộ sưu tập hoa tươi đẹp cho mọi dịp'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="#products" 
                className="inline-flex items-center justify-center gap-2 bg-[#E85A4F] text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#E85A4F] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
              >
                {siteContent?.shop?.ctaText || 'Mua ngay'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                to="/" 
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 cursor-pointer"
              >
                Trang chủ
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 left-6 z-30 w-16 h-16 bg-[#E85A4F] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#282C2F] text-white text-xs font-bold rounded-full flex items-center justify-center">
            {cartItemsCount}
          </span>
        )}
      </button>

      {/* Category Filter */}
      <section id="products" className="py-6 bg-white/95 backdrop-blur-md sticky top-0 z-20 shadow-md border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 md:px-6 py-2.5 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#E85A4F] to-[#d14a3f] text-white shadow-lg shadow-[#E85A4F]/30'
                    : 'bg-[#F5F1ED] text-[#282C2F] hover:bg-[#282C2F] hover:text-white hover:shadow-md'
                }`}
              >
                {cat.id === 'promo' && '🎉 '}
                {cat.id === 'big-discount' && '🔥 '}
                {cat.id === 'flash-sale' && '⚡ '}
                {cat.id === 'recommendation' && '✨ '}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Show all sections if "all" is selected, otherwise show filtered */}
      {activeCategory === 'all' ? (
        <>
          {/* PROMOS Section */}
          <section className="py-16 bg-gradient-to-b from-[#F5F1ED] to-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
                <div>
                  <h2 className="font-['Lora'] text-3xl md:text-4xl font-bold text-[#282C2F] flex items-center gap-3">
                    <span className="text-4xl">🎉</span> KHUYẾN MÃI
                  </h2>
                  <p className="text-gray-600 mt-2">Ưu đãi hấp dẫn dành cho bạn</p>
                </div>
                <button 
                  onClick={() => setActiveCategory('promo')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#282C2F] text-white rounded-full font-medium hover:bg-[#E85A4F] transition-all cursor-pointer group"
                >
                  Xem tất cả
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {promoProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={setQuickViewProduct}
                    onWishlist={handleWishlist}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* BIG DISCOUNTS Section */}
          <section className="py-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E85A4F]/5 via-[#F9A825]/10 to-[#E85A4F]/5" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E85A4F]/10 rounded-full mb-3">
                    <span className="w-2 h-2 bg-[#E85A4F] rounded-full animate-pulse" />
                    <span className="text-[#E85A4F] font-semibold text-sm">HOT DEAL</span>
                  </div>
                  <h2 className="font-['Lora'] text-3xl md:text-4xl font-bold text-[#282C2F] flex items-center gap-3">
                    <span className="text-4xl">🔥</span> GIẢM GIÁ LỚN
                  </h2>
                  <p className="text-gray-600 mt-2">Giảm đến 95% cho các sản phẩm được chọn!</p>
                </div>
                <button 
                  onClick={() => setActiveCategory('big-discount')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E85A4F] to-[#d14a3f] text-white rounded-full font-medium hover:shadow-lg hover:shadow-[#E85A4F]/30 transition-all cursor-pointer group"
                >
                  Xem tất cả
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {bigDiscountProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={setQuickViewProduct}
                    onWishlist={handleWishlist}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* FLASH SALE Section */}
          <section className="py-16 bg-gradient-to-br from-[#1a1d1f] via-[#282C2F] to-[#3d4347] text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#E85A4F] rounded-full blur-[120px] opacity-20 animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-yellow-500 rounded-full blur-[150px] opacity-15 animate-pulse" style={{animationDelay: '1s'}} />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-10 gap-6">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E85A4F]/20 rounded-full mb-3 backdrop-blur-sm">
                    <span className="text-xl">⚡</span>
                    <span className="text-[#E85A4F] font-bold text-sm uppercase tracking-wider">Flash Sale</span>
                  </div>
                  <h2 className="font-['Lora'] text-3xl md:text-4xl lg:text-5xl font-bold flex items-center justify-center lg:justify-start gap-3">
                    ⚡ FLASH SALE
                  </h2>
                  <p className="text-white/70 mt-3 text-lg">Nhanh tay! Các ưu đãi sẽ kết thúc sớm!</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-white/70 text-sm uppercase tracking-wider">Kết thúc trong</span>
                  <CountdownTimer targetDate={flashSaleEnd} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {flashSaleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={setQuickViewProduct}
                    onWishlist={handleWishlist}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* RECOMMENDATION Section */}
          <section className="py-16 bg-gradient-to-b from-white to-[#F5F1ED]">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-3">
                    <span className="text-xl">✨</span>
                    <span className="text-purple-600 font-semibold text-sm">DÀNH CHO BẠN</span>
                  </div>
                  <h2 className="font-['Lora'] text-3xl md:text-4xl font-bold text-[#282C2F] flex items-center gap-3">
                    <span className="text-4xl">✨</span> GỢI Ý CHO BẠN
                  </h2>
                  <p className="text-gray-600 mt-2">Những sản phẩm được chọn riêng cho bạn</p>
                </div>
                <button 
                  onClick={() => setActiveCategory('recommendation')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 hover:shadow-lg transition-all cursor-pointer group"
                >
                  Xem tất cả
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {recommendedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={setQuickViewProduct}
                    onWishlist={handleWishlist}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Filtered Products */
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-['Lora'] text-3xl md:text-4xl font-bold text-[#282C2F] mb-8 capitalize">
              {activeCategory === 'big-discount' ? '🔥 Giảm Giá Lớn' : 
               activeCategory === 'flash-sale' ? '⚡ Flash Sale' :
               activeCategory === 'promo' ? '🎉 Khuyến Mãi' :
               activeCategory === 'recommendation' ? '✨ Gợi Ý Cho Bạn' : activeCategory}
            </h2>
            {activeCategory === 'flash-sale' && (
              <div className="flex items-center gap-4 mb-8">
                <span className="text-gray-600">Flash Sale kết thúc trong:</span>
                <CountdownTimer targetDate={flashSaleEnd} />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={setQuickViewProduct}
                  onWishlist={handleWishlist}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào trong danh mục này.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-[#E85A4F] via-[#d14a3f] to-[#c13a30] text-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              📧 Đăng ký ngay
            </span>
            <h2 className="font-['Lora'] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {siteContent?.newsletter?.title || 'Đăng ký nhận ưu đãi đặc biệt'}
            </h2>
            <p className="text-white/90 mb-10 text-lg">
              {siteContent?.newsletter?.subtitle || 'Nhận giảm giá độc quyền và là người đầu tiên biết về sản phẩm mới!'}
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder={siteContent?.newsletter?.placeholder || 'Nhập email của bạn'}
                className="flex-1 px-6 py-4 rounded-full text-[#282C2F] focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-[#282C2F] text-white rounded-full font-semibold hover:bg-white hover:text-[#282C2F] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {siteContent?.newsletter?.ctaText || 'Đăng ký'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemove={handleRemoveFromCart}
      />

      {/* Toast Notification */}
      <Toast {...toast} />

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default ShopPage;
