'use client';
import React from 'react';
import { Header } from './Header';
import { Button } from '@/components/ui/Button';

interface ListingLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextButtonText?: string;
  backButtonText?: string;
  showFixedHeader?: boolean;
  showFixedFooter?: boolean;
  className?: string;
}

export function ListingLayout({
  children,
  title,
  subtitle,
  onBack,
  onNext,
  nextDisabled = false,
  nextButtonText = 'Next',
  backButtonText = 'Back',
  showFixedHeader = true,
  showFixedFooter = true,
  className = ''
}: ListingLayoutProps) {
  return (
    <div className={`h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden ${className}`}>
      <Header />
      
      {showFixedHeader && (
        <div className="fixed top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-sm z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <h1 className="text-xl font-bold text-slate-900">
              {title}
            </h1>
            {subtitle && (
              <p className="text-slate-600 text-sm mt-1">{subtitle}</p>
            )}
          </div>
        </div>
      )}
      
      <div className={`${showFixedHeader ? 'pt-38' : 'pt-20'} ${showFixedFooter ? 'pb-20' : 'pb-8'}`}>
        <div className="max-w-4xl mx-auto px-6">
          {children}
        </div>
      </div>
      
      {showFixedFooter && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-lg">
          <div className="max-w-4xl mx-auto px-6 py-3">
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={onBack}
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                {backButtonText}
              </Button>
              <Button 
                size="lg"
                onClick={onNext}
                disabled={nextDisabled}
                className={`${
                  !nextDisabled
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-300 cursor-not-allowed text-slate-500'
                } font-semibold transition-colors`}
              >
                {nextButtonText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
