import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Rocket, ShoppingCart, Zap, Check } from 'lucide-react';
import { Product } from '../../types';
import { formatVND } from '../../utils/pricing';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  rankBadge?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, rankBadge }) => {
  const navigate = useNavigate();
  const { addToCart, buyNow } = useCart();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    buyNow(product);
    navigate('/checkout');
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white border border-gray-200/90 rounded-lg p-3 hover:shadow-xl hover:border-blue-400 transition-all duration-200 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-md overflow-hidden mb-2.5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Rank Badge (Red square on top-left, e.g. 1, 2, 3...) */}
        {rankBadge && (
          <div className="absolute top-0 left-0 bg-[#E02020] text-white text-xs font-black px-2 py-0.5 rounded-br shadow-xs">
            {rankBadge}
          </div>
        )}

        {/* Sponsored / Ad Badge on top right */}
        {product.isSponsored && (
          <div className="absolute top-1.5 right-1.5 bg-black/40 backdrop-blur-xs text-white text-[10px] font-medium px-1.5 py-0.2 rounded">
            Quảng cáo ⓘ
          </div>
        )}

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-x-2 bottom-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-white/95 hover:bg-white text-blue-700 border border-blue-400 text-xs font-bold py-1.5 px-2 rounded-md shadow-md flex items-center justify-center gap-1 hover:border-blue-600 transition-all cursor-pointer"
            title="Thêm vào giỏ"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Thêm giỏ</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-[#F0471C] hover:bg-[#d63a12] text-white text-xs font-bold py-1.5 px-2 rounded-md shadow-md flex items-center justify-center gap-1 transition-all cursor-pointer"
            title="Mua ngay"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Mua ngay</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Cashback text (e.g. "Wow tích 1.500đ" in red) */}
          {product.cashbackText && (
            <p className="text-[11px] font-bold text-[#E02020] mb-0.5 line-clamp-1">
              {product.cashbackText}
            </p>
          )}

          {/* Product Name (2-3 lines) */}
          <h3 className="text-xs font-medium text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors mb-1.5">
            {product.name}
          </h3>

          {/* Price Row: Original price (strikethrough) + Discount tag + Bold Sale Price */}
          <div className="mb-1">
            {product.discountPercent > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400 line-through">
                <span>{formatVND(product.originalPrice)}</span>
              </div>
            )}
            <div className="flex items-baseline gap-1.5">
              {product.discountPercent > 0 && (
                <span className="text-sm font-extrabold text-[#E02020]">
                  {product.discountPercent}%
                </span>
              )}
              <span className="text-base font-extrabold text-[#E02020]">
                {formatVND(product.currentPrice)}
              </span>
            </div>
          </div>

          {/* Fast Delivery Badge (Rocket) */}
          {product.fastDelivery && (
            <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 mt-1">
              <Rocket className="w-3.5 h-3.5 text-[#3B6EF5] fill-[#3B6EF5]" />
              <span className="text-emerald-700 bg-emerald-50 px-1 rounded text-[10px] font-black mr-0.5">P4Shop</span>
              <span>{product.deliveryDateText}</span>
            </div>
          )}

          {/* Free Shipping label */}
          <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
            {product.freeShipping ? (
              <span className="text-gray-500">Miễn phí vận chuyển</span>
            ) : (
              <span className="text-gray-400">Phí ship 25.000 ₫</span>
            )}
          </div>

          {/* Condition Variants label: e.g. "Mới, Hộp móp (3)" */}
          {product.conditionText && (
            <p className="text-[11px] text-gray-500 mt-0.5">
              {product.conditionText}
            </p>
          )}
        </div>

        {/* Rating stars & review count & Verified tag */}
        <div className="mt-2 pt-2 border-t border-gray-100 flex flex-col gap-1">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              </div>
              <span className="font-semibold text-gray-700">{product.rating.toFixed(1)}</span>
              <span className="text-gray-400">({product.reviewCount.toLocaleString()})</span>
            </div>

            {/* Verification Pill */}
            {product.verified ? (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                <Check className="w-2.5 h-2.5 stroke-[3]" /> Sàn xác minh
              </span>
            ) : (
              <span className="text-[10px] text-gray-400 bg-gray-50 px-1 rounded">
                Chờ duyệt
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
