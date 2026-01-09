import { useEffect } from 'react';

/**
 * Favicon cache fix - Force reload favicon on mount
 */
export function FaviconUpdater() {
  useEffect(() => {
    // Remove all existing favicon links
    const existingFavicons = document.querySelectorAll("link[rel*='icon'], link[rel*='shortcut']");
    existingFavicons.forEach((link) => link.remove());

    // Create new favicon link with timestamp
    const timestamp = Date.now();
    const faviconUrl = `/favicon-proep.png?t=${timestamp}`;

    // Add new favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = faviconUrl;
    document.head.appendChild(link);

    // Add shortcut icon
    const shortcut = document.createElement('link');
    shortcut.rel = 'shortcut icon';
    shortcut.type = 'image/png';
    shortcut.href = faviconUrl;
    document.head.appendChild(shortcut);

    // Add apple touch icon
    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = faviconUrl;
    document.head.appendChild(appleIcon);

    // Force reload favicon by creating an image
    const img = new Image();
    img.src = faviconUrl;
    img.onload = () => {
      // Favicon loaded successfully
      console.log('Favicon loaded:', faviconUrl);
    };
  }, []);

  return null;
}
