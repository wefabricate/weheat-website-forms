import React from 'react';
import { FormData } from '../../types/form';
import { CheckCircle, Home, Zap, Euro, MapPin } from 'lucide-react';

interface DataReviewStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export const DataReviewStep: React.FC<DataReviewStepProps> = ({ formData }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">We hebben je woning gevonden!</h2>
                <p className="text-gray-500">Controleer of onderstaande gegevens kloppen.</p>
            </div>

            <div className="space-y-4">
                {/* Address Info */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
                        <div>
                            <p className="font-semibold text-gray-900">
                                {formData.street} {formData.houseNumber}{formData.houseNumberAddition && formData.houseNumberAddition !== 'None' ? ` ${formData.houseNumberAddition}` : ''}
                            </p>
                            <p className="text-sm text-gray-600">{formData.postalCode} {formData.city}</p>
                        </div>
                    </div>
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Home className="w-4 h-4 text-primary-600" />
                            <p className="text-sm font-medium text-gray-600">Bouwjaar</p>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{formData.buildYear || '-'}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Home className="w-4 h-4 text-primary-600" />
                            <p className="text-sm font-medium text-gray-600">Oppervlakte</p>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{formData.area ? `${formData.area} m²` : '-'}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-primary-600" />
                            <p className="text-sm font-medium text-gray-600">Energielabel</p>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{formData.energyLabel || '-'}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Euro className="w-4 h-4 text-primary-600" />
                            <p className="text-sm font-medium text-gray-600">WOZ-waarde</p>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                            {formData.woz ? `€ ${parseInt(formData.woz).toLocaleString('nl-NL')}` : '-'}
                        </p>
                    </div>
                </div>

                {/* Energy Usage */}
                {(formData.estimatedEnergyUsage || formData.estimatedGasUsage) && (
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <p className="text-sm font-medium text-blue-900 mb-3">Geschat verbruik per jaar</p>
                        <div className="grid grid-cols-2 gap-4">
                            {formData.estimatedEnergyUsage && (
                                <div>
                                    <p className="text-xs text-blue-700">Elektriciteit</p>
                                    <p className="text-lg font-bold text-blue-900">{formData.estimatedEnergyUsage} kWh</p>
                                </div>
                            )}
                            {formData.estimatedGasUsage && (
                                <div>
                                    <p className="text-xs text-blue-700">Gas</p>
                                    <p className="text-lg font-bold text-blue-900">{formData.estimatedGasUsage} m³</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="bg-green-50 rounded-xl p-4 border border-green-100 text-center">
                    <p className="text-sm text-green-800">
                        ✓ Deze gegevens zijn automatisch opgehaald en helpen ons een nauwkeurige offerte te maken.
                    </p>
                </div>
            </div>
        </div>
    );
};
