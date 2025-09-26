'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { SubtypeCard } from '@/components/listing/SubtypeCard';
import { Button } from '@/components/ui/Button';
import { useListingStore } from '@/store/listingStore';
import { PropertyTypeSuggestionModal } from '@/components/modals/PropertyTypeSuggestionModal';
import { HOME_SUBTYPES, HOTEL_SUBTYPES, UNIQUE_SUBTYPES } from '@/lib/constants';

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
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          {subtypeData.title}
        </h1>
        
        {/* Most Common Types */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Most common {propertyData.propertyType}-type property
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {subtypeData.mostCommon?.map((subtype) => (
              <SubtypeCard
                key={subtype.id}
                subtype={subtype}
                selected={propertyData.subType === subtype.id}
                onClick={() => handleSubtypeSelection(subtype.id)}
              />
            ))}
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Others {propertyData.propertyType}-type property
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* Help Link */}
      <div className="text-center mb-8">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
          className="text-blue-600 hover:underline text-sm"
        >
          I don&apos;t see my property type on the list
        </a>
      </div>     
    

        {/* Navigation */}
        <div className="flex justify-between items-center h-16 px-6 bg-white border-t border-gray-200 fixed bottom-0 left-56 right-56">
          <Button variant="outline" size="lg" onClick={handleBack}>
            Back
          </Button>
          <Button 
            size="lg"
            onClick={handleNext}
            disabled={!propertyData.subType}
          >
            Next
          </Button>
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