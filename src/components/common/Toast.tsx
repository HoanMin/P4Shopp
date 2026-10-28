import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2, AlertCircle, ShoppingCart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Toast: React.FC = () => {
  const { toast, dismissToast } = useCart();
  const navigate = useNavigate();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white rounded-xl shadow-2xl border border-gray-200 p-4 animate-in slide-in-from-bottom-5 duration-200 flex items-start gap-3">
      {toast.productImage ? (
        <img 
          src={toast.productImage} 
          alt="Product thumbnail" 
          className="w-12 h-12 object-cover rounded-lg border border-gray-100 shrink-0" 
        />
      ) : toast.type === 'warning' ? (
        <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2">
          {toast.message}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => {
              dismissToast();
              navigate('/cart');
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded flex items-center gap-1 hover:bg-blue-100 transition-colors"
          >
            <ShoppingCart className="w-3 h-3" />
            Xem giỏ hàng
          </button>
          <button
            onClick={() => {
              dismissToast();
              navigate('/checkout');
            }}
            className="text-xs font-bold text-white bg-[#F0471C] hover:bg-[#d83c13] px-2.5 py-1 rounded transition-colors"
          >
            Thanh toán
          </button>
        </div>
      </div>

      <button
        onClick={dismissToast}
        className="text-gray-400 hover:text-gray-600 p-1"
        aria-label="Đóng thông báo"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
