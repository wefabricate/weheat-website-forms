import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FormData } from '../../types/form';
import { CheckCircle, Home, Zap, MapPin, Edit2, Check, AlertCircle, Flame } from 'lucide-react';
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
        { id: 'Vrijstaande woning', label: 'Vrijstaande woning' },
        { id: 'Twee-onder-een-kap', label: 'Twee-onder-een-kap' },
        { id: 'Rijwoning', label: 'Rijwoning' },
        { id: 'Hoekwoning', label: 'Hoekwoning' },
        { id: 'Appartement', label: 'Appartement' },
    ];

    const getHouseTypeLabel = (type: string) => {
        return houseTypes.find(t => t.id === type)?.label || '-';
    };

    return (
        <div className="space-y-6">
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
                            <select
                                value={formData.houseType}
                                onChange={(e) => updateFormData({ houseType: e.target.value as any })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all appearance-none bg-white"
                                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '0.65em auto' }}
                            >
                                <option value="">Selecteer woningtype</option>
                                {houseTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Build Year Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bouwjaar</label>
                            <select
                                value={formData.buildYear}
                                onChange={(e) => updateFormData({ buildYear: e.target.value as any })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all appearance-none bg-white"
                                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '0.65em auto' }}
                            >
                                <option value="">Selecteer bouwjaar</option>
                                {['Voor 1970', 'Tussen 1971 en 1989', 'Tussen 1990 en 1999', 'Tussen 2000 en 2019', 'Na 2019'].map((range) => (
                                    <option key={range} value={range}>
                                        {range}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Area */}
                        <Input
                            label="Oppervlakte (m²)"
                            type="number"
                            placeholder="bijv. 150"
                            value={formData.area || ''}
                            onChange={(e) => updateFormData({ area: e.target.value })}
                        />

                        {/* Energy Label */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Energielabel</label>
                            <select
                                value={formData.energyLabel || ''}
                                onChange={(e) => updateFormData({ energyLabel: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all appearance-none bg-white"
                                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '0.65em auto' }}
                            >
                                <option value="">Selecteer energielabel</option>
                                {['A++++', 'A+++', 'A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((label) => (
                                    <option key={label} value={label}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>

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
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-primary-600" />
                                <p className="text-sm font-medium text-gray-600">Stroomverbruik</p>
                            </div>
                            <p className="text-lg font-bold text-gray-900">
                                {formData.estimatedEnergyUsage ? `${formData.estimatedEnergyUsage} kWh` : '-'}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Flame className="w-4 h-4 text-primary-600" />
                                <p className="text-sm font-medium text-gray-600">Gasverbruik</p>
                            </div>
                            <p className="text-lg font-bold text-gray-900">
                                {formData.estimatedGasUsage ? `${formData.estimatedGasUsage} m³` : '-'}
                            </p>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};
