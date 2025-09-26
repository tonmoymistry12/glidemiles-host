import React from 'react';
import { Check } from 'lucide-react';
import { StepData } from '@/lib/types';

interface StepIndicatorProps {
  steps: StepData[];
  currentStep: string;
  onStepClick: (stepId: string) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 fixed left-36 top-16 bottom-0 overflow-y-auto z-40">
      <div className="p-6">
        <div className="space-y-4">
          {steps.map((step) => {
            const isCompleted = step.completed;
            const isCurrent = step.id === currentStep;
            const isPending = step.pending;

            return (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors ${
                  isCurrent ? 'bg-blue-50 text-blue-600' : 
                  isCompleted ? 'text-green-600 hover:bg-green-50' : 
                  'text-gray-400 hover:bg-gray-50'
                }`}
                onClick={() => !isPending && onStepClick(step.id)}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted ? 'bg-green-600 text-white' :
                  isCurrent ? 'bg-blue-600 text-white' : 
                  'border-2 border-gray-300'
                }`}>
                  {isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : isCurrent ? (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  ) : (
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  )}
                </div>
                <span className="text-sm font-medium">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};