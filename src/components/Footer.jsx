import React from 'react';
import { MapPin, Phone, Mail, Sparkles, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.footer 
      className="bg-[#0A1919] text-white/80 pt-16 pb-12 border-t border-white/10"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#B8925A] flex items-center justify-center bg-[#122B2B] text-[#B8925A]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  HEAVEN
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#B8925A] block">
                  Furniture Mart
                </span>
              </div>
            </div>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Chattogram's premier atelier for luxury solid wood bespoke furniture. Handcrafted with passion, engineered for endurance.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-[#B8925A]/30 pb-2">
              Atelier & Showroom
            </h4>
            <ul className="space-y-3 text-xs text-white/70 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B8925A] flex-shrink-0 mt-0.5" />
                <span>Agrabad Access Road, Chattogram, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B8925A] flex-shrink-0" />
                <a href="tel:+8801960481983" className="hover:text-[#B8925A] transition-colors">
                  +880 1960-481983
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#B8925A] flex-shrink-0" />
                <a
                  href="https://wa.me/8801960481983"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B8925A] transition-colors"
                >
                  WhatsApp: +880 1960-481983
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B8925A] flex-shrink-0" />
                <a href="mailto:info@heavenfurnituremart.com" className="hover:text-[#B8925A] transition-colors">
                  info@heavenfurnituremart.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-[#B8925A]/30 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-white/70 font-light">
              <li>
                <a href="#about" className="hover:text-[#B8925A] transition-colors">
                  Our Legacy & Philosophy
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#B8925A] transition-colors">
                  Why Choose Heaven
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#B8925A] transition-colors">
                  Curated Collections
                </a>
              </li>
              <li>
                <a href="#bespoke-builder" className="hover:text-[#B8925A] transition-colors">
                  3-Step Bespoke Configurator
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links & Hours */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-[#B8925A]/30 pb-2">
              Connect With Us
            </h4>
            <p className="text-xs text-white/60 mb-4 font-light">
              Follow our atelier workshop highlights, new timber arrivals, and customer home reveals.
            </p>
            <div className="flex items-center gap-3">
              {/* Facebook Icon */}
              <a
                href="https://www.facebook.com/HeavenFurnitureMart"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#122B2B] border border-white/15 flex items-center justify-center text-white/80 hover:text-[#B8925A] hover:border-[#B8925A] transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram Icon */}
              <a
                href="https://www.instagram.com/heaven_furniture_ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#122B2B] border border-white/15 flex items-center justify-center text-white/80 hover:text-[#B8925A] hover:border-[#B8925A] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* YouTube Icon */}
              <a
                href="https://www.youtube.com/@HeavenFurnitureMart"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#122B2B] border border-white/15 flex items-center justify-center text-white/80 hover:text-[#B8925A] hover:border-[#B8925A] transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* WhatsApp Icon */}
              <a
                href="https://wa.me/8801960481983"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#122B2B] border border-white/15 flex items-center justify-center text-white/80 hover:text-[#B8925A] hover:border-[#B8925A] transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-4">
          <p>© {new Date().getFullYear()} Heaven Furniture Mart. All rights reserved. Agrabad Access Road, Chattogram.</p>
          <p className="font-light">Crafted for Luxury Bespoke Living</p>
        </div>
      </div>
    </motion.footer>
  );
}
