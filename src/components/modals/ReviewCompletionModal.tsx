'use client';
import React from 'react';

interface ReviewCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export const ReviewCompletionModal: React.FC<ReviewCompletionModalProps> = ({
  isOpen,
  onClose,
  onContinue
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 z-50" />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full mx-4 relative">
          <div className="p-6">
            {/* Header */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              We will now review your property details
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              We need up to 24 hours to review and verify your property listing. We&apos;ll send you an email once we&apos;ve reviewed your listing and let you know of any next steps.
            </p>
            
            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Got it
              </button>
              <button
                onClick={onContinue}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};