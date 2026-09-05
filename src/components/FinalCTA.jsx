import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { useMotionConfig } from '../hooks/useMotionConfig';

export default function FinalCTA() {
  const { prefersReducedMotion } = useMotionConfig();

  const ctaVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: prefersReducedMotion ? 'tween' : 'spring', 
        stiffness: 120, 
        damping: 12 
      } 
    }
  };

  const whatsappUrl = "https://wa.me/8801960481983?text=Hi%20Heaven%20Furniture%20Mart,%20I'd%20like%20to%20schedule%20a%20free%20design%20consultation%20for%20my%20home.";

  return (
    <motion.section
      className="py-24 bg-[#122B2B] text-white relative overflow-hidden border-t border-[#B8925A]/20"
      variants={ctaVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(#B8925A_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1919] border border-[#B8925A]/40 text-[#B8925A] text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span>Bespoke Design Journey</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6"
        >
          Ready to Craft Your <br />
          <span className="italic gold-gradient-text">Signature Piece?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
          className="text-base sm:text-lg text-white/75 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Connect directly with our senior design team in Chattogram. Experience complimentary 3D spatial planning, wood timber selection, and transparent quote estimations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.24, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-base transition-all transform hover:-translate-y-0.5 shadow-2xl shadow-[#25D366]/30"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="tel:+8801960481983"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/20 text-white font-medium text-base hover:border-[#B8925A] hover:text-[#B8925A] transition-all backdrop-blur-sm"
          >
            <Phone className="w-4 h-4 text-[#B8925A]" />
            <span>Call Showroom</span>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
