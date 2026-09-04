"use client";

import React from 'react';

interface GlassPanelProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
  blur?: number;
  opacity?: number;
}

export function GlassPanel({
  children,
  className = '',
  variant = 'dark',
  blur = 12,
  opacity = 0.15,
}: GlassPanelProps) {
  const bgColor = variant === 'dark' 
    ? `rgba(11, 7, 5, ${opacity})` 
    : `rgba(245, 230, 208, ${opacity})`;
    
  return (
    <div
      className={`rounded-2xl overflow-hidden relative ${className}`}
      style={{
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: bgColor,
        border: '1px solid rgba(216, 155, 90, 0.15)',
      }}
    >
      {/* Top edge glass highlight */}
      <div 
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(216, 155, 90, 0.2), transparent)',
        }} 
      />
      {children}
    </div>
  );
}
