import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  FileText,
  ShieldCheck,
  Building,
  CheckCircle2
} from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [useNativeIframe, setUseNativeIframe] = useState(false);

  if (!isOpen) return null;

  const totalPages = 4;
  const pdfUrl = '/terms/HShopp-Dieu-khoan.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'HShopp-Dieu-khoan.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-viewer-title"
    >
      <div className="bg-[#525659] w-full max-w-4xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-600">
        
        {/* Top Control Toolbar */}
        <div className="bg-[#323639] text-gray-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-700 select-none">
          {/* File Name */}
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-orange-400 shrink-0" />
            <span id="pdf-viewer-title" className="text-xs font-semibold text-white truncate max-w-[200px] sm:max-w-xs">
              P4Shop-Dieu-khoan.pdf (v2.4)
            </span>
          </div>

          {/* Page & Zoom Navigation */}
          <div className="flex items-center gap-2 text-xs">
            {/* View Mode Toggle */}
            <button
              onClick={() => setUseNativeIframe(!useNativeIframe)}
              className="text-[11px] bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition-colors hidden sm:inline"
            >
              {useNativeIframe ? 'Xem chế độ định dạng' : 'Xem PDF gốc'}
            </button>

            {!useNativeIframe && (
              <>
                {/* Page Prev/Next */}
                <div className="flex items-center bg-gray-700 rounded px-1.5 py-0.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="p-1 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Trang trước"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 text-gray-300 font-mono text-[11px]">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="p-1 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Trang tiếp"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center bg-gray-700 rounded px-1.5 py-0.5">
                  <button
                    disabled={zoomLevel <= 80}
                    onClick={() => setZoomLevel(z => Math.max(80, z - 10))}
                    className="p-1 hover:text-white disabled:opacity-30"
                    title="Thu nhỏ"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1.5 text-gray-300 font-mono text-[11px] min-w-[36px] text-center">
                    {zoomLevel}%
                  </span>
                  <button
                    disabled={zoomLevel >= 150}
                    onClick={() => setZoomLevel(z => Math.min(150, z + 10))}
                    className="p-1 hover:text-white disabled:opacity-30"
                    title="Phóng to"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Action buttons (Download, New tab, Close) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleDownload}
              className="p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors flex items-center gap-1 text-xs"
              title="Tải xuống tài liệu PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Tải về</span>
            </button>

            <button
              onClick={handleOpenNewTab}
              className="p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
              title="Mở trong tab mới"
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-red-600 rounded transition-colors ml-1"
              title="Đóng trình xem"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Reader Canvas Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center bg-[#525659]">
          {useNativeIframe ? (
            <iframe
              src={pdfUrl}
              className="w-full h-full bg-white rounded shadow-xl border-none"
              title="HShopp PDF Reader Native"
            />
          ) : (
            <div 
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className="w-full max-w-[650px] bg-white rounded-sm shadow-2xl p-8 sm:p-12 text-gray-900 font-sans transition-transform duration-150 min-h-[820px] flex flex-col justify-between"
            >
              {/* PDF Document Header */}
              <div>
                <div className="border-b-2 border-blue-900 pb-4 mb-6 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-blue-900 bg-white p-0.5 shrink-0">
                        <img 
                          src="/assets/aistudio/image_fd917d90.png" 
                          alt="Logo TMU" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-xl font-black text-[#FF4D1F]">P4</span>
                        <span className="text-xl font-extrabold text-[#0B2A5B]">Shop</span>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded">
                        ĐẠI HỌC THƯƠNG MẠI
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM — Độc lập - Tự do - Hạnh phúc
                    </p>
                  </div>
                  <div className="text-right text-[10px] text-gray-400 font-mono">
                    <p>Số: 89/2026/QĐ-P4SHOP-TMU</p>
                    <p>Ngày hiệu lực: 01/01/2026</p>
                    <p>Phiên bản: v2.4 (Chính thức)</p>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h1 className="text-base sm:text-lg font-black text-gray-900 uppercase tracking-tight">
                    ĐIỀU KHOẢN VÀ ĐIỀU KIỆN GIAO DỊCH CHUNG
                  </h1>
                  <h2 className="text-xs font-semibold text-gray-600 mt-0.5">
                    SÀN THƯƠNG MẠI ĐIỆN TỬ P4SHOP — TRƯỜNG ĐẠI HỌC THƯƠNG MẠI
                  </h2>
                </div>

                {/* Page Content Switcher */}
                {currentPage === 1 && (
                  <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
                    <section>
                      <h3 className="font-bold text-gray-900 text-xs uppercase mb-1">
                        MỤC 1. PHẠM VI ÁP DỤNG &amp; ĐỊNH NGHĨA
                      </h3>
                      <p className="text-justify mb-1.5">
                        1.1. Điều khoản và Điều kiện này quy định các quyền, nghĩa vụ và trách nhiệm giữa Công ty Cổ phần Thương mại Điện tử P4Shop (“Sàn P4Shop”), Nhà Bán Hàng (“Người Bán”) và Khách Hàng (“Người Mua”) đối với toàn bộ giao dịch đặt hàng, vận chuyển và thanh toán được thực hiện trên nền tảng P4Shop.
                      </p>
                      <p className="text-justify">
                        1.2. Bằng việc nhấn “Đồng ý” hoặc hoàn tất thanh toán trên hệ thống, Khách hàng xác nhận đã đọc, hiểu rõ và đồng ý bị ràng buộc bởi các quy định này.
                      </p>
                    </section>

                    <section className="pt-2">
                      <h3 className="font-bold text-gray-900 text-xs uppercase mb-1">
                        MỤC 2. ĐẶT HÀNG VÀ THANH TOÁN AN TOÀN
                      </h3>
                      <p className="text-justify mb-1.5">
                        2.1. Đơn hàng chỉ được xác nhận hợp lệ sau khi hệ thống P4Shop gửi thông báo xác nhận thành công (qua email hoặc thông báo ứng dụng).
                      </p>
                      <p className="text-justify mb-1.5">
                        2.2. Các phương thức thanh toán được sàn hỗ trợ gồm có: Ví điện tử (ZaloPay, MoMo), Thẻ ngân hàng nội địa/quốc tế (Visa, Mastercard, JCB), và Thanh toán khi nhận hàng (COD).
                      </p>
                      <p className="text-justify">
                        2.3. Sàn P4Shop áp dụng cơ chế bảo vệ giao dịch (Escrow - tạm giữ thanh toán), số tiền người mua thanh toán chỉ được chuyển cho nhà bán khi đơn hàng được giao thành công và không phát sinh khiếu nại trong thời hạn quy định.
                      </p>
                    </section>
                  </div>
                )}

                {currentPage === 2 && (
                  <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
                    <section>
                      <h3 className="font-bold text-gray-900 text-xs uppercase mb-1">
                        MỤC 3. VẬN CHUYỂN &amp; GIAO HÀNG THẦN TỐC (P4SHOP ROCKET)
                      </h3>
                      <p className="text-justify mb-1.5">
                        3.1. Dịch vụ Giao hàng nhanh P4Shop Rocket cam kết giao hàng trong 24 giờ đối với các đơn hàng đủ điều kiện đặt trước khung giờ cắt ca (24h đêm).
                      </p>
                      <p className="text-justify">
                        3.2. Người mua có quyền đồng kiểm ngoại quan (tình trạng hộp, niêm phong) trước khi ký nhận bưu gửi từ nhân viên giao hàng.
                      </p>
                    </section>

                    <section className="pt-2">
                      <h3 className="font-bold text-gray-900 text-xs uppercase mb-1 text-red-700">
                        MỤC 4. CHÍNH SÁCH HOÀN TIỀN VÀ ĐỔI TRẢ (ĐIỀU KHOẢN CỐT LÕI 1)
                      </h3>
                      <div className="bg-red-50/50 p-3 rounded border border-red-100 text-justify space-y-1.5">
                        <p>
                          <strong>4.1. Điều kiện hoàn tiền:</strong> Điều kiện, tỷ lệ hoàn tiền, các trường hợp không được hoàn tiền và thời hạn xử lý phải được thông báo rõ ràng trước khi thanh toán.
                        </p>
                        <p>
                          <strong>4.2. Thời hạn xử lý:</strong> Việc hoàn tiền sẽ được thực hiện theo đúng chính sách đã công bố của nhà bán và tuân thủ quy định pháp luật hiện hành trong vòng tối đa 07 ngày làm việc.
                        </p>
                        <p>
                          <strong>4.3. Miễn phí đổi trả:</strong> Đối với sản phẩm lỗi do nhà sản xuất hoặc giao sai mẫu mã, P4Shop hỗ trợ 100% chi phí vận chuyển đổi trả chiều ngược lại.
                        </p>
                      </div>
                    </section>

                    <section className="pt-2">
                      <h3 className="font-bold text-gray-900 text-xs uppercase mb-1 text-red-700">
                        MỤC 5. GIA HẠN TỰ ĐỘNG ĐỊNH KỲ (ĐIỀU KHOẢN CỐT LÕI 2)
                      </h3>
                      <div className="bg-amber-50/50 p-3 rounded border border-amber-100 text-justify space-y-1.5">
                        <p>
                          Áp dụng cho các dịch vụ có tính chất đăng ký (subscription/gói hội viên Wow). Nhà bán phải công khai rõ giá, chu kỳ thanh toán và hướng dẫn hủy. Đồng thời, phải gửi thông báo trước khi gia hạn ít nhất 03 ngày và cho phép người dùng dễ dàng hủy bỏ trên giao diện tài khoản bất cứ lúc nào.
                        </p>
                      </div>
                    </section>
                  </div>
                )}

                {currentPage === 3 && (
                  <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
                    <section>
                      <h3 className="font-bold text-gray-900 text-xs uppercase mb-1 text-red-700">
                        MỤC 6. DỮ LIỆU CÁ NHÂN VÀ TIẾP THỊ QUẢNG CÁO (ĐIỀU KHOẢN CỐT LÕI 3)
                      </h3>
                      <div className="bg-blue-50/50 p-3 rounded border border-blue-100 text-justify space-y-1.5">
                        <p>
                          6.1. Dữ liệu cá nhân của bạn chỉ được sử dụng cho mục đích xử lý đơn hàng, cung cấp dịch vụ và các mục đích được công bố minh bạch theo Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.
                        </p>
                        <p>
                          6.2. Việc sử dụng dữ liệu cho mục đích tiếp thị, quảng cáo là một lựa chọn riêng biệt, không bắt buộc và cần có sự đồng ý rõ ràng của bạn qua hộp kiểm [TÙY CHỌN]. Bạn có quyền rút lại sự đồng ý này bất cứ lúc nào.
                        </p>
                      </div>
                    </section>

                    <section className="pt-2">
                      <h3 className="font-bold text-gray-900 text-xs uppercase mb-1 text-red-700">
                        MỤC 7. GIẢI QUYẾT TRANH CHẤP VÀ KHIẾU NẠI (ĐIỀU KHOẢN CỐT LÕI 4)
                      </h3>
                      <div className="bg-emerald-50/50 p-3 rounded border border-emerald-100 text-justify space-y-1.5">
                        <p>
                          Nhà bán cung cấp kênh hỗ trợ khách hàng và quy trình khiếu nại rõ ràng, minh bạch, đảm bảo quyền lợi của người tiêu dùng và không làm ảnh hưởng đến các quyền pháp lý hiện hành của bạn theo Luật Bảo vệ quyền lợi người tiêu dùng.
                        </p>
                        <p>
                          Ban Quản Lý Sàn P4Shop đóng vai trò trung gian hòa giải và đưa ra phán quyết đền bù nếu nhà bán hàng không tuân thủ cam kết đã niêm yết trong vòng 48 giờ làm việc.
                        </p>
                      </div>
                    </section>
                  </div>
                )}

                {currentPage === 4 && (
                  <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
                    <section>
                      <h3 className="font-bold text-gray-900 text-xs uppercase mb-1">
                        MỤC 8. THÔNG TIN LIÊN HỆ &amp; BAN KIỂM DUYỆT SÀN
                      </h3>
                      <p className="mb-2">
                        Mọi thắc mắc hoặc yêu cầu hỗ trợ liên quan đến điều khoản giao dịch, xin vui lòng liên hệ:
                      </p>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 space-y-1">
                        <p><strong>CÔNG TY CỔ PHẦN THƯƠNG MẠI ĐIỆN TỬ P4SHOP — TRƯỜNG ĐẠI HỌC THƯƠNG MẠI</strong></p>
                        <p>• Trụ sở: Trường Đại học Thương Mại, Số 79 Đường Hồ Tùng Mậu, Phường Mai Dịch, Quận Cầu Giấy, TP. Hà Nội</p>
                        <p>• Tổng đài hỗ trợ &amp; CSKH: 1900 6868</p>
                        <p>• Email tiếp nhận khiếu nại: hotro@p4shop.tmu.edu.vn</p>
                        <p>• Đơn vị phát triển: Lê Nguyễn Hà Anh — Sinh viên / Kỹ sư ĐH Thương Mại</p>
                      </div>
                    </section>

                    {/* Legal Stamps & Verification Signatures */}
                    <div className="pt-8 flex items-center justify-between border-t border-gray-200 mt-6">
                      <div className="text-center">
                        <p className="font-bold text-gray-800 text-[11px]">BAN KIỂM DUYỆT SÀN</p>
                        <div className="my-2 inline-flex items-center justify-center w-18 h-18 rounded-full border-2 border-dashed border-emerald-600 text-emerald-700 font-black text-[9px] uppercase leading-tight rotate-[-10deg] bg-emerald-50">
                          P4SHOP<br/>ĐẠI HỌC THƯƠNG MẠI<br/>VERIFIED
                        </div>
                        <p className="text-[10px] text-gray-500">ĐH Thương Mại</p>
                      </div>

                      <div className="text-center">
                        <p className="font-bold text-gray-800 text-[11px]">NGƯỜI PHÁT TRIỂN HỆ THỐNG</p>
                        <div className="my-2 inline-flex items-center justify-center w-18 h-18 rounded-full border-2 border-red-600 text-red-600 font-bold text-[8px] uppercase leading-tight rotate-[6deg] bg-red-50">
                          P4SHOP TMU<br/>LÊ NGUYỄN HÀ ANH<br/>★ ★ ★
                        </div>
                        <p className="text-[10px] font-bold text-gray-900">Lê Nguyễn Hà Anh</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* PDF Document Footer */}
              <div className="border-t border-gray-200 pt-3 text-[10px] text-gray-400 flex items-center justify-between mt-6">
                <span>Tài liệu pháp lý P4Shop Marketplace • Đại học Thương Mại | Mã: P4S-TOS-2026</span>
                <span className="font-mono">Trang {currentPage} / {totalPages}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="bg-[#323639] text-gray-300 px-4 py-2 border-t border-gray-700 flex items-center justify-between text-xs">
          <span className="text-[11px] text-gray-400">
            Nhấn Esc hoặc nút đóng để quay lại hộp thoại điều khoản xác nhận.
          </span>
          <button
            onClick={onClose}
            className="bg-[#F0471C] hover:bg-[#d83c13] text-white px-4 py-1.5 rounded font-bold text-xs transition-colors"
          >
            Quay lại &amp; Tiếp tục
          </button>
        </div>

      </div>
    </div>
  );
};
