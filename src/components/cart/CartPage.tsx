import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Trash2, 
  ShoppingCart, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Check, 
  Rocket,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatVND } from '../../utils/pricing';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    toggleSelect, 
    toggleSelectAll, 
    cartTotals,
    discountCode,
    appliedDiscount,
    applyDiscountCode
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState(discountCode);

  const allSelected = cart.length > 0 && cart.every(item => item.selected);
  const someSelected = cart.some(item => item.selected);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon) {
      applyDiscountCode(inputCoupon);
    }
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-16 text-center font-sans">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Giỏ hàng của bạn đang trống</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
          Hãy khám phá hàng ngàn ưu đãi hấp dẫn từ HShopp và chọn mua những sản phẩm ưng ý nhất!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#3B6EF5] hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md text-sm"
        >
          <span>Tiếp tục mua sắm ngay</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-6 font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-gray-800">Giỏ hàng ({cart.length})</span>
      </div>

      <h1 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">
        Giỏ hàng của bạn
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 cols: Cart Items Table */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
          {/* Header row with Select All */}
          <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-200 flex items-center justify-between text-xs font-bold text-gray-700">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => toggleSelectAll(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-[#3B6EF5] cursor-pointer"
              />
              <span>Chọn tất cả ({cart.length} sản phẩm)</span>
            </label>
            <span className="text-gray-400 hidden sm:inline">HShopp Đảm bảo hoàn tiền</span>
          </div>

          {/* Cart Item list */}
          <div className="divide-y divide-gray-100">
            {cart.map((item) => (
              <div key={item.id} className="p-4 flex items-start gap-3 sm:gap-4 hover:bg-gray-50/50 transition-colors">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleSelect(item.id)}
                  className="w-4 h-4 rounded text-blue-600 accent-[#3B6EF5] mt-3 cursor-pointer shrink-0"
                />

                {/* Thumbnail */}
                <div 
                  onClick={() => navigate(`/product/${item.product.id}`)}
                  className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-50 cursor-pointer"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 
                      onClick={() => navigate(`/product/${item.product.id}`)}
                      className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 cursor-pointer leading-snug"
                    >
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1 transition-colors shrink-0"
                      title="Xóa sản phẩm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Phân loại: <span className="font-medium text-gray-700">{item.variant.name}</span>
                  </p>

                  {/* Fast delivery badge */}
                  {item.product.fastDelivery && (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 mt-1">
                      <Rocket className="w-3.5 h-3.5 text-[#3B6EF5] fill-[#3B6EF5]" />
                      <span>{item.product.deliveryDateText}</span>
                    </div>
                  )}

                  {/* Price & Quantity Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-2 border-t border-gray-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm sm:text-base font-extrabold text-[#E02020]">
                        {formatVND(item.variant.price || item.product.currentPrice)}
                      </span>
                      {item.product.originalPrice > item.product.currentPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatVND(item.product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Quantity Button Group */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-gray-800 min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 cols: Order Summary */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-5 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            Thông tin đơn hàng
          </h2>

          {/* Coupon Code Input */}
          <form onSubmit={handleApplyCoupon} className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-orange-500" />
              <span>Mã giảm giá HShopp Voucher</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã (VD: CHAOHSHOPP50K)"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-500 uppercase font-mono"
              />
              <button
                type="submit"
                className="bg-gray-800 hover:bg-black text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors"
              >
                Áp dụng
              </button>
            </div>
            {appliedDiscount > 0 && (
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <Check className="w-3 h-3" /> Đã áp dụng mã giảm giá thành công!
              </p>
            )}
          </form>

          {/* Fee breakdown */}
          <div className="space-y-2 text-xs pt-2 border-t border-gray-100">
            <div className="flex justify-between text-gray-600">
              <span>Tạm tính ({cartTotals.itemCount} sản phẩm):</span>
              <span className="font-semibold text-gray-900">{formatVND(cartTotals.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Phí vận chuyển:</span>
              <span className="font-semibold text-gray-900">{formatVND(cartTotals.shippingFee)}</span>
            </div>
            {cartTotals.discountAmount > 0 && (
              <div className="flex justify-between text-[#F0471C] font-semibold">
                <span>Mã giảm giá:</span>
                <span>-{formatVND(cartTotals.discountAmount)}</span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="pt-3 border-t border-gray-200 flex items-baseline justify-between">
            <span className="text-sm font-bold text-gray-800">Tổng thanh toán:</span>
            <span className="text-2xl font-black text-[#F0471C]">
              {formatVND(cartTotals.totalAmount)}
            </span>
          </div>

          {/* Order Checkout Button */}
          <button
            disabled={!someSelected}
            onClick={handleProceedToCheckout}
            className="w-full bg-[#F0471C] hover:bg-[#d63a12] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-sm cursor-pointer"
          >
            <span>ĐẶT HÀNG NGAY</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 flex items-center gap-2 text-[11px] text-gray-500 justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Thanh toán an toàn &amp; Bảo vệ người tiêu dùng</span>
          </div>
        </div>

      </div>
    </div>
  );
};
