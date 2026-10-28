import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Package, 
  MapPin, 
  CreditCard, 
  FileCheck, 
  AlertCircle,
  Home,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { formatVND } from '../../utils/pricing';

export const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { lastCompletedOrder } = useCart();

  useEffect(() => {
    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  }, []);

  if (!lastCompletedOrder) {
    return (
      <div className="max-w-md mx-auto my-16 text-center px-4 font-sans">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-gray-800">Không tìm thấy thông tin đơn hàng mới</h2>
        <p className="text-xs text-gray-500 mb-6 mt-1">
          Có vẻ bạn chưa hoàn tất quy trình đặt hàng hoặc đã xóa lịch sử phiên làm việc.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#3B6EF5] text-white font-bold px-5 py-2.5 rounded-xl text-xs"
        >
          <Home className="w-4 h-4" />
          <span>Về trang chủ</span>
        </Link>
      </div>
    );
  }

  const {
    orderNumber,
    items,
    shippingAddress,
    paymentMethod,
    subtotal,
    shippingFee,
    discountAmount,
    totalAmount,
    createdAt,
    termsRecord,
  } = lastCompletedOrder;

  const paymentMethodLabel = 
    paymentMethod === 'e-wallet' ? 'Ví điện tử (ZaloPay / MoMo)' :
    paymentMethod === 'bank-card' ? 'Thẻ ngân hàng (ATM / Visa / Mastercard)' :
    'Thanh toán khi nhận hàng (COD)';

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-16 font-sans">
      
      {/* Step Indicator Header (Step 4 "Hoàn tất" Active) */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-2xs">
        <div className="max-w-[1100px] mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full border border-blue-900 bg-white p-0.5 overflow-hidden shrink-0 shadow-2xs">
              <img 
                src="/assets/aistudio/image_fd917d90.png" 
                alt="P4Shop TMU Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-black text-[#FF4D1F]">P4</span>
              <span className="text-xl font-extrabold text-[#0B2A5B]">Shop</span>
            </div>
            <span className="text-[10px] font-bold text-gray-500 hidden sm:inline">• ĐH Thương Mại</span>
          </div>

          <div className="flex items-center text-xs">
            <span className="text-gray-400">1 Giỏ hàng</span>
            <span className="mx-2 text-gray-300">—</span>
            <span className="text-gray-400">2 Địa chỉ</span>
            <span className="mx-2 text-gray-300">—</span>
            <span className="text-gray-400">3 Thanh toán</span>
            <span className="mx-2 text-gray-300">—</span>
            {/* Active Step 4 */}
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">
                4
              </span>
              <span>Hoàn tất</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-4 py-8">
        
        {/* Success Banner Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200 text-center mb-6">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50/50">
            <CheckCircle2 className="w-10 h-10 stroke-[2]" />
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Đặt hàng thành công!
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full">
              Chế độ demo giao dịch mô phỏng an toàn
            </span>
            <span className="text-xs text-blue-800 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Đại học Thương Mại • Dev: Lê Nguyễn Hà Anh
            </span>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-xl inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-gray-600 border border-gray-200/80">
            <div>
              Mã đơn hàng: <strong className="font-mono text-gray-900 font-bold">{orderNumber}</strong>
            </div>
            <div className="hidden sm:inline text-gray-300">|</div>
            <div>
              Thời gian: <strong>{new Date(createdAt).toLocaleString('vi-VN')}</strong>
            </div>
          </div>

          {/* Demo status alert */}
          <div className="mt-4 p-3 bg-amber-50 text-amber-900 rounded-lg text-xs border border-amber-200/80 flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Chưa thanh toán thật – Bản demo:</strong> Đây là môi trường thử nghiệm giao diện và tuân thủ điều khoản, tài khoản ngân hàng của bạn không bị trừ tiền.
            </span>
          </div>
        </div>

        {/* Order Details & Compliance Audit Trail Card */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200 space-y-6">
          
          {/* 1. Ordered Products */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-100">
              <Package className="w-4 h-4 text-[#3B6EF5]" />
              <span>Sản phẩm trong đơn hàng ({items.length})</span>
            </h2>

            <div className="divide-y divide-gray-100 mt-2">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <h3 className="font-semibold text-gray-900 truncate">{item.product.name}</h3>
                    <p className="text-gray-500 mt-0.5">Phân loại: {item.variant.name}</p>
                    <p className="text-gray-400">Số lượng: x{item.quantity}</p>
                  </div>
                  <div className="text-right text-xs font-bold text-gray-900">
                    {formatVND((item.variant.price || item.product.currentPrice) * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Delivery & Payment Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/60 text-xs space-y-1">
              <p className="font-bold text-gray-900 flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span>Địa chỉ giao hàng</span>
              </p>
              <p className="font-semibold text-gray-800">{shippingAddress.fullName}</p>
              <p className="text-gray-600">{shippingAddress.phone}</p>
              <p className="text-gray-500">{shippingAddress.address}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/60 text-xs space-y-1">
              <p className="font-bold text-gray-900 flex items-center gap-1.5 mb-1.5">
                <CreditCard className="w-4 h-4 text-gray-600" />
                <span>Phương thức thanh toán</span>
              </p>
              <p className="font-semibold text-gray-800">{paymentMethodLabel}</p>
              <p className="text-gray-500 text-[11px]">Trạng thái: Tạm khóa bảo vệ giao dịch</p>
            </div>
          </div>

          {/* 3. Financial Summary */}
          <div className="border-t border-gray-100 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Tạm tính:</span>
              <span className="font-semibold text-gray-900">{formatVND(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Phí vận chuyển:</span>
              <span className="font-semibold text-gray-900">{formatVND(shippingFee)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#F0471C] font-semibold">
                <span>Mã giảm giá chào mừng:</span>
                <span>-{formatVND(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-2 border-t border-gray-200 text-sm font-bold text-gray-900">
              <span>Tổng cộng thanh toán:</span>
              <span className="text-2xl font-black text-[#F0471C]">{formatVND(totalAmount)}</span>
            </div>
          </div>

          {/* 4. Terms Agreement Audit Log (Section 7 requirement: Lưu lựa chọn đồng ý) */}
          <div className="bg-blue-50/60 border border-blue-200/70 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0B2A5B]">
              <FileCheck className="w-4 h-4 text-[#3B6EF5]" />
              <span>Bản ghi đồng thuận Điều khoản &amp; Điều kiện giao dịch (Audit Log)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-700 pt-1">
              <div>
                • Phiên bản điều khoản: <strong>{termsRecord.termsVersion}</strong>
              </div>
              <div>
                • Thời điểm đồng ý: <strong>{new Date(termsRecord.acceptedAt).toLocaleTimeString('vi-VN')} {new Date(termsRecord.acceptedAt).toLocaleDateString('vi-VN')}</strong>
              </div>
              <div>
                • Điều khoản cốt lõi [BẮT BUỘC]: <strong className="text-emerald-700">ĐÃ ĐỒNG Ý</strong>
              </div>
              <div>
                • Tiếp thị &amp; Quảng cáo [TÙY CHỌN]: <strong>{termsRecord.marketingAccepted ? 'ĐỒNG Ý NHẬN' : 'KHÔNG NHẬN'}</strong>
              </div>
              <div>
                • IP giao dịch xác thực: <span className="font-mono text-gray-600">{termsRecord.ipAddressDemo}</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto bg-[#3B6EF5] hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Tiếp tục mua sắm</span>
            </Link>

            <Link
              to="/terms"
              className="text-xs text-gray-500 hover:text-blue-600 underline"
            >
              Xem lại điều khoản và chính sách đổi trả ›
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
