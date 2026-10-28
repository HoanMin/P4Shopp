import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { HomePage } from './components/home/HomePage';
import { SearchResults } from './components/search/SearchResults';
import { ProductDetail } from './components/product/ProductDetail';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderSuccessPage } from './components/checkout/OrderSuccessPage';
import { TermsPage } from './components/terms/TermsPage';

// Scroll to top on navigation helper
function ScrollToTop() {
  const { pathname, search } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

// Layout wrapper to conditionally show standard Header/Footer
function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  // Checkout & Order Complete have specialized Coupang headers matching Image 1
  const isCheckoutOrOrderComplete = 
    location.pathname === '/checkout' || 
    location.pathname === '/order-complete';

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F8] text-gray-800 antialiased font-sans">
      <ScrollToTop />
      {!isCheckoutOrOrderComplete && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!isCheckoutOrOrderComplete && <Footer />}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-complete" element={<OrderSuccessPage />} />
            <Route path="/terms" element={<TermsPage />} />
            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </CartProvider>
  );
}
