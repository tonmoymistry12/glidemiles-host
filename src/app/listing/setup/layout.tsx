'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { StepIndicator } from '@/components/listing/StepIndicator';
import { useListingStore } from '@/store/listingStore';

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { steps, setCurrentStep } = useListingStore();

  const handleStepClick = (stepId: string) => {
    setCurrentStep(stepId);
    router.push(`/listing/setup/${stepId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex pt-16">
        <StepIndicator 
          steps={steps}
          currentStep={steps.find(s => s.current)?.id || 'basics'}
          onStepClick={handleStepClick}
        />
        <div className="flex-1 ml-[25rem]">
          {children}
        </div>
      </div>
    </div>
  );
}