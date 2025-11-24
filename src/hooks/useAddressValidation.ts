import { useState, useEffect } from 'react';

interface AddressValidationResult {
    isValidating: boolean;
    error: string | null;
    address: {
        street: string;
        city: string;
    } | null;
}

export const useAddressValidation = (postalCode: string, houseNumber: string) => {
    const [result, setResult] = useState<AddressValidationResult>({
        isValidating: false,
        error: null,
        address: null,
    });

    useEffect(() => {
        const validateAddress = async () => {
            const cleanPostalCode = postalCode.replace(/\s/g, '');

            if (cleanPostalCode.length === 6 && houseNumber) {
                setResult(prev => ({ ...prev, isValidating: true, error: null }));

                try {
                    const url = new URL('https://api.pdok.nl/bzk/locatieserver/search/v3_1/free');
                    url.searchParams.set('q', `${cleanPostalCode} ${houseNumber}`);
                    url.searchParams.set('fq', 'type:adres');
                    url.searchParams.append('fq', `postcode:${cleanPostalCode}`);
                    url.searchParams.append('fq', `huisnummer:${houseNumber}`);
                    url.searchParams.set('rows', '1');
                    url.searchParams.set('fl', 'straatnaam,huisnummer,huisletter,huisnummertoevoeging,woonplaatsnaam');

                    const response = await fetch(url.toString());

                    if (!response.ok) throw new Error('Failed to fetch address');

                    const data = await response.json() as { response: { numFound: number; docs: Array<{ straatnaam: string; woonplaatsnaam: string }> } };

                    if (data.response.numFound > 0) {
                        const address = data.response.docs[0];
                        setResult({
                            isValidating: false,
                            error: null,
                            address: {
                                street: address.straatnaam,
                                city: address.woonplaatsnaam
                            }
                        });
                    } else {
                        setResult({
                            isValidating: false,
                            error: 'Address not found',
                            address: null
                        });
                    }
                } catch (err) {
                    console.error('Address validation error:', err);
                    setResult({
                        isValidating: false,
                        error: 'Could not verify address',
                        address: null
                    });
                }
            } else {
                // Reset if inputs are incomplete
                setResult({
                    isValidating: false,
                    error: null,
                    address: null
                });
            }
        };

        const timeoutId = setTimeout(validateAddress, 500);
        return () => clearTimeout(timeoutId);
    }, [postalCode, houseNumber]);

    return result;
};
