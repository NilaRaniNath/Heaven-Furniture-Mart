import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Eye, 
  Search, 
  Star, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { allProductsData, collectionCategories } from '../data/productsData';

export default function CollectionsPage() {
  const { favorites, toggleFavorite } = useFavorites();

  // State Filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [outOfStockOnly, setOutOfStockOnly] = useState(false);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [priceRange, setPriceRange] = useState(1200);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Type Filter Options
  const typeOptions = [
    { id: 'chair', label: 'Chair' },
    { id: 'sofas', label: 'Sofas' },
    { id: 'tables', label: 'Tables' },
    { id: 'beds', label: 'Beds' },
    { id: 'dressing', label: 'Dressing' }
  ];

  // Color Filter Options
  const colorOptions = [
    { name: 'Bone', hex: '#EAE6DF' },
    { name: 'Black', hex: '#222222' },
    { name: 'Charcoal', hex: '#3A3A3A' },
    { name: 'Navy', hex: '#1B2A47' },
    { name: 'Mocha', hex: '#5C4033' },
    { name: 'Daf', hex: '#8C6747' }
  ];

  // Toggle Type Selection
  const handleTypeToggle = (typeId) => {
    setSelectedProductTypes(prev =>
      prev.includes(typeId) ? prev.filter(t => t !== typeId) : [...prev, typeId]
    );
    setCurrentPage(1);
  };

  // Toggle Color Selection
  const handleColorToggle = (colorName) => {
    setSelectedColors(prev =>
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
    setCurrentPage(1);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setInStockOnly(false);
    setOutOfStockOnly(false);
    setSelectedProductTypes([]);
    setPriceRange(1200);
    setSelectedColors([]);
    setSortBy('relevance');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return allProductsData.filter(product => {
      // Top Category tab
      if (selectedCategory !== 'all' && product.categorySlug !== selectedCategory) {
        return false;
      }
      // Product Type Checkbox
      if (selectedProductTypes.length > 0 && !selectedProductTypes.includes(product.categorySlug)) {
        return false;
      }
      // Stock Checkbox
      if (inStockOnly && !product.isStock) {
        return false;
      }
      // Price Slider
      if (product.discountPrice > priceRange) {
        return false;
      }
      // Color Check
      if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
        return false;
      }
      // Search
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = product.title.toLowerCase().includes(query);
        const matchCat = product.category.toLowerCase().includes(query);
        if (!matchTitle && !matchCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.discountPrice - b.discountPrice;
      if (sortBy === 'price-high') return b.discountPrice - a.discountPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // relevance
    });
  }, [selectedCategory, selectedProductTypes, inStockOnly, priceRange, selectedColors, searchQuery, sortBy]);

  // Paginated Slice
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen bg-[#F5EFE6] text-[#3A2A1E] pt-24 pb-20 font-sans selection:bg-[#B8925A] selection:text-white relative overflow-hidden"
    >
      {/* Background Subtle Warm Decorative Glow Accents */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#B8925A]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#122B2B]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* ── BREADCRUMB HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
      >
        <nav className="flex items-center gap-2 text-xs text-[#3A2A1E]/70 font-medium tracking-wide">
          <a href="/" className="hover:text-[#122B2B] transition-colors">Home</a>
          <span>/</span>
          <span className="text-[#122B2B] font-semibold">Collection</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#122B2B] mt-2 uppercase font-serif">
          All Products
        </h1>
      </motion.div>

      {/* ── TOP CATEGORY THUMBNAIL CARDS (Matching Reference Image) ── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4 sm:my-6 relative z-10"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4">
          {collectionCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`group flex flex-col items-center p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md border transition-all duration-300 shadow-sm hover:shadow-md ${
                selectedCategory === cat.id 
                  ? 'border-[#122B2B] ring-2 ring-[#122B2B]/10 scale-[1.02]' 
                  : 'border-gray-200 hover:border-[#B8925A]/40'
              }`}
            >
              <div className="w-full h-24 sm:h-32 rounded-lg sm:rounded-xl overflow-hidden mb-2 bg-gray-100 relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-900 group-hover:text-[#B8925A] transition-colors text-center line-clamp-1">
                {cat.title}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10">
        
        {/* ── BAR ABOVE GRID: Results count, Active Pills & Sort ── */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-200">
          {/* Results count & Filter toggle for mobile */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">
              Showing <strong className="text-gray-900">{filteredProducts.length}</strong> Results
            </span>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#122B2B] text-white border border-[#122B2B] text-xs font-semibold shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Active Filter Badges */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-medium border border-gray-200">
                Cat: {selectedCategory}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setSelectedCategory('all')} />
              </span>
            )}
            {selectedProductTypes.map(t => (
              <span key={t} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-medium border border-gray-200 capitalize">
                {t}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => handleTypeToggle(t)} />
              </span>
            ))}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-medium border border-gray-200">
                In Stock
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setInStockOnly(false)} />
              </span>
            )}
            {selectedColors.map(c => (
              <span key={c} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-medium border border-gray-200">
                Color: {c}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => handleColorToggle(c)} />
              </span>
            ))}
            {(selectedCategory !== 'all' || selectedProductTypes.length > 0 || inStockOnly || selectedColors.length > 0 || searchQuery !== '') && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-gray-500 hover:text-red-500 underline ml-1 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Search & Sort Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-44 pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#122B2B] focus:ring-1 focus:ring-[#122B2B] transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xs text-gray-500 font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#122B2B]"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT: LEFT SIDEBAR FILTERS & RIGHT PRODUCT CARDS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 sm:mt-8">
          
          {/* ── LEFT SIDEBAR FILTERS (Desktop) ── */}
          <aside className="hidden lg:block lg:col-span-3 space-y-7 pr-4 border-r border-gray-200">
            
            {/* 1. Availability */}
            <div className="border-b border-gray-200 pb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-900">Availability</h3>
                <button onClick={() => { setInStockOnly(false); setOutOfStockOnly(false); }} className="text-[11px] text-gray-400 hover:text-gray-700">Reset</button>
              </div>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2.5 text-gray-700 cursor-pointer hover:text-gray-900">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#122B2B] focus:ring-[#122B2B]"
                  />
                  <span>In Stock</span>
                </label>
                <label className="flex items-center gap-2.5 text-gray-400 cursor-not-allowed">
                  <input
                    type="checkbox"
                    checked={outOfStockOnly}
                    disabled
                    onChange={(e) => setOutOfStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-gray-300"
                  />
                  <span>Out Of Stock</span>
                </label>
              </div>
            </div>

            {/* 2. Product Type */}
            <div className="border-b border-gray-200 pb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-900">Product type</h3>
                <button onClick={() => setSelectedProductTypes([])} className="text-[11px] text-gray-400 hover:text-gray-700">Reset</button>
              </div>
              <div className="space-y-2 text-xs">
                {typeOptions.map(type => (
                  <label key={type.id} className="flex items-center gap-2.5 text-gray-700 cursor-pointer hover:text-gray-900">
                    <input
                      type="checkbox"
                      checked={selectedProductTypes.includes(type.id)}
                      onChange={() => handleTypeToggle(type.id)}
                      className="w-4 h-4 rounded border-gray-300 text-[#122B2B] focus:ring-[#122B2B]"
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Price Filter Slider */}
            <div className="border-b border-gray-200 pb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-900">Price</h3>
                <button onClick={() => setPriceRange(1200)} className="text-[11px] text-gray-400 hover:text-gray-700">Reset</button>
              </div>
              <input
                type="range"
                min="50"
                max="1200"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#122B2B] bg-gray-200 rounded-lg h-1.5 cursor-pointer"
              />
              <div className="flex items-center justify-between gap-3 mt-3 text-xs">
                <span className="px-3 py-1.5 bg-gray-100 rounded-md border border-gray-200 text-gray-700 font-semibold">$24.00</span>
                <span className="text-gray-400">-</span>
                <span className="px-3 py-1.5 bg-gray-100 rounded-md border border-gray-200 text-gray-900 font-extrabold">${priceRange}.00</span>
              </div>
            </div>

            {/* 4. Colour Options */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-900">Colour</h3>
                <button onClick={() => setSelectedColors([])} className="text-[11px] text-gray-400 hover:text-gray-700">Reset</button>
              </div>
              <div className="space-y-2 text-xs">
                {colorOptions.map(col => (
                  <button
                    key={col.name}
                    onClick={() => handleColorToggle(col.name)}
                    className={`flex items-center gap-2.5 w-full text-left py-1 px-2 rounded-md transition-colors ${
                      selectedColors.includes(col.name) ? 'bg-gray-100 font-bold text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span>{col.name}</span>
                    {selectedColors.includes(col.name) && <Check className="w-3 h-3 ml-auto text-emerald-600" />}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* ── RIGHT PRODUCTS GRID ── */}
          <main className="lg:col-span-9">
            {displayedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center my-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Search className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">No products match your filter</h3>
                <p className="text-xs text-gray-500 mb-6">Try clearing some of your filter criteria or search query.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-full bg-[#122B2B] text-white text-xs font-bold shadow-md hover:bg-[#B8925A] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {displayedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Card Top Image Container */}
                    <div className="relative h-56 sm:h-72 w-full bg-gray-50 overflow-hidden cursor-pointer" onClick={() => setQuickViewProduct(product)}>
                      {/* Product Image */}
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Top Badges (NEW IN / ON SALE / DISCOUNT) */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        {product.isNew && (
                          <span className="px-2 py-0.5 rounded-full bg-lime-400 text-gray-950 font-extrabold text-[9px] sm:text-[10px] uppercase tracking-wider shadow-sm">
                            NEW IN
                          </span>
                        )}
                        {product.isOnSale && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-extrabold text-[9px] sm:text-[10px] uppercase tracking-wider shadow-sm">
                            ON SALE ({product.discountPercent})
                          </span>
                        )}
                      </div>

                      {/* Quick Eye Button & Heart Wishlist */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product.id);
                          }}
                          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-gray-700 hover:text-red-500 transition-all hover:scale-110"
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(product);
                          }}
                          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-gray-700 hover:text-[#122B2B] transition-all hover:scale-110"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Card Content Footer */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
                      <div>
                        {/* Rating & Reviews */}
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="flex items-center text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </div>
                          <span className="text-xs font-bold text-gray-800">{product.rating}</span>
                          <span className="text-[11px] text-gray-400">({product.reviewsCount})</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-sans text-sm font-bold text-gray-900 group-hover:text-[#B8925A] transition-colors leading-snug line-clamp-2">
                          {product.title}
                        </h3>
                      </div>

                      {/* Price & Color swatches */}
                      <div className="pt-3 sm:pt-4 border-t border-gray-100 mt-3 sm:mt-4 flex items-center justify-between">
                        {/* Price Display */}
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm sm:text-base font-extrabold text-gray-900">
                            ${product.discountPrice}.00
                          </span>
                          {product.originalPrice > product.discountPrice && (
                            <span className="text-[11px] sm:text-xs text-gray-400 line-through font-medium">
                              ${product.originalPrice}.00
                            </span>
                          )}
                        </div>

                        {/* Color Swatch Dot */}
                        <div className="flex items-center gap-1">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-inner"
                            style={{ backgroundColor: product.colorHex }}
                            title={product.color}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ── PAGINATION CONTROLS ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-8 sm:pt-12 pb-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 disabled:opacity-40 disabled:hover:border-gray-300 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all ${
                        currentPage === page
                          ? 'bg-[#122B2B] text-white font-bold shadow'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 disabled:opacity-40 disabled:hover:border-gray-300 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* ── MOBILE FILTERS MODAL / DRAWER ── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-h-[85vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 text-gray-900"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#122B2B]" />
                  <h3 className="font-serif text-lg font-bold">Filters</h3>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-6">
                {/* 1. Availability */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-gray-900 mb-2">Availability</h4>
                  <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-[#122B2B] focus:ring-[#122B2B]"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>

                {/* 2. Product Type */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-gray-900 mb-2">Product Type</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {typeOptions.map(type => (
                      <label key={type.id} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedProductTypes.includes(type.id)}
                          onChange={() => handleTypeToggle(type.id)}
                          className="w-4 h-4 rounded border-gray-300 text-[#122B2B] focus:ring-[#122B2B]"
                        />
                        <span>{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 3. Price Filter */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs uppercase tracking-wider font-extrabold text-gray-900">Max Price</h4>
                    <span className="text-xs font-bold text-gray-900">${priceRange}.00</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1200"
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-[#122B2B] bg-gray-200 rounded-lg h-1.5 cursor-pointer"
                  />
                </div>

                {/* 4. Color Options */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-gray-900 mb-2">Colour</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {colorOptions.map(col => (
                      <button
                        key={col.name}
                        onClick={() => handleColorToggle(col.name)}
                        className={`flex items-center gap-2 py-1.5 px-2 rounded-lg border text-left text-xs transition-colors ${
                          selectedColors.includes(col.name) ? 'border-[#122B2B] bg-gray-100 font-bold' : 'border-gray-200 text-gray-700'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-gray-300 shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span className="truncate">{col.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2.5 rounded-full bg-[#122B2B] text-white text-xs font-bold hover:bg-[#B8925A] transition-colors"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── QUICK VIEW MODAL ── */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 z-10 p-5 sm:p-8 my-auto"
            >
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-900 p-1.5 sm:p-2 rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
                <div className="h-52 sm:h-72 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100">
                  <img src={quickViewProduct.image} alt={quickViewProduct.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-[#B8925A]">
                    {quickViewProduct.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-1 mb-2">
                    {quickViewProduct.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {quickViewProduct.description}
                  </p>
                  <div className="flex items-baseline gap-2 sm:gap-3 mb-5 sm:mb-6">
                    <span className="text-xl sm:text-2xl font-black text-gray-900">${quickViewProduct.discountPrice}.00</span>
                    <span className="text-xs sm:text-sm text-gray-400 line-through">${quickViewProduct.originalPrice}.00</span>
                  </div>
                  <a
                    href="#bespoke-builder"
                    onClick={() => setQuickViewProduct(null)}
                    className="block w-full text-center py-3 rounded-full bg-[#122B2B] text-white font-bold text-xs hover:bg-[#B8925A] transition-colors shadow-lg"
                  >
                    Custom Order via Bespoke Builder
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
