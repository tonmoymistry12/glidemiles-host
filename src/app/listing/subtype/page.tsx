'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { SubtypeCard } from '@/components/listing/SubtypeCard';
import { useListingStore } from '@/store/listingStore';
import { PropertyTypeSuggestionModal } from '@/components/modals/PropertyTypeSuggestionModal';
import { HOME_SUBTYPES, HOTEL_SUBTYPES, UNIQUE_SUBTYPES } from '@/lib/constants';
import styles from './page.module.scss';

function SubtypePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { propertyData, updatePropertyData, setCurrentStep } = useListingStore();
  const [subtypeData, setSubtypeData] = useState<{ title: string; mostCommon?: { id: string; icon: React.ComponentType; title: string; description: string }[]; others?: { id: string; icon: React.ComponentType; title: string; description: string }[] } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const type = searchParams.get('type') || propertyData.propertyType;
    
    switch (type) {
      case 'home':
        setSubtypeData({
          title: 'Which home-type property best fits your place?',
          ...HOME_SUBTYPES
        });
        break;
      case 'hotel':
        setSubtypeData({
          title: 'Which hotel-type property best fits your place?',
          ...HOTEL_SUBTYPES
        });
        break;
      case 'unique':
        setSubtypeData({
          title: 'Which unique-type property best fits your place?',
          ...UNIQUE_SUBTYPES
        });
        break;
      default:
        router.push('/listing/property-type');
    }
  }, [searchParams, propertyData.propertyType, router]);

  const handleSubtypeSelection = (subtypeId: string) => {
    updatePropertyData({ subType: subtypeId });
  };

  const handleNext = () => {
    if (propertyData.subType) {
      setCurrentStep('units');
      router.push('/listing/units');
    }
  };

  const handleBack = () => {
    setCurrentStep('property-type');
    router.push('/listing/property-type');
  };

  if (!subtypeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Header />
      
      {/* Fixed Header */}
      <div className={styles.fixedHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            {subtypeData.title}
          </h1>
          {/* Help Link - Top Right */}
          <div className={styles.helpLinkTopRight}>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              className={styles.helpLink}
            >
              I don&apos;t see my property type on the list
            </a>
          </div>
        </div>
      </div>
      
      {/* Content Area with Fixed Height */}
      <div className={styles.contentArea}>
        <div className={styles.contentWrapper}>
          {/* Scrollable Content Container */}
          <div className={styles.scrollableContainer}>
            {/* Most Common Types */}
            <div className="mb-8">
              <h3 className={styles.sectionTitle}>
                Most common {propertyData.propertyType}-type property
              </h3>
              <div className={styles.gridContainer}>
                {subtypeData.mostCommon?.map((subtype) => (
                  <SubtypeCard
                    key={subtype.id}
                    subtype={subtype}
                    selected={propertyData.subType === subtype.id}
                    onClick={() => handleSubtypeSelection(subtype.id)}
                  />
                ))}
              </div>

              <h3 className={styles.sectionTitle}>
                Others {propertyData.propertyType}-type property
              </h3>
              <div className={styles.gridContainer}>
                {subtypeData.others?.map((subtype) => (
                  <SubtypeCard
                    key={subtype.id}
                    subtype={subtype}
                    selected={propertyData.subType === subtype.id}
                    onClick={() => handleSubtypeSelection(subtype.id)}
                  />
                ))}
              </div>
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
              disabled={!propertyData.subType}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                propertyData.subType
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-slate-300 cursor-not-allowed text-slate-500'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      <PropertyTypeSuggestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default function SubtypePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubtypePageContent />
    </Suspense>
  );
}