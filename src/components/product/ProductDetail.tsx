import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, 
  Rocket, 
  ShieldCheck, 
  RotateCcw, 
  ShoppingCart, 
  Zap, 
  CheckCircle2, 
  ChevronRight,
  Clock,
  Heart,
  Share2
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { formatVND } from '../../utils/pricing';
import { useCart } from '../../context/CartContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, buyNow } = useCart();

  const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    buyNow(product, selectedVariant, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-6 font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link to={`/search?cat=${product.category}`} className="hover:text-blue-600 uppercase">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-gray-800 truncate max-w-sm">{product.name}</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="aspect-square bg-gray-50 border border-gray-200 rounded-xl overflow-hidden relative group">
            <img 
              src={images[activeImageIndex] || product.image} 
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-[#E02020] text-white text-xs font-black px-2.5 py-1 rounded shadow-sm">
                -{product.discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnail list */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-lg border-2 overflow-hidden shrink-0 transition-all ${
                    idx === activeImageIndex ? 'border-[#3B6EF5] ring-2 ring-blue-100' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Sàn verification certificate badge */}
          <div className={`p-3.5 rounded-lg border text-xs flex items-center gap-3 ${
            product.verified 
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
              : 'bg-gray-50 border-gray-200 text-gray-700'
          }`}>
            {product.verified ? (
              <>
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-emerald-800">Chứng nhận Kiểm duyệt Sàn HShopp</p>
                  <p className="text-[11px] text-emerald-700">Tài liệu xuất xứ, điều khoản bảo hành &amp; hóa đơn đã được xác minh.</p>
                </div>
              </>
            ) : (
              <>
                <Clock className="w-6 h-6 text-gray-500 shrink-0" />
                <div>
                  <p className="font-bold text-gray-800">Trạng thái: Đang chờ xác minh</p>
                  <p className="text-[11px] text-gray-500">Nhà bán hàng đang cung cấp chứng từ bổ sung theo quy chế sàn.</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Product Info & Actions (7 cols) */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            {/* Brand & Social row */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span className="font-bold text-[#3B6EF5] hover:underline cursor-pointer">
                {product.brand} Store &rsaquo;
              </span>
              <div className="flex items-center gap-3 text-gray-400">
                <button className="hover:text-red-500 flex items-center gap-1 transition-colors">
                  <Heart className="w-4 h-4" /> Yêu thích
                </button>
                <button className="hover:text-blue-600 flex items-center gap-1 transition-colors">
                  <Share2 className="w-4 h-4" /> Chia sẻ
                </button>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-2">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 text-xs pb-3 border-b border-gray-100">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span className="font-bold text-gray-800 text-sm">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">{product.reviewCount.toLocaleString()} Đánh giá của khách hàng</span>
              <span className="text-gray-300">|</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                {product.conditionText}
              </span>
            </div>

            {/* Price Showcase */}
            <div className="bg-[#FAFBFD] p-4 rounded-xl border border-blue-50 my-4">
              {product.discountPercent > 0 && (
                <div className="flex items-center gap-2 text-xs text-gray-400 line-through">
                  <span>Giá gốc: {formatVND(product.originalPrice)}</span>
                </div>
              )}
              <div className="flex items-baseline gap-3 mt-1">
                {product.discountPercent > 0 && (
                  <span className="text-2xl font-black text-[#E02020]">
                    {product.discountPercent}%
                  </span>
                )}
                <span className="text-3xl font-black text-[#E02020]">
                  {formatVND(selectedVariant.price || product.currentPrice)}
                </span>
                {product.cashbackText && (
                  <span className="text-xs font-bold text-[#E02020] bg-red-50 px-2 py-1 rounded">
                    {product.cashbackText}
                  </span>
                )}
              </div>
            </div>

            {/* Shipping Benefit */}
            <div className="space-y-2 text-xs py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-[#3B6EF5] fill-[#3B6EF5]" />
                <span className="font-bold text-gray-900">Giao hàng hỏa tốc:</span>
                <span className="text-blue-600 font-extrabold">{product.deliveryDateText}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 pl-6">
                <span>Vận chuyển:</span>
                <span className={product.freeShipping ? 'text-emerald-600 font-bold' : 'text-gray-800'}>
                  {product.freeShipping ? 'Miễn phí vận chuyển toàn quốc' : '25.000 ₫ (Miễn phí từ đơn 500k)'}
                </span>
              </div>
            </div>

            {/* Variants Selector */}
            {product.variants.length > 0 && (
              <div className="my-4">
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Lựa chọn phân loại: <span className="text-blue-600">{selectedVariant.name}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                        selectedVariant.id === v.id
                          ? 'border-[#3B6EF5] bg-blue-50 text-blue-700 ring-1 ring-[#3B6EF5]'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400 bg-white'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 my-4">
              <span className="text-xs font-bold text-gray-700">Số lượng:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 font-bold text-sm"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-gray-800 min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 font-bold text-sm"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-gray-400">Còn hàng</span>
            </div>

            {/* Specifications preview */}
            <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-100 text-xs space-y-1 mb-6">
              <p className="font-bold text-gray-700 mb-1.5">Thông số nổi bật:</p>
              {Object.entries(product.specs).map(([k, val]) => (
                <div key={k} className="flex justify-between text-gray-600 text-[11px]">
                  <span className="font-medium text-gray-500">{k}:</span>
                  <span className="font-semibold text-gray-800">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs: Add to Cart & Buy Now */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-white hover:bg-blue-50 text-[#3B6EF5] border-2 border-[#3B6EF5] font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer text-sm"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Thêm vào giỏ</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 bg-[#F0471C] hover:bg-[#d63a12] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer text-sm"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>MUA NGAY</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
