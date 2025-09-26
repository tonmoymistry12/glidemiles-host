'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { FormSection } from '@/components/listing/FormSection';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Alert } from '@/components/ui/Alert';
import { useListingStore } from '@/store/listingStore';
import styles from '../shared.module.scss';

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
    <div className={styles.container}>
      <Header />
      
      {/* Fixed Header */}
      <div className={styles.fixedHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            Account details
          </h1>
          <p className={styles.subtitle}>Add general contact details to be contacted regarding your registration</p>
        </div>
      </div>
      
      {/* Content Area with Fixed Height */}
      <div className={styles.contentArea}>
        <div className={styles.contentWrapper}>
          {/* Scrollable Content Container */}
          <div className={styles.scrollableContainer}>
            {/* General Information */}
            <FormSection
              title="General Information"
              description="Provide your personal details for account setup"
            >
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
              <div className="grid grid-cols-3 gap-6">
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
            </FormSection>

            {/* Payment Method */}
            <FormSection
              title="How would you like to receive your payment?"
              description="Select your preferred payment method. Additional information may be requested depending on method selected."
            >
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