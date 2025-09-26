'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useListingStore } from '@/store/listingStore';

export default function BasicsPage() {
  const router = useRouter();
  const { propertyData, updatePropertyData, setCurrentStep, updateStepStatus } = useListingStore();

  const handlePropertyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePropertyData({ propertyName: e.target.value });
  };

  const handleRatingChange = (rating: number) => {
    updatePropertyData({ rating });
  };


  const handleNext = () => {
    updateStepStatus('basics', { completed: true, current: false });
    updateStepStatus('location', { current: true, pending: false });
    setCurrentStep('location');
    router.push('/listing/setup/location');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-sm md:max-w-lg lg:max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Match your property to the right travelers.
        </h1>
        <p className="text-gray-600 mb-6">All information is required unless marked optional.</p>
        
        {/* Booking.com Import Section */}
        {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="text-blue-600 font-bold text-lg">Booking.com</div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Import your property available on Booking.com (optional)</h3>
            <p className="text-sm text-gray-600 mb-3">
              Paste your property's Booking.com URL below, and we'll handle the rest by importing your available details automatically.
            </p>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Paste URL here (e.g., https://www.booking.com/hotel/th/property-name.html)"
                value={propertyData.importUrl || ''}
                onChange={handleImportUrlChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
                IMPORT
              </button>
            </div>
          </div>
        </div> */}

        {/* Property Name */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-2">Name your property</h3>
          <p className="text-gray-600 text-sm mb-3">
            Make it count, and make it sound inviting! Don&apos;t worry, we&apos;ll generate other languages using a standard translation template.
          </p>
          <div className="relative">
            <input
              type="text"
              value={propertyData.propertyName || ''}
              onChange={handlePropertyNameChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Property name"
            />
            <div className="absolute right-3 top-3 text-sm text-gray-500">
              {(propertyData.propertyName || '').length}
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-2">Star rating</h3>
          <p className="text-gray-600 text-sm mb-3">
            Give your hotel a rating to help set expectations for travelers stay.{' '}
            <a href="#" className="text-blue-600 hover:underline">Need Help?</a>
          </p>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 cursor-pointer transition-colors ${
                  star <= (propertyData.rating || 0) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300 hover:text-yellow-200'
                }`}
                onClick={() => handleRatingChange(star)}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end">
          <Button size="lg" onClick={handleNext}>
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
}