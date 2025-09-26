'use client';
import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';

interface LocationSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationTypeSuggestionModal: React.FC<LocationSuggestionModalProps> = ({
  isOpen,
  onClose
}) => {
  const [step, setStep] = useState<'suggestion' | 'thanks'>('suggestion');
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestion.trim()) {
      // Here you would typically send the suggestion to your backend
      console.log('Property type suggestion:', suggestion);
      setStep('thanks');
    }
  };

  const handleClose = () => {
    setStep('suggestion');
    setSuggestion('');
    onClose();
  };

  const handleOkay = () => {
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} maxWidth="md">
      {step === 'suggestion' ? (
        // Step 1: Suggestion Form
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 pr-8">
            Are we missing your Location?
          </h2>
          
          <p className="text-gray-600 mb-6">
            Help us complete our list by telling us where the property you&apos;d like to list.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                Property location name
              </label>
              <input
                type="text"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="e.g. samburge"
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                autoFocus
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!suggestion.trim()}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  suggestion.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Step 2: Thank You Message
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pr-8">
            Thanks for your help!
          </h2>
          
          <p className="text-gray-600 mb-4">
            We&apos;ll use your suggestion to improve our list to better match travelers to their perfect location.
          </p>
          
          <p className="text-gray-600 mb-6">
            For now, please select the closest match to your location.
          </p>

          <div className="flex justify-end">
            <button
              onClick={handleOkay}
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};