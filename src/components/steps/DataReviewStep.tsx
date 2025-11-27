import React, { useState, useEffect } from 'react';
import { FormData } from '../../types/form';
import { Home, MapPin, Edit2, Check, Flame, Grid2X2, CalendarSearch, HousePlug } from 'lucide-react';
import { EnergyLabel } from '../ui/EnergyLabel';


interface DataReviewStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    hasApiData?: boolean | null;
}

export const DataReviewStep: React.FC<DataReviewStepProps> = ({ formData, updateFormData, hasApiData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showHouseholdSize, setShowHouseholdSize] = useState(false);
    const [householdSize, setHouseholdSize] = useState<number | ''>('');

    const estimateGasUsage = (people: number): number => {
        switch (people) {
            case 1: return 1000;
            case 2: return 1350;
            case 3: return 1550;
            case 4: return 1750;
            default: return 1950; // 5+
        }
    };

    const handleHouseholdSizeSelect = (size: number) => {
        setHouseholdSize(size);
        updateFormData({ estimatedGasUsage: estimateGasUsage(size) });
    };

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
            <div className="text-center mb-8 mt-6 3xl:mb-12">
                {hasApiData === false ? (
                    <>
                        <h2 className="text-2xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-2">Vul de gegevens over jouw woning in</h2>
                        <p className="text-gray-500 md:text-lg">We hebben helaas geen gegevens kunnen vinden over jouw woning.</p>
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
                                className="w-full text-lg font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '0.65em auto' }}
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
                                className="w-full text-lg font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '0.65em auto' }}
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
                            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all">
                                <input
                                    type="number"
                                    value={formData.area || ''}
                                    onChange={(e) => updateFormData({ area: e.target.value })}
                                    placeholder="bijv. 150"
                                    className="w-full text-lg font-bold text-gray-900 bg-transparent border-none outline-none p-0"
                                />
                                <span className="text-lg font-bold text-gray-900">m²</span>
                            </div>
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
                                className="w-full text-lg font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '0.65em auto' }}
                            >
                                <option value="">Selecteer energielabel</option>
                                {['A++++', 'A+++', 'A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'Weet ik niet'].map((label) => (
                                    <option key={label} value={label}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div className="flex items-center">
                                {formData.energyLabel && formData.energyLabel !== 'Weet ik niet' ? (
                                    <EnergyLabel label={formData.energyLabel} />
                                ) : (
                                    <span className="text-lg font-bold text-gray-900">{formData.energyLabel === 'Weet ik niet' ? 'Weet ik niet' : '-'}</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {/* Gas Usage */}
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Flame className="w-4 h-4 text-primary-600" />
                        <p className="text-sm font-medium text-gray-600">Geschat gasverbruik (jaarlijks)</p>
                    </div>
                    {isEditing ? (
                        <>
                            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all">
                                <input
                                    type="number"
                                    value={formData.estimatedGasUsage || ''}
                                    onChange={(e) => updateFormData({ estimatedGasUsage: e.target.valueAsNumber })}
                                    placeholder="bijv. 1200"
                                    className="w-full text-lg font-bold text-gray-900 bg-transparent border-none outline-none p-0"
                                />
                                <span className="text-lg font-bold text-gray-900">m³</span>
                            </div>
                            {!showHouseholdSize ? (
                                <button
                                    onClick={() => setShowHouseholdSize(true)}
                                    className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-4"
                                >
                                    Help me het verbruik schatten
                                </button>
                            ) : (
                                <>
                                    <p className="text-sm text-primary-600 mb-2 font-medium mt-4">Met hoeveel personen woon je samen?</p>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => handleHouseholdSizeSelect(size)}
                                                className={`
                                                flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all border
                                                ${householdSize === size
                                                        ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                                                        : 'bg-white text-gray-700 border-primary-200 hover:border-primary-300 hover:bg-white'
                                                    }
                                            `}
                                            >
                                                {size === 5 ? '5+' : size}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <p className="text-lg font-bold text-gray-900">
                            {formData.estimatedGasUsage ? `${formData.estimatedGasUsage} m³` : '-'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
