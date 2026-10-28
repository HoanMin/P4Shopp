import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, ProductVariant, ShippingAddress, PaymentMethodType, Order, TermsAgreementRecord } from '../types';
import { calculateOrderTotals, generateDemoOrderNumber } from '../utils/pricing';
import { MOCK_PRODUCTS } from '../data/mockProducts';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
  productImage?: string;
}

interface CartContextType {
  cart: CartItem[];
  buyNowItem: CartItem | null;
  directCheckout: boolean;
  activeCheckoutItems: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  buyNow: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  toggleSelect: (itemId: string) => void;
  toggleSelectAll: (select: boolean) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  
  // Checkout & Order
  shippingAddress: ShippingAddress;
  updateShippingAddress: (addr: ShippingAddress) => void;
  paymentMethod: PaymentMethodType;
  setPaymentMethod: (pm: PaymentMethodType) => void;
  appliedDiscount: number;
  discountCode: string;
  applyDiscountCode: (code: string) => boolean;
  
  // Calculations
  cartTotals: ReturnType<typeof calculateOrderTotals>;
  checkoutTotals: ReturnType<typeof calculateOrderTotals>;
  
  // Terms & Submission
  lastCompletedOrder: Order | null;
  confirmOrderWithTerms: (marketingAccepted: boolean) => Order;
  
  // Toasts
  toast: ToastMessage | null;
  dismissToast: () => void;

