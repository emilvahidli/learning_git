import { useClickTracking } from '../hooks/useClickTracking';

/**
 * Component that enables click tracking for all links
 * Renders nothing - just attaches event listeners
 */
export function ClickTracker() {
    useClickTracking();
    return null;
}

export default ClickTracker;
