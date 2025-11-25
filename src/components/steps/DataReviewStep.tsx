import React, { useState, useEffect } from 'react';
import { FormData } from '../../types/form';
import { Home, Zap, MapPin, Edit2, Check, Flame, Grid2X2, CalendarSearch, HousePlug } from 'lucide-react';
import { EnergyLabel } from '../ui/EnergyLabel';


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
                        <h2 className="text-2xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-2">We konden geen gegevens vinden over jouw woning</h2>
                        <p className="text-gray-500 md:text-lg">Vul de gegevens hieronder handmatig in.</p>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-2">We hebben je woning gevonden!</h2>
                        <p className="text-gray-500 md:text-lg">Controleer of onderstaande gegevens kloppen.</p>
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

                {/* Property Details - Always show card layout */}
                <div className="grid grid-cols-2 gap-4">
                    {/* House Type */}
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Home className="w-4 h-4 text-primary-600" />
                            <p className="text-sm font-medium text-gray-600">Type woning</p>
                        </div>
                        {isEditing ? (
                            <select
                                value={formData.houseType}
                                onChange={(e) => updateFormData({ houseType: e.target.value as any })}
                                className="w-full text-lg font-bold text-gray-900 bg-transparent border-none outline-none appearance-none cursor-pointer"
                                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center', backgroundSize: '0.65em auto' }}
                            >
                                <option value="">Selecteer woningtype</option>
                                {houseTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p className="text-lg font-bold text-gray-900">
                                {getHouseTypeLabel(formData.houseType)}
                            </p>
                        )}
                    </div>

                    {/* Build Year */}
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                            <CalendarSearch className="w-4 h-4 text-primary-600" />
                            <p className="text-sm font-medium text-gray-600">Bouwjaar</p>
                        </div>
                        {isEditing ? (
                            <select
                                value={formData.buildYear}
                                onChange={(e) => updateFormData({ buildYear: e.target.value as any })}
                                className="w-full text-lg font-bold text-gray-900 bg-transparent border-none outline-none appearance-none cursor-pointer"
                                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center', backgroundSize: '0.65em auto' }}
                            >
                                <option value="">Selecteer bouwjaar</option>
                                {['Voor 1970', 'Tussen 1971 en 1989', 'Tussen 1990 en 1999', 'Tussen 2000 en 2019', 'Na 2019'].map((range) => (
                                    <option key={range} value={range}>
                                        {range}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p className="text-lg font-bold text-gray-900">{formData.buildYear || '-'}</p>
                        )}
                    </div>

                    {/* Area */}
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Grid2X2 className="w-4 h-4 text-primary-600" />
                            <p className="text-sm font-medium text-gray-600">Oppervlakte</p>
                        </div>
                        {isEditing ? (
                            <input
                                type="number"
                                value={formData.area || ''}
                                onChange={(e) => updateFormData({ area: e.target.value })}
                                placeholder="bijv. 150"
                                className="w-full text-lg font-bold text-gray-900 bg-transparent border-none outline-none"
                            />
                        ) : (
                            <p className="text-lg font-bold text-gray-900">{formData.area ? `${formData.area} m²` : '-'}</p>
                        )}
                    </div>

                    {/* Energy Label */}
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                            <HousePlug className="w-4 h-4 text-primary-600" />
                            <p className="text-sm font-medium text-gray-600">Energielabel</p>
                        </div>
                        {isEditing ? (
                            <select
                                value={formData.energyLabel || ''}
                                onChange={(e) => updateFormData({ energyLabel: e.target.value })}
                                className="w-full text-lg font-bold text-gray-900 bg-transparent border-none outline-none appearance-none cursor-pointer"
                                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center', backgroundSize: '0.65em auto' }}
                            >
                                <option value="">Selecteer energielabel</option>
                                {['A++++', 'A+++', 'A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((label) => (
                                    <option key={label} value={label}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div className="flex items-center">
                                {formData.energyLabel ? (
                                    <EnergyLabel label={formData.energyLabel} />
                                ) : (
                                    <span className="text-lg font-bold text-gray-900">-</span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Electricity Usage */}
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-primary-600" />
                            <p className="text-sm font-medium text-gray-600">Geschat stroomverbruik</p>
                        </div>
                        {isEditing ? (
                            <input
                                type="number"
                                value={formData.estimatedEnergyUsage || ''}
                                onChange={(e) => updateFormData({ estimatedEnergyUsage: e.target.valueAsNumber })}
                                placeholder="bijv. 3500"
                                className="w-full text-lg font-bold text-gray-900 bg-transparent border-none outline-none"
                            />
                        ) : (
                            <p className="text-lg font-bold text-gray-900">
                                {formData.estimatedEnergyUsage ? `${formData.estimatedEnergyUsage} kWh` : '-'}
                            </p>
                        )}
                    </div>

                    {/* Gas Usage */}
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Flame className="w-4 h-4 text-primary-600" />
                            <p className="text-sm font-medium text-gray-600">Geschat gasverbruik</p>
                        </div>
                        {isEditing ? (
                            <input
                                type="number"
                                value={formData.estimatedGasUsage || ''}
                                onChange={(e) => updateFormData({ estimatedGasUsage: e.target.valueAsNumber })}
                                placeholder="bijv. 1200"
                                className="w-full text-lg font-bold text-gray-900 bg-transparent border-none outline-none"
                            />
                        ) : (
                            <p className="text-lg font-bold text-gray-900">
                                {formData.estimatedGasUsage ? `${formData.estimatedGasUsage} m³` : '-'}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
