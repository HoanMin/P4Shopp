import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Package, 
  Truck, 
  CreditCard, 
  FileText, 
  Lock, 
  Wallet, 
  Banknote, 
  MapPin,
  Check,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatVND } from '../../utils/pricing';
import { TermsModal } from './TermsModal';
import { ShippingAddress, PaymentMethodType } from '../../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    activeCheckoutItems, 
    checkoutTotals, 
    shippingAddress, 
    updateShippingAddress,
    paymentMethod,
    setPaymentMethod,
    confirmOrderWithTerms,
    updateQuantity
  } = useCart();

  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState<ShippingAddress>(shippingAddress);

  // If no items in checkout, redirect or display friendly fallback
  const firstItem = activeCheckoutItems[0];
  const isProductVerified = activeCheckoutItems.every(i => i.product.verified);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    updateShippingAddress(tempAddress);
    setIsEditingAddress(false);
  };

  const handleTermsConfirm = (marketingAccepted: boolean) => {
    setIsTermsModalOpen(false);
    // Complete the order
    confirmOrderWithTerms(marketingAccepted);
    navigate('/order-complete');
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-16 font-sans">
      
      {/* 1. Header with Back Arrow, Title, and 4-Step Progress (Image 1) */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-2xs">
        <div className="max-w-[1100px] mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Left: Back Arrow + P4Shop Logo + Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 -ml-1.5 text-gray-700 hover:text-black rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Quay lại"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 cursor-pointer pr-2.5 border-r border-gray-200"
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
            </div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
              Xác nhận đơn hàng
            </h1>
          </div>

          {/* Center/Right: 4-Step Progress Indicator */}
          <div className="hidden sm:flex items-center text-xs">
            {/* Step 1: Giỏ hàng */}
            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="w-5 h-5 rounded-full border border-gray-300 text-gray-500 font-bold flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Giỏ hàng</span>
            </div>

            <div className="w-8 sm:w-12 h-px bg-gray-200 mx-2" />

            {/* Step 2: Địa chỉ giao hàng */}
            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="w-5 h-5 rounded-full border border-gray-300 text-gray-500 font-bold flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Địa chỉ giao hàng</span>
            </div>

            <div className="w-8 sm:w-12 h-px bg-gray-200 mx-2" />

            {/* Step 3: Thanh toán (ACTIVE STEP - ORANGE CIRCLE & TEXT) */}
            <div className="flex items-center gap-1.5 text-[#F0471C] font-bold">
              <span className="w-5 h-5 rounded-full bg-[#F0471C] text-white font-bold flex items-center justify-center text-[10px] shadow-2xs">
                3
              </span>
              <span className="text-[#F0471C]">Thanh toán</span>
            </div>

            <div className="w-8 sm:w-12 h-px bg-gray-200 mx-2" />

            {/* Step 4: Hoàn tất */}
            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="w-5 h-5 rounded-full border border-gray-300 text-gray-500 font-bold flex items-center justify-center text-[10px]">
                4
              </span>
              <span>Hoàn tất</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content: 2 Columns (65% / 35%) */}
      <div className="max-w-[1100px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= LEFT COLUMN (~65% width) ================= */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* CARD 1: Sản phẩm */}
            <div className="bg-white rounded-xl p-5 shadow-xs border border-gray-200/80">
              <div className="flex items-center gap-2 mb-4 text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">
                <Package className="w-5 h-5 text-gray-700" />
                <span>Sản phẩm</span>
              </div>

              {activeCheckoutItems.length > 0 ? (
                <div className="space-y-4">
                  {activeCheckoutItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      {/* Product Thumbnail */}
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 leading-snug truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.variant.name}
                        </p>
                        <p className="text-sm font-bold text-gray-900 mt-1">
                          {formatVND(item.variant.price || item.product.currentPrice)}
                        </p>
                      </div>

                      {/* Quantity Dropdown */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-gray-500 hidden sm:inline">Số lượng:</span>
                        <div className="relative">
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                            className="bg-white border border-gray-300 text-xs font-semibold rounded-lg pl-3 pr-7 py-1.5 outline-none cursor-pointer hover:border-gray-400 appearance-none shadow-2xs"
                          >
                            {[1, 2, 3, 4, 5, 10].map(n => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">Chưa có sản phẩm nào được chọn.</p>
              )}
            </div>

            {/* CARD 2: Địa chỉ giao hàng */}
            <div className="bg-white rounded-xl p-5 shadow-xs border border-gray-200/80">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Truck className="w-5 h-5 text-gray-700" />
                  <span>Địa chỉ giao hàng</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-xs font-semibold text-[#3B6EF5] hover:text-blue-700 hover:underline cursor-pointer"
                >
                  {isEditingAddress ? 'Đóng' : 'Thay đổi'}
                </button>
              </div>

              {isEditingAddress ? (
                <form onSubmit={handleSaveAddress} className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Họ và tên người nhận</label>
                    <input
                      type="text"
                      value={tempAddress.fullName}
                      onChange={(e) => setTempAddress({ ...tempAddress, fullName: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Số điện thoại</label>
                    <input
                      type="tel"
                      value={tempAddress.phone}
                      onChange={(e) => setTempAddress({ ...tempAddress, phone: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Địa chỉ chi tiết (Số nhà, đường, phường, quận, TP)</label>
                    <input
                      type="text"
                      value={tempAddress.address}
                      onChange={(e) => setTempAddress({ ...tempAddress, address: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(false)}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 font-medium"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#3B6EF5] text-white rounded-lg font-bold hover:bg-blue-600"
                    >
                      Lưu địa chỉ
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-xs text-gray-600 space-y-1">
                  <p className="font-bold text-gray-900 text-sm">{shippingAddress.fullName}</p>
                  <p className="text-gray-700 font-medium">{shippingAddress.phone}</p>
                  <p className="text-gray-500">{shippingAddress.address}</p>
                </div>
              )}
            </div>

            {/* CARD 3: Phương thức thanh toán */}
            <div className="bg-white rounded-xl p-5 shadow-xs border border-gray-200/80">
              <div className="flex items-center gap-2 mb-4 text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">
                <CreditCard className="w-5 h-5 text-gray-700" />
                <span>Phương thức thanh toán</span>
              </div>

              {/* 3 Payment Options */}
              <div className="space-y-3">
                
                {/* 1. Ví điện tử */}
                <label 
                  onClick={() => setPaymentMethod('e-wallet')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'e-wallet'
                      ? 'border-[#F0471C] bg-orange-50/20 ring-1 ring-[#F0471C]'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'e-wallet'}
                      onChange={() => setPaymentMethod('e-wallet')}
                      className="w-4 h-4 text-[#F0471C] accent-[#F0471C] cursor-pointer"
                    />
                    <Wallet className="w-5 h-5 text-gray-700" />
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-gray-900">Ví điện tử</p>
                      <p className="text-[11px] text-gray-500">Thanh toán nhanh chóng, an toàn qua ví điện tử</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-black rounded border border-blue-200">
                      ZaloPay
                    </span>
                    <span className="px-2 py-0.5 bg-pink-50 text-pink-700 text-[10px] font-black rounded border border-pink-200">
                      MoMo
                    </span>
                  </div>
                </label>

                {/* 2. Thẻ ngân hàng */}
                <label 
                  onClick={() => setPaymentMethod('bank-card')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'bank-card'
                      ? 'border-[#F0471C] bg-orange-50/20 ring-1 ring-[#F0471C]'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'bank-card'}
                      onChange={() => setPaymentMethod('bank-card')}
                      className="w-4 h-4 text-[#F0471C] accent-[#F0471C] cursor-pointer"
                    />
                    <CreditCard className="w-5 h-5 text-gray-700" />
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-gray-900">Thẻ ngân hàng</p>
                      <p className="text-[11px] text-gray-500">Thanh toán bằng thẻ ATM, Visa, Mastercard</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-gray-50 text-blue-900 text-[10px] font-black rounded border border-gray-200">
                      VISA
                    </span>
                    <span className="px-2 py-0.5 bg-gray-50 text-red-600 text-[10px] font-black rounded border border-gray-200">
                      MC
                    </span>
                    <span className="px-2 py-0.5 bg-gray-50 text-emerald-700 text-[10px] font-black rounded border border-gray-200">
                      JCB
                    </span>
                  </div>
                </label>

                {/* 3. Thanh toán khi nhận hàng (COD) */}
                <label 
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#F0471C] bg-orange-50/20 ring-1 ring-[#F0471C]'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 text-[#F0471C] accent-[#F0471C] cursor-pointer"
                    />
                    <Banknote className="w-5 h-5 text-gray-700" />
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-gray-900">Thanh toán khi nhận hàng (COD)</p>
                      <p className="text-[11px] text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng</p>
                    </div>
                  </div>

                  <span className="text-gray-400 p-1">
                    <Banknote className="w-5 h-5" />
                  </span>
                </label>

              </div>
            </div>

            {/* Notice Box (Peach/Light Orange with document icon) */}
            <div className="bg-[#FFF8F5] border border-orange-200/80 rounded-xl p-4 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <FileText className="w-4 h-4 text-[#F0471C] shrink-0" />
                <span>
                  Bằng việc tiếp tục, bạn đồng ý với{' '}
                  <button 
                    onClick={() => setIsTermsModalOpen(true)}
                    className="text-[#3B6EF5] font-semibold hover:underline cursor-pointer"
                  >
                    Điều khoản sử dụng
                  </button>
                </span>
              </div>
              <div className="pl-6">
                <button 
                  onClick={() => setIsTermsModalOpen(true)}
                  className="text-[#3B6EF5] font-semibold hover:underline cursor-pointer text-[11px] flex items-center gap-0.5"
                >
                  <span>&rsaquo; Xem chi tiết đơn hàng và chính sách thanh toán</span>
                </button>
              </div>
            </div>

            {/* Big CTA Button: Lock Icon + "XÁC NHẬN VÀ THANH TOÁN" */}
            <button
              type="button"
              onClick={() => setIsTermsModalOpen(true)}
              className="w-full bg-[#F0471C] hover:bg-[#d83c13] text-white font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer text-sm sm:text-base tracking-wide uppercase"
            >
              <Lock className="w-5 h-5" />
              <span>XÁC NHẬN VÀ THANH TOÁN</span>
            </button>

          </div>

          {/* ================= RIGHT COLUMN (~35% width) ================= */}
          <div className="lg:col-span-4 bg-white rounded-xl p-5 shadow-xs border border-gray-200/80 sticky top-24 space-y-4">
            
            <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">
              Thông tin đơn hàng
            </h2>

            {/* Thumbnail + Title + Variant + x1 + Price */}
            {firstItem && (
              <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                  <img 
                    src={firstItem.product.image} 
                    alt={firstItem.product.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {firstItem.product.name}
                  </h4>
                  <p className="text-gray-400 mt-0.5">
                    {firstItem.variant.name.split('/')[0]}
                  </p>
                  <div className="flex items-center justify-between mt-1 text-gray-500">
                    <span>x{firstItem.quantity}</span>
                    <span className="font-bold text-gray-900">
                      {formatVND(firstItem.variant.price || firstItem.product.currentPrice)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Fee Calculations List (Image 1 numbers) */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span className="font-semibold text-gray-900">
                  {formatVND(checkoutTotals.subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span className="font-semibold text-gray-900">
                  {formatVND(checkoutTotals.shippingFee)}
                </span>
              </div>

              {checkoutTotals.discountAmount > 0 && (
                <div className="flex justify-between text-[#F0471C] font-semibold">
                  <span>Mã giảm giá</span>
                  <span>-{formatVND(checkoutTotals.discountAmount)}</span>
                </div>
              )}
            </div>

            {/* Divider Line */}
            <div className="border-t border-gray-200 pt-3 flex items-baseline justify-between">
              <span className="text-sm font-bold text-gray-900">Tổng thanh toán</span>
              <span className="text-2xl font-black text-[#F0471C]">
                {formatVND(checkoutTotals.totalAmount)}
              </span>
            </div>

            {/* Small Trust Note */}
            <div className="bg-gray-50 rounded-lg p-2.5 text-[11px] text-gray-500 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Bảo vệ thanh toán tạm giữ tiền bởi sàn P4Shop — Đại học Thương Mại.</span>
            </div>

          </div>

        </div>
      </div>

      {/* Terms & Conditions Modal Dialog (Image 1 modal) */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        onConfirm={handleTermsConfirm}
        isProductVerified={isProductVerified}
      />

    </div>
  );
};
