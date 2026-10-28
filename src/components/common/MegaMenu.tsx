import React from 'react';
import { 
  Laptop, 
  Sparkles, 
  Coffee, 
  Home, 
  Flag, 
  HeartPulse, 
  ShoppingBag,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const categories = [
    {
      id: 'electronics',
      icon: <Laptop className="w-5 h-5 text-blue-600" />,
      name: 'Điện tử & Công nghệ',
      sub: ['Tai nghe Bluetooth & TWS', 'Tai nghe có dây', 'Loa di động', 'Củ sạc & Cáp sạc GaN', 'Chuột & Bàn phím máy tính', 'Thiết bị thông minh'],
    },
    {
      id: 'beauty',
      icon: <Sparkles className="w-5 h-5 text-pink-500" />,
      name: 'Làm đẹp & Mỹ phẩm Hàn Quốc',
      sub: ['Dầu gội & Chăm sóc tóc Kerasys', 'Serum dưỡng da hoàng gia', 'Sáp tẩy trang Banila Co', 'Mặt nạ ngủ & Dưỡng môi', 'Miếng dán mụn tàng hình'],
    },
    {
      id: 'food',
      icon: <Coffee className="w-5 h-5 text-amber-600" />,
      name: 'Thực phẩm & Cà phê nhập khẩu',
      sub: ['Mì Udon tươi Pulmuone 3 vị', 'Cà phê viên cô đặc Blendy AGF', 'Viên nén Nespresso Original', 'Gà rán Sobaba CJ CheilJedang', 'Kẹo gấu Haribo Goldbären', 'Mì cay Shin Ramyun Black'],
    },
    {
      id: 'houseware',
      icon: <Home className="w-5 h-5 text-teal-600" />,
      name: 'Đồ gia dụng & Đời sống',
      sub: ['Nồi chiên không dầu Lock&Lock 5.5L', 'Máy lọc không khí Levoit Core 300S', 'Robot hút bụi lau nhà Ecovacs Omni', 'Bình giữ nhiệt Thermos Nhật', 'Nước giặt xả Downy nước hoa'],
    },
    {
      id: 'fashion_golf',
      icon: <Flag className="w-5 h-5 text-emerald-600" />,
      name: 'Thời trang & Golf thể thao',
      sub: ['Áo Polo Hazzys Golf FW thu đông', 'Bóng golf Titleist Pro V1', 'Giày golf FootJoy khóa BOA', 'Túi đựng gậy TaylorMade', 'Mũ golf Callaway chống UV'],
    },
    {
      id: 'health',
      icon: <HeartPulse className="w-5 h-5 text-red-500" />,
      name: 'Sức khỏe & Thực phẩm bổ sung',
      sub: ['Cao hồng sâm chính phủ KGC 6 năm', 'Nước tăng lực Guronsan Youngjin', 'Dầu cá Úc Blackmores 1000mg', 'Viên uống Vitamin tổng hợp'],
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      
      {/* Mega menu popover attached directly under category button */}
      <div className="absolute top-full left-0 w-[840px] bg-white rounded-b-xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
        <div className="grid grid-cols-12 min-h-[380px]">
          {/* Main category columns */}
          <div className="col-span-5 bg-gray-50/70 border-r border-gray-200 py-3">
            <div className="px-4 pb-2 mb-2 border-b border-gray-200/80 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Danh mục chính</span>
              <span className="text-xs text-blue-600 flex items-center gap-1 font-medium">
                <Zap className="w-3.5 h-3.5" /> Giao hàng 24h
              </span>
            </div>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  navigate(`/search?cat=${cat.id}`);
                  onClose();
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-white hover:shadow-xs transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-md bg-white border border-gray-100 group-hover:border-blue-200 shadow-2xs">
                    {cat.icon}
                  </div>
                  <span>{cat.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>

          {/* Subcategory showcase */}
          <div className="col-span-7 p-6 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-orange-500" />
                  Sản phẩm nổi bật &amp; Bán chạy hôm nay
                </h4>
                <button 
                  onClick={() => {
                    navigate('/search?q=all');
                    onClose();
                  }}
                  className="text-xs text-blue-600 hover:underline font-semibold"
                >
                  Xem tất cả 40+ sản phẩm &rsaquo;
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {categories.flatMap(c => c.sub.slice(0, 2)).map((subItem, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      navigate(`/search?q=${encodeURIComponent(subItem)}`);
                      onClose();
                    }}
                    className="text-left py-1.5 px-2 rounded-md hover:bg-blue-50 hover:text-blue-700 text-gray-600 transition-colors truncate font-normal"
                  >
                    • {subItem}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom trust banner */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between bg-blue-50/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-xs text-blue-900 font-medium">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Cam kết 100% hàng chính hãng &amp; Đổi trả dễ dàng trong 7 ngày</span>
              </div>
              <span className="text-[11px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">P4Shop Wow</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
