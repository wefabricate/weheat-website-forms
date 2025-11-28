import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { trackEvent } from '../../utils/gtm';

interface CompletionStepProps {
    intakeUrl?: string;
    source?: string;
}

export const CompletionStep: React.FC<CompletionStepProps> = ({ intakeUrl, source }) => {
    const router = useRouter();
    const REDIRECT_URL = 'https://weheat.nl/besparingscheck-test';

    const isSavingsFlow = !!intakeUrl;

    // Track form completion when component mounts
    useEffect(() => {
        trackEvent(isSavingsFlow ? 'savings_complete' : 'intake_complete', {
            source: source
        });
    }, [isSavingsFlow, source]);

    const handleRedirectToAdviesgesprek = () => {
        trackEvent(isSavingsFlow ? 'savings_cta_advice' : 'intake_cta_advice', {
            destination: intakeUrl || REDIRECT_URL
        });

        if (intakeUrl) {
            router.push(intakeUrl);
        } else {
            window.location.href = REDIRECT_URL;
        }
    };

    const handleRedirectToWebsite = () => {
        trackEvent(isSavingsFlow ? 'savings_cta_website' : 'intake_cta_website', {
            destination: REDIRECT_URL
        });

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
                    {isSavingsFlow
                        ? "We hebben je gegevens ontvangen! Je ontvangt binnenkort je persoonlijke bespaarrapport in je mailbox."
                        : "We hebben je gegevens ontvangen! De installateur neemt binnenkort contact met je op."
                    }
                </p>
            </div>

            <div className="flex justify-center gap-4">
                {isSavingsFlow && (
                    <Button variant="primary" onClick={handleRedirectToAdviesgesprek} className="flex items-center gap-2">
                        Plan adviesgesprek
                    </Button>
                )}
                <Button variant={isSavingsFlow ? "outline" : "primary"} onClick={handleRedirectToWebsite} className="flex items-center gap-2">
                    Ga terug naar de weheat.nl
                </Button>
            </div>
        </div>
    );
};
