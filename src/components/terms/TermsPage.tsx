import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  Building,
  Scale
} from 'lucide-react';
import { PdfViewerModal } from '../checkout/PdfViewerModal';

export const TermsPage: React.FC = () => {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8 font-sans">
      {/* Title & Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-10 h-10 rounded-full border border-blue-900 bg-white p-0.5 overflow-hidden shrink-0 shadow-2xs">
                <img 
                  src="/assets/aistudio/image_fd917d90.png" 
                  alt="Đại học Thương Mại" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-[#FF4D1F]">P4</span>
                <span className="text-2xl font-extrabold text-[#0B2A5B]">Shop</span>
              </div>
              <span className="bg-blue-50 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                ĐẠI HỌC THƯƠNG MẠI
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Điều Khoản và Điều Kiện Giao Dịch Sàn TMĐT P4Shop
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Phiên bản v2.4 — Ban hành bởi Trường Đại học Thương Mại • Người phát triển: <strong>Lê Nguyễn Hà Anh</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="bg-[#3B6EF5] hover:bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Xem trực tuyến (PDF)</span>
            </button>

            <a
              href="/terms/P4Shop-Dieu-khoan.pdf"
              download="P4Shop-Dieu-khoan.pdf"
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold px-3 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Tải file</span>
            </a>
          </div>
        </div>

        {/* 4 Core Pillars Notice */}
        <div className="mt-6 bg-[#FFF8F5] border border-orange-200 rounded-xl p-4">
          <h2 className="text-xs font-bold text-[#F0471C] uppercase tracking-wide flex items-center gap-1.5 mb-2">
            <Scale className="w-4 h-4 text-[#F0471C]" />
            <span>4 Điều khoản giao dịch cốt lõi (Bắt buộc xác nhận trước khi thanh toán)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-700">
            <div className="bg-white p-3 rounded-lg border border-orange-100 shadow-2xs">
              <strong>1. Hoàn tiền và đổi trả:</strong> Điều kiện, tỷ lệ hoàn tiền và thời hạn xử lý minh bạch (tối đa 7 ngày làm việc).
            </div>
            <div className="bg-white p-3 rounded-lg border border-orange-100 shadow-2xs">
              <strong>2. Gia hạn tự động:</strong> Thông báo trước 3 ngày, hủy bất cứ lúc nào đối với các gói dịch vụ định kỳ.
            </div>
            <div className="bg-white p-3 rounded-lg border border-orange-100 shadow-2xs">
              <strong>3. Dữ liệu cá nhân:</strong> Chỉ dùng cho đơn hàng; tiếp thị quảng cáo là tùy chọn riêng biệt có thể từ chối.
            </div>
            <div className="bg-white p-3 rounded-lg border border-orange-100 shadow-2xs">
              <strong>4. Giải quyết tranh chấp:</strong> Cơ chế hòa giải trung gian sàn bảo vệ quyền lợi người tiêu dùng 24/7.
            </div>
          </div>
        </div>
      </div>

      {/* Full Document Sections */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6 text-xs text-gray-700 leading-relaxed">
        
        <section>
          <h2 className="text-sm font-bold text-gray-900 uppercase border-b border-gray-100 pb-2 mb-2">
            Mục 1. Phạm vi áp dụng và Giải thích từ ngữ
          </h2>
          <p className="mb-2">
            1.1. Bản Điều khoản và Điều kiện này (“Điều Khoản”) điều chỉnh mọi hoạt động truy cập, tìm kiếm, đặt hàng, thanh toán và sử dụng dịch vụ trên website và ứng dụng thương mại điện tử P4Shop.
          </p>
          <p>
            1.2. “Người Bán” là các cá nhân, tổ chức đã hoàn thành thủ tục đăng ký và cung cấp hồ sơ kiểm duyệt trên sàn P4Shop. “Người Mua” là cá nhân hoặc tổ chức đặt mua sản phẩm hợp pháp.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-900 uppercase border-b border-gray-100 pb-2 mb-2">
            Mục 2. Quy trình Giao kết Hợp đồng và Đặt hàng
          </h2>
          <p className="mb-2">
            2.1. Đơn đặt hàng của Người Mua cấu thành một đề nghị giao kết hợp đồng mua bán với Người Bán.
          </p>
          <p>
            2.2. Hợp đồng chỉ được xác lập khi P4Shop gửi xác nhận đơn hàng thành công qua tin nhắn hoặc email, đồng thời hiển thị trạng thái đã tiếp nhận trong mục quản lý đơn.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-900 uppercase border-b border-gray-100 pb-2 mb-2">
            Mục 3. Giao nhận và Vận chuyển Thần tốc P4Shop Rocket
          </h2>
          <p className="mb-2">
            3.1. Các mặt hàng có biểu tượng Rocket cam kết được giao tới địa chỉ nhận hàng trong vòng 24 giờ.
          </p>
          <p>
            3.2. Người Mua có quyền kiểm tra niêm phong, bao bì sản phẩm trước khi thanh toán hoặc ký biên bản nhận hàng.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-900 uppercase border-b border-gray-100 pb-2 mb-2">
            Mục 4. Chính sách Hoàn tiền và Đổi trả chi tiết
          </h2>
          <p className="mb-2">
            4.1. Điều kiện, tỷ lệ hoàn tiền, các trường hợp không được hoàn tiền và thời hạn xử lý phải được thông báo rõ ràng trước khi thanh toán. Việc hoàn tiền sẽ được thực hiện theo chính sách đã công bố của nhà bán và tuân thủ quy định pháp luật hiện hành.
          </p>
          <p>
            4.2. Thời hạn tiếp nhận yêu cầu đổi trả là 07 ngày kể từ khi nhận bưu phẩm thành công. Tiền hoàn sẽ được hoàn lại về phương thức thanh toán gốc của khách hàng trong 3-5 ngày làm việc.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-900 uppercase border-b border-gray-100 pb-2 mb-2">
            Mục 5. Dữ liệu cá nhân và Tiếp thị minh bạch
          </h2>
          <p className="mb-2">
            5.1. Dữ liệu cá nhân của bạn chỉ được sử dụng cho mục đích xử lý đơn hàng, cung cấp dịch vụ và các mục đích được công bố.
          </p>
          <p>
            5.2. Việc sử dụng dữ liệu cho mục đích tiếp thị, quảng cáo là một lựa chọn riêng, không bắt buộc và cần có sự đồng ý của bạn. Khách hàng có thể hủy nhận tin quảng cáo bất kỳ lúc nào.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-900 uppercase border-b border-gray-100 pb-2 mb-2">
            Mục 6. Cơ chế Giải quyết Khiếu nại và Tranh chấp
          </h2>
          <p>
            Nhà bán cung cấp kênh hỗ trợ khách hàng và quy trình khiếu nại rõ ràng, minh bạch, đảm bảo quyền lợi của người tiêu dùng và không làm ảnh hưởng đến các quyền pháp lý hiện hành của bạn. Sàn P4Shop — Trường Đại học Thương Mại duy trì đường dây nóng 1900 6868 và ban kiểm chuẩn do Lê Nguyễn Hà Anh và đội ngũ vận hành phụ trách.
          </p>
        </section>

      </div>

      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </div>
  );
};
