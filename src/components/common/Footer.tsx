import React from 'react';
import { ShieldCheck, PhoneCall, Mail, MapPin, Truck, RotateCcw, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-[#FAFAFC] border-t border-gray-200 text-gray-600 text-xs mt-12">
      {/* 4 Pillars of Trust */}
      <div className="border-b border-gray-200 bg-white py-6">
        <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Giao nhanh 24h</p>
              <p className="text-gray-500 text-[11px]">Cam kết giao đúng hẹn hoặc đền bù</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Đổi trả 7 ngày</p>
              <p className="text-gray-500 text-[11px]">Thủ tục minh bạch &amp; nhanh chóng</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">100% Chính hãng</p>
              <p className="text-gray-500 text-[11px]">Kiểm duyệt tài liệu &amp; chứng nhận sàn</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Bảo vệ quyền lợi</p>
              <p className="text-gray-500 text-[11px]">Hỗ trợ hòa giải tranh chấp 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Company Details */}
      <div className="max-w-[1240px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Customer Care */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm">Chăm sóc khách hàng</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2 font-bold text-[#F0471C] text-base">
                <PhoneCall className="w-4 h-4" /> 1900 6868
              </p>
              <p className="text-gray-500 text-[11px]">Thứ 2 - Chủ Nhật (08:00 - 22:00)</p>
              <p className="flex items-center gap-2 text-gray-600">
                <Mail className="w-3.5 h-3.5" /> hotro@p4shop.tmu.edu.vn
              </p>
              <div className="pt-2 flex flex-col gap-1 text-[11px] text-gray-500">
                <button onClick={() => navigate('/terms')} className="text-left hover:text-blue-600">Trung tâm trợ giúp &amp; Khiếu nại</button>
                <button onClick={() => navigate('/terms')} className="text-left hover:text-blue-600">Hướng dẫn đặt hàng &amp; Thanh toán</button>
                <button onClick={() => navigate('/terms')} className="text-left hover:text-blue-600">Chính sách vận chuyển P4Shop Rocket</button>
              </div>
            </div>
          </div>

          {/* Col 2: About P4Shop */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm">Về P4Shop</h4>
            <div className="space-y-1.5 text-xs text-gray-500 flex flex-col">
              <button onClick={() => navigate('/')} className="text-left hover:text-blue-600">Giới thiệu về sàn thương mại điện tử P4Shop</button>
              <button onClick={() => navigate('/')} className="text-left hover:text-blue-600">Chương trình tuyển dụng</button>
              <button onClick={() => navigate('/terms')} className="text-left hover:text-blue-600 font-semibold text-gray-700">Điều khoản &amp; Điều kiện giao dịch (v2.4)</button>
              <button onClick={() => navigate('/terms')} className="text-left hover:text-blue-600">Chính sách bảo mật dữ liệu cá nhân</button>
              <button onClick={() => navigate('/terms')} className="text-left hover:text-blue-600">Quy chế hoạt động sàn TMĐT</button>
            </div>
          </div>

          {/* Col 3: Cooperation & Sellers */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm">Hợp tác &amp; Bán hàng</h4>
            <div className="space-y-1.5 text-xs text-gray-500 flex flex-col">
              <span className="hover:text-blue-600 cursor-pointer">Đăng ký người bán hàng P4Shop Seller</span>
              <span className="hover:text-blue-600 cursor-pointer">Quy trình kiểm duyệt nhà bán &amp; Cấp chứng nhận</span>
              <span className="hover:text-blue-600 cursor-pointer">Chương trình đối tác tiếp thị liên kết (Affiliate)</span>
              <span className="hover:text-blue-600 cursor-pointer">Quy định xử lý vi phạm &amp; Hàng giả</span>
            </div>
          </div>

          {/* Col 4: Payment Methods & Badges */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm">Phương thức thanh toán</h4>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-blue-600">
                ZaloPay
              </div>
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-pink-600">
                MoMo
              </div>
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-blue-900">
                VISA
              </div>
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-orange-600">
                Mastercard
              </div>
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-green-700">
                JCB
              </div>
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-gray-700">
                COD
              </div>
            </div>

            <h4 className="font-bold text-gray-900 mb-2 text-xs">Chứng nhận sàn</h4>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 bg-blue-900 text-white rounded text-[10px] font-bold">
                ĐÃ ĐĂNG KÝ BỘ CÔNG THƯƠNG
              </div>
              <div className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold">
                SSL SECURE
              </div>
            </div>
          </div>
        </div>

        {/* Legal Address & Disclaimer */}
        <div className="border-t border-gray-200 pt-6 text-[11px] text-gray-500 leading-relaxed">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-blue-900 bg-white p-0.5 shrink-0">
                <img 
                  src="/assets/aistudio/image_fd917d90.png" 
                  alt="Đại học Thương Mại - P4Shop" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-extrabold text-gray-900 text-sm">
                  Công ty Cổ phần Thương mại Điện tử P4Shop — Đại học Thương Mại
                </p>
                <p className="text-[#3B6EF5] font-bold text-xs">
                  Người phát triển hệ thống: Lê Nguyễn Hà Anh
                </p>
              </div>
            </div>

            <div className="bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1.5 rounded-lg text-xs font-semibold">
              Đại học Thương Mại (TMU) • Mã trường: TMA
            </div>
          </div>

          <p className="flex items-center gap-1.5 text-gray-700 font-medium">
            <MapPin className="w-4 h-4 text-[#F0471C] shrink-0" />
            <span>Địa chỉ: <strong>Trường Đại học Thương Mại</strong>, Số 79 Đường Hồ Tùng Mậu, Phường Mai Dịch, Quận Cầu Giấy, TP. Hà Nội, Việt Nam.</span>
          </p>
          <p className="mt-1 text-gray-500">
            Tổng đài hỗ trợ: 1900 6868 | Email: hotro@p4shop.tmu.edu.vn | Giấy phép sàn TMĐT nghiên cứu &amp; ứng dụng
          </p>
          <p className="mt-2 text-gray-400">
            © 2026 P4Shop — Trường Đại học Thương Mại. Mọi quyền được bảo lưu. Dự án phát triển bởi Lê Nguyễn Hà Anh theo cấu trúc sàn Coupang Hàn Quốc.
          </p>
        </div>
      </div>
    </footer>
  );
};
