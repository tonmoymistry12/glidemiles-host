'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { useListingStore } from '@/store/listingStore';
import { PROPERTY_TYPES } from '@/lib/constants';
import styles from './page.module.scss';

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

  const colorSchemes = ['blue', 'emerald', 'violet'];

  return (
    <div className={styles.container}>
      <Header />
      
      {/* Fixed Header */}
      <div className={styles.fixedHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            What type of property are you listing?
          </h1>
          <p className={styles.subtitle}>Choose the category that best describes your property</p>
        </div>
      </div>
      
      {/* Content Area with Fixed Height */}
      <div className={styles.contentArea}>
        <div className={styles.contentWrapper}>
          {/* Scrollable Options List with Fixed Height */}
          <div className={styles.scrollableContainer}>
            <div className={styles.optionsList}>
              {PROPERTY_TYPES.map((type, index) => {
                const scheme = colorSchemes[index];
                const isSelected = propertyData.propertyType === type.id;
                
                return (
                  <div
                    key={type.id}
                    className={`${styles.optionCard} ${styles[scheme]} ${
                      isSelected ? styles.selected : styles.unselected
                    }`}
                    onClick={() => handleTypeSelection(type.id)}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardInner}>
                        {/* Icon */}
                        <div className={`${styles.iconContainer} ${
                          isSelected ? styles.selected : styles.unselected
                        }`}>
                          {React.createElement(type.icon, {
                            style: { fontSize: 28 }
                          })}
                        </div>
                        
                        <div className={styles.textContent}>
                          <h3 className={`${styles.optionTitle} ${
                            isSelected ? styles.selected : styles.unselected
                          }`}>
                            {type.title}
                          </h3>
                          <p className={styles.optionDescription}>
                            {type.description}
                          </p>
                        </div>
                        
                        {/* Selection indicator */}
                        <div className={`${styles.selectionIndicator} ${
                          isSelected ? styles.selected : styles.unselected
                        }`}>
                          {isSelected && (
                            <div className={styles.indicatorDot}></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed Navigation Footer */}
      <div className={styles.fixedFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerButtons}>
            <button 
              onClick={handleBack}
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Back
            </button>
            <button 
              onClick={handleNext}
              disabled={!propertyData.propertyType}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                propertyData.propertyType
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-slate-300 cursor-not-allowed text-slate-500'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}