import React from 'react';
import { Button } from './ui/Button';

interface FormNavigationProps {
    currentStep: number;
    totalSteps: number;
    isStepValid: boolean;
    isSubmitting: boolean;
    onNext: () => void;
    onBack: () => void;
    isMobile?: boolean;
    hasOnlyIncompatible?: boolean;
    customButtonText?: string;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
    currentStep,
    totalSteps,
    isStepValid,
    isSubmitting,
    onNext,
    onBack,
    isMobile = false,
    customButtonText,
}) => {
    const containerClasses = isMobile
        ? "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 p-4 md:hidden safe-area-bottom shadow-2xl"
        : "hidden md:block pb-12 pt-8 ml-12 border-t border-neutral-200";

    const buttonContainerClasses = isMobile
        ? "flex gap-3"
        : "mx-auto w-full flex justify-between";

    const backButtonClasses = isMobile
        ? `flex-1 ${currentStep === 1 ? 'invisible' : ''}`
        : currentStep === 1 ? 'invisible' : '';

    const nextButtonClasses = isMobile ? 'flex-1' : '';

    // Determine if we're on the final interactive step (step before completion)
    const isFinalStep = currentStep === totalSteps - 1;

    // Button text logic
    const getButtonText = () => {
        if (isSubmitting) return 'Verzenden...';
        if (isFinalStep && customButtonText) return customButtonText;
        if (isFinalStep) return isMobile ? 'Aanvragen' : 'Besparingsrapport aanvragen';
        return 'Volgende';
    };

    return (
        <div className={containerClasses}>
            <div className={buttonContainerClasses}>
                <Button
                    variant="secondary"
                    onClick={onBack}
                    disabled={currentStep === 1}
                    className={backButtonClasses}
                >
                    Terug
                </Button>

                <Button
                    onClick={onNext}
                    disabled={!isStepValid || isSubmitting}
                    className={nextButtonClasses}
                >
                    {getButtonText()}
                </Button>
            </div>
        </div>
    );
};
