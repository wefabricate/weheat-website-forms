import { NextRequest, NextResponse } from 'next/server';

// Mock address database
const mockAddresses: Record<string, any> = {
    '6531KJ_4': {
        area: '221',
        build_year: '1932',
        city: 'Nijmegen',
        energy_label: 'C',
        estimated_energy_usage: 241,
        estimated_gas_usage: 2191,
        house_number: '4',
        house_number_addition: 'None',
        house_type: '2 onder 1 kap woning',
        latitude: '51.83027205816181',
        longitude: '5.8505499641530285',
        postal_code: '6531KJ',
        street: 'Hindestraat',
        woz: '830362'
    },
    '1234AB_10': {
        area: '180',
        build_year: '1985',
        city: 'Amsterdam',
        energy_label: 'B',
        estimated_energy_usage: 195,
        estimated_gas_usage: 1650,
        house_number: '10',
        house_number_addition: 'None',
        house_type: 'Tussenwoning',
        latitude: '52.3676',
        longitude: '4.9041',
        postal_code: '1234AB',
        street: 'Voorbeeldstraat',
        woz: '425000'
    },
    '3011AB_25': {
        area: '145',
        build_year: '2005',
        city: 'Rotterdam',
        energy_label: 'A',
        estimated_energy_usage: 150,
        estimated_gas_usage: 1200,
        house_number: '25',
        house_number_addition: 'None',
        house_type: 'Appartement',
        latitude: '51.9225',
        longitude: '4.47917',
        postal_code: '3011AB',
        street: 'Coolsingel',
        woz: '385000'
    },
    '5644JL_42': {
        area: '165',
        build_year: '1998',
        city: 'Eindhoven',
        energy_label: 'B',
        estimated_energy_usage: 180,
        estimated_gas_usage: 1450,
        house_number: '42',
        house_number_addition: 'None',
        house_type: 'Tussenwoning',
        latitude: '51.4416',
        longitude: '5.4697',
        postal_code: '5644JL',
        street: 'Mathijsenlaan',
        woz: '895000'
    }
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const postalCode = searchParams.get('postal_code')?.replace(/\s/g, '');
    const houseNumber = searchParams.get('house_number');

    console.log('=== API Request ===');
    console.log('Postal Code:', postalCode);
    console.log('House Number:', houseNumber);

    if (!postalCode || !houseNumber) {
        console.log('ERROR: Missing parameters');
        return NextResponse.json(
            { error: 'postal_code and house_number are required' },
            { status: 400 }
        );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const key = `${postalCode}_${houseNumber}`;
    console.log('Looking up key:', key);
    console.log('Available keys:', Object.keys(mockAddresses));

    const address = mockAddresses[key];

    if (!address) {
        console.log('ERROR: Address not found for key:', key);
        return NextResponse.json(
            { error: 'Address not found' },
            { status: 404 }
        );
    }

    console.log('SUCCESS: Found address:', address);
    return NextResponse.json(address);
}
