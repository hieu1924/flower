import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ==================== TYPES ====================
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: 'promo' | 'big-discount' | 'flash-sale' | 'recommendation';
  isNew?: boolean;
  isBestseller?: boolean;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

// ==================== PRODUCT DATA (Based on Figma) ====================
const products: Product[] = [
  // PROMOS Section
  { id: 1, name: 'Flower 1', price: 13000, originalPrice: 60000, discount: 80, image: '/images/flower-1.jpg', category: 'promo', isNew: true, stock: 15 },
  { id: 2, name: 'Flower 2', price: 8000, originalPrice: 45000, discount: 85, image: '/images/flower-2.jpg', category: 'promo', stock: 20 },
  { id: 3, name: 'Flower 3', price: 15000, originalPrice: 55000, discount: 75, image: '/images/flower-3.jpg', category: 'promo', isBestseller: true, stock: 8 },
  { id: 4, name: 'Flower 4', price: 10000, originalPrice: 50000, discount: 80, image: '/images/flower-4.jpg', category: 'promo', stock: 25 },
  
  // BIG DISCOUNTS Section (80-95% OFF)
  { id: 5, name: 'Flower 5', price: 3000, originalPrice: 60000, discount: 95, image: '/images/flower-5.jpg', category: 'big-discount', stock: 5 },
  { id: 6, name: 'Flower 6', price: 6000, originalPrice: 50000, discount: 88, image: '/images/flower-6.jpg', category: 'big-discount', isNew: true, stock: 12 },
  { id: 7, name: 'Flower 7', price: 8000, originalPrice: 40000, discount: 80, image: '/images/flower-7.jpg', category: 'big-discount', stock: 18 },
  { id: 8, name: 'Flower 8', price: 5000, originalPrice: 45000, discount: 89, image: '/images/flower-8.jpg', category: 'big-discount', isBestseller: true, stock: 3 },
  
  // FLASH SALE Section (45-75% OFF)
  { id: 9, name: 'Flower 9', price: 15000, originalPrice: 60000, discount: 75, image: '/images/flower-9.jpg', category: 'flash-sale', stock: 10 },
  { id: 10, name: 'Flower 10', price: 22000, originalPrice: 40000, discount: 45, image: '/images/flower-10.jpg', category: 'flash-sale', isNew: true, stock: 7 },
  { id: 11, name: 'Flower 11', price: 18000, originalPrice: 55000, discount: 67, image: '/images/flower-11.jpg', category: 'flash-sale', stock: 14 },
  { id: 12, name: 'Flower 12', price: 12000, originalPrice: 48000, discount: 75, image: '/images/flower-12.jpg', category: 'flash-sale', isBestseller: true, stock: 6 },
  
  // RECOMMENDATION Section
  { id: 13, name: 'Rose Bouquet', price: 45000, image: '/images/rose-bouquet.jpg', category: 'recommendation', isBestseller: true, stock: 20 },
  { id: 14, name: 'Tulip Collection', price: 38000, image: '/images/tulip.jpg', category: 'recommendation', isNew: true, stock: 15 },
  { id: 15, name: 'Lily Arrangement', price: 52000, image: '/images/lily.jpg', category: 'recommendation', stock: 12 },
  { id: 16, name: 'Mixed Flowers', price: 35000, image: '/images/mixed.jpg', category: 'recommendation', stock: 25 },
];

