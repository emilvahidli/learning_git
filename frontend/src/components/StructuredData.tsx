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
      '@id': `${siteUrl}#organization`,
      name: 'Proep.az',
      alternateName: 'Proep',
      legalName: 'Proep.az - Pro End Point',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon-proep.png`,
        width: 512,
        height: 512,
      },
      image: `${siteUrl}/favicon-proep.png`,
      description: language === 'az' 
        ? 'Süni intellekt və rəqəmsal həllər üzrə professional endpoint xidmətləri. AI konsaltinq, backend development, API həlləri.'
        : 'Professional endpoint services for AI and digital solutions. AI consulting, backend development, API solutions.',
      foundingDate: '2026',
      address: {
        '@type': 'PostalAddress',
        addressLocality: language === 'az' ? 'Bakı' : 'Baku',
        addressRegion: 'Baku',
        addressCountry: 'AZ',
        streetAddress: language === 'az' ? 'Nizami küç. 203B' : 'Nizami Street 203B',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        availableLanguage: ['az', 'en'],
        email: 'info@proep.az', // Update with actual email if available
        url: `${siteUrl}/contact/${language}`,
      },
      sameAs: [
        // Add social media links here if available
        // 'https://www.linkedin.com/company/proep',
        // 'https://twitter.com/proep',
        // 'https://github.com/proep',
      ],
      areaServed: {
        '@type': 'Country',
        name: 'Azerbaijan',
      },
      knowsAbout: [
        'Artificial Intelligence',
        'Machine Learning',
        'Backend Development',
        'API Development',
        'Cloud Solutions',
        'Digital Transformation',
      ],
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
      headline: pageData.name,
      description: pageData.description,
      inLanguage: language === 'az' ? 'az-AZ' : 'en-US',
      datePublished: '2026-01-09',
      dateModified: new Date().toISOString().split('T')[0],
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        name: 'Proep.az',
        url: siteUrl,
      },
      about: {
        '@id': `${siteUrl}#organization`,
        '@type': 'Organization',
        name: 'Proep.az',
      },
      breadcrumb: {
        '@id': `${siteUrl}${location.pathname}#breadcrumb`,
      },
      publisher: {
        '@id': `${siteUrl}#organization`,
        '@type': 'Organization',
        name: 'Proep.az',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/favicon-proep.png`,
        },
      },
      mainEntity: {
        '@id': `${siteUrl}#organization`,
        '@type': 'Organization',
        name: 'Proep.az',
      },
    };

    // 5. Page-specific schemas
    const pageSpecificSchemas: any[] = [];

    // Service Schema for Services page
    if (path === 'services') {
      const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${siteUrl}${location.pathname}#service`,
        name: pageData.name,
        description: pageData.description,
        provider: {
          '@id': `${siteUrl}#organization`,
          '@type': 'Organization',
          name: 'Proep.az',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Azerbaijan',
        },
        serviceType: language === 'az' 
          ? ['AI Konsaltinq', 'Backend Development', 'API Həlləri', 'Cloud Solutions']
          : ['AI Consulting', 'Backend Development', 'API Solutions', 'Cloud Solutions'],
        offers: {
          '@type': 'Offer',
          description: pageData.description,
        },
      };
      pageSpecificSchemas.push(serviceSchema);
    }

    // ContactPage Schema for Contact page
    if (path === 'contact') {
      const contactPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${siteUrl}${location.pathname}#contactpage`,
        name: pageData.name,
        description: pageData.description,
        mainEntity: {
          '@id': `${siteUrl}#organization`,
          '@type': 'Organization',
          name: 'Proep.az',
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            availableLanguage: ['az', 'en'],
            email: 'info@proep.az', // Update with actual email if available
            url: `${siteUrl}/contact/${language}`,
          },
        },
      };
      pageSpecificSchemas.push(contactPageSchema);
    }

    // AboutPage Schema for About page
    if (path === 'about') {
      const aboutPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${siteUrl}${location.pathname}#aboutpage`,
        name: pageData.name,
        description: pageData.description,
        mainEntity: {
          '@id': `${siteUrl}#organization`,
          '@type': 'Organization',
          name: 'Proep.az',
        },
      };
      pageSpecificSchemas.push(aboutPageSchema);
    }

    // CollectionPage Schema for Portfolio and Blog
    if (path === 'portfolio' || path === 'blog') {
      const collectionPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${siteUrl}${location.pathname}#collectionpage`,
        name: pageData.name,
        description: pageData.description,
        mainEntity: {
          '@type': 'ItemList',
          '@id': `${siteUrl}${location.pathname}#itemlist`,
        },
      };
      pageSpecificSchemas.push(collectionPageSchema);
    }

    // Inject all schemas
    const schemas = [organizationSchema, websiteSchema, breadcrumbSchema, webpageSchema, ...pageSpecificSchemas];

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
