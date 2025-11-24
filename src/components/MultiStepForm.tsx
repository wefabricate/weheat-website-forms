'use client';

import React, { useState } from 'react';
import { FormData, initialFormData } from '../types/form';
import { LocationStep } from './steps/LocationStep';
import { DataReviewStep } from './steps/DataReviewStep';
import { HomeDetailsStep } from './steps/HomeDetailsStep';
import { HeatingSystemStep } from './steps/HeatingSystemStep';
import { ContactStep } from './steps/ContactStep';
import { ProgressBar } from './ui/ProgressBar';
import { Button } from './ui/Button';
import { CheckCircle } from 'lucide-react';
import { LoadingOverlay } from './ui/LoadingOverlay';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useAddressData } from '../hooks/useAddressData';
import weheatLogo from '../assets/weheat-logo.png';
import step1Image from '../assets/blackbird-2.jpg';
import step2Image from '../assets/blackbird-1.jpg';
import step3Image from '../assets/app.jpg';
import step4Image from '../assets/sparrow-1.jpg';
import step5Image from '../assets/sparrow-2.jpeg';

// Use step 1 image as placeholder for now
const stepImages: Record<number, any> = {
    1: step1Image,
    2: step2Image,
    3: step3Image,
    4: step4Image,
    5: step5Image,
};

export const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const searchParams = useSearchParams();
    const hasAutoFetched = React.useRef(false);

    const { fetchAddressData, isFetching: isFetchingData, hasData: hasApiData } = useAddressData();

    const totalSteps = 5;

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string) => {
        return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
    };

    const updateFormData = React.useCallback((data: Partial<FormData>) => {
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

    // Handle URL parameters
    React.useEffect(() => {
        const postalCodeParam = searchParams.get('postalCode');
        const houseNumberParam = searchParams.get('houseNumber');

        if (postalCodeParam && houseNumberParam && !hasAutoFetched.current && currentStep === 1) {
            hasAutoFetched.current = true;

            // Update form data
            updateFormData({
                postalCode: postalCodeParam,
                houseNumber: houseNumberParam
            });

            // Trigger fetch and advance step
            fetchAddressData(postalCodeParam, houseNumberParam, updateFormData).then(() => {
                setCurrentStep(2);
            });
        }
    }, [searchParams, currentStep, fetchAddressData, updateFormData]);

    const handleNext = async () => {
        if (currentStep === 1) {
            // Fetch address data before moving to step 2
            await fetchAddressData(formData.postalCode, formData.houseNumber, updateFormData);
        }
        if (currentStep < totalSteps) {
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
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        console.log('Form submitted:', formData);
    };

    if (isSuccess) {
        return (
            <div className="max-w-2xl mx-auto pt-24 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-medium text-gray-900 mb-4">Verzonden!</h2>
                <p className="text-md text-gray-600 mb-8">
                    We hebben je gegevens ontvangen. Een van onze experts neemt binnenkort contact met je op met een persoonlijke offerte.
                </p>
                <Button onClick={() => window.location.reload()}>
                    Plan een adviesgesprek
                </Button>
            </div>
        );
    }

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return !!(formData.postalCode && formData.houseNumber && formData.street && formData.city);
            case 2:
                // Data review step - always valid (data is prefilled)
                return true;
            case 3:
                return !!(formData.insulation);
            case 4:
                return !!(formData.heatDistribution && formData.heatDistribution.length > 0);
            case 5:
                const isEmailValid = validateEmail(formData.email);
                const isPhoneValid = validatePhone(formData.phone);
                const hasName = !!(formData.firstName && formData.lastName);

                // Only show errors if fields are filled but invalid
                if (formData.email && !isEmailValid) {
                    // We don't set errors here to avoid render loops, 
                    // but we ensure the button is disabled
                }

                return hasName && isEmailValid && isPhoneValid;
            default:
                return false;
        }
    };

    // Validate on blur or when trying to submit
    const validateField = (field: keyof FormData, value: string) => {
        let error = '';
        if (field === 'email' && value && !validateEmail(value)) {
            error = 'Vul een geldig e-mailadres in';
        }
        if (field === 'phone' && value && !validatePhone(value)) {
            error = 'Vul een geldig telefoonnummer in (min. 10 cijfers)';
        }

        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const validateContactStep = () => {
        const newErrors: Record<string, string> = {};

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Vul een geldig e-mailadres in';
        }
        if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Vul een geldig telefoonnummer in (min. 10 cijfers)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">

            {/* Mobile Fixed Header - Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-offwhite-50 border-b border-gray-100 px-4 py-3 md:hidden">
                <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            {/* Desktop Left Column: Form (Scrollable) */}
            <div className="w-full md:w-1/2 flex flex-col h-screen bg-offwhite-50">
                {/* Desktop Header */}
                <div className="hidden md:block px-12 pt-12 md:pr-0 pb-0">
                    <div className="mb-8">
                        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto pt-0 pl-12 bg-offwhite-50">
                    <div className="max-w-2xl mx-auto w-full">
                        {isFetchingData ? (
                            <LoadingOverlay inline />
                        ) : (
                            <>
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
                                    <HomeDetailsStep formData={formData} updateFormData={updateFormData} />
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
                            </>
                        )}
                    </div>
                </div>

                {/* Desktop Footer (Sticky at bottom of column) */}
                {!isFetchingData && (
                    <div className="hidden md:block pb-12 pt-8 ml-12  border-t border-gray-100">
                        <div className="mx-auto w-full flex justify-between">
                            <Button
                                variant="secondary"
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                className={currentStep === 1 ? 'invisible' : ''}
                            >
                                Terug
                            </Button>

                            {currentStep < totalSteps ? (
                                <Button onClick={handleNext} disabled={!isStepValid()}>
                                    Volgende
                                </Button>
                            ) : (
                                <Button onClick={handleSubmit} disabled={isSubmitting || !isStepValid()}>
                                    {isSubmitting ? 'Verzenden...' : 'Besparingsrapport aanvragen'}
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop Right Column: Image (Fixed Full Height) */}
            <div className="p-12 hidden md:block w-1/2 h-screen flex">
                <div className="w-full rounded-3xl h-full sticky top-0 overflow-hidden relative">
                    {[1, 2, 3, 4, 5].map((step) => (
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

            {/* Mobile Content Area (with padding for fixed header/footer) */}
            <div className="md:hidden pt-32 pb-24 px-4">
                <div className="p-6">
                    {isFetchingData ? (
                        <LoadingOverlay inline />
                    ) : (
                        <>
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
                                <HomeDetailsStep formData={formData} updateFormData={updateFormData} />
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
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Fixed Footer - Navigation Buttons */}
            {!isFetchingData && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 p-4 md:hidden safe-area-bottom">
                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className={`flex-1 ${currentStep === 1 ? 'invisible' : ''}`}
                        >
                            Terug
                        </Button>

                        {currentStep < totalSteps ? (
                            <Button onClick={handleNext} disabled={!isStepValid()} className="flex-1">
                                Volgende
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} disabled={isSubmitting || !isStepValid()} className="flex-1">
                                {isSubmitting ? 'Verzenden...' : 'Aanvragen'}
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
