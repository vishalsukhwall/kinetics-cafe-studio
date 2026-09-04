"use client";

import React, { Component, ErrorInfo, ReactNode, useEffect, useState } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WebGL Error caught by boundary:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }
      return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] bg-[#0B0705] text-[#F5E6D0] p-8">
          <svg className="w-16 h-16 text-[#D89B5A] mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C8.686 2 6 4.686 6 8v5a4 4 0 004 4h4a4 4 0 004-4V8c0-3.314-2.686-6-6-6zM6 8h12M9 21h6" />
          </svg>
          <h2 className="text-xl font-serif text-[#D89B5A] mb-4 text-center">Immersive Experience Unavailable</h2>
          <p className="text-[#F5E6D0]/70 text-center max-w-md mb-8">
            Our immersive experience requires WebGL. Enjoy the classic view below.
          </p>
          <button 
            onClick={this.handleRetry}
            className="px-6 py-3 border border-[#D89B5A] text-[#D89B5A] hover:bg-[#D89B5A] hover:text-[#0B0705] transition-colors uppercase tracking-widest text-sm"
          >
            Retry
          </button>
        </div>
      );
    }

    return (
      <WebGLContextDetector onError={() => this.setState({ hasError: true })}>
        {this.props.children}
      </WebGLContextDetector>
    );
  }
}

function WebGLContextDetector({ children, onError }: { children: ReactNode, onError: () => void }) {
  useEffect(() => {
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      onError();
    };
    window.addEventListener('webglcontextlost', handleContextLost);
    return () => {
      window.removeEventListener('webglcontextlost', handleContextLost);
    };
  }, [onError]);
  
  return <>{children}</>;
}

export function withWebGLErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithWebGLErrorBoundary(props: P) {
    return (
      <WebGLErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </WebGLErrorBoundary>
    );
  };
}
