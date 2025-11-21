export interface FormData {
    // Step 1: Location
    postalCode: string;
    houseNumber: string;
    houseNumberAddition: string;
    street?: string;
    city?: string;

    // API enriched data
    area?: string;
    energyLabel?: string;
    estimatedEnergyUsage?: number;
    estimatedGasUsage?: number;
    latitude?: string;
    longitude?: string;
    woz?: string;

    // Step 2: Home Details
    houseType: 'detached' | 'semi-detached' | 'terraced' | 'apartment' | '';
    buildYear: string;
    insulation: 'poor' | 'average' | 'good' | 'excellent' | '';

    // Step 3: Heating System
    currentHeating: 'gas' | 'electric' | 'oil' | 'district' | '';
    gasUsage?: string;

    // Step 4: Contact
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export const initialFormData: FormData = {
    postalCode: '',
    houseNumber: '',
    houseNumberAddition: '',
    houseType: '',
    buildYear: '',
    insulation: '',
    currentHeating: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
};
