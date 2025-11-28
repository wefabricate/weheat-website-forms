import React, { useEffect, useState } from 'react';
import { FormData } from '../../types/form';
import { MapPin, Check, Loader2, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { trackEvent } from '../../utils/gtm';

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

    const FALLBACK_INSTALLER: Installer = {
        sfid: '0017R00002ykrRbQAI',
        name: 'Weheat service',
        location: 'Duizel',
        order: 1,
        tags: ['Voor development/testing'],
        nationWide: false,
        distance: 10
    };

    useEffect(() => {
        const fetchInstallers = async () => {
            if (!formData.latitude || !formData.longitude) {
                console.log('Missing coordinates, using fallback for dev');
                setInstallers([FALLBACK_INSTALLER]);
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

                if (!data.accounts || data.accounts.length === 0) {
                    console.log('No installers found, using fallback for dev');
                    setInstallers([FALLBACK_INSTALLER]);
                } else {
                    // Filter out the fallback installer if it's already in the API response to avoid duplicates
                    const apiInstallers = data.accounts.filter(i => i.sfid !== FALLBACK_INSTALLER.sfid);
                    // Always include Weheat service at the top
                    setInstallers([FALLBACK_INSTALLER, ...apiInstallers]);
                }
            } catch (err) {
                console.error('Error fetching installers:', err);
                // Fallback for dev/demo purposes
                setInstallers([FALLBACK_INSTALLER]);
                setError(null); // Clear error to show fallback
            } finally {
                setIsLoading(false);
            }
        };

        fetchInstallers();
    }, [formData.latitude, formData.longitude]);

    const handleSelectInstaller = (installer: Installer) => {
        // Track installer selection
        trackEvent('intake_installer_selected', {
            installer_name: installer.name,
            installer_id: installer.sfid
        });

        updateFormData({
            selectedInstaller: {
                sfid: installer.sfid,
                name: installer.name
            }
        });
    };

    const isSelected = (installer: Installer) => {
        return formData.selectedInstaller?.sfid === installer.sfid;
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8 mt-6">
                <h2 className="text-2xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-2">
                    Installateurs in de buurt
                </h2>
                <p className="text-gray-500 md:text-lg">
                    Selecteer een installateur voor een adviesgesprek.
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
                            selected={isSelected(installer)}
                            onClick={() => handleSelectInstaller(installer)}
                            className="flex items-center gap-6 p-4 cursor-pointer"
                        >
                            <div className={`p-2 rounded-lg ${isSelected(installer) ? 'bg-primary-600' : 'bg-primary-100'}`}>
                                {isSelected(installer) ? (
                                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                                ) : (
                                    <MapPin className="w-5 h-5 text-primary-500" />
                                )}
                            </div>
                            <div className="text-left flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="font-medium">{installer.name}</div>
                                    {installer.nationWide && (
                                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                                            Landelijk
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                    <span>{installer.location}</span>
                                    <span>•</span>
                                    <span>{Math.round(installer.distance)} km</span>
                                </div>
                                {installer.tags.length > 0 && (
                                    <div className="flex gap-2 mt-2">
                                        {installer.tags.map(tag => (
                                            <span key={tag} className="text-xs font-medium bg-white text-neutral-600 px-2 py-0.5 rounded-full">
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
