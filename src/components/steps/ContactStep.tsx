import React from 'react';
import { FormData } from '../../types/form';
import { Input } from '../ui/Input';
import { Confetti } from '../ui/Confetti';
import { User, Mail, Phone, MessageSquare, PartyPopper, Send } from 'lucide-react';
interface ContactStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    errors?: Record<string, string>;
    validateField?: (field: keyof FormData, value: string) => void;
    showPhone?: boolean;
    showMessage?: boolean;
    title?: string;
    description?: string;
}

export const ContactStep: React.FC<ContactStepProps> = ({
    formData,
    updateFormData,
    errors = {},
    validateField,
    showPhone = false,
    showMessage = false,
    title = "Je kunt besparen!",
    description = "Laat je gegevens achter en ontvang een persoonlijke besparingsrapport."
}) => {
    return (
        <div className="space-y-6">
            {!showMessage && <Confetti />}
            <div className="text-center mb-8 mt-6 3xl:mb-12">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {showMessage ? <Send className="w-6 h-6 text-primary-600" /> : <PartyPopper className="w-6 h-6 text-primary-600" />}
                </div>
                <h2 className="text-2xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-500 md:text-lg">{description}</p>
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

                {showPhone && (
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
                )}

                {showMessage && (
                    <Input
                        label="Bericht (optioneel)"
                        placeholder="Waar kan de installateur je mee helpen?"
                        value={formData.message || ''}
                        onChange={(e) => updateFormData({ message: e.target.value })}
                        icon={MessageSquare}
                        multiline
                    />
                )}
            </div>
        </div>
    );
};
