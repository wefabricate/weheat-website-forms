import { useState } from 'react';
import { FormData } from '../types/form';

interface EnrichedAddressData {
    area: string;
    build_year: string;
    energy_label: string;
    estimated_energy_usage: number;
    estimated_gas_usage: number;
    latitude: string;
    longitude: string;
    woz: string;
    house_type_mapped: 'detached' | 'semi-detached' | 'terraced' | 'apartment' | '';
}

export const useAddressData = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [hasData, setHasData] = useState<boolean | null>(null);

    const fetchAddressData = async (postalCode: string, houseNumber: string, updateFormData: (data: Partial<FormData>) => void) => {
        setIsFetching(true);
        setHasData(null);

        const startTime = Date.now();
        const minDuration = 2000; // Minimum 2 seconds loading time

        try {
            const cleanPostalCode = postalCode.replace(/\s/g, '');

            // Run fetch and delay in parallel
            const [response] = await Promise.all([
                fetch(`app/api/address?postal_code=${cleanPostalCode}&house_number=${houseNumber}`),
                new Promise(resolve => setTimeout(resolve, minDuration))
            ]);

            if (response.ok) {
                const data = await response.json() as EnrichedAddressData;
                updateFormData({
                    area: data.area,
                    energyLabel: data.energy_label,
                    estimatedEnergyUsage: data.estimated_energy_usage,
                    estimatedGasUsage: data.estimated_gas_usage,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    woz: data.woz,
                    buildYear: data.build_year,
                    houseType: data.house_type_mapped
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
