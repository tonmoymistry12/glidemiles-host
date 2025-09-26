'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cloud } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { FormSection } from '@/components/listing/FormSection';
import { Alert } from '@/components/ui/Alert';
import { useListingStore } from '@/store/listingStore';
import styles from '../shared.module.scss';

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
    <div className={styles.container}>
      <Header />
      
      {/* Fixed Header */}
      <div className={styles.fixedHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            Show them what they&apos;re missing
          </h1>
          <p className={styles.subtitle}>Pictures matter to travelers. Upload high-quality images to generate more bookings</p>
        </div>
      </div>
      
      {/* Content Area with Fixed Height */}
      <div className={styles.contentArea}>
        <div className={styles.contentWrapper}>
          {/* Scrollable Content Container */}
          <div className={styles.scrollableContainer}>
            <Alert variant="info" className="mb-6">
              Tip: You can manage photos even after onboarding. Start with the minimum, and change or add more at any time.
            </Alert>

            {/* Property Photos */}
            <FormSection
              title="Property Photos (3 minimum)"
              description="The building's exterior, parking space(s), entrance, and any available facilities"
            >
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
                    <button type="button" className={`${styles.button} ${styles.primary}`}>
                      CHOOSE PHOTOS
                    </button>
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
            </FormSection>

            {/* Room Photos */}
            <FormSection
              title="Double Room"
              description="The unit's bedroom(s), bathrooms, kitchen, and dining/living areas"
            >
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
                    <button type="button" className={`${styles.button} ${styles.primary}`}>
                      CHOOSE PHOTOS
                    </button>
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
            </FormSection>
          </div>
        </div>
      </div>
      
      {/* Fixed Navigation Footer */}
      <div className={styles.fixedFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerButtons}>
            <button 
              onClick={handlePrevious}
              className={`${styles.button} ${styles.secondary}`}
            >
              Back
            </button>
            <button 
              onClick={handleNext}
              className={`${styles.button} ${styles.primary}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}