/**
 * Fallback data when Google Sheets API is not available
 * This ensures the app works even without API configuration
 */

import type {
  Product,
  Category,
  Testimonial,
  Feature,
  SiteContent,
  SiteConfig,
  BestsellerProduct,
  InstagramPost,
  AboutSection,
  HowItWorksStep,
} from '../types';

// ==================== FLOWER IMAGES ====================
export const flowerImages = {
  rose: [
    'https://images.unsplash.com/photo-1518882605630-8eb92f79670c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop',
  ],
  tulip: [
    'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1589994160839-163cd867cfe8?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=400&h=400&fit=crop',
  ],
  lily: [
    'https://images.unsplash.com/photo-1530092285049-1c42085fd395?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1560717799-68c97d7c7b6b?w=400&h=400&fit=crop',
  ],
  sunflower: [
    'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1598751528584-cc23a0872c53?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=400&h=400&fit=crop',
  ],
  daisy: [
    'https://images.unsplash.com/photo-1568236179845-e1bd7e58e96e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&h=400&fit=crop',
  ],
  orchid: [
    'https://images.unsplash.com/photo-1585664812212-f0a5e7a5fb86?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1567696911980-2c669aad8fd9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1610397648930-477b8c7f0943?w=400&h=400&fit=crop',
  ],
  peony: [
    'https://images.unsplash.com/photo-1558652093-9391c98f6a79?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1560882741-5c3e028f6265?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1578241561880-0a1d5db3cb8a?w=400&h=400&fit=crop',
  ],
  lavender: [
    'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1532925547908-a2769e0b9c45?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1595236108826-d802f3951d51?w=400&h=400&fit=crop',
  ],
};

// ==================== PRODUCTS ====================
export const fallbackProducts: Product[] = [
  // Mục KHUYẾN MÃI
  { id: 1, name: 'Hoa Hồng Đỏ', price: 130000, originalPrice: 600000, discount: 80, image: flowerImages.rose[0], images: flowerImages.rose, category: 'promo', isNew: true, stock: 15 },
  { id: 2, name: 'Hoa Tulip Hà Lan', price: 80000, originalPrice: 450000, discount: 85, image: flowerImages.tulip[0], images: flowerImages.tulip, category: 'promo', stock: 20 },
  { id: 3, name: 'Hoa Lily Trắng', price: 150000, originalPrice: 550000, discount: 75, image: flowerImages.lily[0], images: flowerImages.lily, category: 'promo', isBestseller: true, stock: 8 },
  { id: 4, name: 'Hoa Hướng Dương', price: 100000, originalPrice: 500000, discount: 80, image: flowerImages.sunflower[0], images: flowerImages.sunflower, category: 'promo', stock: 25 },
  
  // Mục GIẢM GIÁ LỚN (80-95%)
  { id: 5, name: 'Hoa Cúc Trắng', price: 30000, originalPrice: 600000, discount: 95, image: flowerImages.daisy[0], images: flowerImages.daisy, category: 'big-discount', stock: 5 },
  { id: 6, name: 'Hoa Lan Hồ Điệp', price: 60000, originalPrice: 500000, discount: 88, image: flowerImages.orchid[0], images: flowerImages.orchid, category: 'big-discount', isNew: true, stock: 12 },
  { id: 7, name: 'Hoa Mẫu Đơn', price: 80000, originalPrice: 400000, discount: 80, image: flowerImages.peony[0], images: flowerImages.peony, category: 'big-discount', stock: 18 },
  { id: 8, name: 'Hoa Oải Hương', price: 50000, originalPrice: 450000, discount: 89, image: flowerImages.lavender[0], images: flowerImages.lavender, category: 'big-discount', isBestseller: true, stock: 3 },
  
  // Mục FLASH SALE (45-75%)
  { id: 9, name: 'Bó Hồng Nhung', price: 150000, originalPrice: 600000, discount: 75, image: flowerImages.rose[1], images: flowerImages.rose, category: 'flash-sale', stock: 10 },
  { id: 10, name: 'Tulip Nhiều Màu', price: 220000, originalPrice: 400000, discount: 45, image: flowerImages.tulip[1], images: flowerImages.tulip, category: 'flash-sale', isNew: true, stock: 7 },
  { id: 11, name: 'Lily Vàng', price: 180000, originalPrice: 550000, discount: 67, image: flowerImages.lily[1], images: flowerImages.lily, category: 'flash-sale', stock: 14 },
  { id: 12, name: 'Hướng Dương Mini', price: 120000, originalPrice: 480000, discount: 75, image: flowerImages.sunflower[1], images: flowerImages.sunflower, category: 'flash-sale', isBestseller: true, stock: 6 },
  
  // Mục GỢI Ý CHO BẠN
  { id: 13, name: 'Bó Hồng Sang Trọng', price: 450000, image: flowerImages.rose[2], images: flowerImages.rose, category: 'recommendation', isBestseller: true, stock: 20 },
  { id: 14, name: 'Bộ Sưu Tập Tulip', price: 380000, image: flowerImages.tulip[2], images: flowerImages.tulip, category: 'recommendation', isNew: true, stock: 15 },
  { id: 15, name: 'Hoa Lily Cắm Lọ', price: 520000, image: flowerImages.lily[2], images: flowerImages.lily, category: 'recommendation', stock: 12 },
  { id: 16, name: 'Hoa Hỗn Hợp', price: 350000, image: flowerImages.peony[2], images: flowerImages.peony, category: 'recommendation', stock: 25 },
];

