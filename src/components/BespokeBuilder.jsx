import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sofa,
  Bed,
  UtensilsCrossed,
  Briefcase,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  FileCheck,
  Trees,
  Layers,
  Banknote,
  ShieldCheck
} from 'lucide-react';
import { useMotionConfig } from '../hooks/useMotionConfig';

const roomOptions = [
  {
    id: 'Living Room',
    label: 'Living Room',
    desc: 'Sofas, center tables & credenzas',
    startingPrice: '৳45,000',
    icon: Sofa,
    img: '/assets/Sufa.jpg'
  },
  {
    id: 'Bedroom',
    label: 'Bedroom',
    desc: 'King bedsteads & vanity suites',
    startingPrice: '৳40,000',
    icon: Bed,
    img: '/assets/Bed 2.jpg'
  },
  {
    id: 'Dining',
    label: 'Dining',
    desc: 'Grand tables & server sideboards',
    startingPrice: '৳35,000',
    icon: UtensilsCrossed,
    img: '/assets/Dinning table.jpg'
  },
  {
    id: 'Office & Study',
    label: 'Office & Study',
    desc: 'Executive desks & library walls',
    startingPrice: '৳28,000',
    icon: Briefcase,
    img: '/assets/Office chair table.jpg'
  }
];

const styleOptions = [
  {
    id: 'Modern Teak',
    label: 'Modern Teak (সেগুন)',
    desc: 'Clean lines, warm honey grain, satin finish',
    tier: 'Popular Choice',
    colorHex: '#C89B6D'
  },
  {
    id: 'Classic Walnut',
    label: 'Classic Walnut (আখরোট)',
    desc: 'Deep espresso tones, rich grain contrast',
    tier: 'Signature Heritage',
    colorHex: '#3A2A1E'
  },
  {
    id: 'Burma Teak Premium',
    label: 'Burma Teak Premium (বার্মা সেগুন)',
    desc: '100% seasoned mature heartwood, lifetime durability',
    tier: 'Ultra Luxury',
    colorHex: '#9E6D38'
  },
  {
    id: 'Warm Natural Wood',
    label: 'Warm Natural (মেহগনি/গামারি)',
    desc: 'Raw timber aesthetic, organic protective oil finish',
    tier: 'Smart Value',
    colorHex: '#B8925A'
  }
];

const pricingData = {
  'Living Room': [
    { scale: 'Compact', range: '৳45,000 – ৳75,000', min: 45000, max: 75000, desc: 'Single 3-seater solid wood sofa + tea table' },
    { scale: 'Balanced', range: '৳85,000 – ৳1,40,000', min: 85000, max: 140000, desc: 'Full 3+2+1 luxury sofa set + centerpiece credenza' },
    { scale: 'Spacious', range: '৳1,60,000 – ৳2,80,000+', min: 160000, max: 280000, desc: 'Grand L-shape sectional, accent lounge chairs & media wall unit' }
  ],
  'Bedroom': [
    { scale: 'Compact', range: '৳40,000 – ৳70,000', min: 40000, max: 70000, desc: 'Queen solid teak bedstead + 1 side table' },
    { scale: 'Balanced', range: '৳80,000 – ৳1,50,000', min: 80000, max: 150000, desc: 'King bedstead with luxury headboard + 2 side tables + vanity' },
    { scale: 'Spacious', range: '৳1,70,000 – ৳3,10,000+', min: 170000, max: 310000, desc: 'Master suite: King bed, 4-door wardrobe & walk-in dressing unit' }
  ],
  'Dining': [
    { scale: 'Compact', range: '৳35,000 – ৳60,000', min: 35000, max: 60000, desc: '4-seater solid wood dining table + chairs' },
    { scale: 'Balanced', range: '৳70,000 – ৳1,30,000', min: 70000, max: 130000, desc: '6-seater single-slab teak dining table + chairs + dinner wagon' },
    { scale: 'Spacious', range: '৳1,50,000 – ৳2,60,000+', min: 150000, max: 260000, desc: '8-10 seater grand timber banquet table + luxury chairs & sideboard' }
  ],
  'Office & Study': [
    { scale: 'Compact', range: '৳28,000 – ৳48,000', min: 28000, max: 48000, desc: 'Executive writing desk + ergonomic solid chair' },
    { scale: 'Balanced', range: '৳55,000 – ৳98,000', min: 55000, max: 98000, desc: 'L-shape director desk + file storage drawers + chair' },
    { scale: 'Spacious', range: '৳1,20,000 – ৳2,20,000+', min: 120000, max: 220000, desc: 'Full study library wall bookshelf, conference desk & executive seating' }
  ]
};

