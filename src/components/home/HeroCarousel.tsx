import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ExternalLink } from 'lucide-react';

interface HeroSlide {
  id: string;
  tabTitle: string;
  badge?: string;
  title: string;
  subtitle: string;
  brand: string;
  image: string;
  thumb: string;
  linkUrl: string;
  themeColor: string;
  productId?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'pulmuone',
    tabTitle: 'Thương hiệu nổi bật',
    title: 'Sợi mì tươi dẻo dai, nước dùng thanh ngọt',
    subtitle: 'Mì Udon Tươi 3 Vị Truyền Thống Hàn Quốc',
    brand: 'Pulmuone',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=1200&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=150&auto=format&fit=crop&q=80',
    linkUrl: 'https://shop.hshopp.vn/pulmuonefood/86323?source=brandstore_display_ads&adCat=food&event=autumn_sale',
    themeColor: '#2563eb',
    productId: 'food-pulmuone-17',
  },
  {
    id: 'candy',
    tabTitle: 'Cửa hàng kẹo',
    title: 'Ngọt ngào từng khoảnh khắc sum vầy',
    subtitle: 'Kẹo Dẻo Gấu Haribo Goldbären Nhập Khẩu Đức',
    brand: 'Haribo Đức',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=1200&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=150&auto=format&fit=crop&q=80',
    linkUrl: 'https://shop.hshopp.vn/haribo-candy/99210?source=hero_store&tag=confectionery',
    themeColor: '#dc2626',
    productId: 'food-haribo-20',
  },
  {
    id: 'coupon',
    tabTitle: 'Ưu đãi coupon',
    badge: 'COUPON',
    title: 'Giảm ngay 50.000 ₫ cho đơn hàng đầu tiên',
    subtitle: 'Nhập mã P4SHOP50K áp dụng toàn sàn',
    brand: 'P4Shop Voucher',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=150&auto=format&fit=crop&q=80',
    linkUrl: 'https://shop.p4shop.vn/vouchers/welcome50k?event=new_user_exclusive',
    themeColor: '#ea580c',
    productId: 'earphone-bt-01',
  },
  {
    id: 'party',
    tabTitle: 'Đồ tiệc / Quà tặng',
    title: 'Quà biếu sức khỏe, phục hồi sinh lực',
    subtitle: 'Hộp Nước Tăng Lực Guronsan & Hồng Sâm Cao Cấp',
    brand: 'Youngjin Guronsan',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=150&auto=format&fit=crop&q=80',
    linkUrl: 'https://shop.hshopp.vn/giftbox/guronsan-vitality?promo=festive2026',
    themeColor: '#059669',
    productId: 'health-guronsan-16',
  },
  {
    id: 'coffee',
    tabTitle: 'Cà phê nguyên chất',
    title: 'Hương vị cà phê chuẩn Nhật thơm lừng',
    subtitle: 'Viên Cà Phê Cô Đặc Blendy AGF Tiện Lợi',
    brand: 'AGF Blendy Nhật Bản',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&auto=format&fit=crop&q=80',
    linkUrl: 'https://shop.hshopp.vn/blendy-japan/33912?source=coffee_lovers',
    themeColor: '#78350f',
    productId: 'food-blendy-12',
  },
  {
    id: 'banila',
    tabTitle: 'Chăm sóc da',
    title: 'Tẩy trang sạch sâu, da ẩm mịn mượt mà',
    subtitle: 'Sáp Tẩy Trang Banila Co Clean It Zero Original',
    brand: 'Banila Co Hàn Quốc',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150&auto=format&fit=crop&q=80',
    linkUrl: 'https://shop.hshopp.vn/banilaco/77412?promo=kbeauty_musthave',
    themeColor: '#db2777',
    productId: 'beauty-banila-19',
  },
];

