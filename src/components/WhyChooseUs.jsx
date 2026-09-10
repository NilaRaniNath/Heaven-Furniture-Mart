import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Ruler, Hammer, Truck, CreditCard, Home } from 'lucide-react';
import { useMotionConfig } from '../hooks/useMotionConfig';

const trustPoints = [
  {
    icon: Palette,
    title: 'Free Design Consultation',
    description: 'Work directly with expert interior designers and 3D artisans to map out your dream layout without commitment.',
  },
  {
    icon: Ruler,
    title: 'Fully Bespoke',
    description: 'Custom dimensions, bespoke wood stains, fabric textures, and hand-carved motifs crafted to your exact space.',
  },
  {
    icon: Hammer,
    title: 'Premium Materials & Craftsmanship',
    description: '100% seasoned Burmese teak, Chittagong teak, and solid walnut worked by master wood craftsmen.',
  },
  {
    icon: Truck,
    title: 'Delivery & Installation Included',
    description: 'White-glove delivery, room placement, and professional architectural installation directly across Chattogram.',
  },
  {
    icon: CreditCard,
    title: 'Easy Payment Options',
    description: 'Flexible milestone payment plans, custom installment schemes, and transparent pricing structures.',
  },
  {
    icon: Home,
    title: 'Trusted By Hundreds Of Homes',
    description: 'Adorning premier residences, luxury penthouses, and executive offices across Chittagong Division for decades.',
  },
];

export default function WhyChooseUs() {
  const { prefersReducedMotion, cardHover } = useMotionConfig();

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <motion.section
      id="why-us"
      className="py-16 sm:py-24 bg-[#122B2B] text-white relative"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Subtle Background Accent Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B8925A]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#B8925A]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B8925A] font-semibold mb-2 sm:mb-3"
          >
            The Distinction
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-6"
          >
            Why Choose <span className="italic gold-gradient-text">Heaven</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
            className="text-xs sm:text-base text-white/70 font-light leading-relaxed"
          >
            From raw seasoned timber to white-glove installation in your home, experience an uncompromised standard of bespoke excellence.
          </motion.p>
        </div>

        {/* 6 Trust Points Grid — staggered cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {trustPoints.map((point) => {
            const IconComponent = point.icon;
            return (
              <motion.div
                key={point.title}
                variants={itemVariants}
                whileHover={cardHover}
                className="group p-5 sm:p-8 rounded-2xl bg-[#0A1919]/60 border border-white/10 hover:border-[#B8925A]/50 transition-colors duration-300 hover:shadow-2xl hover:shadow-[#B8925A]/10 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#122B2B] border border-[#B8925A]/30 flex items-center justify-center text-[#B8925A] group-hover:scale-110 group-hover:border-[#B8925A] group-hover:bg-[#B8925A] group-hover:text-[#122B2B] transition-all duration-300 mb-4 sm:mb-6">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 transition-colors" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-[#B8925A] transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-light">
                    {point.description}
                  </p>
                </div>

                {/* Corner Accent Line */}
                <div className="w-8 h-0.5 bg-[#B8925A]/20 group-hover:w-full group-hover:bg-[#B8925A] transition-all duration-500 mt-5 sm:mt-6"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