export default function BespokeBuilder() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState('Living Room');
  const [selectedStyle, setSelectedStyle] = useState('Modern Teak');
  const [scaleIndex, setScaleIndex] = useState(1); // 0: Compact, 1: Balanced, 2: Spacious

  const { crossfadeVariants, prefersReducedMotion } = useMotionConfig();

  const bespokeVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.92 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: prefersReducedMotion ? 0 : 0.7, 
        ease: 'easeOut' 
      } 
    }
  };

  const currentScalePricing = pricingData[selectedRoom]?.[scaleIndex] || pricingData['Living Room'][1];

  // Auto-generated WhatsApp Message including estimated budget in Taka
  const whatsappMessage = `Hi Heaven Furniture Mart, I would like to order a custom ${selectedRoom} set in ${selectedStyle} style, ${currentScalePricing.scale} scale (Estimated Budget: ${currentScalePricing.range} BDT). Can we start with a free design consultation?`;
  const whatsappUrl = `https://wa.me/8801960481983?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.section
      id="bespoke-builder"
      className="py-16 sm:py-28 bg-[#122B2B] text-white relative overflow-hidden"
      variants={bespokeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Background Architectural Grid & Subtle Radial Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#B8925A_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#B8925A]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#0A1919] border border-[#B8925A]/40 text-[#B8925A] text-[10px] sm:text-xs font-medium tracking-wider uppercase mb-3 sm:mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Atelier Studio</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4"
          >
            Bespoke Concept &amp; <span className="italic gold-gradient-text">Budget Calculator</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-base text-white/70 font-light"
          >
            Configure your room, preferred timber style, and size to calculate real-time estimated pricing (BDT) with 3D consultation.
          </motion.p>
        </div>

        {/* Step Indicator Tabs */}
        <div className="flex items-center justify-center max-w-xl mx-auto mb-8 sm:mb-12 overflow-x-auto no-scrollbar py-1">
          {[
            { step: 1, label: '1. Room' },
            { step: 2, label: '2. Style' },
            { step: 3, label: '3. Scale & ৳' }
          ].map((item, idx) => (
            <React.Fragment key={item.step}>
              <button
                onClick={() => setActiveStep(item.step)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                  activeStep === item.step
                    ? 'bg-[#B8925A] text-[#122B2B] font-semibold shadow-lg shadow-[#B8925A]/20'
                    : activeStep > item.step
                    ? 'bg-[#0A1919] text-[#B8925A] border border-[#B8925A]/40'
                    : 'bg-[#0A1919] text-white/50 border border-white/10'
                }`}
              >
                <span>{item.label}</span>
              </button>
              {idx < 2 && (
                <div className={`h-0.5 w-3 sm:w-10 mx-1 transition-colors ${activeStep > item.step ? 'bg-[#B8925A]' : 'bg-white/10'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Builder Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          {/* Left Column: Interactive Step Controls (7 Columns) */}
          <div className="lg:col-span-7 bg-[#0A1919]/80 border border-white/10 rounded-2xl p-4 sm:p-8 backdrop-blur-md">
            <AnimatePresence mode="wait">
              {/* STEP 1: ROOM TYPE */}
              {activeStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-white mb-1 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-[#B8925A]" />
                        <span>Select Room Type</span>
                      </h3>
                      <p className="text-xs text-white/60">Choose which room you are designing custom furniture for.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {roomOptions.map((room) => {
                      const Icon = room.icon;
                      const isSelected = selectedRoom === room.id;
                      return (
                        <div
                          key={room.id}
                          onClick={() => setSelectedRoom(room.id)}
                          className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                            isSelected
                              ? 'bg-[#122B2B] border-[#B8925A] shadow-xl shadow-[#B8925A]/10'
                              : 'bg-[#122B2B]/50 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {/* Selection Badge */}
                          {isSelected && (
                            <div className="absolute top-3 right-3 text-[#B8925A]">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                          )}

                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                                isSelected ? 'bg-[#B8925A] text-[#122B2B]' : 'bg-[#0A1919] text-[#B8925A]'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-serif text-base font-semibold text-white">{room.label}</h4>
                              <span className="text-[11px] font-bold text-[#D4A84B] block">
                                Starts at {room.startingPrice}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-white/60 font-light">{room.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B8925A] text-[#122B2B] font-semibold text-sm hover:bg-[#D4AF77] transition-all shadow-lg"
                    >
                      <span>Continue to Style</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: STYLE & TIMBER */}
              {activeStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h3 className="font-serif text-xl font-bold text-white mb-1 flex items-center gap-2">
                      <Trees className="w-5 h-5 text-[#B8925A]" />
                      <span>Select Timber &amp; Finishing Style</span>
                    </h3>
                    <p className="text-xs text-white/60">Choose the architectural wood stain and authentic wood species.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {styleOptions.map((style) => {
                      const isSelected = selectedStyle === style.id;
                      return (
                        <div
                          key={style.id}
                          onClick={() => setSelectedStyle(style.id)}
                          className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                            isSelected
                              ? 'bg-[#122B2B] border-[#B8925A] shadow-xl shadow-[#B8925A]/10'
                              : 'bg-[#122B2B]/50 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-3 right-3 text-[#B8925A]">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                          )}

                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2.5">
                                <span
                                  className="w-4 h-4 rounded-full border border-white/30 shadow-inner flex-shrink-0"
                                  style={{ backgroundColor: style.colorHex }}
                                ></span>
                                <h4 className="font-serif text-sm sm:text-base font-semibold text-white">{style.label}</h4>
                              </div>
                            </div>
                            <span className="inline-block text-[10px] uppercase tracking-wider font-semibold text-[#D4A84B] bg-[#0A1919] px-2 py-0.5 rounded border border-[#B8925A]/30 mb-2">
                              {style.tier}
                            </span>
                            <p className="text-xs text-white/60 font-light">{style.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to Room</span>
                    </button>
                    <button
                      onClick={() => setActiveStep(3)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B8925A] text-[#122B2B] font-semibold text-sm hover:bg-[#D4AF77] transition-all shadow-lg"
                    >
                      <span>Continue to Scale &amp; Taka</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: SCALE & BUDGET SLIDER */}
              {activeStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h3 className="font-serif text-xl font-bold text-white mb-1 flex items-center gap-2">
                      <Banknote className="w-5 h-5 text-[#B8925A]" />
                      <span>Scale &amp; Estimated Investment (টাকা)</span>
                    </h3>
                    <p className="text-xs text-white/60">Slide to define the physical scale, furniture package and calculated budget.</p>
                  </div>

                  {/* Range Slider Container */}
                  <div className="bg-[#122B2B] p-6 rounded-xl border border-white/10 mb-8">
                    <div className="flex justify-between text-xs font-semibold text-[#B8925A] uppercase tracking-wider mb-2">
                      <span>Compact (কমপ্যাক্ট)</span>
                      <span>Balanced (স্ট্যান্ডার্ড)</span>
                      <span>Spacious (লাক্সারি)</span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="1"
                      value={scaleIndex}
                      onChange={(e) => setScaleIndex(parseInt(e.target.value))}
                      className="w-full accent-[#B8925A] cursor-pointer h-2.5 bg-[#0A1919] rounded-lg mb-6"
                    />

                    {/* Scale Card with Highlighted Taka */}
                    <div className="p-5 rounded-xl bg-[#0A1919] border border-[#B8925A]/40 shadow-inner">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#B8925A] animate-pulse"></span>
                          <span className="text-sm font-bold text-white">
                            Selected Package: {currentScalePricing.scale} Scale
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-[#D4A84B] font-serif block">
                            {currentScalePricing.range}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-white/70 font-light mb-3">{currentScalePricing.desc}</p>
                      <div className="text-[11px] text-[#B8925A] flex items-center gap-1.5 pt-2 border-t border-white/10">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Fixed price quotation guarantee post 3D measurement visit</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to Style</span>
                    </button>
                    <span className="text-xs text-[#B8925A] font-medium flex items-center gap-1">
                      <FileCheck className="w-4 h-4" />
                      <span>Quotation Ready</span>
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Live-Updating Concept Summary Card (5 Columns) */}
          <div className="lg:col-span-5">
            <motion.div
              layout
              className="bg-[#122B2B] border-2 border-[#B8925A]/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative gold-border-glow overflow-hidden"
            >
              {/* Top Designer Blueprint Stamp */}
              <div className="flex items-center justify-between border-b border-[#B8925A]/30 pb-4 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8925A] font-bold block">
                    ATELIER ESTIMATE SHEET
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white tracking-wide">
                    Heaven Furniture Mart
                  </h4>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#B8925A]/20 border border-[#B8925A] text-[#B8925A] text-[10px] uppercase tracking-widest font-semibold">
                  CHTG-ESTIMATE
                </div>
              </div>

              {/* Concept Details Summary — AnimatePresence crossfade on selection change */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedRoom}-${selectedStyle}-${scaleIndex}`}
                  variants={crossfadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4 mb-6 text-sm"
                >
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white/60 font-light">Target Room:</span>
                    <span className="font-serif font-bold text-white text-base">{selectedRoom}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white/60 font-light">Timber &amp; Finish:</span>
                    <span className="font-medium text-[#B8925A]">{selectedStyle}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white/60 font-light">Scale Profile:</span>
                    <span className="font-medium text-white">{currentScalePricing.scale}</span>
                  </div>

                  {/* PROMINENT TAKA ESTIMATE BOX */}
                  <div className="p-4 rounded-xl bg-[#0A1919] border border-[#B8925A]/50 my-3 shadow-lg">
                    <span className="text-[10px] uppercase tracking-widest text-[#B8925A] font-bold block mb-1">
                      ESTIMATED INVESTMENT (আনুমানিক খরচ)
                    </span>
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-white flex items-baseline gap-2">
                      <span className="text-[#D4A84B]">{currentScalePricing.range}</span>
                      <span className="text-xs font-sans text-white/50 font-normal">BDT</span>
                    </div>
                    <p className="text-[11px] text-white/60 font-light mt-1.5 leading-snug">
                      Includes 100% seasoned wood, customized dimensions, 3D blueprint &amp; polish.
                    </p>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <span className="text-white/60 font-light">Est. Crafting Time:</span>
                    <span className="text-white/90">2-4 Weeks</span>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs text-white/50 block mb-2 uppercase tracking-wider">Included Free Services:</span>
                    <ul className="space-y-1.5 text-xs text-white/80 font-light">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B8925A]" />
                        <span>Free 3D Architectural Blueprint Consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B8925A]" />
                        <span>Free Delivery &amp; Setup in Chattogram Metro</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B8925A]" />
                        <span>10 - 15 Years Structural Timber Guarantee</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dynamic WhatsApp Action Button with Quotation */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-base transition-all transform hover:-translate-y-0.5 shadow-xl shadow-[#25D366]/20 group text-center"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Get This Quote on WhatsApp</span>
              </a>

              <p className="text-[11px] text-white/50 text-center mt-3 font-light">
                Clicking opens WhatsApp with your chosen room, timber, and calculated ৳ price quote.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