export const HeroCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredUrl, setHoveredUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  // Auto rotate slides every 6s unless hovered
  useEffect(() => {
    if (hoveredUrl) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [hoveredUrl]);

  const currentSlide = HERO_SLIDES[activeIndex];

  const handleHeroClick = () => {
    if (currentSlide.productId) {
      navigate(`/product/${currentSlide.productId}`);
    } else {
      navigate('/search?q=' + encodeURIComponent(currentSlide.brand));
    }
  };

  return (
    <div className="relative w-full bg-gray-100 overflow-hidden border-b border-gray-200">
      <div className="max-w-[1240px] mx-auto grid grid-cols-12 min-h-[380px] lg:min-h-[440px]">
        {/* Left Side: Wide Interactive Hero Carousel */}
        <div 
          onClick={handleHeroClick}
          onMouseEnter={() => setHoveredUrl(currentSlide.linkUrl)}
          onMouseLeave={() => setHoveredUrl(null)}
          className="col-span-12 lg:col-span-9 relative overflow-hidden cursor-pointer group select-none"
        >
          {/* Background Image with Dark Vignette */}
          <div className="absolute inset-0">
            <img 
              src={currentSlide.image} 
              alt={currentSlide.title} 
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            {/* Gradient Overlay for high-contrast reading */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
          </div>

          {/* Foreground Hero Text & Call to action */}
          <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between max-w-xl text-white">
            <div>
              {/* Brand label */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{currentSlide.brand}</span>
              </div>

              {/* Main Catchphrase */}
              <p className="text-sm md:text-base font-medium text-gray-200 mb-1">
                {currentSlide.title}
              </p>
              <h2 className="text-2xl md:text-4xl font-black leading-tight text-white mb-4 tracking-tight drop-shadow-md">
                {currentSlide.subtitle}
              </h2>

              <p className="text-xs md:text-sm text-gray-300 max-w-md line-clamp-2">
                Trải nghiệm sản phẩm chính hãng với bảo hành sàn, đặt ngay hôm nay để nhận giao hỏa tốc 24h từ mạng lưới P4Shop Rocket — Đại học Thương Mại!
              </p>
            </div>

            {/* Bottom Button + Dots */}
            <div className="flex items-center justify-between pt-6">
              <button 
                className="bg-[#3B6EF5] hover:bg-blue-600 text-white font-bold px-6 py-2.5 rounded-lg text-sm flex items-center gap-2 shadow-lg group-hover:translate-x-1 transition-all"
              >
                <span>Xem ưu đãi ngay</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots indicator */}
              <div className="flex items-center gap-1.5">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      idx === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Chuyển đến slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Vertical List of 6 Items with Thumbnails */}
        <div className="hidden lg:flex col-span-3 flex-col bg-white border-l border-gray-200">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={slide.id}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setHoveredUrl(slide.linkUrl);
                }}
                onMouseLeave={() => setHoveredUrl(null)}
                onClick={() => {
                  if (slide.productId) navigate(`/product/${slide.productId}`);
                }}
                className={`flex-1 flex items-center justify-between px-4 py-2 border-b border-gray-100 last:border-b-0 cursor-pointer transition-all ${
                  isActive 
                    ? 'bg-blue-50/60 border-l-4 border-l-[#3B6EF5] pl-3' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex flex-col pr-2 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`text-xs font-bold truncate ${isActive ? 'text-[#3B6EF5]' : 'text-gray-800'}`}>
                      {slide.tabTitle}
                    </span>
                    {slide.badge && (
                      <span className="bg-red-50 text-red-600 border border-red-200 text-[9px] font-black px-1 rounded shrink-0">
                        {slide.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-500 truncate">
                    {slide.brand}
                  </span>
                </div>

                <div className={`w-12 h-12 rounded overflow-hidden border shrink-0 transition-transform ${
                  isActive ? 'border-blue-400 ring-2 ring-blue-100 scale-105' : 'border-gray-200'
                }`}>
                  <img 
                    src={slide.thumb} 
                    alt={slide.tabTitle} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated Coupang Browser Status Bar Link (Matches Image 2 exactly) */}
      <div className="bg-[#EFEFEF] border-t border-gray-300 py-0.5 px-4 text-[11px] text-gray-500 font-mono flex items-center justify-between truncate">
        <span className="truncate flex items-center gap-1">
          <ExternalLink className="w-3 h-3 text-gray-400 inline shrink-0" />
          <span>{hoveredUrl || currentSlide.linkUrl}</span>
        </span>
        <span className="text-[10px] text-gray-400 shrink-0 ml-2 hidden sm:inline">
          P4Shop Media Ad Platform • Đại học Thương Mại
        </span>
      </div>
    </div>
  );
};