  // Language switcher state
  language: 'vi' | 'ko' | 'en';
  setLanguage: (lang: 'vi' | 'ko' | 'en') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'hshopp_cart_v1';
const LOCAL_STORAGE_ORDER_KEY = 'hshopp_last_order';

const DEFAULT_ADDRESS: ShippingAddress = {
  fullName: 'Lê Nguyễn Hà Anh',
  phone: '+84 912 345 678',
  address: 'Trường Đại học Thương Mại, Số 79 Đường Hồ Tùng Mậu, Phường Mai Dịch',
  district: 'Quận Cầu Giấy',
  city: 'TP. Hà Nội',
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize cart from localStorage, or seed with initial demo item matching Image 1
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    // Default seed item: Tai nghe Bluetooth không dây (Image 1 item)
    const flagship = MOCK_PRODUCTS[0];
    return [
      {
        id: `${flagship.id}-${flagship.variants[0].id}`,
        product: flagship,
        variant: flagship.variants[0],
        quantity: 1,
        selected: true,
      },
    ];
  });

  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null);
  const [directCheckout, setDirectCheckout] = useState<boolean>(false);
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(DEFAULT_ADDRESS);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('e-wallet');
  const [discountCode, setDiscountCode] = useState<string>('CHAOHSHOPP50K');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(50000); // 50.000đ discount as seen in Image 1
  const [language, setLanguage] = useState<'vi' | 'ko' | 'en'>('vi');

  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(() => {
    try {
      const savedOrder = localStorage.getItem(LOCAL_STORAGE_ORDER_KEY);
      if (savedOrder) return JSON.parse(savedOrder);
    } catch {
      // ignore
    }
    return null;
  });

  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const showToast = (message: string, productImage?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ id: Date.now().toString(), message, productImage, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3500);
  };

  const dismissToast = () => setToast(null);

  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const selectedVariant = variant || product.variants[0] || {
      id: 'default',
      name: 'Tiêu chuẩn',
      price: product.currentPrice,
      inStock: true,
    };
    const itemId = `${product.id}-${selectedVariant.id}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemId,
            product,
            variant: selectedVariant,
            quantity,
            selected: true,
          },
        ];
      }
    });

    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, product.image);
  };

  const buyNow = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const selectedVariant = variant || product.variants[0] || {
      id: 'default',
      name: 'Tiêu chuẩn',
      price: product.currentPrice,
      inStock: true,
    };
    const item: CartItem = {
      id: `${product.id}-${selectedVariant.id}`,
      product,
      variant: selectedVariant,
      quantity,
      selected: true,
    };
    setBuyNowItem(item);
    setDirectCheckout(true);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
    if (buyNowItem && buyNowItem.id === itemId) {
      setBuyNowItem({ ...buyNowItem, quantity });
    }
  };

  const toggleSelect = (itemId: string) => {
    setCart(prev =>
      prev.map(item => (item.id === itemId ? { ...item, selected: !item.selected } : item))
    );
  };

  const toggleSelectAll = (select: boolean) => {
    setCart(prev => prev.map(item => ({ ...item, selected: select })));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    if (buyNowItem?.id === itemId) {
      setBuyNowItem(null);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateShippingAddress = (addr: ShippingAddress) => {
    setShippingAddress(addr);
  };

  const applyDiscountCode = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (
      trimmed === 'P4SHOP50K' || 
      trimmed === 'CHAOP4SHOP50K' || 
      trimmed === 'CHAOHSHOPP50K' || 
      trimmed === 'HSHOPP50K' || 
      trimmed === 'WOW50K'
    ) {
      setDiscountCode(trimmed);
      setAppliedDiscount(50000);
      showToast('Áp dụng mã giảm 50.000 ₫ thành công!');
      return true;
    } else if (trimmed === 'FREESHIP') {
      setDiscountCode(trimmed);
      setAppliedDiscount(25000);
      showToast('Áp dụng mã miễn phí vận chuyển!');
      return true;
    } else {
      showToast('Mã giảm giá không hợp lệ hoặc đã hết hạn!', undefined, 'warning');
      return false;
    }
  };

  // Determine active checkout items: either direct buyNowItem or selected items from cart
  const activeCheckoutItems: CartItem[] = directCheckout && buyNowItem 
    ? [buyNowItem] 
    : cart.filter(item => item.selected);

  const cartTotals = calculateOrderTotals(cart, appliedDiscount);
  const checkoutTotals = calculateOrderTotals(activeCheckoutItems, appliedDiscount);

  const confirmOrderWithTerms = (marketingAccepted: boolean): Order => {
    const termsRecord: TermsAgreementRecord = {
      acceptedAt: new Date().toISOString(),
      termsVersion: 'v2.4 - 01/2026',
      coreTermsAccepted: true,
      marketingAccepted: marketingAccepted,
      ipAddressDemo: '113.161.45.' + Math.floor(10 + Math.random() * 89),
    };

    const newOrder: Order = {
      id: 'ord_' + Date.now(),
      orderNumber: generateDemoOrderNumber(),
      items: [...activeCheckoutItems],
      shippingAddress: { ...shippingAddress },
      paymentMethod,
      subtotal: checkoutTotals.subtotal,
      shippingFee: checkoutTotals.shippingFee,
      discountAmount: checkoutTotals.discountAmount,
      totalAmount: checkoutTotals.totalAmount,
      createdAt: new Date().toISOString(),
      termsRecord,
      status: 'confirmed_demo',
    };

    setLastCompletedOrder(newOrder);
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDER_KEY, JSON.stringify(newOrder));
    } catch {
      // ignore
    }

    // Clean up items from cart that were ordered
    if (directCheckout) {
      setBuyNowItem(null);
      setDirectCheckout(false);
    } else {
      setCart(prev => prev.filter(item => !item.selected));
    }

    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        buyNowItem,
        directCheckout,
        activeCheckoutItems,
        addToCart,
        buyNow,
        updateQuantity,
        toggleSelect,
        toggleSelectAll,
        removeFromCart,
        clearCart,
        shippingAddress,
        updateShippingAddress,
        paymentMethod,
        setPaymentMethod,
        appliedDiscount,
        discountCode,
        applyDiscountCode,
        cartTotals,
        checkoutTotals,
        lastCompletedOrder,
        confirmOrderWithTerms,
        toast,
        dismissToast,
        language,
        setLanguage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
