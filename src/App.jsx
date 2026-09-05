import React, { lazy, Suspense } from 'react';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandIntro from './components/BrandIntro';
import WhyChooseUs from './components/WhyChooseUs';
import Collections from './components/Collections';
import BespokeBuilder from './components/BespokeBuilder';
import SocialProof from './components/SocialProof';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

// Lazy-load chat widget so it doesn't block initial render
const ChatWidget = lazy(() => import('./components/ChatWidget'));

export default function App() {
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-[#F5EFE6] text-[#3A2A1E] font-sans antialiased selection:bg-[#B8925A] selection:text-white">
        {/* Sticky Glassmorphism Header */}
        <Navbar />

      {/* Main Single Page Sections in Order */}
      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Brand Intro */}
        <BrandIntro />

        {/* 3. Why Choose Heaven */}
        <WhyChooseUs />

        {/* 4. Collections Snapshot */}
        <Collections />

        {/* 5. Bespoke Builder (Main Interactive Feature) */}
        <BespokeBuilder />

        {/* 6. Social Proof */}
        <SocialProof />

        {/* 7. Final CTA Band */}
        <FinalCTA />
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* Floating Chat Widget */}
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
    </FavoritesProvider>
  );
}
