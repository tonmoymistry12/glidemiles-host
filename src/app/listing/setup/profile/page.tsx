'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Alert } from '@/components/ui/Alert';
import { useListingStore } from '@/store/listingStore';

export default function ProfilePage() {
  const router = useRouter();
  const { setCurrentStep, updateStepStatus } = useListingStore();
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    nationality: 'Indian',
    phoneNumber: '',
    languagePreference: 'English',
    country: 'India',
    state: 'West Bengal',
    city: 'Kalna',
    paymentMethod: 'bank'
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updateStepStatus('profile', { completed: true, current: false });
    updateStepStatus('publish', { current: true, pending: false });
    setCurrentStep('publish');
    router.push('/listing/setup/publish');
  };

  const handlePrevious = () => {
    updateStepStatus('profile', { current: false });
    updateStepStatus('photos', { current: true });
    setCurrentStep('photos');
    router.push('/listing/setup/photos');
  };

  const nationalityOptions = [
    { value: 'Indian', label: 'Indian' },
    { value: 'American', label: 'American' },
    { value: 'British', label: 'British' }
  ];

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Bengali', label: 'Bengali' }
  ];

  const countryOptions = [
    { value: 'India', label: 'India' },
    { value: 'US', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' }
  ];

  const stateOptions = [
    { value: 'West Bengal', label: 'West Bengal' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Maharashtra', label: 'Maharashtra' }
  ];

  const cityOptions = [
    { value: 'Kalna', label: 'Kalna' },
    { value: 'Kolkata', label: 'Kolkata' },
    { value: 'Durgapur', label: 'Durgapur' }
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-sm md:max-w-lg lg:max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Account details</h1>
        <p className="text-gray-600 mb-8">
          Add general contact details to be contacted regarding your registration with Agoda. If further information is needed for this property, we 
          will contact you.
        </p>

        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-6">General information</h3>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <Input
              label="First name"
              value={profileData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
            <Input
              label="Last name"
              value={profileData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
            <Select
              label="Nationality"
              options={nationalityOptions}
              value={profileData.nationality}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
            />
          </div>

          <h4 className="font-semibold mb-4">Contact information</h4>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <Input
              label="Phone number"
              value={profileData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="Country / Region"
            />
            <Select
              label="Language preference"
              options={languageOptions}
              value={profileData.languagePreference}
              onChange={(e) => handleInputChange('languagePreference', e.target.value)}
            />
          </div>

          <h4 className="font-semibold mb-4">Residence address information</h4>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <Select
              label="Country / Region"
              options={countryOptions}
              value={profileData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
            />
            <Select
              label="State / Province"
              options={stateOptions}
              value={profileData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
            />
            <Select
              label="City"
              options={cityOptions}
              value={profileData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">How would you like to receive your payment?</h3>
          <p className="text-gray-600 mb-6">
            Select your preferred payment method. Additional information may be requested depending on method selected.
          </p>

          <div className="space-y-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={profileData.paymentMethod === 'bank'}
                onChange={() => handleInputChange('paymentMethod', 'bank')}
                className="w-4 h-4 text-blue-600 mt-1"
              />
              <div>
                <span className="font-medium">Bank transfer</span>
                <p className="text-sm text-gray-600">
                  Receive monthly payment to your local bank account (or groups of hotels); payments are issued via 
                  payment for which bank will receipt for payment of transactions...
                </p>
              </div>
            </label>
          </div>

          <Alert variant="info" className="mt-6">
            For fast access changes are allowed post onboarding.
          </Alert>
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