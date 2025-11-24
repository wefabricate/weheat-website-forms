export const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
    return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
};

export const VALIDATION_MESSAGES = {
    EMAIL_INVALID: 'Vul een geldig e-mailadres in',
    PHONE_INVALID: 'Vul een geldig telefoonnummer in (min. 10 cijfers)',
} as const;
