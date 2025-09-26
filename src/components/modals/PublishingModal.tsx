'use client';
import React, { useState, useEffect } from 'react';

interface PublishingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const PublishingModal: React.FC<PublishingModalProps> = ({
  isOpen,
  onComplete
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      
      // Simulate publishing progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Wait a moment then trigger completion
            setTimeout(() => {
              onComplete();
            }, 500);
            return 100;
          }
          return prev + 2; // Increase by 2% every 100ms (5 second total)
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 z-50" />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-sm w-full mx-4 relative">
          <div className="p-8 text-center">
            {/* Building Animation */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                {/* Animated Building Icon */}
                <div className="w-24 h-24 relative">
                  {/* Building Base */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-12 bg-blue-100 rounded-t-sm relative">
                      {/* Building Windows */}
                      <div className="absolute top-2 left-2 w-2 h-2 bg-blue-300 rounded-sm"></div>
                      <div className="absolute top-2 right-2 w-2 h-2 bg-blue-300 rounded-sm"></div>
                      <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-300 rounded-sm"></div>
                      <div className="absolute bottom-2 right-2 w-2 h-2 bg-blue-300 rounded-sm"></div>
                      
                      {/* Door */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-blue-400 rounded-t-sm"></div>
                    </div>
                  </div>
                  
                  {/* Trees */}
                  <div className="absolute bottom-0 left-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="w-1 h-2 bg-green-600 mx-auto"></div>
                  </div>
                  <div className="absolute bottom-0 right-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="w-1 h-2 bg-green-600 mx-auto"></div>
                  </div>
                  
                  {/* Animated Sparkles */}
                  <div className="absolute -top-2 -right-2 animate-pulse">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                  </div>
                  <div className="absolute -top-1 -left-3 animate-pulse delay-300">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"></div>
                  </div>
                  <div className="absolute top-2 -right-4 animate-pulse delay-500">
                    <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Publishing...
            </h3>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* Progress Text */}
            <p className="text-sm text-gray-500">
              {progress < 100 ? `${Math.round(progress)}% complete` : 'Almost done...'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};