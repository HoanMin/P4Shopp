import React, { useState } from 'react';
import { HeroCarousel } from './HeroCarousel';
import { TodayDiscovery } from './TodayDiscovery';
import { FlashSale } from './FlashSale';
import { ProductCard } from '../product/ProductCard';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Flame, 
  ChevronRight, 
  Laptop, 
  Sparkle, 
  Coffee, 
  Flag,
  Award
} from 'lucide-react';
import { ProductCategory } from '../../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<ProductCategory>('electronics');

  // Filter category products for the best-seller section
  const categoryProducts = MOCK_PRODUCTS.filter(p => p.category === selectedCategoryTab).slice(0, 8);
  
  // Recommend for you items
  const recommendedProducts = MOCK_PRODUCTS.slice(0, 8);

  const categoryTabs: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'electronics', label: 'Tai nghe & Đồ công nghệ', icon: <Laptop className="w-4 h-4" /> },
    { id: 'beauty', label: 'Mỹ phẩm & Chăm sóc da', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'food', label: 'Cà phê & Thực phẩm', icon: <Coffee className="w-4 h-4" /> },
    { id: 'fashion_golf', label: 'Thời trang Golf', icon: <Flag className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full bg-[#F5F6F8] pb-12 font-sans select-none">
      
      {/* 1. Hero Carousel (Image 2) */}
      <HeroCarousel />

      {/* 2. Today's Discovery (Image 3) */}
      <TodayDiscovery />

      {/* 3. Flash Sale Section with Live Countdown */}
      <FlashSale />

      {/* 4. Best Sellers by Category */}
      <section className="max-w-[1240px] mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-2xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#F0471C]" />
                <h2 className="text-xl font-black text-gray-900 tracking-tight">
                  Bán chạy nhất theo danh mục
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Các sản phẩm có lượt mua và đánh giá 5 sao cao nhất tuần này
              </p>
            </div>

            {/* Category Switch Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {categoryTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategoryTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                    selectedCategoryTab === tab.id
                      ? 'bg-[#3B6EF5] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {categoryProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} rankBadge={idx + 1} />
            ))}
          </div>

        </div>
      </section>

      {/* 5. Suggestions For You */}
      <section className="max-w-[1240px] mx-auto px-4 py-6">
        <div className="flex items-baseline justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-black text-gray-900 tracking-tight">
              Gợi ý dành riêng cho bạn
            </h2>
            <span className="text-xs text-gray-400 hidden sm:inline">• Dựa trên xu hướng mua sắm</span>
          </div>
          <button
            onClick={() => navigate('/search?q=all')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
          >
            <span>Khám phá thêm</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendedProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
};
