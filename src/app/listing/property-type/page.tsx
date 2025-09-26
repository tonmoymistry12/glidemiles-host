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
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <Header />
      
      {/* Fixed Header */}
      <div className="fixed top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-sm z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-xl font-bold text-slate-900">
            What type of property are you listing?
          </h1>
          <p className="text-slate-600 text-sm mt-1">Choose the category that best describes your property</p>
        </div>
      </div>
      
      {/* Content Area with Fixed Height */}
      <div className="pt-38 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Scrollable Options List with Fixed Height */}
          <div 
            className="h-[calc(100vh-14rem)] overflow-y-auto flex items-center justify-center"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#cbd5e1 #f1f5f9'
            }}
          >
            <div className="space-y-3 pb-6 w-full">
              {PROPERTY_TYPES.map((type, index) => {
              const colorSchemes = [
                { 
                  primary: 'blue', 
                  bg: 'bg-blue-50', 
                  border: 'border-blue-200', 
                  icon: 'bg-blue-100 text-blue-600',
                  selected: 'bg-blue-500 text-white',
                  accent: 'text-blue-600'
                },
                { 
                  primary: 'emerald', 
                  bg: 'bg-emerald-50', 
                  border: 'border-emerald-200', 
                  icon: 'bg-emerald-100 text-emerald-600',
                  selected: 'bg-emerald-500 text-white',
                  accent: 'text-emerald-600'
                },
                { 
                  primary: 'violet', 
                  bg: 'bg-violet-50', 
                  border: 'border-violet-200', 
                  icon: 'bg-violet-100 text-violet-600',
                  selected: 'bg-violet-500 text-white',
                  accent: 'text-violet-600'
                }
              ];
              
              const scheme = colorSchemes[index];
              
              return (
                <div
                  key={type.id}
                  className={`relative overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                    propertyData.propertyType === type.id
                      ? `${scheme.bg} ${scheme.border} shadow-md`
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => handleTypeSelection(type.id)}
                >
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        propertyData.propertyType === type.id
                          ? scheme.selected
                          : scheme.icon
                      }`}>
                        {React.createElement(type.icon, {
                          style: { fontSize: 20 }
                        })}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`text-base font-semibold mb-1 transition-colors ${
                          propertyData.propertyType === type.id
                            ? scheme.accent
                            : 'text-slate-800'
                        }`}>
                          {type.title}
                        </h3>
                        <p className="text-xs leading-relaxed text-slate-600">
                          {type.description}
                        </p>
                      </div>
                      
                      {/* Selection indicator */}
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        propertyData.propertyType === type.id
                          ? `${scheme.selected} border-transparent`
                          : 'border-slate-300'
                      }`}>
                        {propertyData.propertyType === type.id && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
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
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleBack}
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Back
            </Button>
            <Button 
              size="lg"
              onClick={handleNext}
              disabled={!propertyData.propertyType}
              className={`${
                propertyData.propertyType
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-slate-300 cursor-not-allowed text-slate-500'
              } font-semibold transition-colors`}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}