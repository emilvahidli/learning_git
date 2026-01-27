import { useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Hook to track link clicks
 * Attaches to all <a> tags and sends click data to backend
 */
export function useClickTracking() {
    const trackClick = useCallback(async (url: string) => {
        try {
            // Don't track internal navigation or empty hrefs
            if (!url || url === '#' || url.startsWith('javascript:')) {
                return;
            }

            await fetch(`${API_URL}/api/click`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });
        } catch (error) {
            // Silently fail - don't block user navigation
            console.debug('Click tracking failed:', error);
        }
    }, []);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const anchor = target.closest('a');

            if (anchor && anchor.href) {
                trackClick(anchor.href);
            }
        };

        // Use capture phase to ensure we catch the click before navigation
        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [trackClick]);

    return { trackClick };
}

export default useClickTracking;
