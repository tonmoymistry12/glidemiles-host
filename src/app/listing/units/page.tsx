'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  LocationOn as LocationOnIcon, 
  Business as BusinessIcon,
  Apartment as ApartmentIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { useListingStore } from '@/store/listingStore';

export default function UnitsPage() {
  const router = useRouter();
  const { propertyData, updatePropertyData, setCurrentStep } = useListingStore();

  const handleUnitsSelection = (units: 'single' | 'multiple') => {
    updatePropertyData({ units });
  };

  const handleNext = () => {
    setCurrentStep('basics');
    router.push('/listing/setup/basics');
  };

  const handleBack = () => {
    setCurrentStep('property-subtype');
    router.push(`/listing/subtype?type=${propertyData.propertyType}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          How many units do you want to list?
        </h1>
        
        <div className="space-y-4 mb-8">
          {/* Single Unit */}
          <Card
            selected={propertyData.units === 'single'}
            onClick={() => handleUnitsSelection('single')}
            className={`transition-all duration-300 ease-in-out hover:shadow-lg ${
              propertyData.units === 'single' ? 'ring-2 ring-blue-200 shadow-md' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              {/* Icon container with enhanced styling */}
              <div className={`relative w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300 ${
                propertyData.units === 'single'
                  ? 'bg-gradient-to-br from-blue-100 to-blue-200 shadow-sm' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}>
                <LocationOnIcon 
                  className={`w-8 h-8 transition-all duration-300 ${
                    propertyData.units === 'single'
                      ? 'text-blue-600 drop-shadow-sm' 
                      : 'text-gray-600'
                  }`}
                />
                
                {/* Checkmark overlay when selected */}
                {propertyData.units === 'single' && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                {/* Title with enhanced styling */}
                <h3 className={`text-lg font-semibold mb-1 transition-all duration-300 ${
                  propertyData.units === 'single'
                    ? 'text-blue-900' 
                    : 'text-gray-900'
                }`}>
                  One unit
                </h3>
                <p className={`transition-colors duration-300 leading-relaxed ${
                  propertyData.units === 'single' ? 'text-gray-700' : 'text-gray-600'
                }`}>
                  You have one rentable unit, which can only be rented in its entirety.
                </p>
              </div>
            </div>
          </Card>

          {/* Multiple Units */}
          <Card
            selected={propertyData.units === 'multiple'}
            onClick={() => handleUnitsSelection('multiple')}
            className={`transition-all duration-300 ease-in-out hover:shadow-lg ${
              propertyData.units === 'multiple' ? 'ring-2 ring-blue-200 shadow-md' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              {/* Icon container with enhanced styling */}
              <div className={`relative w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300 ${
                propertyData.units === 'multiple'
                  ? 'bg-gradient-to-br from-blue-100 to-blue-200 shadow-sm' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}>
                <div className="flex space-x-1">
                  <BusinessIcon 
                    className={`w-6 h-6 transition-all duration-300 ${
                      propertyData.units === 'multiple'
                        ? 'text-blue-600 drop-shadow-sm' 
                        : 'text-gray-600'
                    }`}
                  />
                  <ApartmentIcon 
                    className={`w-6 h-6 transition-all duration-300 ${
                      propertyData.units === 'multiple'
                        ? 'text-blue-600 drop-shadow-sm' 
                        : 'text-gray-600'
                    }`}
                  />
                </div>
                
                {/* Checkmark overlay when selected */}
                {propertyData.units === 'multiple' && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                {/* Title with enhanced styling */}
                <h3 className={`text-lg font-semibold mb-1 transition-all duration-300 ${
                  propertyData.units === 'multiple'
                    ? 'text-blue-900' 
                    : 'text-gray-900'
                }`}>
                  Multiple units (at the same location)
                </h3>
                <p className={`transition-colors duration-300 leading-relaxed ${
                  propertyData.units === 'multiple' ? 'text-gray-700' : 'text-gray-600'
                }`}>
                  You have multiple rentable units, which are located at the same street address or 
                  complex, such as a gated community or large resort.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Help Link */}
        <div className="text-center mb-8">
          <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline text-sm transition-colors duration-200">
            Have properties in different locations?
          </a>
        </div>

        {/* Tip Alert */}
        <Alert variant="info" title="Tip:" className="mb-8">
          Please ensure you provide accurate information as much as possible — this helps us guide you better and maximize the benefits of partnering with us.
        </Alert>

        {/* Navigation */}
        <div className="flex justify-between items-center h-16 px-6 bg-white border-t border-gray-200 fixed bottom-0 left-56 right-56">
          <Button variant="outline" size="lg" onClick={handleBack}>
            Back
          </Button>
          <Button 
            size="lg" 
            onClick={handleNext}
            disabled={!propertyData.units}
            className={`transition-all duration-200 ${
              !propertyData.units 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-700 hover:scale-105'
            }`}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}