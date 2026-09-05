import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import CollectionsPage from './components/CollectionsPage';

// Lazy-load chat widget so it doesn't block initial render
const ChatWidget = lazy(() => import('./components/ChatWidget'));

// Auto Scroll to Top or Anchor on Route Change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elem = document.querySelector(hash);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
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
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-[#F5EFE6] text-[#3A2A1E] font-sans antialiased selection:bg-[#B8925A] selection:text-white">
          {/* Sticky Glassmorphism Header */}
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
          </Routes>

          {/* Footer */}
          <Footer />

          {/* Floating Chat Widget */}
          <Suspense fallback={null}>
            <ChatWidget />
          </Suspense>
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  );
}
