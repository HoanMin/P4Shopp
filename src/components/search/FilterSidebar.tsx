import React, { useState } from 'react';
import { Rocket, ShieldCheck, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { SearchFilters, ProductCondition } from '../../types';

interface FilterSidebarProps {
  filters: SearchFilters;
  onFilterChange: (newFilters: SearchFilters) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreBrands, setShowMoreBrands] = useState(false);
  const [minPriceInput, setMinPriceInput] = useState(filters.minPrice?.toString() || '');
  const [maxPriceInput, setMaxPriceInput] = useState(filters.maxPrice?.toString() || '');

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'electronics', label: 'Thiết bị điện tử & Tai nghe' },
    { id: 'beauty', label: 'Sắc đẹp & Mỹ phẩm' },
    { id: 'food', label: 'Thực phẩm & Cà phê' },
    { id: 'houseware', label: 'Gia dụng & Đời sống' },
    { id: 'fashion_golf', label: 'Thời trang & Phụ kiện Golf' },
    { id: 'health', label: 'Sức khỏe & Thực phẩm bổ sung' },
  ];

  const brands = [
    'Apple',
    'Samsung',
    'Philips',
    'Shokz',
    'Blaupunkt',
    'Itpel',
    'Urban Sound',
    'Acro',
    'KONLI',
    'Marshall',
    'Sony',
    'Anker',
    'KERASYS',
    'AGF Blendy',
    'Pulmuone',
    'Sulwhasoo',
    'HAZZYS Golf',
    'Lock&Lock',
  ];

  const conditions: { id: ProductCondition; label: string }[] = [
    { id: 'new', label: 'Mới (New)' },
    { id: 'box_dented', label: 'Hộp móp (Box dented)' },
    { id: 'package_damaged', label: 'Bao bì hư (Package damaged)' },
    { id: 'repackaged', label: 'Đóng gói lại (Repackaged)' },
    { id: 'refurbished', label: 'Hàng tân trang (Refurbished)' },
  ];

  const batteryRanges = [
    { id: 'under_5', label: 'Dưới 5 giờ' },
    { id: '5_10', label: '5 giờ ~ 10 giờ' },
    { id: '10_15', label: '10 giờ ~ 15 giờ' },
    { id: '15_30', label: '15 giờ ~ 30 giờ' },
    { id: 'over_30', label: 'Trên 30 giờ' },
  ];

  const models = [
    'Air Pro TWS',
    'Galaxy Buds4',
    'Galaxy Buds4 Pro',
    'AirPods Pro 3',
    'TAT1109',
    'OpenRun Pro 2',
    'BLP-OE663K',
    'EarPods USB-C',
    'WH-1000XM5',
  ];

  const handleBrandToggle = (brand: string) => {
    const nextBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: nextBrands });
  };

  const handleConditionToggle = (condition: ProductCondition) => {
    const nextConditions = filters.conditions.includes(condition)
      ? filters.conditions.filter(c => c !== condition)
      : [...filters.conditions, condition];
    onFilterChange({ ...filters, conditions: nextConditions });
  };

  const handlePriceApply = (e: React.FormEvent) => {
    e.preventDefault();
    const min = minPriceInput ? parseInt(minPriceInput, 10) : undefined;
    const max = maxPriceInput ? parseInt(maxPriceInput, 10) : undefined;
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
  };

  return (
    <aside className="w-full lg:w-[220px] bg-white border border-gray-200 rounded-lg p-3 text-xs select-none space-y-4 shrink-0 shadow-2xs">
      {/* Top Header & Reset */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <h3 className="font-extrabold text-sm text-gray-900 tracking-tight">Bộ lọc</h3>
        <button
          onClick={onReset}
          className="text-gray-400 hover:text-blue-600 flex items-center gap-1 text-[11px] font-medium"
          title="Đặt lại bộ lọc"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Đặt lại</span>
        </button>
      </div>

      {/* 1. Fast Delivery Filter Group (Rocket) */}
      <div className="space-y-2 pb-3 border-b border-gray-100">
        <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-800 hover:text-blue-600">
          <input
            type="checkbox"
            checked={filters.fastDeliveryOnly}
            onChange={(e) => onFilterChange({ ...filters, fastDeliveryOnly: e.target.checked })}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer accent-[#3B6EF5]"
          />
          <div className="flex items-center gap-1 text-blue-600">
            <Rocket className="w-4 h-4 fill-blue-500 text-blue-500" />
            <span className="font-extrabold">P4Shop Giao nhanh</span>
          </div>
        </label>

        <div className="pl-6 space-y-1.5 text-gray-600 text-[11px]">
          <label className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
            <input type="checkbox" className="rounded text-blue-600 accent-[#3B6EF5]" />
            <span>P4Shop LUX cao cấp</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
            <input type="checkbox" className="rounded text-blue-600 accent-[#3B6EF5]" />
            <span>Giao trực tiếp từ hãng</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
            <input
              type="checkbox"
              checked={filters.freeShippingOnly}
              onChange={(e) => onFilterChange({ ...filters, freeShippingOnly: e.target.checked })}
              className="rounded text-blue-600 accent-[#3B6EF5]"
            />
            <span className="font-semibold text-emerald-700">Miễn phí vận chuyển</span>
          </label>
        </div>
      </div>

      {/* 2. Category Filter */}
      <div className="pb-3 border-b border-gray-100">
        <h4 className="font-bold text-gray-900 mb-2">Danh mục</h4>
        <div className="space-y-1 text-gray-600">
          {(showMoreCategories ? categories : categories.slice(0, 4)).map((cat) => (
            <label
              key={cat.id}
              className={`flex items-center gap-2 cursor-pointer py-0.5 hover:text-blue-600 ${
                filters.category === cat.id ? 'font-bold text-blue-600' : ''
              }`}
            >
              <input
                type="radio"
                name="category"
                checked={filters.category === cat.id}
                onChange={() => onFilterChange({ ...filters, category: cat.id })}
                className="w-3.5 h-3.5 text-blue-600 accent-[#3B6EF5]"
              />
              <span className="truncate">{cat.label}</span>
            </label>
          ))}
        </div>
        <button
          onClick={() => setShowMoreCategories(!showMoreCategories)}
          className="text-[11px] font-semibold text-blue-600 hover:underline mt-1.5 flex items-center gap-0.5"
        >
          {showMoreCategories ? (
            <>Thu gọn <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>+ Xem thêm <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      </div>

      {/* 3. Brand Filter */}
      <div className="pb-3 border-b border-gray-100">
        <h4 className="font-bold text-gray-900 mb-2">Thương hiệu</h4>
        <div className="space-y-1.5 text-gray-600">
          {(showMoreBrands ? brands : brands.slice(0, 6)).map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="w-3.5 h-3.5 rounded text-blue-600 accent-[#3B6EF5]"
              />
              <span className="truncate">{brand}</span>
            </label>
          ))}
        </div>
        <button
          onClick={() => setShowMoreBrands(!showMoreBrands)}
          className="text-[11px] font-semibold text-blue-600 hover:underline mt-1.5 flex items-center gap-0.5"
        >
          {showMoreBrands ? (
            <>Thu gọn <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>+ Xem thêm <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      </div>

      {/* 4. Product Condition (Matches Image 5) */}
      <div className="pb-3 border-b border-gray-100">
        <h4 className="font-bold text-gray-900 mb-2">Tình trạng sản phẩm</h4>
        <div className="space-y-1.5 text-gray-600">
          {conditions.map((cond) => (
            <label
              key={cond.id}
              className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
            >
              <input
                type="checkbox"
                checked={filters.conditions.includes(cond.id)}
                onChange={() => handleConditionToggle(cond.id)}
                className="w-3.5 h-3.5 rounded text-blue-600 accent-[#3B6EF5]"
              />
              <span className="truncate">{cond.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 5. Battery Range (for earphones/electronics) */}
      <div className="pb-3 border-b border-gray-100">
        <h4 className="font-bold text-gray-900 mb-2">Thời gian sử dụng tối đa</h4>
        <div className="space-y-1 text-gray-600">
          {batteryRanges.map((rng) => (
            <label
              key={rng.id}
              className={`flex items-center gap-2 cursor-pointer py-0.5 hover:text-blue-600 ${
                filters.batteryHours === rng.id ? 'font-bold text-blue-600' : ''
              }`}
            >
              <input
                type="radio"
                name="batteryRange"
                checked={filters.batteryHours === rng.id}
                onChange={() =>
                  onFilterChange({
                    ...filters,
                    batteryHours: filters.batteryHours === rng.id ? undefined : rng.id,
                  })
                }
                className="w-3.5 h-3.5 text-blue-600 accent-[#3B6EF5]"
              />
              <span>{rng.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 6. Model selection */}
      <div className="pb-3 border-b border-gray-100">
        <h4 className="font-bold text-gray-900 mb-2">Model phổ biến</h4>
        <div className="space-y-1 text-gray-600">
          {models.slice(0, 5).map((model) => (
            <label
              key={model}
              className="flex items-center gap-2 cursor-pointer py-0.5 hover:text-blue-600"
            >
              <input
                type="radio"
                name="model"
                checked={filters.model === model}
                onChange={() =>
                  onFilterChange({
                    ...filters,
                    model: filters.model === model ? undefined : model,
                  })
                }
                className="w-3.5 h-3.5 text-blue-600 accent-[#3B6EF5]"
              />
              <span className="truncate">{model}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 7. Price Range Filter */}
      <div>
        <h4 className="font-bold text-gray-900 mb-2">Khoảng giá (₫)</h4>
        <form onSubmit={handlePriceApply} className="space-y-2">
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              placeholder="Thấp nhất"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs outline-none focus:border-blue-500"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Cao nhất"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-1 rounded transition-colors text-[11px]"
          >
            Áp dụng giá
          </button>
        </form>
      </div>
    </aside>
  );
};
