/**
 * Google Tag Manager utility functions for tracking events
 */

// Extend the Window interface to include dataLayer
declare global {
    interface Window {
        dataLayer?: Object[];
    }
}

/**
 * Push an event to the GTM dataLayer
 */
const pushToDataLayer = (data: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push(data);
        console.log('GTM Event:', data);
    }
};

/**
 * Track form start event
 */
export const trackFormStart = (
    formType: 'savings' | 'intake',
    metadata?: Record<string, any>
) => {
    pushToDataLayer({
        event: 'form_start',
        form_type: formType,
        form_name: formType === 'savings' ? 'Savings Check' : 'Installer Intake',
        timestamp: new Date().toISOString(),
        ...metadata,
    });
};

/**
 * Track step view event
 */
export const trackStepView = (
    formType: 'savings' | 'intake',
    stepNumber: number,
    stepName: string
) => {
    pushToDataLayer({
        event: 'form_step_view',
        form_type: formType,
        form_name: formType === 'savings' ? 'Savings Check' : 'Installer Intake',
        step_number: stepNumber,
        step_name: stepName,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track step completion event
 */
export const trackStepComplete = (
    formType: 'savings' | 'intake',
    stepNumber: number,
    stepName: string,
    stepData?: Record<string, any>
) => {
    pushToDataLayer({
        event: 'form_step_complete',
        form_type: formType,
        form_name: formType === 'savings' ? 'Savings Check' : 'Installer Intake',
        step_number: stepNumber,
        step_name: stepName,
        step_data: stepData,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track form submission event
 */
export const trackFormSubmit = (
    formType: 'savings' | 'intake',
    formData: Record<string, any>
) => {
    pushToDataLayer({
        event: 'form_submit',
        form_type: formType,
        form_name: formType === 'savings' ? 'Savings Check' : 'Installer Intake',
        form_data: formData,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track form completion event
 */
export const trackFormComplete = (
    formType: 'savings' | 'intake',
    formData?: Record<string, any>,
    metadata?: Record<string, any>
) => {
    pushToDataLayer({
        event: 'form_complete',
        form_type: formType,
        form_name: formType === 'savings' ? 'Savings Check' : 'Installer Intake',
        form_data: formData,
        timestamp: new Date().toISOString(),
        ...metadata,
    });
};

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (
    formType: 'savings' | 'intake',
    ctaName: string,
    ctaDestination?: string
) => {
    pushToDataLayer({
        event: 'cta_click',
        form_type: formType,
        form_name: formType === 'savings' ? 'Savings Check' : 'Installer Intake',
        cta_name: ctaName,
        cta_destination: ctaDestination,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track installer selection (intake flow specific)
 */
export const trackInstallerSelection = (
    installerName: string,
    installerId: string
) => {
    pushToDataLayer({
        event: 'installer_selected',
        form_type: 'intake',
        form_name: 'Installer Intake',
        installer_name: installerName,
        installer_id: installerId,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track validation errors
 */
export const trackValidationError = (
    formType: 'savings' | 'intake',
    stepNumber: number,
    stepName: string,
    errorFields: string[]
) => {
    pushToDataLayer({
        event: 'form_validation_error',
        form_type: formType,
        form_name: formType === 'savings' ? 'Savings Check' : 'Installer Intake',
        step_number: stepNumber,
        step_name: stepName,
        error_fields: errorFields,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track navigation between steps
 */
export const trackStepNavigation = (
    formType: 'savings' | 'intake',
    direction: 'forward' | 'backward',
    fromStep: number,
    toStep: number
) => {
    pushToDataLayer({
        event: 'form_step_navigation',
        form_type: formType,
        form_name: formType === 'savings' ? 'Savings Check' : 'Installer Intake',
        navigation_direction: direction,
        from_step: fromStep,
        to_step: toStep,
        timestamp: new Date().toISOString(),
    });
};
