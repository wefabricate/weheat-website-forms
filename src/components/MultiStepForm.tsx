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
import { CircleX } from 'lucide-react';
import { LoadingOverlay } from './ui/LoadingOverlay';

import step1Image from '../assets/address.jpeg';
import step2Image from '../assets/data-check.jpeg';
import step3Image from '../assets/insulation.jpeg';
import step4Image from '../assets/heat-distribution.jpeg';
import step5Image from '../assets/contact.jpeg';
import step6Image from '../assets/contact.jpeg';

const TOTAL_STEPS = 6;

const stepImages: Record<number, any> = {
    1: step1Image,
    2: step2Image,
    3: step3Image,
    4: step4Image,
    5: step5Image,
    6: step6Image,
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

            return newData;
        });
    }, []);

    const validateField = useCallback((field: keyof FormData, value: string) => {
        let error = '';
        if (field === 'email' && value && !validateEmail(value)) {
            error = VALIDATION_MESSAGES.EMAIL_INVALID;
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
                    formData.estimatedGasUsage
                );
            case 3:
                return true; // Insulation is optional
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
                const hasName = !!(formData.firstName && formData.lastName);
                return hasName && isEmailValid;
            default:
                return false;
        }
    }, [currentStep, formData]);

    // Check for incompatible heating systems (Step 4)
    const incompatibleSystems = ['stadsverwarming', 'luchtverwarming'];
    const selectedSystems = formData.heatDistribution || [];
    const hasOnlyIncompatible = currentStep === 4 && selectedSystems.length > 0 &&
        selectedSystems.every(system => incompatibleSystems.includes(system));

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

        // If we're on the Contact step (Step 5), submit the form
        if (currentStep === 5) {
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
                // Reset form data when going back to step 1
                setFormData(initialFormData);
            }
            setCurrentStep(newStep);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const payload = {
                triggerType: "form_submission",
                payload: {
                    name: "Savings Tool",
                    siteId: "67ed5695314f69c537693240", // Hardcoded from example
                    data: {
                        "Empty 6": "",
                        "Postcode": formData.postalCode,
                        "Huisnummer": formData.houseNumber,
                        "Toevoeging": formData.houseNumberAddition,
                        "Oppervlakte-Known": formData.area || "",
                        "Energielabel-known": formData.energyLabel || "",
                        "Type huis": formData.houseType,
                        "Oppervlakte 7": formData.area || "",
                        "Mensen": "2", // Default as per example
                        "Bouwjaar": formData.buildYear,
                        "Het dak is geïsoleerd": formData.insulation.includes('Het dak is geïsoleerd') ? "true" : "false",
                        "Met dubbelglas of beter": formData.insulation.includes('Met dubbelglas of beter') ? "true" : "false",
                        "Met spouwmuurisolatie": formData.insulation.includes('Met spouwmuurisolatie') ? "true" : "false",
                        "Met andere muurisolatie": formData.insulation.includes('Met andere muurisolatie') ? "true" : "false",
                        "Met vloerisolatie": formData.insulation.includes('Met vloerisolatie') ? "true" : "false",
                        "Stadsverwarming": formData.heatDistribution.includes('stadsverwarming') ? "true" : "false",
                        "Luchtverwarming": formData.heatDistribution.includes('luchtverwarming') ? "true" : "false",
                        "Radiatoren": formData.heatDistribution.includes('radiatoren') ? "true" : "false",
                        "Convectoren in de vloer": formData.heatDistribution.includes('convectoren-vloer') ? "true" : "false",
                        "Convectoren in de muren": formData.heatDistribution.includes('convectoren-muren') ? "true" : "false",
                        "Vloerverwarming": formData.heatDistribution.includes('vloerverwarming') ? "true" : "false",
                        "Anders": formData.heatDistribution.includes('anders') ? "true" : "false",
                        "Radiatoren 2": "false", // Default as per example
                        "Oppervlakte": formData.estimatedGasUsage ? formData.estimatedGasUsage.toString() : "",
                        "Savings Data": "Sparrow P60", // Default as per example
                        "Savings Data 3": "",
                        "Voornaam": formData.firstName,
                        "Achternaam": formData.lastName,
                        "Email": formData.email,
                        "company": ""
                    },
                    submittedAt: new Date().toISOString(),
                    id: Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join(''), // Generate random 24 hex char ID
                    formId: "68d663c57d54d4d7ec462bb2", // Hardcoded from example
                    formElementId: "244093c9-f80f-d2e6-6e9c-9092e3f7e468", // Hardcoded from example
                    pageId: "67f5271fb6e1052f98b09695", // Hardcoded from example
                    publishedPath: "/producten/flint",
                    pageUrl: "https://www.weheat.nl/producten/flint",
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

            console.log('Form submitted successfully to Power Automate');
        } catch (error) {
            console.error('Error submitting form:', error);
            // Optionally handle error state here, but for now we proceed to next step
        } finally {
            setIsSubmitting(false);
            setCurrentStep(6);
        }
    };



    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Mobile Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-offwhite-50 border-b border-gray-100 px-4 py-3 md:hidden">
                {currentStep > 1 && currentStep < 5 && (
                    <ProgressBar currentStep={currentStep - 1} totalSteps={3} />
                )}
            </div>

            {/* Desktop Left Column: Form */}
            <div className="hidden md:flex w-full md:w-1/2 flex flex-col h-screen bg-offwhite-50">
                {/* Desktop Header */}
                <div className="hidden md:block px-12 pt-12 md:pr-0 pb-0">
                    <div className="mb-8">
                        {currentStep > 1 && currentStep < 5 && (
                            <ProgressBar currentStep={currentStep - 1} totalSteps={3} />
                        )}
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
                    {hasOnlyIncompatible && (
                        <div className="mt-16 sticky bottom-0 z-50 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-2">
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0">
                                        <CircleX className="w-5 h-5 text-red-600 mt-0.5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-red-800 mb-1">
                                            Je woning is helaas niet geschikt voor een warmtepomp
                                        </h3>
                                        <p className="text-sm text-red-700">
                                            Met alleen <span className="font-bold">{selectedSystems.includes('stadsverwarming') && selectedSystems.includes('luchtverwarming') ? 'stadsverwarming en luchtverwarming' : selectedSystems.includes('stadsverwarming') ? 'stadsverwarming' : 'luchtverwarming'}</span> is het helaas niet mogelijk om een warmtepomp te installeren.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
                        hasOnlyIncompatible={hasOnlyIncompatible}
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
            <div className="md:hidden pt-16 pb-64 px-2">
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
            {hasOnlyIncompatible && (
                <div className="md:hidden fixed bottom-22 left-0 right-0 z-40 px-4 pb-2 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-2">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                                <CircleX className="w-5 h-5 text-red-600 mt-0.5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-red-800 mb-1">
                                    Je woning is helaas niet geschikt voor een warmtepomp
                                </h3>
                                <p className="text-sm text-red-700">
                                    Met <span className="font-bold">{selectedSystems.includes('stadsverwarming') && selectedSystems.includes('luchtverwarming') ? 'stadsverwarming en luchtverwarming' : selectedSystems.includes('stadsverwarming') ? 'stadsverwarming' : 'luchtverwarming'}</span> is het helaas niet mogelijk om een warmtepomp te installeren.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!isFetchingData && currentStep < TOTAL_STEPS && (
                <FormNavigation
                    currentStep={currentStep}
                    totalSteps={TOTAL_STEPS}
                    isStepValid={isStepValid()}
                    isSubmitting={isSubmitting}
                    onNext={handleNext}
                    onBack={handleBack}
                    isMobile
                    hasOnlyIncompatible={hasOnlyIncompatible}
                />
            )}
        </div>
    );
};
