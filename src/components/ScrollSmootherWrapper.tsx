import React from 'react';
import { useScrollSmoother } from '@/hooks/useScrollSmoother';

interface ScrollSmootherWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollSmootherWrapper: React.FC<ScrollSmootherWrapperProps> = ({ 
  children, 
  className = "" 
}) => {
  const { wrapperRef, contentRef } = useScrollSmoother({
    smooth: 1.0,
    effects: true,
    normalizeScroll: true
  });

  return (
    <>
      <div 
        ref={wrapperRef}
        id="smooth-wrapper" 
        className={`fixed inset-0 overflow-hidden ${className}`}
      >
        <div 
          ref={contentRef}
          id="smooth-content" 
          className="relative will-change-transform"
          style={{ minHeight: '100vh' }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default ScrollSmootherWrapper;