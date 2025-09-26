'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cloud } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { useListingStore } from '@/store/listingStore';

export default function PhotosPage() {
  const router = useRouter();
  const { propertyData, updatePropertyData, setCurrentStep, updateStepStatus } = useListingStore();
  const [propertyPhotos, setPropertyPhotos] = useState<File[]>([]);
  const [roomPhotos, setRoomPhotos] = useState<File[]>([]);

  const handlePropertyPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setPropertyPhotos(prev => [...prev, ...files]);
    updatePropertyData({
      photos: {
        property: [...(propertyData.photos?.property || []), ...files],
        rooms: propertyData.photos?.rooms || {}
      }
    });
  };

  const handleRoomPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setRoomPhotos(prev => [...prev, ...files]);
    updatePropertyData({
      photos: {
        property: propertyData.photos?.property || [],
        rooms: {
          ...propertyData.photos?.rooms,
          'double-room': [...(propertyData.photos?.rooms?.['double-room'] || []), ...files]
        }
      }
    });
  };

  const handleNext = () => {
    updateStepStatus('photos', { completed: true, current: false });
    updateStepStatus('profile', { current: true, pending: false });
    setCurrentStep('profile');
    router.push('/listing/setup/profile');
  };

  const handlePrevious = () => {
    updateStepStatus('photos', { current: false });
    updateStepStatus('rooms', { current: true });
    setCurrentStep('rooms');
    router.push('/listing/setup/rooms');
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-sm md:max-w-lg lg:max-w-3xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Show them what they&apos;re missing.</h1>
            <p className="text-gray-600 mb-2">
              Pictures matter to travelers. Upload as many high-quality images as you have. You can 
              add more later. Want some tips on how to upload quality photos that generate more bookings?
            </p>
            <p className="text-sm text-gray-500">*Tips: Min. 800x600 px — Best 2048x1536 px.</p>
          </div>
          <div className="ml-8">
            <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-4xl">📸</span>
            </div>
          </div>
        </div>

        <Alert variant="info" className="mb-6">
          Tip: You can manage photos even after onboarding. Start with the minimum, and change or add more at any time.
        </Alert>

        {/* Property Photos */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Property Photos <span className="text-gray-500 font-normal">(3 minimum)</span>
          </h3>
            <p className="text-gray-600 mb-6">
            The building&apos;s exterior, parking space(s), entrance, and any available facilities
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
            <div className="flex flex-col items-center">
              <Cloud className="w-12 h-12 text-blue-500 mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop your pics here</p>
              <p className="text-gray-500 text-sm mb-4">JPG & PNG only - max 10 MB</p>
              
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png"
                  onChange={handlePropertyPhotoUpload}
                  className="hidden"
                />
                <Button type="button" className="bg-blue-600 hover:bg-blue-700">
                  CHOOSE PHOTOS
                </Button>
              </label>
            </div>
          </div>

          {propertyPhotos.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                {propertyPhotos.length} photo(s) selected
              </p>
              <div className="grid grid-cols-4 gap-2">
                {propertyPhotos.slice(0, 4).map((photo, index) => (
                  <div key={index} className="w-full h-20 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">{photo.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Room Photos */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-2">Double Room</h3>
            <p className="text-gray-600 mb-6">
            The unit&apos;s bedroom(s), bathrooms, kitchen, and dining/living areas
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
            <div className="flex flex-col items-center">
              <Cloud className="w-12 h-12 text-blue-500 mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop your pics here</p>
              <p className="text-gray-500 text-sm mb-4">JPG & PNG only - max 10 MB</p>
              
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png"
                  onChange={handleRoomPhotoUpload}
                  className="hidden"
                />
                <Button type="button" className="bg-blue-600 hover:bg-blue-700">
                  CHOOSE PHOTOS
                </Button>
              </label>
            </div>
          </div>

          {roomPhotos.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                {roomPhotos.length} photo(s) selected
              </p>
              <div className="grid grid-cols-4 gap-2">
                {roomPhotos.slice(0, 4).map((photo, index) => (
                  <div key={index} className="w-full h-20 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">{photo.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" size="lg" onClick={handlePrevious}>
            PREVIOUS
          </Button>
          <Button size="lg" onClick={handleNext}>
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
}