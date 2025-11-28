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
    // Always log to console for debugging
    console.log(`[GTM Debug] Event: ${data.event}`, data);

    if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push(data);
    } else {
        console.warn('[GTM Debug] dataLayer not found, event not pushed:', data);
    }
};

/**
 * Track a custom GTM event
 */
export const trackEvent = (eventName: string, data?: Record<string, any>) => {
    pushToDataLayer({
        event: eventName,
        timestamp: new Date().toISOString(),
        ...data,
    });
};