// ==================== CATEGORIES ====================
export const fallbackCategories: Category[] = [
  { id: 'all', label: 'Tất cả sản phẩm', displayOrder: 0 },
  { id: 'promo', label: 'Khuyến mãi', displayOrder: 1 },
  { id: 'big-discount', label: 'Giảm giá lớn', displayOrder: 2 },
  { id: 'flash-sale', label: 'Flash Sale', displayOrder: 3 },
  { id: 'recommendation', label: 'Gợi ý cho bạn', displayOrder: 4 },
];

// ==================== TESTIMONIALS ====================
export const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Nguyễn Thị Hương',
    rating: 5,
    text: 'Hoa gửi đến trông y hệt như hình trên website! Tôi rất hài lòng với dịch vụ và sẽ sử dụng lại!',
  },
  {
    id: 2,
    name: 'Trần Văn Minh',
    rating: 5,
    text: 'Luôn dễ dàng, luôn đẹp. Hoa đến đúng giờ và còn đẹp hơn ngoài đời thực!',
  },
  {
    id: 3,
    name: 'Lê Thị Mai',
    rating: 5,
    text: 'Bó hoa tuyệt vời và bố cục đẹp! Vượt xa mong đợi của tôi. Rất khuyến khích mọi người.',
  },
];

// ==================== FEATURES ====================
export const fallbackFeatures: Feature[] = [
  {
    id: 1,
    icon: '/images/flower-feature-1.png',
    title: 'Hoa tươi mỗi ngày',
    description: 'Chúng tôi chỉ sử dụng hoa tươi được nhập về hàng ngày.',
  },
  {
    id: 2,
    icon: '/images/flower-feature-2.png',
    title: 'Giao hàng nhanh',
    description: 'Giao hàng trong ngày cho các đơn hàng nội thành.',
  },
  {
    id: 3,
    icon: '/images/flower-feature-3.png',
    title: 'Giá cả hợp lý',
    description: 'Chất lượng cao với giá cả phải chăng cho mọi người.',
  },
];

// ==================== SITE CONTENT ====================
export const fallbackSiteContent: SiteContent = {
  header: {
    bannerText: 'MIỄN PHÍ VẬN CHUYỂN CHO ĐƠN HÀNG TỪ 500.000đ',
  },
  hero: {
    title: 'Làm mới không gian với cây xanh và những bó hoa tinh tế',
    subtitle: 'Tạo khu vườn trong nhà hoàn hảo với các loại cây cảnh, cây nở hoa, cây treo và nhiều hơn nữa!',
    ctaText: 'Mua ngay',
  },
  features: {
    title: 'Hoa và cây cảnh là chuyên môn của chúng tôi. Chúng tôi mang đến giá cả hợp lý.',
  },
  bestsellers: {
    title: 'Sản phẩm bán chạy',
    ctaText: 'Mua ngay',
  },
  reviews: {
    title: 'Khách hàng nói gì về chúng tôi',
  },
  discount: {
    title: 'Đặt hàng ngay và nhận giảm 15% phí giao hàng',
    ctaText: 'Mua ngay',
  },
  contact: {
    title: 'Liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào',
    ctaText: 'Liên hệ',
  },
  app: {
    title: 'Chúng tôi luôn bên bạn',
    description: 'Tải ứng dụng của chúng tôi để đặt hoa nhanh chóng và nhận nhiều ưu đãi độc quyền. Theo dõi đơn hàng dễ dàng và nhận thông báo về các khuyến mãi mới nhất.',
    platformText: 'Có sẵn trên iOS và Android',
    ctaText: 'Tải ứng dụng',
  },
  instagram: {
    title: 'Theo dõi chúng tôi trên Instagram',
    handle: '@flowerlab17',
    url: 'https://instagram.com/flowerlab17',
  },
  shop: {
    heroTitle: 'CHÀO MỪNG ĐẾN NATNAT FLOWER SHOP',
    heroSubtitle: 'Khám phá bộ sưu tập hoa tươi đẹp cho mọi dịp',
    ctaText: 'Mua ngay',
  },
  newsletter: {
    title: 'Đăng ký nhận ưu đãi đặc biệt',
    subtitle: 'Nhận giảm giá độc quyền và là người đầu tiên biết về sản phẩm mới!',
    placeholder: 'Nhập email của bạn',
    ctaText: 'Đăng ký',
  },
  footer: {
    privacyText: 'Chính sách bảo mật',
    termsText: 'Điều khoản sử dụng',
    copyright: '© 2026 Bản quyền thuộc NatNat Flower Shop',
  },
  howItWorks: {
    title: 'Từ những bó hoa thủ công đến các bố cục hoa tươi tốt',
    subtitle: 'Chúng tôi cung cấp dịch vụ hoa tươi chất lượng cao với quy trình đặt hàng đơn giản và giao hàng nhanh chóng.',
    sectionTitle: 'Cách hoạt động',
    sectionSubtitle: 'Đơn giản & Nhanh chóng',
    sectionDescription: 'Chỉ với 3 bước đơn giản, bạn sẽ nhận được bó hoa tươi đẹp ngay tại cửa nhà.',
  },
  about: {
    link1Text: 'Xem cam kết của chúng tôi',
    link2Text: 'Xem cam kết của chúng tôi',
  },
};

