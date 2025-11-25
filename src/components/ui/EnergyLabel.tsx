import React from 'react';

interface EnergyLabelProps {
    label: string;
    className?: string;
}

export const EnergyLabel: React.FC<EnergyLabelProps> = ({ label, className = '' }) => {
    const getLabelColor = (label: string) => {
        const cleanLabel = label.toUpperCase().replace(/\s/g, '');

        if (cleanLabel.startsWith('A')) {
            if (cleanLabel.includes('++++')) return 'bg-[#009345] text-white'; // Darkest Green
            if (cleanLabel.includes('+++')) return 'bg-[#00A651] text-white';
            if (cleanLabel.includes('++')) return 'bg-[#4DB748] text-white';
            if (cleanLabel.includes('+')) return 'bg-[#8CC63F] text-white';
            return 'bg-[#009345] text-white'; // Standard A
        }

        switch (cleanLabel) {
            case 'B': return 'bg-[#5CB847] text-white'; // Light Green
            case 'C': return 'bg-[#B6D434] text-gray-900'; // Yellow-Green
            case 'D': return 'bg-[#FFF200] text-gray-900'; // Yellow
            case 'E': return 'bg-[#FDB913] text-gray-900'; // Orange
            case 'F': return 'bg-[#F37021] text-white'; // Dark Orange
            case 'G': return 'bg-[#ED1C24] text-white'; // Red
            default: return 'bg-gray-200 text-gray-600'; // Unknown
        }
    };

    const colorClass = getLabelColor(label);

    return (
        <div className={`inline-flex items-center justify-center w-16 h-8 font-bold rounded-sm shadow-sm ${colorClass} ${className}`} style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)', paddingRight: '8px' }}>
            {label}
        </div>
    );
};
