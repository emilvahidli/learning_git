import { useEffect } from 'react';

// Google Tag Manager Container ID
const GTM_ID = import.meta.env.VITE_GTM_ID || 'GTM-NWTZFF94';

export function GoogleTagManager() {
  useEffect(() => {
    if (!GTM_ID || !GTM_ID.startsWith('GTM-')) {
      return;
    }

    // Check if GTM script already exists
    if (document.querySelector(`script[src*="gtm.js?id=${GTM_ID}"]`)) {
      return;
    }

    // Initialize dataLayer
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      
      // GTM script injection
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `;
      document.head.appendChild(script);

      // Noscript fallback (for body)
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `;
      document.body.insertBefore(noscript, document.body.firstChild);
    }
  }, []);

  return null;
}