// ==================== FORMAT HELPERS ====================
const formatPrice = (price: number): string => {
  return `Rp ${price.toLocaleString('id-ID')}/stalk`;
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
    <div className="flex items-center gap-1 font-mono text-2xl font-bold text-[#E85A4F]">
      <div className="bg-[#282C2F] text-white px-3 py-2 rounded-lg min-w-[50px] text-center">
        {formatTime(timeLeft.hours)}
      </div>
      <span className="text-[#282C2F]">:</span>
      <div className="bg-[#282C2F] text-white px-3 py-2 rounded-lg min-w-[50px] text-center">
        {formatTime(timeLeft.minutes)}
      </div>
      <span className="text-[#282C2F]">:</span>
      <div className="bg-[#282C2F] text-white px-3 py-2 rounded-lg min-w-[50px] text-center">
        {formatTime(timeLeft.seconds)}
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
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
        isHovered ? 'transform -translate-y-2' : ''
      } ${isOutOfStock ? 'opacity-75' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#F5F1ED]">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://placehold.co/400x400/F5F1ED/282C2F?text=${encodeURIComponent(product.name)}`;
          }}
        />
        
        {/* Overlay with Quick Actions */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 flex items-center justify-center gap-3 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Quick View */}
          <button
            onClick={() => onQuickView(product)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#E85A4F] hover:text-white transition-colors shadow-lg transform hover:scale-110"
            title="Quick View"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg transform hover:scale-110 ${
              isWishlisted ? 'bg-[#E85A4F] text-white' : 'bg-white hover:bg-[#E85A4F] hover:text-white'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <svg className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount && (
            <span className="bg-[#E85A4F] text-white text-xs font-bold px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#4CAF50] text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#F9A825] text-white text-xs font-bold px-2 py-1 rounded-full">
              BEST
            </span>
          )}
        </div>
        
        {/* Stock Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-[#282C2F] font-bold px-4 py-2 rounded-lg">
              OUT OF STOCK
            </span>
          </div>
        )}
        {isLowStock && !isOutOfStock && (
          <span className="absolute top-3 right-3 bg-[#FF5722] text-white text-xs font-bold px-2 py-1 rounded-full">
            Only {product.stock} left!
          </span>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-['Lora'] text-lg font-semibold text-[#282C2F] mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#E85A4F] font-bold text-lg">
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
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isOutOfStock 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : showAddedFeedback
                ? 'bg-[#4CAF50] text-white'
                : 'bg-[#282C2F] text-white hover:bg-[#E85A4F] active:scale-95'
          }`}
        >
          {isAddingToCart ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Adding...
            </>
          ) : showAddedFeedback ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Added!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to cart
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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2 aspect-square bg-[#F5F1ED]">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://placehold.co/600x600/F5F1ED/282C2F?text=${encodeURIComponent(product.name)}`;
              }}
            />
          </div>
          
          {/* Info */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex gap-2 mb-4">
              {product.discount && (
                <span className="bg-[#E85A4F] text-white text-sm font-bold px-3 py-1 rounded-full">
                  {product.discount}% OFF
                </span>
              )}
              {product.isNew && (
                <span className="bg-[#4CAF50] text-white text-sm font-bold px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
              {product.isBestseller && (
                <span className="bg-[#F9A825] text-white text-sm font-bold px-3 py-1 rounded-full">
                  BESTSELLER
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
              Beautiful fresh flowers, perfect for any occasion. Each stalk is carefully selected and arranged to ensure the highest quality.
            </p>
            
            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className={`text-sm font-medium ${product.stock <= 5 ? 'text-[#FF5722]' : 'text-[#4CAF50]'}`}>
                  {product.stock <= 5 ? `Only ${product.stock} left in stock!` : `${product.stock} in stock`}
                </span>
              ) : (
                <span className="text-sm font-medium text-red-500">Out of stock</span>
              )}
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium text-[#282C2F]">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
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
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
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
              className="w-full py-4 bg-[#282C2F] text-white rounded-lg font-semibold hover:bg-[#E85A4F] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to cart - {formatPrice(product.price * quantity)}
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
            Shopping Cart ({totalItems})
          </h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
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
              <p className="text-gray-500">Your cart is empty</p>
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
                        className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-gray-400 hover:text-[#E85A4F] transition-colors"
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
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-xl font-bold text-[#282C2F]">{formatPrice(total)}</span>
            </div>
            <button className="w-full py-4 bg-[#E85A4F] text-white rounded-lg font-semibold hover:bg-[#d14a3f] transition-colors">
              Proceed to Checkout
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
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false,
  });
  
  // Flash sale ends in 6 hours from now
  const flashSaleEnd = new Date(Date.now() + 6 * 60 * 60 * 1000);

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
    showToast(`${product.name} added to cart!`);
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
    showToast('Item removed from cart', 'info');
  };

  const handleWishlist = (product: Product) => {
    showToast(`${product.name} wishlist updated!`, 'info');
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const promoProducts = products.filter(p => p.category === 'promo');
  const bigDiscountProducts = products.filter(p => p.category === 'big-discount');
  const flashSaleProducts = products.filter(p => p.category === 'flash-sale');
  const recommendedProducts = products.filter(p => p.category === 'recommendation');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'promo', label: 'Promos' },
    { id: 'big-discount', label: 'Big Discounts' },
    { id: 'flash-sale', label: 'Flash Sale' },
    { id: 'recommendation', label: 'Recommended' },
  ];

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-[#282C2F] to-[#3d4347] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-[#E85A4F] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-60 h-60 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-['Lora'] text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
              WELCOME TO NATNAT FLOWER SHOP
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Discover our beautiful collection of fresh flowers for every occasion
            </p>
            <Link 
              to="#products" 
              className="inline-flex items-center gap-2 bg-[#E85A4F] text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#E85A4F] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Shop Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 left-6 z-30 w-16 h-16 bg-[#E85A4F] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
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
      <section id="products" className="py-8 bg-white sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#E85A4F] text-white shadow-lg'
                    : 'bg-[#F5F1ED] text-[#282C2F] hover:bg-[#282C2F] hover:text-white'
                }`}
              >
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
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-['Lora'] text-3xl md:text-4xl font-bold text-[#282C2F]">
                  🎉 PROMOS
                </h2>
                <button 
                  onClick={() => setActiveCategory('promo')}
                  className="text-[#E85A4F] font-medium hover:underline"
                >
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <section className="py-16 bg-gradient-to-r from-[#E85A4F]/10 to-[#F9A825]/10">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-['Lora'] text-3xl md:text-4xl font-bold text-[#282C2F]">
                    🔥 BIG DISCOUNTS
                  </h2>
                  <p className="text-gray-600 mt-2">Up to 95% OFF on selected items!</p>
                </div>
                <button 
                  onClick={() => setActiveCategory('big-discount')}
                  className="text-[#E85A4F] font-medium hover:underline"
                >
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <section className="py-16 bg-[#282C2F] text-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="font-['Lora'] text-3xl md:text-4xl font-bold flex items-center gap-3">
                    ⚡ FLASH SALE
                  </h2>
                  <p className="text-white/70 mt-2">Hurry! These deals won't last long!</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white/70">Ends in:</span>
                  <CountdownTimer targetDate={flashSaleEnd} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-['Lora'] text-3xl md:text-4xl font-bold text-[#282C2F]">
                    ✨ RECOMMENDATION
                  </h2>
                  <p className="text-gray-600 mt-2">Hand-picked favorites just for you</p>
                </div>
                <button 
                  onClick={() => setActiveCategory('recommendation')}
                  className="text-[#E85A4F] font-medium hover:underline"
                >
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              {activeCategory === 'big-discount' ? '🔥 Big Discounts' : 
               activeCategory === 'flash-sale' ? '⚡ Flash Sale' :
               activeCategory === 'promo' ? '🎉 Promos' :
               activeCategory === 'recommendation' ? '✨ Recommendations' : activeCategory}
            </h2>
            {activeCategory === 'flash-sale' && (
              <div className="flex items-center gap-4 mb-8">
                <span className="text-gray-600">Flash Sale ends in:</span>
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
                <p className="text-gray-500 text-lg">No products found in this category.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-[#E85A4F] to-[#d14a3f] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-['Lora'] text-3xl md:text-4xl font-bold mb-4">
              Subscribe for Special Offers
            </h2>
            <p className="text-white/90 mb-8">
              Get exclusive discounts and be the first to know about our new arrivals!
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-[#282C2F] focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-[#282C2F] text-white rounded-full font-semibold hover:bg-white hover:text-[#282C2F] transition-colors"
              >
                Subscribe
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
