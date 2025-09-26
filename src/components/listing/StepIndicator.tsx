import React from 'react';
import { Check } from 'lucide-react';
import { StepData } from '@/lib/types';
import styles from './StepIndicator.module.scss';

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
    <div className={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.stepsList}>
          {steps.map((step) => {
            const isCompleted = step.completed;
            const isCurrent = step.id === currentStep;
            const isPending = step.pending;

            return (
              <div
                key={step.id}
                className={`${styles.stepItem} ${
                  isCurrent ? styles.current : 
                  isCompleted ? styles.completed : 
                  styles.pending
                }`}
                onClick={() => !isPending && onStepClick(step.id)}
              >
                <div className={`${styles.stepIndicator} ${
                  isCompleted ? styles.completed :
                  isCurrent ? styles.current : 
                  styles.pending
                }`}>
                  {isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <div className={styles.stepDot}></div>
                  )}
                </div>
                <span className={styles.stepLabel}>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};