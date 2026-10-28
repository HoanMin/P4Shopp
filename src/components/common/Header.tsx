import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Mic, 
  User, 
  ShoppingCart, 
  Rocket, 
  Gift, 
  ChevronRight, 
  ChevronLeft,
  Tv, 
  RotateCcw, 
  Briefcase, 
  Globe2, 
  Sparkles, 
  Store,
  ChevronDown,
  Apple
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MegaMenu } from './MegaMenu';

const AUTOCOMPLETE_SUGGESTIONS = [
  'tai nghe bluetooth',
  'tai nghe có dây',
  'tai nghe chống ồn enc',
  'dầu gội kerasys devil\'s',
  'cà phê cô đặc blendy',
  'mì udon tươi pulmuone',
  'áo polo golf hazzys',
  'bóng golf titleist pro v1',
  'sáp tẩy trang banila co',
  'máy lọc không khí levoit',
  'nồi chiên không dầu lock&lock',
  'nước tăng lực guronsan',
];

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, language, setLanguage } = useCart();
  
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuScrollRef = useRef<HTMLDivElement>(null);

  // Sync searchQuery with URL params if on /search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
    }
  }, [location.search]);

  // Handle scroll for sticky search bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = searchQuery.trim();
    setShowSuggestions(false);
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}${selectedCategory !== 'all' ? `&cat=${selectedCategory}` : ''}`);
    } else {
      navigate('/search?q=all');
    }
  };

  const handleSelectSuggestion = (text: string) => {
    setSearchQuery(text);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(text)}`);
  };

  const scrollQuickMenu = (direction: 'left' | 'right') => {
    if (menuScrollRef.current) {
      menuScrollRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth'
      });
    }
  };

  const quickNavItems = [
    { id: 'play', name: 'P4Shop Play', icon: <Tv className="w-4 h-4 text-rose-500" />, badge: null },
    { id: 'rocket', name: 'Giao nhanh', icon: <Rocket className="w-4 h-4 text-blue-500" />, badge: null },
    { id: 'fresh', name: 'Giao tươi', icon: <Apple className="w-4 h-4 text-emerald-500" />, badge: null },
    { id: 'repurchase', name: 'Mua lại', icon: <RotateCcw className="w-4 h-4 text-orange-500" />, badge: 'N' },
    { id: 'biz', name: 'P4Shop Biz', icon: <Briefcase className="w-4 h-4 text-indigo-500" />, badge: null },
    { id: 'global', name: 'Hàng quốc tế', icon: <Globe2 className="w-4 h-4 text-purple-500" />, badge: null },
    { id: 'goldbox', name: 'Hộp vàng', icon: <Gift className="w-4 h-4 text-amber-500" />, badge: 'SALE' },
    { id: 'new', name: 'Mới trong ngày', icon: <Sparkles className="w-4 h-4 text-red-500" />, badge: 'NEW' },
    { id: 'seller', name: 'Đăng ký bán', icon: <Store className="w-4 h-4 text-cyan-600" />, badge: null },
  ];

  return (
    <header className="w-full bg-white select-none relative z-30 font-sans">
      {/* 0. Demo Environment Notice Banner */}
      <div className="bg-[#0B2A5B] text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide flex flex-wrap items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Website Sàn TMĐT <strong>P4Shop</strong> — <strong>Đại học Thương Mại</strong></span>
        <span className="text-gray-300">|</span>
        <span className="bg-orange-500/30 text-orange-200 px-2 py-0.5 rounded text-[11px] font-semibold">
          Người phát triển: Lê Nguyễn Hà Anh
        </span>
      </div>

      {/* a) Top Dual Banner (Rocket Delivery 24h & Special Gifts) */}
      <div className="bg-gradient-to-r from-[#DFF2FE] via-[#E9F4FF] to-[#FEEEDF] border-b border-blue-100/60 overflow-hidden">
        <div className="max-w-[1240px] mx-auto h-[74px] md:h-[84px] grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-blue-200/50">
          {/* Left half: Rocket 24h */}
          <div 
            onClick={() => navigate('/search?q=rocket')}
            className="flex items-center justify-between px-5 md:px-8 cursor-pointer hover:opacity-95 transition-opacity group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                <Rocket className="w-6 h-6 text-[#3B6EF5]" />
              </div>
              <div>
                <p className="text-xs text-blue-900 font-semibold tracking-wide uppercase">Dịch vụ giao hàng P4Shop Rocket</p>
                <p className="text-sm md:text-base font-extrabold text-[#0B2A5B]">
                  Đặt trước 24h, <span className="text-[#3B6EF5]">giao hàng nhanh ngày mai!</span>
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-gray-500 group-hover:translate-x-1 group-hover:text-blue-600 transition-all shadow-2xs">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Right half: Special Gift */}
          <div 
            onClick={() => navigate('/search?q=quà+tặng')}
            className="flex items-center justify-between px-5 md:px-8 cursor-pointer hover:opacity-95 transition-opacity group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-orange-500 group-hover:scale-105 transition-transform">
                <Gift className="w-6 h-6 text-[#F0471C]" />
              </div>
              <div>
                <p className="text-xs text-orange-900/80 font-semibold tracking-wide uppercase">Tuần lễ tri ân khách hàng</p>
                <p className="text-sm md:text-base font-extrabold text-[#0B2A5B]">
                  Quà tặng đặc biệt <span className="text-[#F0471C]">&amp; Voucher đến 50k</span>
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-gray-500 group-hover:translate-x-1 group-hover:text-[#F0471C] transition-all shadow-2xs">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* b) Utility Topbar (Light Gray Background) */}
      <div className="bg-[#F5F6F8] border-b border-gray-200 text-[12px] text-gray-600 py-1.5 px-4">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="hover:text-blue-600 transition-colors">Yêu thích</button>
            <span className="text-gray-300">|</span>
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-blue-600">
              <span>Đăng ký bán hàng</span>
              <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-blue-600" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-gray-200 text-[11px] font-medium">
              <span className="text-gray-400">Ngôn ngữ:</span>
              <button 
                onClick={() => setLanguage('vi')}
                className={`px-1 rounded ${language === 'vi' ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-black'}`}
              >
                VIE
              </button>
              <span className="text-gray-300">/</span>
              <button 
                onClick={() => setLanguage('ko')}
                className={`px-1 rounded ${language === 'ko' ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-black'}`}
              >
                KOR
              </button>
              <span className="text-gray-300">/</span>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-1 rounded ${language === 'en' ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-black'}`}
              >
                ENG
              </button>
            </div>

            <span className="text-gray-300">|</span>
            <button className="hover:text-blue-600 transition-colors">Đăng nhập</button>
            <span className="text-gray-300">|</span>
            <button className="hover:text-blue-600 transition-colors">Đăng ký</button>
            <span className="text-gray-300">|</span>
            <button className="hover:text-blue-600 transition-colors">Hỗ trợ khách hàng</button>
            <span className="text-gray-300">|</span>
            <button className="hover:text-blue-600 transition-colors">Đăng ký người bán</button>
          </div>
        </div>
      </div>

      {/* c) Main Header Section */}
      <div className="max-w-[1240px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* 1. Category Button (Navy/Blue block with mega menu) */}
          <div className="relative">
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="bg-[#3B6EF5] hover:bg-[#2e5fe6] text-white font-bold h-[54px] px-5 rounded-lg flex items-center gap-2.5 transition-colors shadow-sm shrink-0 cursor-pointer"
              aria-label="Danh mục sản phẩm"
            >
              <Menu className="w-5 h-5" />
              <span className="text-sm tracking-wide">Danh mục</span>
            </button>
            
            {/* Mega Menu Dropdown */}
            <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
          </div>

          {/* 2. Logo P4Shop with Đại học Thương Mại Badge */}
          <div 
            onClick={() => navigate('/')}
            className="cursor-pointer flex items-center shrink-0 pr-2 group gap-2.5"
          >
            {/* TMU Official Logo Badge */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#0B2A5B] shadow-xs shrink-0 group-hover:scale-105 transition-transform bg-white p-0.5">
              <img 
                src="/assets/aistudio/image_fd917d90.png" 
                alt="Logo Đại học Thương Mại - P4Shop" 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* P4Shop Brand Name */}
            <div className="flex flex-col">
              <div className="flex items-baseline leading-none">
                <span className="text-[32px] font-black text-[#FF4D1F] tracking-tight group-hover:scale-105 transition-transform inline-block">P4</span>
                <span className="text-[32px] font-extrabold text-[#0B2A5B] tracking-tight">Shop</span>
              </div>
              <span className="text-[10px] font-bold text-[#0B2A5B]/85 tracking-wide uppercase mt-0.5">
                Đại học Thương Mại
              </span>
            </div>

            {/* Developer Credit Tag */}
            <div className="hidden xl:flex flex-col ml-1 pl-2.5 border-l border-gray-200 text-[10px] text-gray-500 leading-tight">
              <span className="font-bold text-[#3B6EF5]">Dev: Lê Nguyễn Hà Anh</span>
              <span className="text-gray-400">TMU E-Commerce</span>
            </div>
          </div>

          {/* 3. Search Bar with 2px Blue Border + Category Selector + Autocomplete */}
          <div className="flex-1 max-w-[620px] relative">
            <form 
              onSubmit={handleSearchSubmit}
              className="flex items-center border-2 border-[#3B6EF5] rounded-md h-[46px] bg-white overflow-hidden shadow-2xs focus-within:ring-2 focus-within:ring-blue-200 transition-all"
            >
              {/* Category selector */}
              <div className="relative h-full flex items-center border-r border-gray-200 bg-gray-50/70">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-full bg-transparent text-xs text-gray-700 pl-3 pr-7 font-medium appearance-none outline-none cursor-pointer"
                >
                  <option value="all">Tất cả</option>
                  <option value="electronics">Điện tử</option>
                  <option value="beauty">Mỹ phẩm</option>
                  <option value="food">Thực phẩm</option>
                  <option value="houseware">Gia dụng</option>
                  <option value="fashion_golf">Thời trang Golf</option>
                  <option value="health">Sức khỏe</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 pointer-events-none" />
              </div>

              {/* Input */}
              <div className="relative flex-1 h-full flex items-center">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Tìm sản phẩm trên P4Shop! (VD: tai nghe, cà phê, kem chống nắng...)"
                  className="w-full h-full px-3 text-sm text-gray-800 placeholder-gray-400 outline-none"
                />
              </div>

              {/* Mic Icon */}
              <button 
                type="button" 
                onClick={() => alert('Chức năng tìm kiếm bằng giọng nói đang chuẩn bị ra mắt!')}
                className="px-2.5 h-full text-gray-400 hover:text-blue-600 transition-colors flex items-center justify-center"
                title="Tìm kiếm bằng giọng nói"
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Blue Magnifying Glass Search Button */}
              <button
                type="submit"
                className="h-full px-5 bg-[#3B6EF5] hover:bg-[#2b5ee5] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tìm kiếm"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
              </button>
            </form>

            {/* Autocomplete Suggestions Box */}
            {showSuggestions && (
              <>
                <div 
                  className="fixed inset-0 z-20"
                  onClick={() => setShowSuggestions(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-30 py-2 divide-y divide-gray-100">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Tìm kiếm phổ biến trên P4Shop</span>
                    <span className="text-[#3B6EF5]">Xu hướng hôm nay</span>
                  </div>
                  <div className="py-1">
                    {AUTOCOMPLETE_SUGGESTIONS.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectSuggestion(item)}
                        className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between group transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-4 text-center font-bold text-xs ${idx < 3 ? 'text-orange-500' : 'text-gray-400'}`}>
                            {idx + 1}
                          </span>
                          <span>{item}</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500" />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 4. Right side: My Account & Cart with Badge */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Account */}
            <button 
              onClick={() => alert('Khu vực Quản lý tài khoản và Đơn hàng demo')}
              className="flex flex-col items-center text-gray-700 hover:text-[#3B6EF5] transition-colors p-1"
            >
              <User className="w-6 h-6 stroke-[1.7]" />
              <span className="text-[11px] font-medium mt-0.5">Tài khoản</span>
            </button>

            {/* Cart with Badge */}
            <button
              onClick={() => navigate('/cart')}
              className="flex flex-col items-center text-gray-700 hover:text-[#3B6EF5] transition-colors p-1 relative group"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 stroke-[1.7] group-hover:scale-105 transition-transform" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#3B6EF5] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium mt-0.5">Giỏ hàng</span>
            </button>
          </div>

        </div>
      </div>

      {/* d) Horizontal Quick Menu Bar (with scroll arrows) */}
      <div className="border-t border-b border-gray-100 bg-white">
        <div className="max-w-[1240px] mx-auto px-2 relative flex items-center">
          {/* Scroll Left */}
          <button 
            onClick={() => scrollQuickMenu('left')}
            className="w-7 h-7 rounded-full bg-white shadow-xs border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black shrink-0 z-10 mr-1"
            aria-label="Cuộn trái"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Nav Items */}
          <div 
            ref={menuScrollRef}
            className="flex items-center gap-6 overflow-x-auto scrollbar-none py-2 px-2 scroll-smooth text-xs font-semibold text-gray-700"
          >
            {quickNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(`/search?q=${encodeURIComponent(item.name)}`)}
                className="flex items-center gap-1.5 shrink-0 hover:text-[#3B6EF5] transition-colors group cursor-pointer"
              >
                <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                <span>{item.name}</span>
                {item.badge && (
                  <span className={`text-[10px] font-black px-1.5 py-0.2 rounded ${
                    item.badge === 'N' ? 'bg-[#FF4D1F] text-white' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Scroll Right */}
          <button 
            onClick={() => scrollQuickMenu('right')}
            className="w-7 h-7 rounded-full bg-white shadow-xs border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black shrink-0 z-10 ml-1"
            aria-label="Cuộn phải"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Compact Sticky Header when scrolling down */}
      {isSticky && (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md border-b border-gray-200 z-50 animate-in fade-in slide-in-from-top-1 duration-150 py-2.5 px-4">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4">
            {/* Small Logo P4Shop */}
            <div 
              onClick={() => navigate('/')}
              className="cursor-pointer flex items-center gap-2 shrink-0"
            >
              <img 
                src="/assets/aistudio/image_fd917d90.png" 
                alt="P4Shop TMU Logo" 
                className="w-7 h-7 rounded-full border border-blue-900 object-contain shrink-0"
              />
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-[#FF4D1F]">P4</span>
                <span className="text-2xl font-extrabold text-[#0B2A5B]">Shop</span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 hidden sm:inline">• ĐH Thương Mại</span>
            </div>

            {/* Compact Search Bar */}
            <form 
              onSubmit={handleSearchSubmit}
              className="flex-1 max-w-[550px] flex items-center border-2 border-[#3B6EF5] rounded-md h-[38px] overflow-hidden"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm sản phẩm trên P4Shop..."
                className="flex-1 h-full px-3 text-xs text-gray-800 outline-none"
              />
              <button 
                type="submit"
                className="h-full px-4 bg-[#3B6EF5] text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Cart */}
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 bg-blue-50 text-[#3B6EF5] px-3.5 py-1.5 rounded-md font-semibold text-xs hover:bg-blue-100 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Giỏ hàng ({totalCartCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
