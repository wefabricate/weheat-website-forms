import React from 'react';
import { FormData } from '../../types/form';
import { Card } from '../ui/Card';
import { Building2, Gauge, Waves, Wind, Home, Flame, MoreHorizontal } from 'lucide-react';

interface HeatingSystemStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export const HeatingSystemStep: React.FC<HeatingSystemStepProps> = ({ formData, updateFormData }) => {
    const heatingTypes = [
        { id: 'stadsverwarming', label: 'Stadsverwarming', description: 'Centrale warmtevoorziening via het stadsnet', icon: Building2 },
        { id: 'luchtverwarming', label: 'Luchtverwarming', description: 'Warmte via ventilatiesysteem', icon: Wind },
        { id: 'radiatoren', label: 'Radiatoren', description: 'Traditionele verwarmingsradiatoren', icon: Gauge },
        { id: 'convectoren-vloer', label: 'Convectoren in de vloer', description: 'Convectoren geïntegreerd in de vloer', icon: Waves },
        { id: 'convectoren-muren', label: 'Convectoren in de muren', description: 'Convectoren geïntegreerd in de muren', icon: Home },
        { id: 'vloerverwarming', label: 'Vloerverwarming', description: 'Warmte via de vloer', icon: Flame },
        { id: 'anders', label: 'Anders', description: 'Ander type verwarming', icon: MoreHorizontal },
    ];



    const toggleHeatingType = (id: string) => {
        const current = formData.heatDistribution || [];
        const isSelected = current.includes(id as any);

        if (isSelected) {
            // Remove from array
            updateFormData({ heatDistribution: current.filter(item => item !== id) as any });
        } else {
            // Add to array
            updateFormData({ heatDistribution: [...current, id] as any });
        }
    };

    // Check if only incompatible systems are selected
    const incompatibleSystems = ['stadsverwarming', 'luchtverwarming'];
    const selectedSystems = formData.heatDistribution || [];
    const hasOnlyIncompatible = selectedSystems.length > 0 &&
        selectedSystems.every(system => incompatibleSystems.includes(system));


    return (
        <div className="space-y-8">
            <div className="text-center mb-8 mt-12">
                <h2 className="text-2xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-2">Wat voor verwarming heeft je huis?
                </h2>
                <p className="text-gray-500 md:text-lg">Meerdere opties mogelijk</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Meerdere opties mogelijk</label>
                    <div className="space-y-2">
                        {heatingTypes.map((type) => (
                            <Card
                                key={type.id}
                                selected={formData.heatDistribution?.includes(type.id as any) || false}
                                onClick={() => toggleHeatingType(type.id)}
                                className="flex items-center gap-4 p-4"
                            >
                                <div className={`p-2 rounded-lg ${formData.heatDistribution?.includes(type.id as any) ? 'bg-primary-100' : 'bg-primary-100'}`}>
                                    <type.icon className={`w-6 h-6 ${formData.heatDistribution?.includes(type.id as any) ? 'text-primary-600' : 'text-primary-500'}`} />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium">{type.label}</div>
                                    <div className="text-sm text-gray-500">{type.description}</div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Warning message for incompatible systems */}
                    {hasOnlyIncompatible && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0">
                                    <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-red-800 mb-1">
                                        Warmtepomp niet geschikt
                                    </h3>
                                    <p className="text-sm text-red-700">
                                        Met {selectedSystems.includes('stadsverwarming') && selectedSystems.includes('luchtverwarming') ? 'stadsverwarming en luchtverwarming' : selectedSystems.includes('stadsverwarming') ? 'stadsverwarming' : 'luchtverwarming'} is het helaas niet mogelijk om een warmtepomp te installeren. Selecteer een ander verwarmingssysteem om verder te gaan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
