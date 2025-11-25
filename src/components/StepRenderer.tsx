import React from 'react';
import { FormData } from '../types/form';
import { LocationStep } from './steps/LocationStep';
import { DataReviewStep } from './steps/DataReviewStep';
import { HeatingSystemStep } from './steps/HeatingSystemStep';
import { ContactStep } from './steps/ContactStep';
import { InsulationStep } from './steps/InsulationStep';
import { CompletionStep } from './steps/CompletionStep';

interface StepRendererProps {
    currentStep: number;
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    errors: Record<string, string>;
    validateField: (field: keyof FormData, value: string) => void;
    hasApiData: boolean | null;
}

export const StepRenderer: React.FC<StepRendererProps> = ({
    currentStep,
    formData,
    updateFormData,
    errors,
    validateField,
    hasApiData,
}) => {
    return (
        <div key={currentStep} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentStep === 1 && (
                <LocationStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 2 && (
                <DataReviewStep
                    formData={formData}
                    updateFormData={updateFormData}
                    hasApiData={hasApiData}
                />
            )}
            {currentStep === 3 && (
                <InsulationStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 4 && (
                <HeatingSystemStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 5 && (
                <ContactStep
                    formData={formData}
                    updateFormData={updateFormData}
                    errors={errors}
                    validateField={validateField}
                />
            )}
            {currentStep === 6 && (
                <CompletionStep />
            )}
        </div>
    );
};
