import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export function Head() {
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    // Update document title based on current page and language
    const path = location.pathname.split('/')[1] || 'home';
    const titles: Record<string, { az: string; en: string }> = {
      home: {
        az: 'Ana Səhifə - Proep.az',
        en: 'Home - Proep.az',
      },
      about: {
        az: 'Haqqımızda - Proep.az',
        en: 'About Us - Proep.az',
      },
      services: {
        az: 'Xidmətlər - Proep.az',
        en: 'Services - Proep.az',
      },
      portfolio: {
        az: 'Portfel - Proep.az',
        en: 'Portfolio - Proep.az',
      },
      blog: {
        az: 'Blog - Proep.az',
        en: 'Blog - Proep.az',
      },
      contact: {
        az: 'Əlaqə - Proep.az',
        en: 'Contact - Proep.az',
      },
    };

    const pageTitle = titles[path]?.[language] || 'Proep.az';
    document.title = pageTitle;

    // Update HTML lang attribute
    document.documentElement.lang = language === 'az' ? 'az' : 'en';

    // Update meta description based on page
    const descriptions: Record<string, { az: string; en: string }> = {
      home: {
        az: 'Süni intellekt və rəqəmsal həllər üzrə professional endpoint xidmətləri. AI konsaltinq, backend development, API həlləri.',
        en: 'Professional endpoint services for AI and digital solutions. AI consulting, backend development, API solutions.',
      },
      about: {
        az: 'Proep.az haqqında - Rəqəmsal transformasiya və AI həlləri sahəsində lider komanda.',
        en: 'About Proep.az - Leading team in digital transformation and AI solutions.',
      },
      services: {
        az: 'Xidmətlərimiz - AI inteqrasiya, backend development, cloud solutions və daha çox.',
        en: 'Our Services - AI integration, backend development, cloud solutions and more.',
      },
      portfolio: {
        az: 'Portfel - Proep layihələri və əməkdaşlıqları.',
        en: 'Portfolio - Proep projects and collaborations.',
      },
      blog: {
        az: 'Blog - AI texnologiyaları və rəqəmsal transformasiya haqqında məqalələr.',
        en: 'Blog - Articles about AI technologies and digital transformation.',
      },
      contact: {
        az: 'Əlaqə - Bizimlə əlaqə saxlayın və layihənizi müzakirə edək.',
        en: 'Contact - Get in touch and let\'s discuss your project.',
      },
    };

    const metaDescription = descriptions[path]?.[language] || descriptions.home[language];
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.setAttribute('content', metaDescription);

    // Update canonical URL
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://proep.az';
    const canonicalUrl = `${siteUrl}${location.pathname}`;
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // Update hreflang tags
    const currentPath = location.pathname.split('/').slice(0, -1).join('/') || '/home';
    const azUrl = `${siteUrl}${currentPath}/az`;
    const enUrl = `${siteUrl}${currentPath}/en`;

    // Remove existing hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((tag) => tag.remove());

    // Add new hreflang tags
    const azHreflang = document.createElement('link');
    azHreflang.setAttribute('rel', 'alternate');
    azHreflang.setAttribute('hreflang', 'az');
    azHreflang.setAttribute('href', azUrl);
    document.head.appendChild(azHreflang);

    const enHreflang = document.createElement('link');
    enHreflang.setAttribute('rel', 'alternate');
    enHreflang.setAttribute('hreflang', 'en');
    enHreflang.setAttribute('href', enUrl);
    document.head.appendChild(enHreflang);

    const xDefaultHreflang = document.createElement('link');
    xDefaultHreflang.setAttribute('rel', 'alternate');
    xDefaultHreflang.setAttribute('hreflang', 'x-default');
    xDefaultHreflang.setAttribute('href', azUrl);
    document.head.appendChild(xDefaultHreflang);
  }, [location.pathname, language]);

  return null;
}
