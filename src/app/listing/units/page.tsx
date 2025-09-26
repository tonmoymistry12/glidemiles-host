'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home as HomeIcon, 
  Apartment as ApartmentIcon
} from '@mui/icons-material';
import { Header } from '@/components/layout/Header';
import { Alert } from '@/components/ui/Alert';
import { useListingStore } from '@/store/listingStore';
import styles from './page.module.scss';

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
    <div className={styles.container}>
      <Header />
      
      {/* Fixed Header */}
      <div className={styles.fixedHeader}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>
              How many units do you want to list?
            </h1>
            <p className={styles.subtitle}>Choose the option that best describes your property</p>
          </div>
        </div>
      </div>
      
      {/* Content Area with Fixed Height */}
      <div className={styles.contentArea}>
        <div className={styles.contentWrapper}>
          {/* Scrollable Content Container */}
          <div className={styles.scrollableContainer}>
            <div className={styles.optionsList}>
              {/* Single Unit */}
              <div
                className={`${styles.optionCard} ${
                  propertyData.units === 'single' ? styles.selected : styles.unselected
                }`}
                onClick={() => handleUnitsSelection('single')}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardInner}>
                    {/* Icon */}
                    <div className={`${styles.iconContainer} ${
                      propertyData.units === 'single' ? styles.selected : styles.unselected
                    }`}>
                      <HomeIcon style={{ fontSize: 24 }} />
                    </div>
                    
                    <div className={styles.textContent}>
                      <h3 className={`${styles.optionTitle} ${
                        propertyData.units === 'single' ? styles.selected : styles.unselected
                      }`}>
                        One unit
                      </h3>
                      <p className={styles.optionDescription}>
                        You have one rentable unit, which can only be rented in its entirety.
                      </p>
                    </div>
                    
                    {/* Selection indicator */}
                    <div className={`${styles.selectionIndicator} ${
                      propertyData.units === 'single' ? styles.selected : styles.unselected
                    }`}>
                      {propertyData.units === 'single' && (
                        <div className={styles.indicatorDot}></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Multiple Units */}
              <div
                className={`${styles.optionCard} ${
                  propertyData.units === 'multiple' ? styles.selected : styles.unselected
                }`}
                onClick={() => handleUnitsSelection('multiple')}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardInner}>
                    {/* Icon */}
                    <div className={`${styles.iconContainer} ${
                      propertyData.units === 'multiple' ? styles.selected : styles.unselected
                    }`}>
                      <ApartmentIcon style={{ fontSize: 24 }} />
                    </div>
                    
                    <div className={styles.textContent}>
                      <h3 className={`${styles.optionTitle} ${
                        propertyData.units === 'multiple' ? styles.selected : styles.unselected
                      }`}>
                        Multiple units (at the same location)
                      </h3>
                      <p className={styles.optionDescription}>
                        You have multiple rentable units, which are located at the same street address or 
                        complex, such as a gated community or large resort.
                      </p>
                    </div>
                    
                    {/* Selection indicator */}
                    <div className={`${styles.selectionIndicator} ${
                      propertyData.units === 'multiple' ? styles.selected : styles.unselected
                    }`}>
                      {propertyData.units === 'multiple' && (
                        <div className={styles.indicatorDot}></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Link */}
            <div className={styles.helpSection}>
              <a 
                href="#" 
                className={styles.helpLink}
              >
                Have properties in different locations?
              </a>
            </div>

            {/* Tip Alert */}
            <div className={styles.alertSection}>
              <Alert variant="info" title="Tip:">
                Please ensure you provide accurate information as much as possible — this helps us guide you better and maximize the benefits of partnering with us.
              </Alert>
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
              disabled={!propertyData.units}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                propertyData.units
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