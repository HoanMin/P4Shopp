import React, { useState, useEffect } from 'react';
import { X, FileText, Clock, CheckCircle2 } from 'lucide-react';
import { PdfViewerModal } from './PdfViewerModal';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (marketingAccepted: boolean) => void;
  isProductVerified?: boolean;
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isProductVerified = false,
}) => {
  const [coreTermsChecked, setCoreTermsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setCoreTermsChecked(false);
      setMarketingChecked(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isPdfOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPdfOpen, onClose]);

  if (!isOpen) return null;

  const handleAgree = () => {
    if (coreTermsChecked) {
      onConfirm(marketingChecked);
    }
  };

  return (
    <>
      {/* Dark overlay backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-modal-heading"
      >
        {/* Modal Dialog Card (Matching Image 1 width ~565px) */}
        <div 
          className="bg-white w-full max-w-[565px] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 border border-gray-100 font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
            <h2 
              id="terms-modal-heading" 
              className="text-base sm:text-lg font-bold text-[#0B2A5B] tracking-tight uppercase"
            >
              ĐIỀU KHOẢN VÀ ĐIỀU KIỆN
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 p-1 rounded-full transition-colors cursor-pointer"
              aria-label="Đóng hộp thoại"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="px-6 py-5 max-h-[68vh] overflow-y-auto space-y-5 text-xs text-gray-700 select-text leading-relaxed">
            
            {/* Clause 1 */}
            <div>
              <h3 className="font-bold text-[#0B2A5B] text-sm mb-1">
                1. Hoàn tiền và đổi trả
              </h3>
              <p className="text-gray-600 leading-normal">
                Điều kiện, tỷ lệ hoàn tiền, các trường hợp không được hoàn tiền và thời hạn xử lý phải được thông báo rõ ràng trước khi thanh toán. Việc hoàn tiền sẽ được thực hiện theo chính sách đã công bố của nhà bán và tuân thủ quy định pháp luật hiện hành.
              </p>
            </div>

            {/* Clause 2 */}
            <div>
              <h3 className="font-bold text-[#0B2A5B] text-sm mb-1">
                2. Gia hạn tự động
              </h3>
              <p className="text-gray-600 leading-normal">
                Áp dụng cho các dịch vụ có tính chất đăng ký (subscription). Nhà bán phải công khai rõ giá, chu kỳ thanh toán và hướng dẫn hủy. Đồng thời, phải gửi thông báo trước khi gia hạn và cho phép người dùng dễ dàng hủy bỏ.
              </p>
            </div>

            {/* Clause 3 */}
            <div>
              <h3 className="font-bold text-[#0B2A5B] text-sm mb-1">
                3. Dữ liệu cá nhân và quảng cáo
              </h3>
              <p className="text-gray-600 leading-normal">
                Dữ liệu cá nhân của bạn chỉ được sử dụng cho mục đích xử lý đơn hàng, cung cấp dịch vụ và các mục đích được công bố. Việc sử dụng dữ liệu cho mục đích tiếp thị, quảng cáo là một lựa chọn riêng, không bắt buộc và cần có sự đồng ý của bạn.
              </p>
            </div>

            {/* Clause 4 */}
            <div>
              <h3 className="font-bold text-[#0B2A5B] text-sm mb-1">
                4. Giải quyết tranh chấp
              </h3>
              <p className="text-gray-600 leading-normal">
                Nhà bán cung cấp kênh hỗ trợ khách hàng và quy trình khiếu nại rõ ràng, minh bạch, đảm bảo quyền lợi của người tiêu dùng và không làm ảnh hưởng đến các quyền pháp lý hiện hành của bạn.
              </p>
            </div>

            {/* View Full PDF Link (Blue with Document Icon) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsPdfOpen(true)}
                className="text-[#3B6EF5] hover:text-blue-700 font-medium inline-flex items-center gap-1.5 hover:underline cursor-pointer transition-colors"
              >
                <FileText className="w-4 h-4 text-[#3B6EF5] shrink-0" />
                <span>Xem toàn bộ Điều khoản do nhà bán cung cấp (PDF) &rsaquo;</span>
              </button>
            </div>

            {/* Platform Verification Status */}
            <div className="pt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gray-700 font-medium">Trạng thái kiểm duyệt của sàn:</span>
                {isProductVerified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đã xác minh</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-[#E2E8F0] px-2.5 py-0.5 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                    <span>Đang chờ xác minh</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Chỉ hiển thị "Đã xác minh" khi sàn đã kiểm tra và xác nhận tài liệu.
              </p>
            </div>

            {/* Checkboxes Section */}
            <div className="pt-3 border-t border-gray-100 space-y-2.5">
              {/* Checkbox 1: Bắt buộc */}
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={coreTermsChecked}
                  onChange={(e) => setCoreTermsChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#F0471C] accent-[#F0471C] focus:ring-orange-400 cursor-pointer"
                />
                <span className="text-xs text-gray-800 leading-snug">
                  <strong className="text-[#0B2A5B] font-extrabold mr-1">[BẮT BUỘC]</strong>
                  Tôi đã đọc và đồng ý với các điều khoản giao dịch cốt lõi.
                </span>
              </label>

              {/* Checkbox 2: Tùy chọn */}
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={marketingChecked}
                  onChange={(e) => setMarketingChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-blue-600 accent-[#3B6EF5] focus:ring-blue-400 cursor-pointer"
                />
                <span className="text-xs text-gray-600 leading-snug">
                  <strong className="text-gray-700 font-bold mr-1">[TÙY CHỌN]</strong>
                  Tôi đồng ý nhận thông tin quảng cáo và cho phép sử dụng dữ liệu cho mục đích tiếp thị.
                </span>
              </label>
            </div>

          </div>

          {/* Footer Buttons */}
          <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Hủy
            </button>

            <button
              type="button"
              disabled={!coreTermsChecked}
              onClick={handleAgree}
              className="px-8 py-2 bg-[#F0471C] hover:bg-[#d63a12] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer"
            >
              Đồng ý
            </button>
          </div>
        </div>
      </div>

      {/* Embedded PDF Viewer Modal if user clicks PDF link */}
      <PdfViewerModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
      />
    </>
  );
};
