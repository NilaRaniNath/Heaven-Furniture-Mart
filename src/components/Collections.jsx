import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, X, Eye, Check, ChevronRight, Layers, ShieldCheck, Heart } from 'lucide-react';
import { useMotionConfig } from '../hooks/useMotionConfig';
import { useFavorites, collectionsData } from '../context/FavoritesContext';

const categoryTabs = [
  { id: 'all', label: 'All Collections' },
  { id: 'living', label: 'Living Room' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'dining', label: 'Dining' },
  { id: 'office', label: 'Office & Lounge' },
  { id: 'dressing', label: 'Dressing & Storage' }
];

export default function Collections() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeGalleryImg, setActiveGalleryImg] = useState('');
  
  const { favorites, toggleFavorite } = useFavorites();

  const filteredItems = activeTab === 'all'
    ? collectionsData
    : collectionsData.filter(item => item.category === activeTab);

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setActiveGalleryImg(product.image);
  };

  const handleToggleFavorite = (e, id) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  const { prefersReducedMotion, sectionVariants, cardHover } = useMotionConfig();

  const getCardVariants = (index) => {
    if (prefersReducedMotion) {
      return { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7 } } };
    }
    const isEven = index % 2 === 0;
    return {
      hidden: { opacity: 0, x: isEven ? 40 : -40 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
    };
  };

  return (
    <motion.section
      id="collections"
      className="py-24 bg-[#F5EFE6] text-[#3A2A1E] relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B8925A]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#122B2B]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Accent Underline matching reference image */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#122B2B]/10 text-[#122B2B] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B8925A]" />
            <span>Curated Masterpieces</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
            className="relative inline-block mb-4"
          >
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#122B2B]">
              Our <span className="relative inline-block text-[#B8925A]">
                Collections
                {/* Styled Underline Accent as seen in reference design */}
                <span className="absolute bottom-[-6px] left-0 w-full h-[3px] bg-[#B8925A] rounded-full"></span>
              </span>
            </h2>
          </motion.div>

          <p className="text-sm sm:text-base text-[#3A2A1E]/80 max-w-2xl font-light mt-2">
            Explore our signature range of solid wood creations. Designed for elegance, handcrafted for longevity, and tailored to fit your lifestyle seamlessly.
          </p>

          {/* Direct Button to Full Collections Page */}
          <div className="mt-5">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#B8925A] text-[#122B2B] text-xs font-bold shadow-md hover:bg-[#122B2B] hover:text-[#B8925A] transition-all duration-300 group"
            >
              <span>View Full Products Catalog</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Interactive Filter Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#3A2A1E]/10 shadow-sm">
            {categoryTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#122B2B] text-white shadow-md shadow-[#122B2B]/20 scale-105'
                    : 'text-[#3A2A1E]/70 hover:text-[#122B2B] hover:bg-[#122B2B]/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Container */}
        {activeTab === 'all' ? (
          /* Asymmetrical Reference Bento Grid Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            
            {/* LEFT COLUMN: Top-Left Card & Bottom-Left Couch Card */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* TOP LEFT CARD: Outdoor & Lounge Chair */}
              <motion.div
                variants={getCardVariants(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={cardHover}
                onClick={() => openQuickView(collectionsData[0])}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#E65100] via-[#F57C00] to-[#E65100] text-white shadow-xl min-h-[320px] sm:min-h-[360px] p-8 flex flex-col justify-between cursor-pointer border border-white/20 transition-shadow duration-300 hover:shadow-2xl"
              >
                {/* Background Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10"></div>
                
                {/* Title & Tag */}
                <div className="relative z-20 max-w-sm">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold tracking-wider text-white mb-3">
                    {collectionsData[0].pieces}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-white group-hover:text-[#F5EFE6] transition-colors">
                    {collectionsData[0].title}
                  </h3>
                  <p className="text-xs text-white/80 mt-1 font-light">
                    {collectionsData[0].subtitle}
                  </p>
                </div>

                {/* Floating Image Asset */}
                <div className="absolute right-2 bottom-2 sm:right-6 sm:bottom-4 w-52 sm:w-72 h-44 sm:h-56 z-10 overflow-hidden rounded-2xl shadow-lg border border-white/20 group-hover:scale-105 transition-transform duration-700">
                  <img
                    src={collectionsData[0].image}
                    alt={collectionsData[0].title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Favorite & Quick Action */}
                <div className="relative z-20 flex items-center justify-between mt-auto pt-6">
                  <button 
                    onClick={(e) => handleToggleFavorite(e, collectionsData[0].id)}
                    className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#E65100] transition-all"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(collectionsData[0].id) ? 'fill-current text-red-500' : ''}`} />
                  </button>
                  <span className="text-xs font-semibold tracking-wider text-white/90 group-hover:text-white flex items-center gap-1">
                    Explore Details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>

              {/* BOTTOM LEFT CARD: Modern Couches */}
              <motion.div
                variants={getCardVariants(1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                onClick={() => openQuickView(collectionsData[1])}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#D84315] via-[#E65100] to-[#F57C00] text-white shadow-xl min-h-[300px] sm:min-h-[320px] p-8 flex flex-col justify-between cursor-pointer border border-white/20 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                
                {/* Title */}
                <div className="relative z-20 max-w-xs">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold tracking-wider text-white mb-2">
                    {collectionsData[1].pieces}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    {collectionsData[1].title}
                  </h3>
                  <p className="text-xs text-white/80 font-light mt-1">
                    {collectionsData[1].subtitle}
                  </p>
                </div>

                {/* Overlapping Sofa Image */}
                <div className="absolute right-4 bottom-4 w-48 sm:w-64 h-36 sm:h-44 z-10 rounded-2xl overflow-hidden shadow-xl border border-white/20 group-hover:scale-105 transition-transform duration-700">
                  <img
                    src={collectionsData[1].image}
                    alt={collectionsData[1].title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Card Action */}
                <div className="relative z-20 flex items-center justify-between pt-4">
                  <button 
                    onClick={(e) => handleToggleFavorite(e, collectionsData[1].id)}
                    className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#E65100] transition-all"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(collectionsData[1].id) ? 'fill-current text-red-500' : ''}`} />
                  </button>
                  <span className="text-xs font-semibold tracking-wider text-white/90 group-hover:text-white flex items-center gap-1">
                    View Specifications <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>

            </div>

            {/* RIGHT COLUMN: Right Tall Card with "Explore more >>" Pill Button */}
            <div className="lg:col-span-5">
              <motion.div
                variants={getCardVariants(2)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                onClick={() => openQuickView(collectionsData[2])}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#E65100] via-[#EF6C00] to-[#BF360C] text-white shadow-xl min-h-[500px] lg:h-full p-8 flex flex-col justify-between cursor-pointer border border-white/20 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-10"></div>

                {/* Top Pill Button matching reference image: "Explore more >>" */}
                <div className="relative z-20 flex items-center justify-between">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold tracking-wider text-white">
                    Featured Masterpiece
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuickView(collectionsData[2]);
                    }}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white/95 text-[#E65100] hover:bg-white text-xs font-bold shadow-lg hover:scale-105 transition-all"
                  >
                    <span>Explore more</span>
                    <span className="text-sm font-extrabold">»</span>
                  </button>
                </div>

                {/* Main Image Asset */}
                <div className="relative z-10 my-6 w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/20 group-hover:scale-105 transition-transform duration-700">
                  <img
                    src={collectionsData[2].image}
                    alt={collectionsData[2].title}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Subtle Floating Hotspot */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white font-medium border border-white/20">
                    Single-Slab Teak Wood
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="relative z-20 pt-2">
                  <h3 className="font-serif text-3xl font-bold text-white mb-2">
                    {collectionsData[2].title}
                  </h3>
                  <p className="text-xs text-white/80 font-light leading-relaxed mb-4">
                    {collectionsData[2].description}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-white/20 pt-4">
                    <span className="text-xs text-white/90 font-medium">
                      {collectionsData[2].pieces}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#E65100] transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        ) : null}

        {/* Regular Filtered Grid View for Category Selection or Additional Items */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${activeTab === 'all' ? 'mt-8' : ''}`}>
          {(activeTab === 'all' ? collectionsData.slice(3) : filteredItems).map((item, idx) => (
            <motion.div
              key={item.id}
              variants={getCardVariants(activeTab === 'all' ? idx + 3 : idx)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              whileHover={cardHover}
              onClick={() => openQuickView(item)}
              className="group relative rounded-3xl overflow-hidden bg-[#122B2B] text-white shadow-xl min-h-[380px] flex flex-col justify-between cursor-pointer border border-[#B8925A]/20 transition-shadow duration-300 hover:shadow-2xl"
            >
              {/* Image with zoom */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122B2B] via-[#122B2B]/50 to-transparent"></div>
              </div>

              {/* Top Badge */}
              <div className="relative z-10 p-6 flex items-center justify-between">
                <span className="inline-block px-3 py-1 rounded-full bg-[#122B2B]/80 backdrop-blur-md text-[11px] font-semibold text-[#B8925A] border border-[#B8925A]/30">
                  {item.pieces}
                </span>
                <button
                  onClick={(e) => handleToggleFavorite(e, item.id)}
                  className="w-8 h-8 rounded-full bg-[#122B2B]/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-[#B8925A] transition-all"
                >
                  <Heart className={`w-3.5 h-3.5 ${favorites.includes(item.id) ? 'fill-current text-[#B8925A]' : ''}`} />
                </button>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 p-6 flex flex-col justify-end">
                <p className="text-xs uppercase tracking-widest text-[#B8925A] font-medium mb-1">
                  {item.subtitle}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#B8925A] transition-colors">
                    {item.title}
                  </h3>
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#B8925A] group-hover:text-[#122B2B] transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-white/70 font-light mt-2 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Interactive Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#122B2B] text-white rounded-3xl shadow-2xl border border-[#B8925A]/30 overflow-hidden z-10 my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-[#B8925A] hover:text-[#122B2B] text-white transition-all flex items-center justify-center border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Gallery Display */}
                <div className="p-6 sm:p-8 bg-[#0D2020] flex flex-col justify-between">
                  <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-lg mb-4">
                    <img
                      src={activeGalleryImg}
                      alt={selectedProduct.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-[#B8925A] border border-[#B8925A]/30">
                      High-Res Asset Preview
                    </div>
                  </div>

                  {/* Thumbnails */}
                  {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                      {selectedProduct.gallery.map((imgUrl, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveGalleryImg(imgUrl)}
                          className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                            activeGalleryImg === imgUrl ? 'border-[#B8925A] scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Product Info */}
                <div className="p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#B8925A]/20 text-[#B8925A] text-xs font-semibold tracking-wider uppercase mb-3 border border-[#B8925A]/30">
                      {selectedProduct.pieces}
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-white mb-2">
                      {selectedProduct.title}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-[#B8925A] font-medium mb-4">
                      {selectedProduct.subtitle}
                    </p>
                    <p className="text-sm text-white/80 font-light leading-relaxed mb-6">
                      {selectedProduct.description}
                    </p>

                    {/* Specifications Grid */}
                    <div className="space-y-2.5 mb-6 text-xs text-white/90 border-t border-b border-white/10 py-4">
                      <div className="flex justify-between">
                        <span className="text-white/50">Primary Material:</span>
                        <span className="font-medium text-[#B8925A]">{selectedProduct.specs.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Finish Type:</span>
                        <span className="font-medium">{selectedProduct.specs.finish}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Warranty:</span>
                        <span className="font-medium text-emerald-400">{selectedProduct.specs.warranty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Handcrafting Period:</span>
                        <span className="font-medium">{selectedProduct.specs.leadTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href="#bespoke-builder"
                      onClick={() => setSelectedProduct(null)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#B8925A] text-[#122B2B] font-bold text-sm hover:bg-[#D4AF77] transition-all shadow-lg shadow-[#B8925A]/20"
                    >
                      <span>Customize This Design</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.section>
  );
}
