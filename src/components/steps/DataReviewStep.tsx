import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FormData } from '../../types/form';
import { CheckCircle, Home, Zap, MapPin, Edit2, Check, AlertCircle } from 'lucide-react';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { EnergyLabel } from '../ui/EnergyLabel';
import streetViewPlaceholder from '../../assets/street-view-placeholder.jpg';

interface DataReviewStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    hasApiData?: boolean | null;
}

export const DataReviewStep: React.FC<DataReviewStepProps> = ({ formData, updateFormData, hasApiData }) => {
    const [isEditing, setIsEditing] = useState(false);

    // Auto-enable edit mode if no API data found
    useEffect(() => {
        if (hasApiData === false) {
            setIsEditing(true);
        }
    }, [hasApiData]);

    const houseTypes = [
        { id: 'detached', label: 'Vrijstaand' },
        { id: 'semi-detached', label: 'Twee-onder-een-kap' },
        { id: 'terraced', label: 'Rijtjeshuis' },
        { id: 'apartment', label: 'Appartement' },
    ];

    const getHouseTypeLabel = (type: string) => {
        return houseTypes.find(t => t.id === type)?.label || '-';
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8 mt-12">
                {hasApiData === false ? (
                    <>
                        <h2 className="text-2xl font-medium text-gray-900 mb-2">We konden geen gegevens vinden</h2>
                        <p className="text-gray-500">Vul de gegevens hieronder handmatig in.</p>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-medium text-gray-900 mb-2">We hebben je woning gevonden!</h2>
                        <p className="text-gray-500">Controleer of onderstaande gegevens kloppen.</p>
                    </>
                )}
            </div>

            <div className="space-y-4">
                {/* Edit Button */}
                <div className="flex justify-start">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                        {isEditing ? (
                            <>
                                <Check className="w-4 h-4" />
                                Klaar met bewerken
                            </>
                        ) : (
                            <>
                                <Edit2 className="w-4 h-4" />
                                Gegevens aanpassen
                            </>
                        )}
                    </button>
                </div>
                {/* Energy Usage */}
                {(formData.postalCode || formData.houseNumber || formData.street) && (
                    <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                        <MapPin className="w- h-4  text-orange-500" />
                        <p className="text-lg font-bold text-gray-900">{formData.street} {formData.houseNumber}, {formData.postalCode}, {formData.city}</p>

                    </div>
                )}

                {/* Property Details */}
                {isEditing ? (
                    <div className="space-y-4">
                        {/* House Type Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Type woning</label>
                            <div className="grid grid-cols-2 gap-2">
                                {houseTypes.map((type) => (
                                    <Card
                                        key={type.id}
                                        selected={formData.houseType === type.id}
                                        onClick={() => updateFormData({ houseType: type.id as any })}
                                        className="text-center py-3 cursor-pointer"
                                    >
                                        <span className="text-sm font-medium">{type.label}</span>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Build Year */}
                        <Input
                            label="Bouwjaar"
                            type="number"
                            placeholder="bijv. 1990"
                            value={formData.buildYear}
                            onChange={(e) => updateFormData({ buildYear: e.target.value })}
                        />

                        {/* Area */}
                        <Input
                            label="Oppervlakte (m²)"
                            type="number"
                            placeholder="bijv. 150"
                            value={formData.area || ''}
                            onChange={(e) => updateFormData({ area: e.target.value })}
                        />

                        {/* Energy Label */}
                        <Input
                            label="Energielabel"
                            type="text"
                            placeholder="bijv. C"
                            maxLength={2}
                            value={formData.energyLabel || ''}
                            onChange={(e) => updateFormData({ energyLabel: e.target.value.toUpperCase() })}
                        />

                        {/* Energy Label */}
                        <Input
                            label="Geschat gasverbruik (per jaar)"
                            type="number"
                            placeholder="bijv. 150m3"
                            value={formData.estimatedGasUsage || ''}
                            onChange={(e) => updateFormData({ estimatedGasUsage: e.target.valueAsNumber })}
                        />

                        {/* Energy Label */}
                        <Input
                            label="Geschat elektriciteitsverbruik (per jaar)"
                            type="number"
                            placeholder="bijv. 150kWh"
                            value={formData.estimatedEnergyUsage || ''}
                            onChange={(e) => updateFormData({ estimatedEnergyUsage: e.target.valueAsNumber })}
                        />
                    </div>
                ) : (

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Home className="w-4 h-4 text-primary-600" />
                                <p className="text-sm font-medium text-gray-600">Type woning</p>
                            </div>
                            <p className="text-lg font-bold text-gray-900">
                                {getHouseTypeLabel(formData.houseType)}
                            </p>
                        </div>

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
                            <div className="flex items-center">
                                {formData.energyLabel ? (
                                    <EnergyLabel label={formData.energyLabel} />
                                ) : (
                                    <span className="text-lg font-bold text-gray-900">-</span>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                            <p className="text-sm font-medium text-gray-600 mb-3">Geschat verbruik per jaar</p>
                            <div className="grid grid-cols-2 gap-4">
                                {formData.estimatedEnergyUsage && (
                                    <div>
                                        <p className="text-xs text-gray-700">Elektriciteit</p>
                                        <p className="text-lg font-bold text-gray-900">{formData.estimatedEnergyUsage} kWh</p>
                                    </div>
                                )}
                                {formData.estimatedGasUsage && (
                                    <div>
                                        <p className="text-xs text-gray-700">Gas</p>
                                        <p className="text-lg font-bold text-gray-900">{formData.estimatedGasUsage} m³</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};
