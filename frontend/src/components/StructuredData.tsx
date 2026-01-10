import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export function StructuredData() {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://proep.az';
    const path = location.pathname.split('/')[1] || 'home';

    // Page titles and descriptions
    const pageInfo: Record<string, { az: { name: string; description: string }; en: { name: string; description: string } }> = {
      home: {
        az: {
          name: 'Ana Səhifə',
          description: 'Süni intellekt və rəqəmsal həllər üzrə professional endpoint xidmətləri',
        },
        en: {
          name: 'Home',
          description: 'Professional endpoint services for AI and digital solutions',
        },
      },
      about: {
        az: {
          name: 'Haqqımızda',
          description: 'Proep.az haqqında - Rəqəmsal transformasiya və AI həlləri sahəsində lider komanda',
        },
        en: {
          name: 'About Us',
          description: 'About Proep.az - Leading team in digital transformation and AI solutions',
        },
      },
      services: {
        az: {
          name: 'Xidmətlər',
          description: 'AI inteqrasiya, backend development, cloud solutions və daha çox',
        },
        en: {
          name: 'Services',
          description: 'AI integration, backend development, cloud solutions and more',
        },
      },
      portfolio: {
        az: {
          name: 'Portfel',
          description: 'Proep layihələri və əməkdaşlıqları',
        },
        en: {
          name: 'Portfolio',
          description: 'Proep projects and collaborations',
        },
      },
      blog: {
        az: {
          name: 'Blog',
          description: 'AI texnologiyaları və rəqəmsal transformasiya haqqında məqalələr',
        },
        en: {
          name: 'Blog',
          description: 'Articles about AI technologies and digital transformation',
        },
      },
      contact: {
        az: {
          name: 'Əlaqə',
          description: 'Bizimlə əlaqə saxlayın və layihənizi müzakirə edək',
        },
        en: {
          name: 'Contact',
          description: 'Get in touch and let\'s discuss your project',
        },
      },
    };

    const currentPage = pageInfo[path] || pageInfo.home;
    const pageData = currentPage[language];

    // 1. Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Proep.az',
      alternateName: 'Proep',
      url: siteUrl,
      logo: `${siteUrl}/favicon-proep.png`,
      description: language === 'az' 
        ? 'Süni intellekt və rəqəmsal həllər üzrə professional endpoint xidmətləri'
        : 'Professional endpoint services for AI and digital solutions',
      sameAs: [
        // Add social media links here if available
        // 'https://www.linkedin.com/company/proep',
        // 'https://twitter.com/proep',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        availableLanguage: ['az', 'en'],
      },
    };

    // 2. WebSite Schema (for SiteLinks in Google)
    const menuItems = [
      { name: language === 'az' ? 'Ana Səhifə' : 'Home', url: `${siteUrl}/home/${language}` },
      { name: language === 'az' ? 'Haqqımızda' : 'About', url: `${siteUrl}/about/${language}` },
      { name: language === 'az' ? 'Xidmətlər' : 'Services', url: `${siteUrl}/services/${language}` },
      { name: language === 'az' ? 'Portfel' : 'Portfolio', url: `${siteUrl}/portfolio/${language}` },
      { name: language === 'az' ? 'Blog' : 'Blog', url: `${siteUrl}/blog/${language}` },
      { name: language === 'az' ? 'Əlaqə' : 'Contact', url: `${siteUrl}/contact/${language}` },
    ];

    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      name: 'Proep.az',
      url: siteUrl,
      alternateName: 'Proep',
      description: language === 'az'
        ? 'Süni intellekt və rəqəmsal həllər üzrə professional endpoint xidmətləri'
        : 'Professional endpoint services for AI and digital solutions',
      inLanguage: [language === 'az' ? 'az-AZ' : 'en-US', language === 'az' ? 'en-US' : 'az-AZ'],
      publisher: {
        '@type': 'Organization',
        name: 'Proep.az',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/favicon-proep.png`,
        },
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: menuItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: item.url,
        })),
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };

    // 3. BreadcrumbList Schema (for breadcrumbs in Google results)
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: language === 'az' ? 'Ana Səhifə' : 'Home',
        item: `${siteUrl}/home/${language}`,
      },
    ];

    if (path !== 'home') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: breadcrumbItems.length + 1,
        name: pageData.name,
        item: `${siteUrl}${location.pathname}`,
      });
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    };

    // 4. WebPage Schema
    const webpageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${siteUrl}${location.pathname}#webpage`,
      url: `${siteUrl}${location.pathname}`,
      name: pageData.name,
      description: pageData.description,
      inLanguage: language === 'az' ? 'az-AZ' : 'en-US',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Proep.az',
        url: siteUrl,
      },
      about: {
        '@type': 'Organization',
        name: 'Proep.az',
      },
      breadcrumb: {
        '@id': `${siteUrl}${location.pathname}#breadcrumb`,
      },
      mainEntity: {
        '@type': 'Organization',
        name: 'Proep.az',
      },
    };

    // Inject all schemas
    const schemas = [organizationSchema, websiteSchema, breadcrumbSchema, webpageSchema];

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${index}`;
      script.text = JSON.stringify(schema, null, 2);
      document.head.appendChild(script);
    });

    // Cleanup on unmount
    return () => {
      existingScripts.forEach(script => script.remove());
    };
  }, [location.pathname, language]);

  return null;
}
