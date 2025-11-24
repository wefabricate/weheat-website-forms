import React from 'react';
import { FormData } from '../../types/form';
import { Input } from '../ui/Input';
import { MapPin, Check } from 'lucide-react';
import { useAddressValidation } from '../../hooks/useAddressValidation';

interface LocationStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({ formData, updateFormData }) => {
    const { isValidating, error, address } = useAddressValidation(formData.postalCode, formData.houseNumber);

    React.useEffect(() => {
        if (address) {
            updateFormData({
                street: address.street,
                city: address.city
            });
        } else if (error || (!formData.postalCode || !formData.houseNumber)) {
            // Clear address if error or inputs are incomplete
            if (formData.street || formData.city) {
                updateFormData({ street: '', city: '' });
            }
        }
    }, [address, error, formData.postalCode, formData.houseNumber, formData.street, formData.city, updateFormData]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8 mt-12">
                <h2 className="text-2xl font-medium text-gray-900 mb-2">Waar staat de woning?</h2>
                <p className="text-gray-500">We controleren of je adres geschikt is voor een warmtepomp.</p>
            </div>

            <div className="space-y-4">
                <div className="flex gap-4 flex-col md:flex-row">
                    <Input
                        label="Postcode"
                        placeholder="1234 AB"
                        value={formData.postalCode}
                        onChange={(e) => {
                            // Allow only 4 digits followed by 0-2 letters, optionally with a space in between
                            const value = e.target.value.toUpperCase();
                            // Remove any non-alphanumeric characters
                            const clean = value.replace(/[^0-9A-Z]/g, '');

                            // Logic to format as 1234 AB
                            let formatted = clean;
                            if (clean.length > 4) {
                                formatted = `${clean.slice(0, 4)} ${clean.slice(4, 6)}`;
                            }

                            // Only update if it matches the pattern of building a postal code
                            // (digits first, then letters)
                            if (/^[0-9]{0,4}[A-Z]{0,2}$/.test(clean)) {
                                updateFormData({ postalCode: formatted });
                            }
                        }}
                        icon={MapPin}
                        maxLength={7}
                    />
                    <Input
                        label="Huisnummer"
                        placeholder="10"
                        value={formData.houseNumber}
                        onChange={(e) => {
                            const value = e.target.value;
                            // Only allow numbers
                            if (/^\d*$/.test(value)) {
                                updateFormData({ houseNumber: value });
                            }
                        }}
                        maxLength={5}
                    />
                    <Input
                        label="Toevoeging"
                        placeholder="A"
                        value={formData.houseNumberAddition}
                        onChange={(e) => {
                            const value = e.target.value.toUpperCase();
                            // Only allow alphanumeric
                            if (/^[0-9A-Z]*$/.test(value)) {
                                updateFormData({ houseNumberAddition: value });
                            }
                        }}
                        maxLength={4}
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
