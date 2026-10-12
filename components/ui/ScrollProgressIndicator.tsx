"use client";

import React, { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Experience" },
  { id: "why-us", label: "Craft" },
  { id: "menu", label: "Menu" },
  { id: "custom-brew", label: "Studio" },
  { id: "sanctuary", label: "Sanctuary" },
  { id: "contact", label: "Contact" },
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
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Hide at the very top (hero section)
  if (scrollProgress < 0.02 && !isHovered) return null;

  return (
    <div 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center py-4 opacity-0 animate-in fade-in duration-500 font-mono"
      style={{ opacity: scrollProgress > 0.05 || isHovered ? 1 : 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[40vh] min-h-[300px] w-4 flex flex-col items-center">
        {/* Track */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-[#2B2421]/15 rounded-full" />
        
        {/* Fill */}
        <div 
          className="absolute top-0 w-[2px] rounded-full will-change-transform"
          style={{
            height: `${scrollProgress * 100}%`,
            background: "linear-gradient(to bottom, #C9A86C, #A8583B)",
            transition: "height 0.1s ease-out"
          }}
        />

        {/* Marker */}
        <div 
          className="absolute w-2 h-2 bg-[#2B2421] rotate-45 will-change-transform transition-all duration-100 shadow-[0_0_6px_rgba(43,36,33,0.3)]"
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
              className={`absolute right-full mr-4 text-[10px] tracking-widest font-mono pointer-events-auto transition-all duration-300 transform cursor-pointer
                ${isHovered 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-2'
                }
              `}
              style={{
                top: `${(idx / (sections.length - 1)) * 100}%`,
                transform: `translateY(-50%) ${!isHovered ? 'translateX(8px)' : ''}`,
                color: Math.abs(scrollProgress - (idx / (sections.length - 1))) < 0.12 ? '#A8583B' : '#5A5049',
                fontWeight: Math.abs(scrollProgress - (idx / (sections.length - 1))) < 0.12 ? '700' : '500',
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
}
