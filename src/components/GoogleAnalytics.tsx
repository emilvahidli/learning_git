import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-QQRLNFRQ9X';

export function GoogleAnalytics() {
    const location = useLocation();

    // Track page views on route change
    useEffect(() => {
        // Check if gtag is available (loaded from HTML script)
        if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
            try {
                // Send page_view event on route change
                window.gtag('event', 'page_view', {
                    page_path: location.pathname,
                    page_title: document.title,
                    page_location: window.location.href,
                });
            } catch (error) {
                console.error('Google Analytics Page View Error:', error);
            }
        }
    }, [location.pathname, location.search]);

    return null;
}
