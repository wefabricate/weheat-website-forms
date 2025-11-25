import React, { useEffect, useState } from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

export const CompletionStep: React.FC = () => {
    const [countdown, setCountdown] = useState(5);
    const REDIRECT_URL = 'https://www.weheat.nl';

    useEffect(() => {
        // Countdown timer
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            // Redirect when countdown reaches 0
            window.location.href = REDIRECT_URL;
        }
    }, [countdown]);

    const handleRedirectNow = () => {
        window.location.href = REDIRECT_URL;
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8 mt-12">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-primary-600" />
                </div>
                <h2 className="text-2xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-4">Bedankt voor je aanvraag!</h2>
                <p className="text-lg md:text-xl text-gray-600 mb-4">
                    We hebben je gegevens ontvangen. Een van onze experts neemt binnenkort contact met je op met een persoonlijke offerte.
                </p>
                <p className="text-md md:text-lg text-gray-500">
                    Je wordt doorgestuurd naar WeHeat in <span className="font-bold text-primary-600">{countdown}</span> seconden...
                </p>
            </div>

            <div className="flex justify-center">
                <Button onClick={handleRedirectNow} className="flex items-center gap-2">
                    Ga direct naar WeHeat
                    <ExternalLink className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};
