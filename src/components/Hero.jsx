import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { useMotionConfig } from '../hooks/useMotionConfig';

export default function Hero() {
  const { prefersReducedMotion } = useMotionConfig();

  const heroVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 1.08 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: prefersReducedMotion ? 0 : 1.2, 
        ease: 'easeOut' 
      } 
    }
  };

  return (
    <>
      {/* ─── 1. Main Hero Banner ────────────────────────────────────────────── */}
      <motion.section 
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-start overflow-hidden pt-28 pb-16"
      >
        {/* Crisp Unaltered Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_furniture.jpg"
            alt="Heaven Furniture Mart Bespoke Living Room"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle directional ambient scrim to balance natural light with high text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#122B2B]/85 via-[#122B2B]/45 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#122B2B]/60 via-transparent to-transparent"></div>
        </div>

        {/* ─── Modern Luxury Hero Card (Editorial Glassmorphic Design) ──────── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.65, ease: 'easeOut' }}
            className="max-w-2xl bg-[#122B2B]/80 backdrop-blur-xl p-7 sm:p-10 md:p-12 rounded-3xl border border-[#B8925A]/30 shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
          >
            {/* Subtitle Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-[#B8925A]/15 border border-[#B8925A]/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4A84B]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#D4A84B]">
                New Season Collection 2026
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.55, delay: 0.2 }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-5"
            >
              Bring Warmth <br />
              <span className="italic font-normal text-[#F5EFE6] bg-gradient-to-r from-[#F5EFE6] via-[#E8C97A] to-[#B8925A] bg-clip-text text-transparent">
                Into Your Space.
              </span>
            </motion.h1>

            {/* Editorial Description */}
            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-[#F5EFE6]/90 font-light leading-relaxed mb-8 max-w-xl"
            >
              Soft textures, natural timber tones, and thoughtfully designed solid wood furniture to create a home that feels calm, luxurious, and inviting.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              {/* Primary Button */}
              <a
                href="#collections"
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-[#D4A84B] via-[#B8925A] to-[#C99C53] text-[#122B2B] font-bold text-xs sm:text-sm uppercase tracking-wider hover:shadow-[0_0_25px_rgba(184,146,90,0.5)] transition-all transform hover:-translate-y-0.5 group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 text-[#122B2B] group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary Outline Button */}
              <a
                href="#bespoke-builder"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl border border-white/30 text-white hover:text-[#D4A84B] hover:border-[#D4A84B] hover:bg-white/5 transition-all text-xs sm:text-sm font-semibold tracking-wider uppercase"
              >
                <span>Bespoke Lookbook</span>
              </a>
            </motion.div>

            {/* Quick Micro Badges */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-[11px] text-[#F5EFE6]/75 uppercase tracking-wider font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#B8925A]" />
                100% Solid Seasoned Teak
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#B8925A]" />
                25+ Years Legacy
              </span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── 2. Horizontal Marquee Strip (Clean Section Below Banner) ──────── */}
      <section
        aria-label="Trust Features Marquee"
        className="relative z-20 w-full overflow-hidden bg-[#0D2020] text-[#F5EFE6] py-3.5 border-y border-[#B8925A]/25 shadow-lg"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              duration: prefersReducedMotion ? 0 : 24,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            },
          }}
          style={{ willChange: 'transform' }}
        >
          {/* Seamless duplicate copy for infinite continuous scrolling */}
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0">
              {[
                'Designed. Crafted. Customized.',
                'Free Design Consultation in Chattogram',
                '100% Fully Bespoke Woodcraft',
                'Grade-A Seasoned Segun & Teak',
                'Delivery & Assembly Included',
                'Trusted By 2,500+ Homes Across Bangladesh',
              ].map((phrase, i) => (
                <span key={`${copy}-${i}`} className="flex items-center shrink-0">
                  <span
                    className="text-xs sm:text-[13px] uppercase font-semibold tracking-[0.15em] text-[#F5EFE6]/90"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {phrase}
                  </span>
                  <span className="mx-6 sm:mx-8 text-[#D4A84B] text-[10px] select-none">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
