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

export const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFetchingData, setIsFetchingData] = useState(false);

    const totalSteps = 5;

    const updateFormData = React.useCallback((data: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    }, []);

    const fetchAddressData = async () => {
        setIsFetchingData(true);
        try {
            const cleanPostalCode = formData.postalCode.replace(/\s/g, '');
            const response = await fetch(
                `app/api/address?postal_code=${cleanPostalCode}&house_number=${formData.houseNumber}`
            );

            if (response.ok) {
                const data = await response.json() as {
                    area: string;
                    build_year: string;
                    energy_label: string;
                    estimated_energy_usage: number;
                    estimated_gas_usage: number;
                    latitude: string;
                    longitude: string;
                    woz: string;
                    house_type_mapped: 'detached' | 'semi-detached' | 'terraced' | 'apartment' | '';
                };
                updateFormData({
                    area: data.area,
                    energyLabel: data.energy_label,
                    estimatedEnergyUsage: data.estimated_energy_usage,
                    estimatedGasUsage: data.estimated_gas_usage,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    woz: data.woz,
                    buildYear: data.build_year,
                    houseType: data.house_type_mapped
                });
            }
        } catch (error) {
            console.error('Failed to fetch address data:', error);
        } finally {
            setIsFetchingData(false);
        }
    };

    const handleNext = async () => {
        if (currentStep === 1) {
            // Fetch address data before moving to step 2
            await fetchAddressData();
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
            <div className="max-w-2xl mx-auto p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Bedankt!</h2>
                <p className="text-xl text-gray-600 mb-8">
                    We hebben je gegevens ontvangen. Een van onze experts neemt binnenkort contact met je op met een persoonlijke offerte.
                </p>
                <Button onClick={() => window.location.reload()}>
                    Nieuwe berekening starten
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
                return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
            default:
                return false;
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="mb-8">
                    <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                </div>

                <div className="min-h-[400px] flex flex-col justify-between">
                    <div>
                        {currentStep === 1 && (
                            <LocationStep formData={formData} updateFormData={updateFormData} />
                        )}
                        {currentStep === 2 && (
                            <DataReviewStep formData={formData} updateFormData={updateFormData} />
                        )}
                        {currentStep === 3 && (
                            <HomeDetailsStep formData={formData} updateFormData={updateFormData} />
                        )}
                        {currentStep === 4 && (
                            <HeatingSystemStep formData={formData} updateFormData={updateFormData} />
                        )}
                        {currentStep === 5 && (
                            <ContactStep formData={formData} updateFormData={updateFormData} />
                        )}
                    </div>

                    <div className="flex justify-between mt-8 pt-8 border-t border-gray-100">
                        <Button
                            variant="secondary"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className={currentStep === 1 ? 'invisible' : ''}
                        >
                            Terug
                        </Button>

                        {currentStep < totalSteps ? (
                            <Button onClick={handleNext} disabled={!isStepValid() || isFetchingData}>
                                {isFetchingData ? 'Gegevens ophalen...' : 'Volgende stap'}
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} disabled={isSubmitting || !isStepValid()}>
                                {isSubmitting ? 'Verzenden...' : 'Offerte aanvragen'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
