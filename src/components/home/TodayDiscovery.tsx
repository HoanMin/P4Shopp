import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MOCK_PRODUCTS } from '../../data/mockProducts';

export const TodayDiscovery: React.FC = () => {
  const navigate = useNavigate();
  const { buyNow } = useCart();

  // Find products matching Image 3
  const kerasysProduct = MOCK_PRODUCTS.find(p => p.id === 'beauty-kerasys-11') || MOCK_PRODUCTS[10];
  const blendyProduct = MOCK_PRODUCTS.find(p => p.id === 'food-blendy-12') || MOCK_PRODUCTS[11];
  const nespressoProduct = MOCK_PRODUCTS.find(p => p.id === 'food-nespresso-13') || MOCK_PRODUCTS[12];
  const cjProduct = MOCK_PRODUCTS.find(p => p.id === 'food-cj-14') || MOCK_PRODUCTS[13];
  const hazzysProduct = MOCK_PRODUCTS.find(p => p.id === 'fashion-hazzys-15') || MOCK_PRODUCTS[14];
  const guronsanProduct = MOCK_PRODUCTS.find(p => p.id === 'health-guronsan-16') || MOCK_PRODUCTS[15];

  const handleDirectBuy = (e: React.MouseEvent, product: typeof kerasysProduct) => {
    e.stopPropagation();
    buyNow(product);
    navigate('/checkout');
  };

  return (
    <section className="max-w-[1240px] mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-baseline gap-2 mb-4">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
          Khám phá hôm nay
        </h2>
        <span className="text-gray-300">|</span>
        <p className="text-sm font-medium text-gray-500">
          Sản phẩm HOT nhất hôm nay được P4Shop — Đại học Thương Mại tuyển chọn!
        </p>
      </div>

      {/* Main Grid Layout + Right Sticky Mini Banners */}
      <div className="grid grid-cols-12 gap-4">
        
        {/* Left 9-10 Columns: Product Matrix */}
        <div className="col-span-12 lg:col-span-10 border border-gray-200 rounded-lg bg-white overflow-hidden shadow-2xs divide-y divide-gray-200">
          
          {/* Row 1: 2 Large Cards (Kerasys & Blendy) */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Card 1: Kerasys (Featured with Blue Border on hover and "Mua ngay ›" button) */}
            <div 
              onClick={() => navigate(`/product/${kerasysProduct.id}`)}
              className="relative p-6 flex items-center justify-between min-h-[260px] cursor-pointer hover:border-2 hover:border-[#3B6EF5] transition-all group overflow-hidden"
            >
              <div className="flex flex-col justify-between h-full z-10 pr-2">
                <div>
                  <span className="text-lg font-black text-gray-900 tracking-tight block">
                    KERASYS
                  </span>
                  <h3 className="text-base font-bold text-gray-800 mt-1 mb-1 leading-snug">
                    Hương thơm quyến rũ
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 max-w-[180px]">
                    Cặp gội xả nước hoa Hàn Quốc lưu hương suốt 24h
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={(e) => handleDirectBuy(e, kerasysProduct)}
                    className="bg-[#3B6EF5] hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                  >
                    <span>Mua ngay</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Product Image */}
              <div className="w-[160px] h-[190px] shrink-0 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={kerasysProduct.image} 
                  alt={kerasysProduct.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Card 2: AGF Blendy */}
            <div 
              onClick={() => navigate(`/product/${blendyProduct.id}`)}
              className="relative p-6 flex items-center justify-between min-h-[260px] cursor-pointer hover:border-2 hover:border-[#3B6EF5] transition-all group overflow-hidden"
            >
              <div className="flex flex-col justify-between h-full z-10 pr-2">
                <div>
                  <span className="text-lg font-black text-gray-900 tracking-tight block">
                    AGF Blendy
                  </span>
                  <h3 className="text-base font-bold text-gray-800 mt-1 mb-1 leading-snug">
                    Cà phê cô đặc Blendy
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 max-w-[180px]">
                    Viên cô đặc 24 viên thơm ngậy vị ngọt dịu chuẩn Nhật
                  </p>
                </div>

                <div className="pt-4">
                  <div className="w-7 h-7 bg-gray-200/80 group-hover:bg-[#3B6EF5] group-hover:text-white rounded flex items-center justify-center text-gray-600 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Product Image */}
              <div className="w-[160px] h-[190px] shrink-0 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={blendyProduct.image} 
                  alt={blendyProduct.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Row 2: 4 Smaller Cards (Nespresso, CJ, Hazzys Golf, Guronsan) */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Card 1: Nespresso */}
            <div 
              onClick={() => navigate(`/product/${nespressoProduct.id}`)}
              className="p-4 flex flex-col justify-between min-h-[230px] cursor-pointer hover:bg-blue-50/20 group transition-all"
            >
              <div>
                <span className="text-xs font-black text-gray-800 tracking-tight block">
                  NESPRESSO
                </span>
                <h4 className="text-xs font-bold text-gray-900 mt-0.5 line-clamp-1">
                  Nespresso Original
                </h4>
              </div>

              <div className="w-full h-[120px] my-2 overflow-hidden flex items-center justify-center">
                <img 
                  src={nespressoProduct.image} 
                  alt={nespressoProduct.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" 
                />
              </div>

              <div className="w-6 h-6 bg-gray-200/80 group-hover:bg-[#3B6EF5] group-hover:text-white rounded flex items-center justify-center text-gray-600 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2: CJ CheilJedang */}
            <div 
              onClick={() => navigate(`/product/${cjProduct.id}`)}
              className="p-4 flex flex-col justify-between min-h-[230px] cursor-pointer hover:bg-blue-50/20 group transition-all"
            >
              <div>
                <span className="text-xs font-black text-[#F0471C] tracking-tight block">
                  CJ 제일제당
                </span>
                <h4 className="text-xs font-bold text-gray-900 mt-0.5 line-clamp-1">
                  Gà rán Sobaba Hoàng Kim
                </h4>
              </div>

              <div className="w-full h-[120px] my-2 overflow-hidden flex items-center justify-center">
                <img 
                  src={cjProduct.image} 
                  alt={cjProduct.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" 
                />
              </div>

              <div className="w-6 h-6 bg-gray-200/80 group-hover:bg-[#3B6EF5] group-hover:text-white rounded flex items-center justify-center text-gray-600 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3: HAZZYS Golf */}
            <div 
              onClick={() => navigate(`/product/${hazzysProduct.id}`)}
              className="p-4 flex flex-col justify-between min-h-[230px] cursor-pointer hover:bg-blue-50/20 group transition-all"
            >
              <div>
                <span className="text-xs font-black text-gray-900 tracking-tight block">
                  HAZZYS Golf
                </span>
                <h4 className="text-xs font-bold text-gray-900 mt-0.5 line-clamp-1">
                  Áo Polo Golf Thu Đông
                </h4>
              </div>

              <div className="w-full h-[120px] my-2 overflow-hidden flex items-center justify-center">
                <img 
                  src={hazzysProduct.image} 
                  alt={hazzysProduct.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" 
                />
              </div>

              <div className="w-6 h-6 bg-gray-200/80 group-hover:bg-[#3B6EF5] group-hover:text-white rounded flex items-center justify-center text-gray-600 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 4: Guronsan */}
            <div 
              onClick={() => navigate(`/product/${guronsanProduct.id}`)}
              className="p-4 flex flex-col justify-between min-h-[230px] cursor-pointer hover:bg-blue-50/20 group transition-all"
            >
              <div>
                <span className="text-xs font-black text-blue-700 tracking-tight block">
                  영진 구론산
                </span>
                <h4 className="text-xs font-bold text-gray-900 mt-0.5 line-clamp-1">
                  Nước tăng lực hồng sâm
                </h4>
              </div>

              <div className="w-full h-[120px] my-2 overflow-hidden flex items-center justify-center">
                <img 
                  src={guronsanProduct.image} 
                  alt={guronsanProduct.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" 
                />
              </div>

              <div className="w-6 h-6 bg-gray-200/80 group-hover:bg-[#3B6EF5] group-hover:text-white rounded flex items-center justify-center text-gray-600 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

        </div>

        {/* Right 2 Columns: Sticky Promotional Banner Stack (Matches Image 3 right rail) */}
        <div className="col-span-12 lg:col-span-2 flex flex-col gap-3">
          
          {/* Banner 1 */}
          <div 
            onClick={() => navigate('/search?cat=houseware')}
            className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg cursor-pointer hover:shadow-md transition-all group flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-black text-amber-900 leading-tight">
                Hàng gia dụng
              </p>
              <p className="text-[11px] font-bold text-[#F0471C]">
                Giảm giá sốc!
              </p>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#3B6EF5] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform shadow-2xs">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Banner 2 */}
          <div 
            onClick={() => navigate('/search?cat=beauty')}
            className="p-3 bg-purple-50/80 border border-purple-200 rounded-lg cursor-pointer hover:shadow-md transition-all group flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-black text-purple-900 leading-tight">
                Mỹ phẩm chính hãng
              </p>
              <p className="text-[11px] font-bold text-purple-700">
                100% Nội địa Hàn
              </p>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#3B6EF5] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform shadow-2xs">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Banner 3 */}
          <div 
            onClick={() => navigate('/search?q=p4shop+only')}
            className="p-3 bg-blue-50/80 border border-blue-200 rounded-lg cursor-pointer hover:shadow-md transition-all group flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-black text-blue-900 leading-tight">
                Chỉ có ở P4Shop
              </p>
              <p className="text-[11px] font-bold text-blue-600">
                Độc quyền Wow
              </p>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#3B6EF5] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform shadow-2xs">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Banner 4 */}
          <div 
            onClick={() => navigate('/search?q=du+lịch')}
            className="p-3 bg-orange-50/80 border border-orange-200 rounded-lg cursor-pointer hover:shadow-md transition-all group flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-black text-orange-900 leading-tight">
                Du lịch mùa thu
              </p>
              <p className="text-[11px] font-bold text-[#F0471C]">
                Giảm đến 74%
              </p>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#3B6EF5] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform shadow-2xs">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Banner 5 */}
          <div 
            onClick={() => navigate('/search?q=nhập+khẩu')}
            className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg cursor-pointer hover:shadow-md transition-all group flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-black text-emerald-900 leading-tight">
                P4Shop nhập khẩu
              </p>
              <p className="text-[11px] font-bold text-emerald-700">
                Trực tiếp hải quan
              </p>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#3B6EF5] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform shadow-2xs">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
