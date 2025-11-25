'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { FormData, initialFormData } from '../types/form';
import { useAddressData } from '../hooks/useAddressData';
import { useAddressValidation } from '../hooks/useAddressValidation';
import { validateEmail, validatePhone, VALIDATION_MESSAGES } from '../utils/formValidation';

import { StepRenderer } from './StepRenderer';
import { FormNavigation } from './FormNavigation';
import { ProgressBar } from './ui/ProgressBar';
import { Button } from './ui/Button';
import { LoadingOverlay } from './ui/LoadingOverlay';

import step1Image from '../assets/blackbird-2.jpg';
import step2Image from '../assets/blackbird-1.jpg';
import step3Image from '../assets/sparrow-1.jpg';
import step4Image from '../assets/sparrow-2.jpeg';

const TOTAL_STEPS = 6;

const stepImages: Record<number, any> = {
    1: step1Image,
    2: step2Image,
    3: step2Image, // Reuse step 2 image for insulation
    4: step3Image,
    5: step4Image,
    6: step4Image, // Reuse step 4 image for completion
};

export const MultiStepForm = () => {
    // State
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    // Hooks
    const searchParams = useSearchParams();
    const hasAutoFetched = useRef(false);
    const { fetchAddressData, isFetching: isFetchingData, hasData: hasApiData } = useAddressData();
    const { address: validatedAddress } = useAddressValidation(formData.postalCode, formData.houseNumber);

    // Callbacks
    const updateFormData = useCallback((data: Partial<FormData>) => {
        setFormData(prev => {
            const newData = { ...prev, ...data };

            // Clear errors when user types
            if (data.email) {
                setErrors(prev => ({ ...prev, email: '' }));
            }
            if (data.phone) {
                setErrors(prev => ({ ...prev, phone: '' }));
            }

            return newData;
        });
    }, []);

    const validateField = useCallback((field: keyof FormData, value: string) => {
        let error = '';
        if (field === 'email' && value && !validateEmail(value)) {
            error = VALIDATION_MESSAGES.EMAIL_INVALID;
        }
        if (field === 'phone' && value && !validatePhone(value)) {
            error = VALIDATION_MESSAGES.PHONE_INVALID;
        }

        setErrors(prev => ({ ...prev, [field]: error }));
    }, []);

    const isStepValid = useCallback((): boolean => {
        switch (currentStep) {
            case 1:
                return !!(formData.postalCode && formData.houseNumber && formData.street && formData.city);
            case 2:
                return !!(
                    formData.houseType &&
                    formData.buildYear &&
                    formData.area &&
                    formData.energyLabel &&
                    formData.estimatedGasUsage &&
                    formData.estimatedEnergyUsage
                );
            case 3:
                return !!(formData.insulation && formData.insulation.length > 0);
            case 4:
                // Check if heat distribution is selected
                if (!formData.heatDistribution || formData.heatDistribution.length === 0) {
                    return false;
                }
                // Check if only incompatible systems are selected
                const incompatibleSystems = ['stadsverwarming', 'luchtverwarming'];
                const hasOnlyIncompatible = formData.heatDistribution.every(
                    system => incompatibleSystems.includes(system as string)
                );
                return !hasOnlyIncompatible;
            case 5:
                const isEmailValid = validateEmail(formData.email);
                const isPhoneValid = validatePhone(formData.phone);
                const hasName = !!(formData.firstName && formData.lastName);
                return hasName && isEmailValid && isPhoneValid;
            default:
                return false;
        }
    }, [currentStep, formData]);

    // Effects
    useEffect(() => {
        const postalCodeParam = searchParams.get('postalCode');
        const houseNumberParam = searchParams.get('houseNumber');

        if (postalCodeParam && houseNumberParam && !hasAutoFetched.current && currentStep === 1) {
            hasAutoFetched.current = true;

            updateFormData({
                postalCode: postalCodeParam,
                houseNumber: houseNumberParam
            });

            fetchAddressData(postalCodeParam, houseNumberParam, undefined, updateFormData).then(() => {
                setCurrentStep(2);
            });
        }
    }, [searchParams, currentStep, fetchAddressData, updateFormData]);

    useEffect(() => {
        if (validatedAddress) {
            updateFormData({
                street: validatedAddress.street,
                city: validatedAddress.city
            });
        }
    }, [validatedAddress, updateFormData]);

    // Handlers
    const handleNext = async () => {
        if (currentStep === 1) {
            await fetchAddressData(formData.postalCode, formData.houseNumber, formData.houseNumberAddition, updateFormData);
        }
        if (currentStep < TOTAL_STEPS) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setCurrentStep(6);
    };



    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Mobile Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-offwhite-50 border-b border-gray-100 px-4 py-3 md:hidden">
                <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
            </div>

            {/* Desktop Left Column: Form */}
            <div className="hidden md:flex w-full md:w-1/2 flex flex-col h-screen bg-offwhite-50">
                {/* Desktop Header */}
                <div className="hidden md:block px-12 pt-12 md:pr-0 pb-0">
                    <div className="mb-8">
                        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="hidden md:block flex-1 overflow-y-auto pt-16 p-6 md:pl-12 bg-offwhite-50">
                    <div className="max-w-2xl mx-auto w-full">
                        {isFetchingData ? (
                            <LoadingOverlay inline />
                        ) : (
                            <StepRenderer
                                currentStep={currentStep}
                                formData={formData}
                                updateFormData={updateFormData}
                                errors={errors}
                                validateField={validateField}
                                hasApiData={hasApiData}
                            />
                        )}
                    </div>
                </div>

                {/* Desktop Footer */}
                {!isFetchingData && (
                    <FormNavigation
                        currentStep={currentStep}
                        totalSteps={TOTAL_STEPS}
                        isStepValid={isStepValid()}
                        isSubmitting={isSubmitting}
                        onNext={handleNext}
                        onBack={handleBack}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>

            {/* Desktop Right Column: Image */}
            <div className="p-12 hidden md:block w-1/2 h-screen flex">
                <div className="w-full rounded-3xl h-full sticky top-0 overflow-hidden relative">
                    {[1, 2, 3, 4, 5, 6].map((step) => (
                        <div
                            key={step}
                            className={`absolute inset-0 transition-opacity duration-400 ease-in-out ${currentStep === step ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                        >
                            <Image
                                src={stepImages[step]}
                                alt={`Step ${step} illustration`}
                                fill
                                className="object-cover"
                                priority={step === 1}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Content Area */}
            <div className="md:hidden pt-16 pb-24 px-2">
                <div className="p-2">
                    {isFetchingData ? (
                        <LoadingOverlay inline />
                    ) : (
                        <StepRenderer
                            currentStep={currentStep}
                            formData={formData}
                            updateFormData={updateFormData}
                            errors={errors}
                            validateField={validateField}
                            hasApiData={hasApiData}
                        />
                    )}
                </div>
            </div>

            {/* Mobile Fixed Footer */}
            {!isFetchingData && (
                <FormNavigation
                    currentStep={currentStep}
                    totalSteps={TOTAL_STEPS}
                    isStepValid={isStepValid()}
                    isSubmitting={isSubmitting}
                    onNext={handleNext}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    isMobile
                />
            )}
        </div>
    );
};
