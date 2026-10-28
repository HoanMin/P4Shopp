import { CartItem } from '../types';

/**
 * Format currency into standard Vietnamese Dong string: e.g. 399.000 ₫
 */
export function formatVND(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '0 ₫';
  }
  const formatted = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formatted} ₫`;
}

/**
 * Calculate totals for cart items
 */
export interface OrderCalculation {
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  itemCount: number;
}

export function calculateOrderTotals(
  items: CartItem[],
  customDiscount: number = 50000,
  freeShippingThreshold: number = 500000
): OrderCalculation {
  const selectedItems = items.filter(item => item.selected !== false);
  const subtotal = selectedItems.reduce((acc, item) => {
    return acc + (item.variant.price || item.product.currentPrice) * item.quantity;
  }, 0);

  const itemCount = selectedItems.reduce((acc, item) => acc + item.quantity, 0);

  // If subtotal is 0, no fee and no discount
  if (subtotal === 0) {
    return {
      subtotal: 0,
      shippingFee: 0,
      discountAmount: 0,
      totalAmount: 0,
      itemCount: 0,
    };
  }

  // Base shipping fee is 25.000 VND unless over threshold or freeShipping on all items
  const allFreeShipping = selectedItems.every(i => i.product.freeShipping);
  let shippingFee = 25000;
  if (subtotal >= freeShippingThreshold || allFreeShipping) {
    shippingFee = 0;
  }

  // Discount rule: capped at subtotal
  const discountAmount = Math.min(customDiscount, subtotal);
  const totalAmount = Math.max(0, subtotal + shippingFee - discountAmount);

  return {
    subtotal,
    shippingFee,
    discountAmount,
    totalAmount,
    itemCount,
  };
}

/**
 * Check if the core terms and conditions are valid for completing checkout
 */
export function validateTermsAcceptance(coreTermsChecked: boolean): boolean {
  return coreTermsChecked === true;
}

/**
 * Generate a random realistic demo order code like #P4S-20261028-7492
 */
export function generateDemoOrderNumber(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `#P4S-${dateStr}-${randomSuffix}`;
}
