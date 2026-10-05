'use client';

import { useState, useMemo } from 'react';
import { products, categories, type Product } from '@/lib/products';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
type TypeFilter = 'all' | 'book' | 'course' | 'template' | 'digital' | 'physical';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<TypeFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result: Product[] = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedType !== 'all') {
      result = result.filter((p) => p.type === selectedType);
    }
    result = result.filter((p) => p.price <= maxPrice);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }

    return result;
  }, [selectedCategory, selectedType, sortBy, maxPrice, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedType('all');
    setMaxPrice(50000);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-800">Shop All Products</h1>
        <p className="text-slate-500 mt-2">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'} available
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar filters - desktop */}
        <aside className="hidden lg:block">
          <FiltersPanel
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            clearFilters={clearFilters}
          />
        </aside>

        {/* Products */}
        <div className="lg:col-span-3">
          {/* Sort + mobile filter button */}
          <div className="flex items-center justify-between mb-6 gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <label className="text-sm text-slate-500">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Product grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
              <p className="text-5xl mb-3">🔍</p>
              <h3 className="text-lg font-bold text-slate-800">No products found</h3>
              <p className="text-slate-500 mt-1">Try adjusting your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-5 bg-purple-700 hover:bg-purple-800 text-white font-semibold px-5 py-2 rounded-lg transition"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FiltersPanel
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              clearFilters={clearFilters}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ============== Filters panel (reused on desktop + mobile) ==============
function FiltersPanel({
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
  maxPrice,
  setMaxPrice,
  clearFilters,
}: {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedType: TypeFilter;
  setSelectedType: (v: TypeFilter) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  clearFilters: () => void;
}) {
  const typeOptions: { value: TypeFilter; label: string }[] = [
    { value: 'all', label: 'All types' },
    { value: 'book', label: 'Books' },
    { value: 'course', label: 'Courses' },
    { value: 'template', label: 'Templates' },
    { value: 'digital', label: 'Digital downloads' },
    { value: 'physical', label: 'Physical products' },
  ];

  return (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="font-bold text-slate-800 mb-3">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === 'all'}
              onChange={() => setSelectedCategory('all')}
              className="accent-purple-600"
            />
            <span>All categories</span>
          </label>
          {categories.map((cat) => (
            <label
              key={cat.slug}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.slug}
                onChange={() => setSelectedCategory(cat.slug)}
                className="accent-purple-600"
              />
              <span>
                {cat.emoji} {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <h3 className="font-bold text-slate-800 mb-3">Type</h3>
        <div className="space-y-2">
          {typeOptions.map((t) => (
            <label key={t.value} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="type"
                checked={selectedType === t.value}
                onChange={() => setSelectedType(t.value)}
                className="accent-purple-600"
              />
              <span>{t.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-bold text-slate-800 mb-3">Max Price</h3>
        <input
          type="range"
          min={0}
          max={50000}
          step={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-purple-600"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>₦0</span>
          <span className="font-semibold text-purple-700">
            ₦{maxPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Clear */}
      <button
        onClick={clearFilters}
        className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2 rounded-lg transition text-sm"
      >
        Clear all filters
      </button>
    </div>
  );
}