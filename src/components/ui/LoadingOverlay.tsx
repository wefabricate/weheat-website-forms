import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
    message?: string;
    inline?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Gegevens ophalen...', inline = false }) => {
    if (inline) {
        return (
            <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">{message}</h2>
                <p className="text-gray-500 max-w-xs text-center mx-auto">
                    We zoeken de gegevens van je woning op. Dit kan enkele seconden duren.
                </p>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">{message}</h2>
                <p className="text-gray-500 max-w-xs mx-auto">
                    We zoeken de gegevens van je woning op. Dit kan enkele seconden duren.
                </p>
            </div>
        </div>
    );
};
