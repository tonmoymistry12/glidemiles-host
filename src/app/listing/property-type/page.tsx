'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { PropertyTypeCard } from '@/components/listing/PropertyTypeCard';
import { Button } from '@/components/ui/Button';
import { useListingStore } from '@/store/listingStore';
import { PROPERTY_TYPES } from '@/lib/constants';

export default function PropertyTypePage() {
  const router = useRouter();
  const { propertyData, updatePropertyData, setCurrentStep } = useListingStore();

  const handleTypeSelection = (typeId: string) => {
    updatePropertyData({ propertyType: typeId as 'home' | 'hotel' | 'unique' });
  };

  const handleNext = () => {
    if (propertyData.propertyType) {
      setCurrentStep('property-subtype');
      router.push(`/listing/subtype?type=${propertyData.propertyType}`);
    }
  };

  const handleBack = () => {
    setCurrentStep('listing-options');
    router.push('/listing');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          What type of property are you listing?
        </h1>
        
        <div className="space-y-4 mb-8">
          {PROPERTY_TYPES.map((type) => (
            <PropertyTypeCard
              key={type.id}
              propertyType={type}
              selected={propertyData.propertyType === type.id}
              onClick={() => handleTypeSelection(type.id)}
            />
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" size="lg" onClick={handleBack}>
            Back
          </Button>
          <Button 
            size="lg"
            onClick={handleNext}
            disabled={!propertyData.propertyType}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}