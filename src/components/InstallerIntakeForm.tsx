'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { FormData, initialFormData } from '../types/form';
import { useAddressData } from '../hooks/useAddressData';
import { useAddressValidation } from '../hooks/useAddressValidation';
import { validateEmail, validatePhone, VALIDATION_MESSAGES } from '../utils/formValidation';

import { FormNavigation } from './FormNavigation';
import { ProgressBar } from './ui/ProgressBar';
import { LoadingOverlay } from './ui/LoadingOverlay';

import { LocationStep } from './steps/LocationStep';
import { InstallerSearchStep } from './steps/InstallerSearchStep';
import { ContactStep } from './steps/ContactStep';
import { CompletionStep } from './steps/CompletionStep';

import step1Image from '../assets/address.jpeg';
import step2Image from '../assets/contact.jpeg'; // Installer search
import step3Image from '../assets/contact.jpeg'; // Contact
import step4Image from '../assets/contact.jpeg'; // Completion

const TOTAL_STEPS = 4;

const stepImages: Record<number, any> = {
    1: step1Image,
    2: step2Image,
    3: step3Image,
    4: step4Image,
};

export const InstallerIntakeForm = () => {
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
                return true; // Installer search is view-only/optional selection
            case 3:
                const isEmailValid = validateEmail(formData.email);
                const hasName = !!(formData.firstName && formData.lastName);
                const isPhoneValid = validatePhone(formData.phone);
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

        // If we're on the Contact step (Step 3), submit the form
        if (currentStep === 3) {
            await handleSubmit();
            return;
        }

        if (currentStep < TOTAL_STEPS) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            const newStep = currentStep - 1;
            if (newStep === 1) {
                setFormData(initialFormData);
            }
            setCurrentStep(newStep);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            // Build full address string
            const fullAddress = `${formData.street} ${formData.houseNumber}${formData.houseNumberAddition ? formData.houseNumberAddition : ''}, ${formData.postalCode} ${formData.city}`;

            const payload = {
                triggerType: "form_submission",
                payload: {
                    name: "Quote Request",
                    siteId: "67ed5695314f69c537693240",
                    data: {
                        "Address": fullAddress,
                        "Postcode 7": formData.postalCode,
                        "Huisnummer 6": formData.houseNumber,
                        "Toevoeging 6": formData.houseNumberAddition || "",
                        "Oid 3": formData.selectedInstaller?.sfid || "",
                        "first_name": formData.firstName,
                        "last_name": formData.lastName,
                        "email": formData.email,
                        "Phone": formData.phone || "",
                        "Bericht": formData.message || "",
                        "Zip": formData.postalCode,
                        "street": `${formData.street} ${formData.houseNumber}${formData.houseNumberAddition ? formData.houseNumberAddition : ''}`,
                        "place": formData.city || "Nederland",
                        "sfid": formData.selectedInstaller?.sfid || "",
                        "company": ""
                    },
                    submittedAt: new Date().toISOString(),
                    id: Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
                    formId: "68138adfbf3aeebbc2a1056a",
                    formElementId: "37bbb4a4-8ff2-901a-01e6-690165bf6956",
                    pageId: "67ed5695314f69c53769323d",
                    publishedPath: "/",
                    pageUrl: "https://www.weheat.nl/",
                    schema: []
                }
            };

            const response = await fetch('https://defaultafcb403265a34bf5894edb5aeefe64.71.environment.api.powerplatform.com/powerautomate/automations/direct/workflows/7ee5ab6664da4e5bb38e92ce40b8af3c/triggers/manual/paths/invoke?api-version=1&sp=/triggers/manual/run&sv=1.0&sig=wwn7F98vaJWYb9KMOVd_RCfteOTsDjGEidGJCZjfoD8', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API call failed: ${response.statusText}`);
            }

            console.log('Installer intake form submitted successfully to Power Automate');
        } catch (error) {
            console.error('Error submitting installer intake form:', error);
        } finally {
            setIsSubmitting(false);
            setCurrentStep(TOTAL_STEPS);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <LocationStep formData={formData} updateFormData={updateFormData} />;
            case 2:
                return <InstallerSearchStep formData={formData} updateFormData={updateFormData} />;
            case 3:
                return (
                    <ContactStep
                        formData={formData}
                        updateFormData={updateFormData}
                        errors={errors}
                        validateField={validateField}
                        showPhone={true}
                        showMessage={true}
                    />
                );
            case 4:
                return <CompletionStep />;
            default:
                return null;
        }
    };

    const showProgress = currentStep > 1 && currentStep < TOTAL_STEPS;

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Mobile Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-offwhite-50 border-b border-gray-100 px-4 py-3 md:hidden">
                {showProgress && (
                    <ProgressBar currentStep={currentStep - 1} totalSteps={2} />
                )}
            </div>

            {/* Desktop Left Column: Form */}
            <div className="hidden md:flex w-full md:w-1/2 flex flex-col h-screen bg-offwhite-50">
                {/* Desktop Header */}
                <div className="hidden md:block px-12 pt-12 md:pr-0 pb-0">
                    <div className="mb-8">
                        {showProgress && (
                            <ProgressBar currentStep={currentStep - 1} totalSteps={2} />
                        )}
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="hidden md:block flex-1 overflow-y-auto pt-16 p-6 md:pl-12 bg-offwhite-50">
                    <div className="max-w-2xl mx-auto w-full">
                        {isFetchingData ? (
                            <LoadingOverlay inline />
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {renderStep()}
                            </div>
                        )}
                    </div>
                </div>

                {/* Desktop Footer */}
                {!isFetchingData && currentStep < TOTAL_STEPS && (
                    <FormNavigation
                        currentStep={currentStep}
                        totalSteps={TOTAL_STEPS}
                        isStepValid={isStepValid()}
                        isSubmitting={isSubmitting}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
            </div>

            {/* Desktop Right Column: Image */}
            <div className="p-12 hidden md:block w-1/2 h-screen flex">
                <div className="w-full rounded-3xl h-full sticky top-0 overflow-hidden relative">
                    {[1, 2, 3, 4].map((step) => (
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
            <div className="md:hidden pt-16 pb-32 px-2">
                <div className="p-2">
                    {isFetchingData ? (
                        <LoadingOverlay inline />
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {renderStep()}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Fixed Footer */}
            {!isFetchingData && currentStep < TOTAL_STEPS && (
                <FormNavigation
                    currentStep={currentStep}
                    totalSteps={TOTAL_STEPS}
                    isStepValid={isStepValid()}
                    isSubmitting={isSubmitting}
                    onNext={handleNext}
                    onBack={handleBack}
                    isMobile
                />
            )}
        </div>
    );
};
