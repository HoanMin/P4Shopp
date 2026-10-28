import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Check, ChevronRight, SlidersHorizontal, PackageSearch } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { ProductCard } from '../product/ProductCard';
import { FilterSidebar } from './FilterSidebar';
import { SearchFilters, ProductCondition } from '../../types';

const RELATED_KEYWORDS: Record<string, string[]> = {
  default: [
    'tai nghe có dây',
    'tai nghe bluetooth',
    'c type earphone',
    'tai nghe chống ồn enc',
    'cà phê cô đặc blendy',
    'dầu gội kerasys',
    'áo golf hazzys',
    'mì udon pulmuone',
    'sáp tẩy trang banila',
    'nồi chiên lock&lock',
  ],
  'tai nghe': [
    'tai nghe có dây',
    'tai nghe bluetooth',
    'c type earphone',
    'tai nghe chống ồn enc',
    'tai nghe gaming',
    'tai nghe kẹp tai',
    'tai nghe dẫn truyền xương',
    'hộp sạc tai nghe',
    'tai nghe thể thao chống nước',
  ],
  'cà phê': [
    'cà phê viên nén nespresso',
    'cà phê blendy agf',
    'cà phê đen hòa tan',
    'máy pha cà phê gia đình',
    'cà phê arabica cao cấp',
  ],
  'mỹ phẩm': [
    'kem chống nắng innisfree',
    'sáp tẩy trang banila co',
    'tinh chất dưỡng sulwhasoo',
    'dầu gội xả kerasys',
    'miếng dán mụn cosrx',
  ],
};

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('cat') || 'all';

  const [filters, setFilters] = useState<SearchFilters>({
    query: query,
    category: categoryParam,
    brands: [],
    fastDeliveryOnly: false,
    freeShippingOnly: false,
    conditions: [],
    minPrice: undefined,
    maxPrice: undefined,
    batteryHours: undefined,
    model: undefined,
    includeShippingInPrice: false,
    sortBy: 'ranking',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sync category param
  useMemo(() => {
    if (categoryParam !== filters.category) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [categoryParam]);

  const displayKeyword = query && query !== 'all' ? query : 'Tất cả sản phẩm';

  const relatedKeywords = useMemo(() => {
    const lower = query.toLowerCase();
    if (lower.includes('tai') || lower.includes('ear') || lower.includes('phone')) {
      return RELATED_KEYWORDS['tai nghe'];
    }
    if (lower.includes('phê') || lower.includes('coffee')) {
      return RELATED_KEYWORDS['cà phê'];
    }
    if (lower.includes('kem') || lower.includes('mỹ') || lower.includes('da')) {
      return RELATED_KEYWORDS['mỹ phẩm'];
    }
    return RELATED_KEYWORDS.default;
  }, [query]);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      // 1. Text query
      if (query && query !== 'all' && query !== 'rocket' && query !== 'flashsale') {
        const q = query.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchSub = product.subcategory.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchSub && !matchDesc) {
          return false;
        }
      }

      // Special tags
      if (query === 'rocket' && !product.fastDelivery) return false;
      if (query === 'flashsale' && product.discountPercent < 25) return false;

      // 2. Category
      if (filters.category && filters.category !== 'all') {
        if (product.category !== filters.category) return false;
      }

      // 3. Fast delivery
      if (filters.fastDeliveryOnly && !product.fastDelivery) return false;

      // 4. Free shipping
      if (filters.freeShippingOnly && !product.freeShipping) return false;

      // 5. Brands
      if (filters.brands.length > 0) {
        if (!filters.brands.some(b => product.brand.toLowerCase().includes(b.toLowerCase()))) {
          return false;
        }
      }

      // 6. Conditions
      if (filters.conditions.length > 0) {
        if (!filters.conditions.includes(product.condition)) return false;
      }

      // 7. Battery hours
      if (filters.batteryHours && product.batteryHours) {
        if (filters.batteryHours === 'under_5' && product.batteryHours >= 5) return false;
        if (filters.batteryHours === '5_10' && (product.batteryHours < 5 || product.batteryHours > 10)) return false;
        if (filters.batteryHours === '10_15' && (product.batteryHours < 10 || product.batteryHours > 15)) return false;
        if (filters.batteryHours === '15_30' && (product.batteryHours < 15 || product.batteryHours > 30)) return false;
        if (filters.batteryHours === 'over_30' && product.batteryHours <= 30) return false;
      }

      // 8. Model
      if (filters.model && product.model) {
        if (!product.model.toLowerCase().includes(filters.model.toLowerCase())) return false;
      }

      // 9. Price
      if (filters.minPrice !== undefined && product.currentPrice < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && product.currentPrice > filters.maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'ranking') return (a.rank || 99) - (b.rank || 99);
      if (filters.sortBy === 'price_asc') return a.currentPrice - b.currentPrice;
      if (filters.sortBy === 'price_desc') return b.currentPrice - a.currentPrice;
      if (filters.sortBy === 'sales') return b.reviewCount - a.reviewCount;
      if (filters.sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0;
    });
  }, [query, filters]);

  // Pagination slice
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleResetFilters = () => {
    setFilters({
      query: query,
      category: 'all',
      brands: [],
      fastDeliveryOnly: false,
      freeShippingOnly: false,
      conditions: [],
      minPrice: undefined,
      maxPrice: undefined,
      batteryHours: undefined,
      model: undefined,
      includeShippingInPrice: false,
      sortBy: 'ranking',
    });
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-4 font-sans">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="hover:text-blue-600">Tất cả sản phẩm</span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-gray-800">'{displayKeyword}'</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Left Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
        />

        {/* Right Search Content */}
        <div className="flex-1 min-w-0 w-full">
          {/* Header Title: 'từ khóa' trên HShopp */}
          <div className="mb-3">
            <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              Kết quả tìm kiếm cho '{displayKeyword}'
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Tìm thấy <strong className="text-gray-900">{filteredProducts.length}</strong> sản phẩm phù hợp tiêu chuẩn kiểm duyệt P4Shop
            </p>
          </div>

          {/* Related Searches Tags (Blue text pills) */}
          <div className="flex items-baseline gap-2 py-2 mb-3 border-b border-gray-100 flex-wrap">
            <span className="text-xs font-bold text-gray-500 shrink-0">Tìm kiếm liên quan:</span>
            <div className="flex items-center gap-2 flex-wrap text-xs">
              {relatedKeywords.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
                  className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Sort & Options Bar (Matches Image 4) */}
          <div className="bg-gray-50/80 border border-gray-200 rounded-md p-2 mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Toggle: "Gồm phí vận chuyển" */}
            <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
              <input
                type="checkbox"
                checked={filters.includeShippingInPrice}
                onChange={(e) =>
                  setFilters({ ...filters, includeShippingInPrice: e.target.checked })
                }
                className="w-4 h-4 rounded text-blue-600 accent-[#3B6EF5]"
              />
              <span>Gồm phí vận chuyển</span>
            </label>

            {/* Sort Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFilters({ ...filters, sortBy: 'ranking' })}
                className={`px-3 py-1 rounded font-semibold flex items-center gap-1 transition-colors ${
                  filters.sortBy === 'ranking'
                    ? 'text-blue-600 bg-white shadow-2xs border border-gray-200'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {filters.sortBy === 'ranking' && <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />}
                <span>Xếp hạng P4Shop</span>
              </button>

              <button
                onClick={() => setFilters({ ...filters, sortBy: 'price_asc' })}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  filters.sortBy === 'price_asc' ? 'text-blue-600 font-bold bg-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                Giá thấp
              </button>

              <button
                onClick={() => setFilters({ ...filters, sortBy: 'price_desc' })}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  filters.sortBy === 'price_desc' ? 'text-blue-600 font-bold bg-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                Giá cao
              </button>

              <button
                onClick={() => setFilters({ ...filters, sortBy: 'sales' })}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  filters.sortBy === 'sales' ? 'text-blue-600 font-bold bg-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                Bán chạy
              </button>

              <button
                onClick={() => setFilters({ ...filters, sortBy: 'newest' })}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  filters.sortBy === 'newest' ? 'text-blue-600 font-bold bg-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                Mới nhất
              </button>
            </div>
          </div>

          {/* Product Grid: 4 Columns */}
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {currentProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  rankBadge={(currentPage - 1) * itemsPerPage + idx + 1}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <PackageSearch className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 mb-1">
                Không tìm thấy sản phẩm phù hợp với bộ lọc
              </h3>
              <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
                Hãy thử nới lỏng các tiêu chí tìm kiếm hoặc xóa các điều kiện lọc thương hiệu, giá cả.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
              >
                Đặt lại tất cả bộ lọc
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-8 pt-4 border-t border-gray-200 text-xs">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
              >
                Trang trước
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-8 h-8 rounded border text-xs font-bold transition-colors ${
                    currentPage === idx + 1
                      ? 'bg-[#3B6EF5] text-white border-[#3B6EF5]'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
              >
                Trang sau
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
