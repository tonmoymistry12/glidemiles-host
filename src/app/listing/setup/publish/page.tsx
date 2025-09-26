'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useListingStore } from '@/store/listingStore';

// Import the animation modals
import { PublishingModal } from '@/components/modals/PublishingModal';
import { ReviewCompletionModal } from '@/components/modals/ReviewCompletionModal';

export default function PublishPage() {
  const router = useRouter();
  const { setCurrentStep, updateStepStatus } = useListingStore();
  
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [panNumber, setPanNumber] = useState('');
  
  // Add animation states
  const [isPublishing, setIsPublishing] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handlePublish = () => {
    if (acceptedTerms && panNumber) {
      // Start the publishing animation instead of immediate redirect
      setIsPublishing(true);
    }
  };

  const handlePublishingComplete = () => {
    // Complete the listing process
    updateStepStatus('publish', { completed: true, current: false });
    // Close publishing modal and show review modal
    setIsPublishing(false);
    setShowReviewModal(true);
  };

  const handleReviewModalClose = () => {
    setShowReviewModal(false);
    // Redirect to dashboard
    router.push('/dashboard');
  };

  const handleReviewModalContinue = () => {
    setShowReviewModal(false);
    // Redirect to dashboard or success page
    router.push('/dashboard');
  };

  const handlePrevious = () => {
    updateStepStatus('publish', { current: false });
    updateStepStatus('profile', { current: true });
    setCurrentStep('profile');
    router.push('/listing/setup/profile');
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-sm md:max-w-lg lg:max-w-3xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Sign your contract and let&apos;s get booking.
            </h1>
            <p className="text-gray-600">Just a few more details.</p>
          </div>
          <div className="ml-8">
            <div className="w-24 h-24 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-4xl">🚀</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Tax Information</h3>
          <p className="text-gray-600 mb-6">
            Depending upon your country&apos;s tax regulations regarding accommodation bookings, we require the following information:
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">GST ID</label>
            <input
              type="text"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your GST ID"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Permanent Account Number (PAN)</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your PAN"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Know your local laws, regulations, and taxes.</h3>
          <p className="text-gray-600 mb-4">
            It is your responsibility to review local laws and taxes that apply to your listing. Laws about short-term rental differ 
            between jurisdictions and you are legally and financially responsible for your listing, including how bookings and payments are handled. 
            Here you will find relevant statutory regulations and requirements specifically related to collection requirements in all applicable 
            jurisdictions.
          </p>
          <p className="text-gray-600 mb-6">
            Some information about the bookings and our services can be found in our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>. Additionally, 
            some technical information about payment processing can be found in our{' '}
            <a href="#" className="text-blue-600 hover:underline">Payment Services Agreement</a>.
          </p>
          <p className="text-gray-600 mb-6">
            Please read the entire contract. By registering your property, and/or by accepting bookings through the platform, you agree to the 
            terms as set out in the Property Partner Agreement and acknowledge that this agreement is in effect, at the time of acceptance of every 
            reservation via Agoda&apos;s site, the YCS Connected Service Apps Representative (CSA).
          </p>

          <h4 className="font-semibold mb-4">Download Commission</h4>
          <div className="mb-4">
            <a href="#" className="text-blue-600 hover:underline">
              Self Booking →
            </a>
          </div>
          <div className="mb-6">
            <a href="#" className="text-blue-600 hover:underline">
              Self Service →
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Accept the terms and conditions</h3>
          <p className="text-gray-600 mb-6">
            The Terms of Service and conditions contain all out of payment commission Noted through Agoda&apos;s property site.
          </p>
          
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="w-4 h-4 text-blue-600 mt-1"
            />
            <span className="text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
            </span>
          </label>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" size="lg" onClick={handlePrevious}>
            PREVIOUS
          </Button>
          <Button 
            size="lg" 
            onClick={handlePublish}
            disabled={!acceptedTerms || !panNumber || isPublishing}
            className={!acceptedTerms || !panNumber || isPublishing ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isPublishing ? 'PUBLISHING...' : 'NEXT'}
          </Button>
        </div>
      </div>

      {/* Animation Modals */}
      <PublishingModal
        isOpen={isPublishing}
        onComplete={handlePublishingComplete}
      />

      <ReviewCompletionModal
        isOpen={showReviewModal}
        onClose={handleReviewModalClose}
        onContinue={handleReviewModalContinue}
      />
    </div>
  );
}