'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Minus } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { FormSection } from '@/components/listing/FormSection';
import { Alert } from '@/components/ui/Alert';
import { useListingStore } from '@/store/listingStore';
import styles from '../shared.module.scss';

export default function RoomsPage() {
  const router = useRouter();
  const { propertyData, updatePropertyData, setCurrentStep, updateStepStatus } = useListingStore();

  const room = propertyData.rooms?.[0] || {
    id: '1',
    name: 'Double Room',
    size: '120',
    occupancy: 3,
    bathrooms: 2,
    minRate: '1200',
    extraGuestRate: '1200',
    extraGuestAfter: 2
  };

  const handleRoomChange = (field: string, value: string | number) => {
    const updatedRoom = { ...room, [field]: value };
    updatePropertyData({ rooms: [updatedRoom] });
  };

  const handleBreakfastChange = (value: boolean) => {
    updatePropertyData({ breakfast: value });
  };

  const incrementValue = (field: string) => {
    const currentValue = room[field as keyof typeof room] as number;
    handleRoomChange(field, currentValue + 1);
  };

  const decrementValue = (field: string) => {
    const currentValue = room[field as keyof typeof room] as number;
    if (currentValue > 0) {
      handleRoomChange(field, currentValue - 1);
    }
  };

  const handleNext = () => {
    updateStepStatus('rooms', { completed: true, current: false });
    updateStepStatus('photos', { current: true, pending: false });
    setCurrentStep('photos');
    router.push('/listing/setup/photos');
  };

  const handlePrevious = () => {
    updateStepStatus('rooms', { current: false });
    updateStepStatus('property-details', { current: true });
    setCurrentStep('property-details');
    router.push('/listing/setup/property-details');
  };

  return (
    <div className={styles.container}>
      <Header />
      
      {/* Fixed Header */}
      <div className={styles.fixedHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            Setup your rooms
          </h1>
          <p className={styles.subtitle}>List your hotel on Agoda by setting up pricing and room details for at least one room type</p>
        </div>
      </div>
      
      {/* Content Area with Fixed Height */}
      <div className={styles.contentArea}>
        <div className={styles.contentWrapper}>
          {/* Scrollable Content Container */}
          <div className={styles.scrollableContainer}>
            {/* Room Details and Pricing */}
            <FormSection
              title="Room details and pricing"
              description="Using a channel manager? We'll sync prices between platforms once room mapping is complete"
            >
              {/* Room Header */}
              <div className="bg-gray-50 px-4 py-3 rounded-lg mb-6">
                <h3 className="font-semibold">Room 1 - Double Room</h3>
              </div>

              {/* Basic Details */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Basic details</h4>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Room name</label>
                    <div className="relative">
                      <select
                        value={room.name}
                        onChange={(e) => handleRoomChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="Double Room">Double Room</option>
                        <option value="Single Room">Single Room</option>
                        <option value="Twin Room">Twin Room</option>
                        <option value="Suite">Suite</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Room size</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={room.size}
                        onChange={(e) => handleRoomChange('size', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-500 text-sm">sqm</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Room occupancy</label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => decrementValue('occupancy')}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{room.occupancy}</span>
                      <button
                        onClick={() => incrementValue('occupancy')}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Bathrooms</label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => decrementValue('bathrooms')}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{room.bathrooms}</span>
                      <button
                        onClick={() => incrementValue('bathrooms')}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Rates */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Room rates</h4>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Minimum rate</label>
                  <p className="text-sm text-gray-600 mb-3">
                    The lowest possible rate for this room, not including promotions, taxes, or other fees.
                  </p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={room.minRate}
                      onChange={(e) => handleRoomChange('minRate', e.target.value)}
                      className="w-32 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">INR</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Extra guest rate</label>
                  <p className="text-sm text-gray-600 mb-3">
                    After more than 2 guest(s), charge 1200INR per person, per night.
                  </p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={room.extraGuestRate}
                      onChange={(e) => handleRoomChange('extraGuestRate', e.target.value)}
                      className="w-32 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">INR</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">For each guest after</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => decrementValue('extraGuestAfter')}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{room.extraGuestAfter}</span>
                    <button
                      onClick={() => incrementValue('extraGuestAfter')}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="text-gray-500 text-sm">person / people</span>
                  </div>
                </div>
              </div>

              <Alert variant="info" className="mb-6">
                Tip: Start with a single room. Easily add more after onboarding is complete.
              </Alert>

              <button className={`${styles.button} ${styles.secondary} mb-8`}>
                Add another room
              </button>
            </FormSection>

            {/* Breakfast */}
            <FormSection
              title="Breakfast"
              description="Do you provide breakfast at the property?"
            >
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="breakfast"
                    checked={propertyData.breakfast === true}
                    onChange={() => handleBreakfastChange(true)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="breakfast"
                    checked={propertyData.breakfast === false}
                    onChange={() => handleBreakfastChange(false)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>No</span>
                </label>
              </div>
            </FormSection>

            {/* Availability */}
            <FormSection
              title="Availability"
              description="Availability for all rooms is initially set for 90 days. You can change this in the Availability Center or Calendar after onboarding is complete"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> All rooms will be available for booking for the next 90 days. 
                  You can manage availability and pricing in your dashboard after completing the setup.
                </p>
              </div>
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