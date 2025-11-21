import React from 'react';
import { FormData } from '../../types/form';
import { Card } from '../ui/Card';
import { Building2, Gauge, Waves, Wind } from 'lucide-react';

interface HeatingSystemStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export const HeatingSystemStep: React.FC<HeatingSystemStepProps> = ({ formData, updateFormData }) => {
    const distributionTypes = [
        { id: 'radiators', label: 'Radiatoren', description: 'Traditionele verwarmingsradiatoren', icon: Gauge },
        { id: 'floor-heating', label: 'Vloerverwarming', description: 'Warmte via de vloer', icon: Waves },
        { id: 'air-heating', label: 'Luchtverwarming', description: 'Warmte via ventilatiesysteem', icon: Wind },
        { id: 'combination', label: 'Combinatie', description: 'Meerdere systemen gecombineerd', icon: Building2 },
    ];

    const toggleDistribution = (id: 'radiators' | 'floor-heating' | 'air-heating' | 'combination') => {
        const current = formData.heatDistribution || [];
        const isSelected = current.includes(id);

        if (isSelected) {
            // Remove from array
            updateFormData({ heatDistribution: current.filter(item => item !== id) });
        } else {
            // Add to array
            updateFormData({ heatDistribution: [...current, id] });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Waves className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Warmtedistributie</h2>
                <p className="text-gray-500">Hoe wordt de warmte verspreid in je woning? (meerdere opties mogelijk)</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Distributiesysteem</label>
                    <div className="space-y-2">
                        {distributionTypes.map((type) => (
                            <Card
                                key={type.id}
                                selected={formData.heatDistribution?.includes(type.id as any) || false}
                                onClick={() => toggleDistribution(type.id as any)}
                                className="flex items-center gap-4 p-4"
                            >
                                <div className={`p-2 rounded-lg ${formData.heatDistribution?.includes(type.id as any) ? 'bg-primary-100' : 'bg-gray-100'}`}>
                                    <type.icon className={`w-6 h-6 ${formData.heatDistribution?.includes(type.id as any) ? 'text-primary-600' : 'text-gray-500'}`} />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium">{type.label}</div>
                                    <div className="text-sm text-gray-500">{type.description}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
