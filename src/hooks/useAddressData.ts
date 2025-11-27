import { useState } from 'react';
import { FormData } from '../types/form';

interface EnrichedAddressData {
    area: string;
    build_year: string;
    energy_label: string;
    estimated_gas_usage: number;
    latitude: string;
    longitude: string;
    woz: string;
    house_type: string;
}

// Map API house_type labels to generic categories
const mapHouseTypeToGeneric = (houseTypeLabel: string): string => {
    const mapping: Record<string, string> = {
        'Vrijstaande woning': 'Vrijstaande woning',

        '2 onder 1 kap woning': 'Twee-onder-een-kap',
        'Geschakelde 2 onder 1 kapwoning': 'Twee-onder-een-kap',
        'Geschakelde woning': 'Twee-onder-een-kap',

        'Tussen/rijwoning': 'Rijwoning',

        'Hoekwoning': 'Hoekwoning',
        'Eindwoning': 'Hoekwoning',

        'Galerijflat': 'Appartement',
        'Portiekflat': 'Appartement',
        'Corridorflat': 'Appartement',
        'Maisonnette': 'Appartement',
        'Benedenwoning': 'Appartement',
        'Bovenwoning': 'Appartement',
        'Portiekwoning': 'Appartement',
    };

    return mapping[houseTypeLabel] || '';
};

// Map API build year to generic ranges
const mapBuildYearToRange = (year: string | number): string => {
    const yearNum = typeof year === 'string' ? parseInt(year, 10) : year;

    if (isNaN(yearNum)) return '';

    if (yearNum <= 1970) return 'Voor 1970';
    if (yearNum >= 1971 && yearNum <= 1989) return 'Tussen 1971 en 1989';
    if (yearNum >= 1990 && yearNum <= 1999) return 'Tussen 1990 en 1999';
    if (yearNum >= 2000 && yearNum <= 2019) return 'Tussen 2000 en 2019';
    if (yearNum > 2019) return 'Na 2019';

    return '';
};

export const useAddressData = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [hasData, setHasData] = useState<boolean | null>(null);

    const fetchAddressData = async (postalCode: string, houseNumber: string, houseNumberAddition: string | undefined, updateFormData: (data: Partial<FormData>) => void) => {
        setIsFetching(true);
        setHasData(null);

        const startTime = Date.now();
        const minDuration = 2000; // Minimum 2 seconds loading time

        try {
            // Run fetch and delay in parallel
            const [response] = await Promise.all([
                fetch('https://apim-website-prod-weu-01.azure-api.net/house-information', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        postal_code: postalCode,
                        house_number: parseInt(houseNumber),
                        ...(houseNumberAddition ? { house_number_addition: houseNumberAddition } : {}),
                    }),
                }),
                new Promise(resolve => setTimeout(resolve, minDuration))
            ]);

            if (response.ok) {
                const data = await response.json() as EnrichedAddressData;
                updateFormData({
                    area: data.area,
                    energyLabel: data.energy_label,
                    estimatedGasUsage: data.estimated_gas_usage,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    woz: data.woz,
                    buildYear: mapBuildYearToRange(data.build_year) as any,
                    houseType: mapHouseTypeToGeneric(data.house_type) as any
                });
                setHasData(true);
            } else {
                setHasData(false);
            }
        } catch (error) {
            console.error('Failed to fetch address data:', error);
            setHasData(false);
        } finally {
            setIsFetching(false);
        }
    };

    return { fetchAddressData, isFetching, hasData };
};
