export type ProductCategory = 
  | 'electronics' 
  | 'beauty' 
  | 'food' 
  | 'houseware' 
  | 'fashion_golf' 
  | 'health' 
  | 'all';

export type ProductCondition = 
  | 'new' 
  | 'box_dented' 
  | 'package_damaged' 
  | 'repackaged' 
  | 'refurbished';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  color?: string;
  specs?: string;
}

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  nameKr?: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  originalPrice: number;
  currentPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  rank?: number;
  image: string;
  images: string[];
  fastDelivery: boolean; // Giao nhanh / Giao ngày mai
  deliveryDateText: string; // e.g. "Giao ngày mai (T5)"
  freeShipping: boolean;
  cashbackText?: string; // e.g. "Wow tích 1.500đ" or "Tối đa 600đ tích lũy"
  condition: ProductCondition;
  conditionText: string; // "Mới", "Hộp móp", v.v.
  variantsCount: number;
  batteryHours?: number; // for electronics filter
  model?: string;
  storage?: string;
  isSponsored?: boolean;
  isHot?: boolean;
  isFlashSale?: boolean;
  verified: boolean; // Trạng thái kiểm duyệt của sàn: true -> "Đã xác minh", false -> "Đang chờ xác minh"
  description: string;
  specs: Record<string, string>;
  variants: ProductVariant[];
}

export interface CartItem {
  id: string; // unique item key (productId + variantId)
  product: Product;
  variant: ProductVariant;
  quantity: number;
  selected: boolean;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  note?: string;
}

export type PaymentMethodType = 'e-wallet' | 'bank-card' | 'cod';

export interface TermsAgreementRecord {
  acceptedAt: string;
  termsVersion: string;
  coreTermsAccepted: boolean;
  marketingAccepted: boolean;
  ipAddressDemo: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodType;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  createdAt: string;
  termsRecord: TermsAgreementRecord;
  status: 'confirmed_demo' | 'processing' | 'delivered';
}

export interface SearchFilters {
  query: string;
  category: string;
  brands: string[];
  fastDeliveryOnly: boolean;
  freeShippingOnly: boolean;
  conditions: ProductCondition[];
  minPrice?: number;
  maxPrice?: number;
  batteryHours?: string;
  model?: string;
  includeShippingInPrice: boolean;
  sortBy: 'ranking' | 'price_asc' | 'price_desc' | 'sales' | 'newest';
}
