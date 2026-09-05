import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Globe } from 'lucide-react';
import { useMotionConfig } from '../hooks/useMotionConfig';

export default function SocialProof() {
  const { prefersReducedMotion } = useMotionConfig();

  const socialProofVariants = {
    hidden: { opacity: 0, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(8px)' },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      transition: { 
        duration: prefersReducedMotion ? 0 : 0.8, 
        ease: 'easeOut' 
      } 
    }
  };

  return (
    <motion.section
      className="py-28 bg-[#F5EFE6] text-[#3A2A1E] relative overflow-hidden"
      variants={socialProofVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Quote + MD Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* MD Image (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative z-10">
              <img
                src="/assets/abu kalam.jpg"
                alt="Abul Kalam Bhuiyan - Managing Director & Founder, Heaven Furniture Mart"
                className="w-full h-[440px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#122B2B]/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif text-lg font-bold">Abul Kalam Bhuiyan</p>
                <p className="text-xs text-[#B8925A] uppercase tracking-wider font-medium">
                  Managing Director &amp; Founder
                </p>
              </div>
            </div>

            {/* Backing Ornamental Frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#B8925A]/40 rounded-2xl -z-0"></div>
          </motion.div>

          {/* Large Serif Quote (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <span className="text-5xl font-serif text-[#B8925A] block leading-none mb-4">"</span>
            <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#122B2B] leading-[1.3] mb-8 font-medium">
              Every curve, grain, and joinery in our furniture reflects a heritage of passion. We don't just furnish spaces in Chattogram; we create heirloom art that families cherish for generations.
            </blockquote>

            <div>
              <p className="font-bold text-lg text-[#122B2B]">Abul Kalam Bhuiyan</p>
              <p className="text-xs uppercase tracking-widest text-[#B8925A] font-semibold mt-1">
                Managing Director • Heaven Furniture Mart
              </p>
            </div>
          </motion.div>
        </div>

        {/* Milestones & Industry Recognitions Row */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="pt-10 border-t border-[#3A2A1E]/15 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#122B2B] text-[#B8925A] flex items-center justify-center flex-shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#122B2B]">International Furniture Fair</h4>
              <p className="text-xs text-[#3A2A1E]/70">Excellence in Wood Craftsmanship Award</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#122B2B] text-[#B8925A] flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#122B2B]">Chittagong Chamber of Commerce</h4>
              <p className="text-xs text-[#3A2A1E]/70">Recognized Premier Industry Member</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#122B2B] text-[#B8925A] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#122B2B]">BFIOA Certified</h4>
              <p className="text-xs text-[#3A2A1E]/70">Bangladesh Furniture Industry Owners Assoc.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
