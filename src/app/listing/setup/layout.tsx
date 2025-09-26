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
      <StepIndicator 
        steps={steps}
        currentStep={steps.find(s => s.current)?.id || 'basics'}
        onStepClick={handleStepClick}
      />
      <div className="ml-64">
        {children}
      </div>
    </div>
  );
}