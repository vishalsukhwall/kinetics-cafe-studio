'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { useSceneStore } from '@/store/useSceneStore';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Dynamic imports for heavy client components to guarantee code-splitting
 * and zero hydration mismatches.
 */
const SmoothScrollProvider = dynamic(
  () => import('@/components/SmoothScrollProvider'),
  { ssr: false }
);

const Navbar = dynamic(() => import('@/components/ui/Navbar'), {
  ssr: false,
});

const Preloader = dynamic(() => import('@/components/ui/Preloader'), {
  ssr: false,
});

const Hero = dynamic(() => import('@/components/sections/Hero'), {
  ssr: false,
});

const MenuShowcase3D = dynamic(
  () => import('@/components/sections/MenuShowcase3D'),
  { ssr: false }
);

const CustomBrewStudio = dynamic(
  () => import('@/components/sections/CustomBrewStudio'),
  { ssr: false }
);

const SanctuarySection = dynamic(
  () => import('@/components/sections/SanctuarySection'),
  { ssr: false }
);

const Footer = dynamic(() => import('@/components/sections/Footer'), {
  ssr: false,
});

const OrderDrawer = dynamic(
  () => import('@/components/sections/OrderDrawer'),
  { ssr: false }
);

const AIBaristaModal = dynamic(
  () => import('@/components/ui/AIBaristaModal'),
  { ssr: false }
);

const ARViewerModal = dynamic(
  () => import('@/components/ui/ARViewerModal'),
  { ssr: false }
);

const CursorFollower = dynamic(
  () => import('@/components/ui/CursorFollower'),
  { ssr: false }
);

const ScrollProgressIndicator = dynamic(
  () => import('@/components/ui/ScrollProgressIndicator'),
  { ssr: false }
);

export default function HomePage() {
  useReducedMotionSafe();
  const isReducedMotion = useSceneStore((s) => s.isReducedMotion);
  const [, setIsLoaded] = useState(false);

  // Throttled global scroll progress tracker
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
          
          useSceneStore.getState().setScrollProgress(progress);

          const sections = [
            { id: 'hero' as const, threshold: 0 },
            { id: 'menu' as const, threshold: 0.2 },
            { id: 'custom-brew' as const, threshold: 0.45 },
            { id: 'reserve' as const, threshold: 0.72 },
            { id: 'footer' as const, threshold: 0.95 },
          ];

          const active =
            sections.reduce<(typeof sections)[number] | null>((acc, section) => {
              if (progress >= section.threshold) return section;
              return acc;
            }, null) ?? sections[0];

          useSceneStore.getState().setActiveSection(active.id);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  return (
    <>
      {/* Luxury Loading Screen with rotating 3D coffee bean & percentage counter */}
      <Preloader onComplete={handlePreloaderComplete} />

      <SmoothScrollProvider>
        {/* Sticky Glassmorphic Navbar */}
        <Navbar />

        {/* Custom cursor — hidden on touch & reduced motion */}
        {!isReducedMotion && <CursorFollower />}

        {/* Scroll progress indicator */}
        <ScrollProgressIndicator />

        {/* Streamlined, Breathing Single-Page Narrative Flow */}
        <main>
          {/* Chapter 1: Cinematic Hero Landing */}
          <section id="hero" aria-label="Hero Experience">
            <Hero />
          </section>

          {/* Chapter 2: The Signature Collection (Unified All-in-One Menu) */}
          <section id="menu" aria-label="Signature Collection">
            <MenuShowcase3D />
          </section>

          {/* Chapter 3: Interactive Custom Brew Studio */}
          <section id="custom-brew" aria-label="Custom Brew Studio">
            <CustomBrewStudio />
          </section>

          {/* Chapter 4: Table Reservation & Sanctuary Atmosphere */}
          <section id="sanctuary" aria-label="Sanctuary & Seating">
            <SanctuarySection />
          </section>

          {/* Chapter 5: Minimalist Footer */}
          <footer id="footer" aria-label="Footer & Location">
            <Footer />
          </footer>
        </main>

        {/* Floating AI Barista Taste-Match Assistant */}
        <AIBaristaModal />

        {/* Mobile & Desktop Augmented Reality (AR) Desk View Modal */}
        <ARViewerModal />

        {/* Slide-Up Order Drawer (INR ₹) */}
        <OrderDrawer />

        {/* Floating Order Button */}
        <FloatingOrderButton />
      </SmoothScrollProvider>
    </>
  );
}

function FloatingOrderButton() {
  const toggleDrawer = useSceneStore((s) => s.toggleOrderDrawer);
  const orderItems = useSceneStore((s) => s.orderItems);
  const itemCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <button
      onClick={toggleDrawer}
      className="btn-tactile fixed bottom-8 right-8 z-40 flex items-center gap-3 rounded-full px-6 py-3.5 font-medium transition-all bg-gradient-to-r from-[#D89B5A] to-[#B8722E] text-[#0B0705] shadow-[0_0_25px_rgba(216,155,90,0.35)] hover:shadow-[0_0_40px_rgba(216,155,90,0.65)] hover:scale-105"
      aria-label={`Open order drawer${itemCount > 0 ? `, ${itemCount} items, ₹${totalAmount}` : ''}`}
      data-cursor="hover"
    >
      <div className="relative">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold bg-[#0B0705] text-[#D89B5A]">
            {itemCount}
          </span>
        )}
      </div>

      <span className="font-semibold tracking-wider text-xs uppercase">
        {itemCount > 0 ? `Cart (₹${totalAmount.toLocaleString('en-IN')})` : 'Cart'}
      </span>
    </button>
  );
}
