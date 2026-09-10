import React from 'react';
import { motion } from 'framer-motion';
import { useMotionConfig } from '../hooks/useMotionConfig';

export default function BrandIntro() {
  const { prefersReducedMotion } = useMotionConfig();

  const brandIntroVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: prefersReducedMotion ? 0 : 0.6, 
        ease: 'easeOut' 
      } 
    }
  };

  return (
    <motion.section
      id="about"
      className="py-16 sm:py-24 md:py-36 bg-[#F5EFE6] text-[#3A2A1E] relative overflow-hidden"
      variants={brandIntroVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Subtle Ornamental Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-10"
        >
          <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#B8925A]"></div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-medium text-[#B8925A]">
            The Heaven Philosophy
          </span>
          <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#B8925A]"></div>
        </motion.div>

        {/* Short 2-3 line Editorial Statement */}
        <motion.blockquote
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="font-serif text-xl sm:text-3xl md:text-5xl font-medium leading-[1.38] sm:leading-[1.35] tracking-tight text-[#122B2B]"
        >
          "We believe true luxury is not mass-produced in factories. It is conceived in quiet dialogue, sculpted from seasoned solid timbers, and personalized to echo the distinct character of your home."
        </motion.blockquote>

        {/* Supporting subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.25, ease: 'easeOut' }}
          className="mt-6 sm:mt-8 text-xs sm:text-base text-[#3A2A1E]/75 font-normal max-w-xl mx-auto tracking-wide uppercase"
        >
          Crafting Bespoke Masterpieces in Chattogram Since 1998
        </motion.p>
      </div>
    </motion.section>
  );
}
