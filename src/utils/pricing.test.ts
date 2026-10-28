import test from 'node:test';
import assert from 'node:assert/strict';
import { formatVND, calculateOrderTotals, validateTermsAcceptance, generateDemoOrderNumber } from './pricing';
import { CartItem } from '../types';

test('formatVND formats Vietnamese Dong properly with dot separator', () => {
  assert.equal(formatVND(399000), '399.000 ₫');
  assert.equal(formatVND(25000), '25.000 ₫');
  assert.equal(formatVND(374000), '374.000 ₫');
  assert.equal(formatVND(0), '0 ₫');
});

test('calculateOrderTotals computes standard flagship item correctly', () => {
  const dummyItem: CartItem = {
    id: 'item-1',
    product: {
      id: 'earphone-tws-01',
      name: 'Tai nghe Bluetooth không dây',
      brand: 'Acro',
      category: 'electronics',
      subcategory: 'Tai nghe TWS',
      originalPrice: 499000,
      currentPrice: 399000,
      discountPercent: 20,
      rating: 4.8,
      reviewCount: 3532,
      image: '/assets/sample.png',
      images: ['/assets/sample.png'],
      fastDelivery: true,
      deliveryDateText: 'Giao ngày mai (T5)',
      freeShipping: false,
      condition: 'new',
      conditionText: 'Mới',
      variantsCount: 3,
      verified: true,
      description: 'Tai nghe bluetooth',
      specs: {},
      variants: [{ id: 'v-black', name: 'Màu đen / 01', price: 399000, inStock: true }],
    },
    variant: { id: 'v-black', name: 'Màu đen / 01', price: 399000, inStock: true },
    quantity: 1,
    selected: true,
  };

  // Subtotal: 399.000, Shipping: 25.000, Discount: 50.000 -> Total: 374.000 (Exact match of Image 1!)
  const totals = calculateOrderTotals([dummyItem], 50000, 500000);
  assert.equal(totals.subtotal, 399000);
  assert.equal(totals.shippingFee, 25000);
  assert.equal(totals.discountAmount, 50000);
  assert.equal(totals.totalAmount, 374000);
  assert.equal(totals.itemCount, 1);
});

test('calculateOrderTotals handles empty cart gracefully', () => {
  const totals = calculateOrderTotals([]);
  assert.equal(totals.subtotal, 0);
  assert.equal(totals.shippingFee, 0);
  assert.equal(totals.discountAmount, 0);
  assert.equal(totals.totalAmount, 0);
});

test('validateTermsAcceptance requires core terms to be accepted', () => {
  assert.equal(validateTermsAcceptance(true), true);
  assert.equal(validateTermsAcceptance(false), false);
});

test('generateDemoOrderNumber creates valid #P4S- prefixed order code', () => {
  const orderNumber = generateDemoOrderNumber();
  assert.match(orderNumber, /^#P4S-\d{8}-\d{4}$/);
});
