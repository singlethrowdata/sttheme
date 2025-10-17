// [R1]: Multi-step form wizard with progress indicator
// → needs: Button, TypeScript types
// → provides: multi-step-wizard for complex form flows

"use client";
import React, { useState, ReactNode } from "react";
import Button from "../button/Button";

interface Step {
  label: string;
  content: ReactNode;
}

interface MultiStepFormProps {
  steps: Step[];
  onComplete?: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
  submitLabel?: string;
  className?: string;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  onComplete,
  onCancel,
  submitLabel = "Complete",
  className = "",
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    onComplete?.({});
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <div
            className="h-full rounded-full bg-brand-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="mb-8 flex items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${index < currentStep
                  ? "border-brand-500 bg-brand-500 text-white"
                  : index === currentStep
                    ? "border-brand-500 bg-white text-brand-500 dark:bg-gray-900"
                    : "border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500"
                  }`}
              >
                {index < currentStep ? (
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span
                className={`mt-2 hidden text-theme-xs font-medium sm:block ${index <= currentStep
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
                  }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 ${index < currentStep
                  ? "bg-brand-500"
                  : "bg-gray-300 dark:bg-gray-700"
                  }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        {steps[currentStep].content}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-3">
          {!isFirstStep && (
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
        <div>
          {!isLastStep ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleComplete}>{submitLabel}</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
