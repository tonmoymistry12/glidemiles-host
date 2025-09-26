'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { FormSection } from '@/components/listing/FormSection';
import { PropertyNameInput } from '@/components/listing/PropertyNameInput';
import { StarRating } from '@/components/listing/StarRating';
import { useListingStore } from '@/store/listingStore';
import styles from './page.module.scss';

export default function BasicsPage() {
  const router = useRouter();
  const { propertyData, updatePropertyData, setCurrentStep, updateStepStatus } = useListingStore();

  const handlePropertyNameChange = (value: string) => {
    updatePropertyData({ propertyName: value });
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

  const handleBack = () => {
    setCurrentStep('units');
    router.push('/listing/units');
  };

  return (
    <div className={styles.container}>
      <Header />
      
      {/* Fixed Header */}
      <div className={styles.fixedHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            Match your property to the right travelers
          </h1>
          <p className={styles.subtitle}>All information is required unless marked optional</p>
        </div>
      </div>
      
      {/* Content Area with Fixed Height */}
      <div className={styles.contentArea}>
        <div className={styles.contentWrapper}>
          {/* Scrollable Content Container */}
          <div className={styles.scrollableContainer}>
            {/* Property Name Section */}
            <FormSection
              title="Name your property"
              description="Make it count, and make it sound inviting! Don't worry, we'll generate other languages using a standard translation template."
            >
              <PropertyNameInput
                value={propertyData.propertyName || ''}
                onChange={handlePropertyNameChange}
                placeholder="Property name"
                maxLength={100}
              />
            </FormSection>

            {/* Star Rating Section */}
            <FormSection
              title="Star rating"
              description={
                <>
                  Give your hotel a rating to help set expectations for travelers stay.{' '}
                  <a href="#" className={styles.helpLink}>Need Help?</a>
                </>
              }
            >
              <StarRating
                rating={propertyData.rating || 0}
                onRatingChange={handleRatingChange}
                maxStars={5}
              />
            </FormSection>
          </div>
        </div>
      </div>
      
      {/* Fixed Navigation Footer */}
      <div className={styles.fixedFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerButtons}>
            <button 
              onClick={handleBack}
              className={`${styles.button} ${styles.secondary}`}
            >
              Back
            </button>
            <button 
              onClick={handleNext}
              disabled={!propertyData.propertyName}
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