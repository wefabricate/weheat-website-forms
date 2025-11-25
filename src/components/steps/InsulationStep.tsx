import React from 'react';
import { FormData } from '../../types/form';
import { Card } from '../ui/Card';
import { Home, AppWindow, Layers, BrickWall, ArrowDownToLine } from 'lucide-react';

interface InsulationStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export const InsulationStep: React.FC<InsulationStepProps> = ({ formData, updateFormData }) => {
    const insulationOptions = [
        { id: 'Het dak is geïsoleerd', label: 'Het dak is geïsoleerd', description: 'Warmte stijgt op, dakisolatie houdt het tegen', icon: Home },
        { id: 'Met dubbelglas of beter', label: 'Met dubbelglas of beter', description: 'Houdt de kou buiten en warmte binnen', icon: AppWindow },
        { id: 'Met spouwmuurisolatie', label: 'Met spouwmuurisolatie', description: 'Isolatie tussen de binnen- en buitenmuur', icon: Layers },
        { id: 'Met andere muurisolatie', label: 'Met andere muurisolatie', description: 'Bijvoorbeeld voorzetwanden of buitengevelisolatie', icon: BrickWall },
        { id: 'Met vloerisolatie', label: 'Met vloerisolatie', description: 'Voorkomt optrekkende kou vanuit de grond', icon: ArrowDownToLine },
    ];

    const toggleOption = (option: string) => {
        const current = formData.insulation || [];
        const isSelected = current.includes(option);

        if (isSelected) {
            updateFormData({ insulation: current.filter(item => item !== option) });
        } else {
            updateFormData({ insulation: [...current, option] });
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center mb-8 mt-12">
                <h2 className="text-2xl font-medium text-gray-900 mb-2">Hoe is je huis geïsoleerd?</h2>
                <p className="text-gray-500">Meerdere antwoorden mogelijk</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Meerdere opties mogelijk</label>
                    <div className="space-y-2">
                        {insulationOptions.map((option) => (
                            <Card
                                key={option.id}
                                selected={formData.insulation?.includes(option.id) || false}
                                onClick={() => toggleOption(option.id)}
                                className="flex items-center gap-4 p-4"
                            >
                                <div className={`p-2 rounded-lg ${formData.insulation?.includes(option.id) ? 'bg-primary-100' : 'bg-primary-100'}`}>
                                    <option.icon className={`w-6 h-6 ${formData.insulation?.includes(option.id) ? 'text-primary-600' : 'text-primary-500'}`} />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium">{option.label}</div>
                                    <div className="text-sm text-gray-500">{option.description}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
