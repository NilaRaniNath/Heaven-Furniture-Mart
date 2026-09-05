/**
 * useMotionConfig – returns Framer Motion variant presets
 * that automatically respect the user's prefers-reduced-motion OS setting.
 *
 * Usage:
 *   const { sectionVariants, viewport } = useMotionConfig();
 *   <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={viewport}>
 */

import { useReducedMotion } from 'framer-motion';

// ─── Shared viewport config ───────────────────────────────────────────────────
export const VIEWPORT = { once: true, amount: 0.3 };

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useMotionConfig() {
  const prefersReducedMotion = useReducedMotion();

  // Section fade+slide (used on every major section wrapper)
  const sectionVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.85, // Increased by 0.3s for smooth elegant feel
        ease: 'easeOut',
      },
    },
  };

  // Staggered child for card grids
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.8, // Increased by 0.3s
        ease: 'easeOut',
      },
    },
  };

  // Crossfade for AnimatePresence swaps (Bespoke Builder result card)
  const crossfadeVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.65, // Increased by 0.3s
        ease: 'easeOut',
      },
    },
    exit: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: -8, transition: { duration: 0.35, ease: 'easeIn' } },
  };

  // Subtle scale hover for cards (pass to whileHover)
  const cardHover = prefersReducedMotion
    ? {}
    : { scale: 1.03, transition: { duration: 0.35, ease: 'easeOut' } };

  return {
    sectionVariants,
    containerVariants,
    cardVariants,
    crossfadeVariants,
    cardHover,
    viewport: VIEWPORT,
    prefersReducedMotion,
  };
}
