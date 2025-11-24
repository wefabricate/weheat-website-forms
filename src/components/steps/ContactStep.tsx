import React, { useEffect } from 'react';
import { FormData } from '../../types/form';
import { Input } from '../ui/Input';
import { User, Mail, Phone, Send, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    errors?: Record<string, string>;
    validateField?: (field: keyof FormData, value: string) => void;
}

export const ContactStep: React.FC<ContactStepProps> = ({
    formData,
    updateFormData,
    errors = {},
    validateField
}) => {
    useEffect(() => {
        // Trigger confetti when the component mounts
        const count = 200;

        // Calculate origin based on viewport - center of left column on desktop
        const isMobile = window.innerWidth < 768;
        const defaults = {
            origin: {
                x: isMobile ? 0.5 : 0.25, // Center of left column (25% of viewport) on desktop
                y: 0.7
            }
        };

        function fire(particleRatio: number, opts: any) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }, []);
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8 mt-12">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PartyPopper className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-medium text-gray-900 mb-2">Je kunt besparen!</h2>
                <p className="text-gray-500">Laat je gegevens achter en ontvang een persoonlijke besparingsrapport.</p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Voornaam"
                        placeholder="Jan"
                        value={formData.firstName}
                        onChange={(e) => updateFormData({ firstName: e.target.value })}
                        icon={User}
                        error={errors.firstName}
                    />
                    <Input
                        label="Achternaam"
                        placeholder="Jansen"
                        value={formData.lastName}
                        onChange={(e) => updateFormData({ lastName: e.target.value })}
                        icon={User}
                        error={errors.lastName}
                    />
                </div>

                <Input
                    label="E-mailadres"
                    type="email"
                    placeholder="jan@voorbeeld.nl"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    onBlur={(e) => validateField?.('email', e.target.value)}
                    icon={Mail}
                    error={errors.email}
                />

                <Input
                    label="Telefoonnummer"
                    type="tel"
                    placeholder="06 12345678"
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    onBlur={(e) => validateField?.('phone', e.target.value)}
                    icon={Phone}
                    error={errors.phone}
                />
            </div>
        </div>
    );
};
