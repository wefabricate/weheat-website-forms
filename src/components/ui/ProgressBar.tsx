import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full">
            <div className="flex justify-between mb-2 text-sm font-medium text-gray-500">
                <span>Stap {currentStep} van {totalSteps}</span>
                <span>{Math.round(progress)}% Voltooid</span>
            </div>
            <div className="h-4 w-full bg-white rounded-full overflow-hidden border-4 border-white">
                <div
                    className="h-full bg-primary-600 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};
