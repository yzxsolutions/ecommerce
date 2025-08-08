'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { CheckoutState } from '../../types/checkout';

interface CheckoutStepsProps {
  currentStep: CheckoutState['step'];
}

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
  currentStep,
}) => {
  const steps = [
    { id: 'shipping', name: 'Shipping', description: 'Address and delivery' },
    { id: 'payment', name: 'Payment', description: 'Payment method' },
    { id: 'review', name: 'Review', description: 'Review and place order' },
  ];

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    const currentIndex = steps.findIndex((step) => step.id === currentStep);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <nav aria-label="Progress">
      <ol className="flex items-center justify-center">
        {steps.map((step, stepIdx) => {
          const status = getStepStatus(step.id);

          return (
            <li
              key={step.id}
              className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}
            >
              {/* Connector line */}
              {stepIdx !== steps.length - 1 && (
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div
                    className={`h-0.5 w-full ${
                      status === 'completed' ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                </div>
              )}

              {/* Step indicator */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`
                  flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white
                  ${
                    status === 'completed'
                      ? 'border-primary-600 bg-primary-600'
                      : status === 'current'
                        ? 'border-primary-600 bg-white'
                        : 'border-gray-300 bg-white'
                  }
                `}
                >
                  {status === 'completed' ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span
                      className={`text-sm font-medium ${
                        status === 'current'
                          ? 'text-primary-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {stepIdx + 1}
                    </span>
                  )}
                </div>
              </div>

              {/* Step label */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center">
                <p
                  className={`text-sm font-medium ${
                    status === 'current' ? 'text-primary-600' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
