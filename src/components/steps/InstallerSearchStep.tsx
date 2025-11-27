import React, { useEffect, useState } from 'react';
import { FormData } from '../../types/form';
import { MapPin, Check, Loader2, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';

interface Installer {
    sfid: string;
    name: string;
    location: string;
    order: number;
    tags: string[];
    nationWide: boolean;
    distance: number;
}

interface InstallerSearchStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export const InstallerSearchStep: React.FC<InstallerSearchStepProps> = ({ formData, updateFormData }) => {
    const [installers, setInstallers] = useState<Installer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInstallers = async () => {
            if (!formData.latitude || !formData.longitude) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `https://apim-website-prod-weu-01.azure-api.net/get-near-installers?latitude=${formData.latitude}&longitude=${formData.longitude}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch installers');
                }

                const data = await response.json() as { accounts: Installer[] };
                setInstallers(data.accounts || []);
            } catch (err) {
                console.error('Error fetching installers:', err);
                setError('Er is iets misgegaan bij het ophalen van installateurs.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchInstallers();
    }, [formData.latitude, formData.longitude]);

    return (
        <div className="space-y-6">
            <div className="text-center mb-8 mt-6">
                <h2 className="text-2xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-2">
                    Installateurs in de buurt
                </h2>
                <p className="text-gray-500 md:text-lg">
                    We hebben deze installateurs gevonden op basis van jouw locatie.
                </p>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-primary-600 animate-spin mb-4" />
                    <p className="text-gray-500">Installateurs zoeken...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <AlertCircle className="w-8 h-8 text-red-500 mb-4" />
                    <p className="text-gray-900 font-medium mb-2">Oeps, er ging iets mis</p>
                    <p className="text-gray-500">{error}</p>
                </div>
            ) : installers.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">Geen installateurs gevonden in de buurt.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {installers.map((installer) => (
                        <Card
                            key={installer.sfid}
                            className="p-4 flex items-center gap-4 hover:border-primary-200 transition-colors"
                        >
                            <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-primary-600" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-gray-900">{installer.name}</h3>
                                    {installer.nationWide && (
                                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                                            Landelijk
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span>{installer.location}</span>
                                    <span>•</span>
                                    <span>{Math.round(installer.distance)} km</span>
                                </div>
                                {installer.tags.length > 0 && (
                                    <div className="flex gap-2 mt-2">
                                        {installer.tags.map(tag => (
                                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
