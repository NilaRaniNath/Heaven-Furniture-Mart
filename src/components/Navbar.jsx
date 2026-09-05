import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Phone, Menu, X, Sparkles, Trash2, ExternalLink } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

/* ── Navigation links config ─────────────────────────────────────────────────── */
const navLinks = [
  { id: 'home',       label: 'Home',            href: '/' },
  { id: 'collections',label: 'Collections',     href: '/collections' },
  { id: 'bespoke',    label: 'Bespoke Builder', href: '/#bespoke-builder', accent: true },
];

/* ── Custom SVG Logo Icon (Royal Crown / Crest) ──────────────────────────────── */
function HeavenLogo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer radiant ring */}
      <circle cx="24" cy="24" r="22" stroke="url(#logoGrad)" strokeWidth="1.5" opacity="0.5" />
      {/* Inner filled circle */}
      <circle cx="24" cy="24" r="18" fill="url(#logoGrad)" opacity="0.12" />
      {/* Crown silhouette – five-pointed with jewel dots */}
      <path
        d="M14 30 L14 22 L18 26 L21 18 L24 24 L27 18 L30 26 L34 22 L34 30 Z"
        fill="url(#logoGrad)"
        stroke="url(#logoGrad)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* Crown base bar */}
      <rect x="13" y="30" width="22" height="2.5" rx="1.25" fill="url(#logoGrad)" />
      {/* Three jewel dots at crown peaks */}
      <circle cx="21" cy="17" r="1.2" fill="#F5EFE6" />
      <circle cx="24" cy="14" r="1.5" fill="#F5EFE6" />
      <circle cx="27" cy="17" r="1.2" fill="#F5EFE6" />
      {/* "H" monogram beneath crown */}
      <text
        x="24"
        y="42"
        textAnchor="middle"
        fill="url(#logoGrad)"
        fontSize="8"
        fontWeight="700"
        fontFamily="serif"
        letterSpacing="1"
      >
        H
      </text>
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#D4A84B" />
          <stop offset="50%" stopColor="#B8925A" />
          <stop offset="100%" stopColor="#E8C97A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Navbar Component ────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [cartCount] = useState(1);

  const {
    favorites,
    favoritedProducts,
    removeFavorite,
    clearFavorites,
    isFavoritesOpen,
    setIsFavoritesOpen
  } = useFavorites();
  
  const wishlistCount = favorites.length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#122B2B]/95 backdrop-blur-xl py-2.5 border-b border-[#B8925A]/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-gradient-to-b from-[#122B2B]/90 via-[#122B2B]/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ───── Three-column grid: Logo | Nav | Utils ───── */}
        <div className="flex items-center justify-between lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-6">

          {/* ─── LEFT: Brand Logo + Name ─── */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            {/* Animated logo wrapper */}
            <motion.div
              className="relative"
              whileHover={{ rotate: [0, -6, 6, -3, 0], scale: 1.08 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <HeavenLogo className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-[0_0_8px_rgba(184,146,90,0.4)]" />
              {/* Subtle glow ring behind logo on scroll */}
              <div className={`absolute inset-0 rounded-full transition-opacity duration-700 ${
                isScrolled ? 'opacity-100' : 'opacity-0'
              } bg-[#B8925A]/10 blur-md -z-10 scale-125`} />
            </motion.div>

            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.18em] text-white group-hover:text-[#B8925A] transition-colors duration-300 leading-none">
                HEAVEN
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#B8925A]/90 font-semibold mt-0.5 leading-none">
                Furniture Mart
              </span>
            </div>
          </Link>

          {/* ─── CENTER: Navigation Links with animated hover pill ─── */}
          <nav
            className="hidden lg:flex items-center justify-center gap-1"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.href}
                className="relative px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-200 rounded-full"
                onMouseEnter={() => setHoveredLink(link.id)}
                style={{
                  color: hoveredLink === link.id
                    ? '#122B2B'
                    : link.accent
                      ? '#B8925A'
                      : 'rgba(255,255,255,0.88)',
                }}
              >
                {/* Animated hover pill background */}
                <AnimatePresence>
                  {hoveredLink === link.id && (
                    <motion.span
                      layoutId="navbar-hover-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4A84B] via-[#B8925A] to-[#E8C97A] shadow-[0_0_16px_rgba(184,146,90,0.35)]"
                      style={{ zIndex: -1 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 28,
                        opacity: { duration: 0.18 },
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Accent dot for Bespoke Builder */}
                {link.accent && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B8925A] animate-pulse mr-1.5 align-middle" />
                )}

                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* ─── RIGHT: Utility Icons & Phone CTA ─── */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:flex text-white/75 hover:text-[#B8925A] transition-colors p-1.5 rounded-full hover:bg-white/5"
              aria-label="Search"
            >
              <Search className="w-[17px] h-[17px]" />
            </motion.button>

            {/* Wishlist Icon Button */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsFavoritesOpen(true)}
              className="hidden sm:flex text-white/75 hover:text-[#B8925A] transition-colors p-1.5 relative rounded-full hover:bg-white/5 cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className={`w-[17px] h-[17px] ${wishlistCount > 0 ? 'text-red-400 fill-red-400' : ''}`} />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-[#D4A84B] to-[#B8925A] text-[#122B2B] text-[9px] font-bold rounded-full flex items-center justify-center shadow-md"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </motion.button>

            {/* Cart / Quote Bag */}
            <motion.a
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              href="#bespoke-builder"
              className="hidden sm:flex text-white/75 hover:text-[#B8925A] transition-colors p-1.5 relative rounded-full hover:bg-white/5"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-[17px] h-[17px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-[#D4A84B] to-[#B8925A] text-[#122B2B] text-[9px] font-bold rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </motion.a>

            {/* Divider */}
            <div className="hidden lg:block w-px h-5 bg-white/15" />

            {/* Phone CTA pill */}
            <motion.a
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              href="tel:+8801960481983"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold border border-[#B8925A]/40 text-white/90 hover:border-[#B8925A] hover:text-[#B8925A] hover:bg-[#B8925A]/10 transition-all duration-300 backdrop-blur-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#B8925A]" />
              <span>+880 1960-481983</span>
            </motion.a>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-[#B8925A]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ───── Search Bar Overlay ───── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden bg-[#122B2B]/95 border-b border-[#B8925A]/25 shadow-xl backdrop-blur-lg"
          >
            <div className="max-w-xl mx-auto relative flex items-center py-3.5 px-4">
              <Search className="absolute left-7 w-4 h-4 text-[#B8925A]/70" />
              <input
                type="text"
                autoFocus
                placeholder="Search teak sofas, dining tables, bed sets..."
                className="w-full bg-[#0D2020] text-white text-xs pl-10 pr-10 py-2.5 rounded-full border border-[#B8925A]/30 focus:outline-none focus:border-[#B8925A] focus:shadow-[0_0_12px_rgba(184,146,90,0.15)] transition-all placeholder:text-white/35"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-7 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───── Mobile Drawer ───── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-[#122B2B]/98 backdrop-blur-xl border-b border-[#B8925A]/20"
          >
            <div className="px-6 py-7 space-y-1">
              {navLinks.map((link, i) => (
                <Link
                  key={link.id}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-xl text-base font-medium transition-all duration-200 ${
                    link.accent
                      ? 'text-[#B8925A] font-semibold bg-[#B8925A]/8 hover:bg-[#B8925A]/15'
                      : 'text-white/85 hover:text-[#B8925A] hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {link.accent && (
                      <Sparkles className="w-4 h-4 text-[#B8925A]" />
                    )}
                    {link.label}
                  </span>
                </Link>
              ))}

              {/* Mobile utilities row */}
              <div className="flex items-center justify-between gap-4 pt-5 mt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsFavoritesOpen(true);
                  }}
                  className="flex items-center gap-2 text-white/80 hover:text-[#B8925A] transition-colors p-2 text-xs font-semibold rounded-lg bg-white/5 border border-white/10"
                >
                  <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-red-400 fill-red-400' : ''}`} />
                  <span>Wishlist ({wishlistCount})</span>
                </button>
                <a href="#bespoke-builder" className="text-white/70 hover:text-[#B8925A] transition-colors p-2">
                  <ShoppingBag className="w-5 h-5" />
                </a>
                <a
                  href="tel:+8801960481983"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-[#B8925A]/40 text-[#B8925A] hover:bg-[#B8925A]/10 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>

    {/* ───── Favorites / Wishlist Modal / Drawer (Rendered outside header for instant popup) ───── */}
    <AnimatePresence>
      {isFavoritesOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Dark Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFavoritesOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#122B2B] text-white rounded-3xl shadow-2xl border border-[#B8925A]/30 overflow-hidden z-10 my-auto flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 sm:p-7 border-b border-white/10 flex items-center justify-between bg-[#0D2020]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B8925A]/15 border border-[#B8925A]/30 flex items-center justify-center text-[#B8925A]">
                  <Heart className="w-5 h-5 fill-[#B8925A]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    Saved Favorites
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#B8925A]/20 text-[#B8925A] font-sans border border-[#B8925A]/30">
                      {favoritedProducts.length} items
                    </span>
                  </h3>
                  <p className="text-xs text-white/60 font-light mt-0.5">
                    Your curated personal collection of teak furniture
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsFavoritesOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B8925A] hover:text-[#122B2B] text-white transition-all flex items-center justify-center border border-white/15"
                aria-label="Close Favorites"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body / Items List */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {favoritedProducts.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 mb-4">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-serif font-bold text-white/90 mb-1">No Favorites Yet</h4>
                  <p className="text-xs text-white/60 max-w-sm font-light mb-6">
                    Click the heart emoji on any furniture piece in our collections to save it here for quick access.
                  </p>
                  <Link
                    to="/collections"
                    onClick={() => setIsFavoritesOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-[#B8925A] text-[#122B2B] font-bold text-xs hover:bg-[#D4AF77] transition-all shadow-md"
                  >
                    Browse Collections
                  </Link>
                </div>
              ) : (
                favoritedProducts.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D2020] border border-white/10 hover:border-[#B8925A]/40 transition-all"
                  >
                    {/* Product Thumbnail & Details */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#B8925A] font-semibold">
                          {item.pieces}
                        </span>
                        <h4 className="font-serif text-base font-bold text-white group-hover:text-[#B8925A] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-white/60 font-light line-clamp-1 mt-0.5">
                          {item.subtitle}
                        </p>
                        <p className="text-[11px] text-emerald-400 font-medium mt-1">
                          {item.specs.material}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-center w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-0 border-white/5">
                      <Link
                        to="/#bespoke-builder"
                        onClick={() => setIsFavoritesOpen(false)}
                        className="px-4 py-2 rounded-full bg-[#B8925A]/15 hover:bg-[#B8925A] text-[#B8925A] hover:text-[#122B2B] text-xs font-semibold border border-[#B8925A]/30 transition-all inline-flex items-center gap-1.5"
                      >
                        <span>Request Quote</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={() => removeFavorite(item.id)}
                        className="p-2 rounded-full text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Actions */}
            {favoritedProducts.length > 0 && (
              <div className="p-5 border-t border-white/10 bg-[#0D2020] flex items-center justify-between">
                <button
                  onClick={clearFavorites}
                  className="text-xs text-white/50 hover:text-red-400 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>

                <Link
                  to="/#bespoke-builder"
                  onClick={() => setIsFavoritesOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#B8925A] text-[#122B2B] font-bold text-xs hover:bg-[#D4AF77] transition-all shadow-lg shadow-[#B8925A]/20"
                >
                  Customize Selected Items
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
