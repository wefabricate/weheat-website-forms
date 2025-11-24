import React from 'react';

interface CardProps {
    selected?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({
    selected = false,
    onClick,
    children,
    className = ''
}) => {
    return (
        <div
            onClick={onClick}
            className={`
        p-6 rounded-xl border cursor-pointer text-gray-900 transition-all duration-200
        ${selected
                    ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-600/10'
                    : 'border-gray-200 bg-white hover:border-primary-200 hover:shadow-md'
                }
        ${className}
      `}
        >
            {children}
        </div>
    );
};
