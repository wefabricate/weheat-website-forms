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
    estimatedGasUsage?: number;
    latitude?: string;
    longitude?: string;
    woz?: string;

    // Step 2: Home Details
    houseType: 'Vrijstaande woning' | 'Twee-onder-een-kap' | 'Rijwoning' | 'Hoekwoning' | 'Appartement' | '';
    buildYear: 'Voor 1970' | 'Tussen 1971 en 1989' | 'Tussen 1990 en 1999' | 'Tussen 2000 en 2019' | 'Na 2019' | '';
    insulation: string[];

    // Step 3: Heating System
    heatDistribution: ('stadsverwarming' | 'luchtverwarming' | 'radiatoren' | 'convectoren-vloer' | 'convectoren-muren' | 'vloerverwarming' | 'anders')[];

    // Installer selection (for installer intake form)
    selectedInstaller?: {
        sfid: string;
        name: string;
    };

    // Step 4: Contact
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message?: string;
}

export const initialFormData: FormData = {
    postalCode: '',
    houseNumber: '',
    houseNumberAddition: '',
    houseType: '',
    buildYear: '',
    insulation: [],
    heatDistribution: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
};