// ==================== SITE CONFIG ====================
export const fallbackSiteConfig: SiteConfig = {
  freeShippingThreshold: 500000,
  flashSaleDuration: 6,
  discountPercentage: 15,
  instagramHandle: '@flowerlab17',
  instagramUrl: 'https://instagram.com/flowerlab17',
  companyName: 'NatNat Flower Shop',
  currency: 'VND',
};

// ==================== BESTSELLERS ====================
export const fallbackBestsellers: BestsellerProduct[] = [
  { id: 1, image: '/images/product-1.png', name: 'Hoa Hồng Đỏ', price: 139000, displayOrder: 1 },
  { id: 2, image: '/images/product-2.png', name: 'Hoa Tulip', price: 82000, displayOrder: 2 },
  { id: 3, image: '/images/product-3.png', name: 'Bó Biển Vàng', price: 144000, displayOrder: 3 },
  { id: 4, image: '/images/product-4.png', name: 'Hoa Hồng Cam', price: 67000, displayOrder: 4 },
];

// ==================== INSTAGRAM ====================
export const fallbackInstagram: InstagramPost[] = [
  { id: 1, imageUrl: '/images/instagram-1.png', altText: 'Instagram 1', displayOrder: 1 },
  { id: 2, imageUrl: '/images/instagram-2.png', altText: 'Instagram 2', displayOrder: 2 },
  { id: 3, imageUrl: '/images/instagram-3.png', altText: 'Instagram 3', displayOrder: 3 },
  { id: 4, imageUrl: '/images/instagram-4.png', altText: 'Instagram 4', displayOrder: 4 },
  { id: 5, imageUrl: '/images/instagram-5.png', altText: 'Instagram 5', displayOrder: 5 },
  { id: 6, imageUrl: '/images/instagram-6.png', altText: 'Instagram 6', displayOrder: 6 },
];

// ==================== ABOUT ====================
export const fallbackAbout: AboutSection[] = [
  {
    id: 1,
    title: 'Chúng tôi là ai',
    content: 'NatNat Flower Shop là cửa hàng hoa tươi uy tín hàng đầu tại Việt Nam. Chúng tôi cam kết mang đến những bó hoa tươi đẹp nhất, được chọn lọc kỹ lưỡng từ những nhà vườn uy tín. Mỗi sản phẩm đều được tạo ra với tình yêu và sự tận tâm.',
    image: '/images/about-1.png',
    linkText: 'Xem cam kết của chúng tôi',
    displayOrder: 1,
  },
  {
    id: 2,
    title: 'Chúng tôi làm gì',
    content: 'Chúng tôi chuyên cung cấp các dịch vụ hoa tươi cho mọi dịp: sinh nhật, cưới hỏi, khai trương, chia buồn, và các dịp đặc biệt khác. Đội ngũ florist chuyên nghiệp sẽ giúp bạn tạo nên những bó hoa ấn tượng nhất.',
    image: '/images/about-2.png',
    linkText: 'Xem cam kết của chúng tôi',
    displayOrder: 2,
  },
];

// ==================== HOW IT WORKS ====================
export const fallbackHowItWorks: HowItWorksStep[] = [
  { stepNumber: 1, emoji: '❉', title: 'Bước 1: Chọn hoa yêu thích' },
  { stepNumber: 2, emoji: '❉', title: 'Bước 2: Đặt hàng online' },
  { stepNumber: 3, emoji: '❉', title: 'Bước 3: Nhận hoa tại nhà' },
];
