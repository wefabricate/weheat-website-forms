import React from 'react';
import { FormData } from '../../types/form';
import { Input } from '../ui/Input';

import { MapPin, Check } from 'lucide-react';

interface LocationStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({ formData, updateFormData }) => {
    const [isValidating, setIsValidating] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const validateAddress = async () => {
            const cleanPostalCode = formData.postalCode.replace(/\s/g, '');

            if (cleanPostalCode.length === 6 && formData.houseNumber) {
                setIsValidating(true);
                setError(null);

                try {
                    const url = new URL('https://api.pdok.nl/bzk/locatieserver/search/v3_1/free');
                    url.searchParams.set('q', `${cleanPostalCode} ${formData.houseNumber}`);
                    url.searchParams.set('fq', 'type:adres');
                    url.searchParams.append('fq', `postcode:${cleanPostalCode}`);
                    url.searchParams.append('fq', `huisnummer:${formData.houseNumber}`);
                    url.searchParams.set('rows', '1');
                    url.searchParams.set('fl', 'straatnaam,huisnummer,huisletter,huisnummertoevoeging,woonplaatsnaam');

                    console.log('Fetching URL:', url.toString());
                    const response = await fetch(url.toString());

                    if (!response.ok) throw new Error('Failed to fetch address');

                    const data = await response.json() as { response: { numFound: number; docs: Array<{ straatnaam: string; woonplaatsnaam: string; weergavenaam: string; score: number }> } };
                    console.log('PDOK Response:', data);

                    if (data.response.numFound > 0) {
                        const address = data.response.docs[0];
                        updateFormData({
                            street: address.straatnaam,
                            city: address.woonplaatsnaam
                        });
                    } else {
                        setError('Address not found');
                        updateFormData({ street: '', city: '' });
                    }
                } catch (err) {
                    console.error('Address validation error:', err);
                    setError('Could not verify address');
                    updateFormData({ street: '', city: '' });
                } finally {
                    setIsValidating(false);
                }
            } else {
                // Clear address if inputs are incomplete
                if (formData.street || formData.city || error) {
                    updateFormData({ street: '', city: '' });
                    setError(null);
                }
            }
        };

        const timeoutId = setTimeout(validateAddress, 500);
        return () => clearTimeout(timeoutId);
    }, [formData.postalCode, formData.houseNumber, updateFormData]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Waar staat de woning?</h2>
                <p className="text-gray-500">We controleren of we in jouw gebied actief zijn.</p>
            </div>

            <div className="space-y-4">
                <Input
                    label="Postcode"
                    placeholder="1234 AB"
                    value={formData.postalCode}
                    onChange={(e) => updateFormData({ postalCode: e.target.value.toUpperCase() })}
                    icon={MapPin}
                    maxLength={7}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Huisnummer"
                        placeholder="10"
                        value={formData.houseNumber}
                        onChange={(e) => updateFormData({ houseNumber: e.target.value })}
                    />
                    <Input
                        label="Toevoeging (Optioneel)"
                        placeholder="A"
                        value={formData.houseNumberAddition}
                        onChange={(e) => updateFormData({ houseNumberAddition: e.target.value })}
                    />
                </div>

                {/* Validation Status */}
                <div className="min-h-[24px] relative">
                    {!isValidating && error && (
                        <p className="text-sm text-red-500 text-center py-2">{error === 'Address not found' ? 'Adres niet gevonden' : 'Kan adres niet verifiëren'}</p>
                    )}

                    {!error && formData.street && formData.city && (
                        <div className="flex items-center justify-center gap-2 text-green-700 animate-in fade-in slide-in-from-top-1">
                            <Check className="w-5 h-5 text-green-600" />
                            <p className="text-sm font-medium">
                                {formData.street} {formData.houseNumber}{formData.houseNumberAddition ? ` ${formData.houseNumberAddition}` : ''}, {formData.city}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
