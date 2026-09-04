"use client";

import React, { useEffect, useState } from "react";

// Fallback Zustand store imitation. In reality imported from @/store/useStore
const sections = [
  { id: "hero", label: "Hero" },
  { id: "menu", label: "Menu" },
  { id: "journey", label: "Journey" },
  { id: "gallery", label: "Gallery" },
  { id: "order", label: "Order" },
];

export default function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const maxScroll = documentHeight - windowHeight;
      const currentProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
      
      setScrollProgress(Math.min(Math.max(currentProgress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // In a real app, this would use refs or valid element IDs
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback pseudo-scroll if elements don't exist yet
      const index = sections.findIndex(s => s.id === id);
      const targetProgress = index / (sections.length - 1);
      const targetY = targetProgress * (document.documentElement.scrollHeight - window.innerHeight);
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  // Hide at the very top (hero section)
  if (scrollProgress < 0.02 && !isHovered) return null;

  return (
    <div 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center py-4 opacity-0 animate-in fade-in duration-500"
      style={{ opacity: scrollProgress > 0.05 || isHovered ? 1 : 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[40vh] min-h-[300px] w-4 flex flex-col items-center">
        {/* Track */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-[rgba(245,230,208,0.2)] rounded-full" />
        
        {/* Fill */}
        <div 
          className="absolute top-0 w-[2px] rounded-full will-change-transform"
          style={{
            height: `${scrollProgress * 100}%`,
            background: "linear-gradient(to bottom, #D89B5A, #B8722E)",
            transition: "height 0.1s ease-out"
          }}
        />

        {/* Marker */}
        <div 
          className="absolute w-2 h-2 bg-[#F5E6D0] rotate-45 will-change-transform transition-all duration-100 shadow-[0_0_8px_rgba(216,155,90,0.6)]"
          style={{
            top: `calc(${scrollProgress * 100}% - 4px)`,
          }}
        />

        {/* Labels */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`absolute right-full mr-4 text-xs tracking-widest font-mono pointer-events-auto transition-all duration-300 transform
                ${isHovered 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-2'
                }
              `}
              style={{
                top: `${(idx / (sections.length - 1)) * 100}%`,
                transform: `translateY(-50%) ${!isHovered ? 'translateX(8px)' : ''}`,
                color: Math.abs(scrollProgress - (idx / (sections.length - 1))) < 0.15 ? '#D89B5A' : '#F5E6D0',
                opacity: isHovered ? 1 : 0,
              }}
              aria-label={`Scroll to ${section.label}`}
            >
              {section.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
