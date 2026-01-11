import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLink, Code, Cpu, Database } from 'lucide-react';

export function Portfolio() {
  const { language } = useLanguage();

  const content = {
    az: {
      title: 'Portfel',
      subtitle: 'Proep-in müxtəlif sahələrdə həyata keçirdiyi uğurlu layihələr və əməkdaşlıqlar.',
      projects: [
        {
          title: 'Zum.com.tr',
          description: 'Türkiyənin aparıcı e-ticarət platforması üçün kompleks backend və API həlləri.',
          detailedDescription: 'Zum.com.tr üçün yüksək yüklənmə qabiliyyətli e-ticarət arxitekturası, məhsul kataloq sistemləri və ödəniş inteqrasiyaları hazırlanmışdır. Layihədə mikroservis arxitekturası və real-time inventar idarəetməsi tətbiq edilib.',
          technologies: ['E-commerce Solutions', 'Microservices', 'Payment Integration', 'Cloud Infrastructure'],
          link: 'https://zum.com.tr',
          features: [
            'Yüksək yüklənmə qabiliyyəti',
            'Real-time inventar idarəetməsi',
            'Çoxkanallı ödəniş sistemləri',
            'Advanced məhsul axtarışı',
          ],
        },
        {
          title: 'Gosport.az',
          description: 'İdman məhsulları üçün AI əsaslı e-ticarət platforması və backend həlləri.',
          detailedDescription: 'Gosport.az layihəsində süni intellekt texnologiyaları ilə backend sistemlərin qurulması, məhsul tövsiyə sistemi və API inteqrasiyası həyata keçirilmişdir. Platforma yüksək performans və istifadəçi təcrübəsi üzərində qurulub.',
          technologies: ['AI Integration', 'Backend Development', 'API Design', 'Recommendation Engine'],
          link: 'https://gosport.az/az/',
          features: [
            'AI əsaslı məhsul tövsiyə sistemi',
            'RESTful API arxitekturası',
            'Real-time məlumat emalı',
            'Yüksək performanslı database',
          ],
        },
        {
          title: 'Courir.az',
          description: 'Premium ayaqqabı və geyim brendi üçün modern e-ticarət həlli.',
          detailedDescription: 'Courir.az üçün müasir dizaynlı, istifadəçi dostu e-ticarət platforması, məhsul idarəetmə sistemi və təhlükəsiz ödəniş infrastrukturu yaradılmışdır. Layihədə responsive dizayn və optimallaşdırılmış performans tətbiq edilib.',
          technologies: ['Web Development', 'E-commerce', 'UI/UX Optimization', 'Security'],
          link: 'https://courir.az/az/',
          features: [
            'Modern və responsive dizayn',
            'Tez yüklənmə vaxtı',
            'Təhlükəsiz ödəniş sistemi',
            'Asan məhsul idarəetməsi',
          ],
        },
        {
          title: 'TrustGarant.com.tr',
          description: 'Türkiyədə maliyyə texnologiyaları və zəmanət xidmətləri platforması.',
          detailedDescription: 'TrustGarant üçün təhlükəsiz maliyyə əməliyyatları platforması, müştəri idarəetmə sistemi və avtomatlaşdırılmış zəmanət prosesləri hazırlanmışdır. Layihədə yüksək təhlükəsizlik standartları və komplayans tələbləri tətbiq edilib.',
          technologies: ['Fintech Solutions', 'Security & Compliance', 'Automation', 'Backend Systems'],
          link: 'https://trustgarant.com.tr',
          features: [
            'Təhlükəsiz əməliyyat prosesləri',
            'Avtomatlaşdırılmış iş axınları',
            'Müştəri portalı',
            'Compliance & reporting',
          ],
        },
        {
          title: 'DamlaMebel.az',
          description: 'Mebel sənayesi üçün kataloq və sifariş idarəetmə sistemi.',
          detailedDescription: 'Damla Mebel üçün geniş məhsul kataloqu, 3D vizualizasiya imkanları və müştəri sifariş sistemi ilə tam funksional web platforması yaradılmışdır. Layihədə istifadəçi təcrübəsi və vizual təqdimat prioritet olmuşdur.',
          technologies: ['Web Development', 'Product Catalog', 'Order Management', 'Visual Design'],
          link: 'https://damlamebel.az',
          features: [
            'Geniş məhsul kataloqu',
            'Vizual məhsul təqdimatı',
            'Online sifariş sistemi',
            'Müştəri hesab paneli',
          ],
        },
        {
          title: 'BarokMebel.az',
          description: 'Premium mebel brendi üçün lüks dizaynlı korporativ veb sayt.',
          detailedDescription: 'Barok Mebel üçün brendin premium xarakterini əks etdirən lüks dizaynlı veb sayt, portfel qalereya sistemi və müştəri əlaqə modulları hazırlanmışdır. Layihədə estetika və funksionallıq mükəmməl şəkildə birləşdirilib.',
          technologies: ['Web Design', 'Portfolio System', 'CMS', 'Premium UI/UX'],
          link: 'https://barokmebel.az',
          features: [
            'Premium dizayn və estetika',
            'Portfel qalereya sistemi',
            'Müştəri əlaqə formaları',
            'Mobil uyğunlaşma',
          ],
        },
      ],
      viewProject: 'Layihəyə bax',
      technologies: 'Texnologiyalar',
      keyFeatures: 'Əsas Xüsusiyyətlər',
    },
    en: {
      title: 'Portfolio',
      subtitle: 'Successful projects and collaborations implemented by Proep across various sectors.',
      projects: [
        {
          title: 'Zum.com.tr',
          description: 'Comprehensive backend and API solutions for Turkey\'s leading e-commerce platform.',
          detailedDescription: 'For Zum.com.tr, we developed high-load e-commerce architecture, product catalog systems, and payment integrations. The project implements microservice architecture and real-time inventory management.',
          technologies: ['E-commerce Solutions', 'Microservices', 'Payment Integration', 'Cloud Infrastructure'],
          link: 'https://zum.com.tr',
          features: [
            'High-load capacity',
            'Real-time inventory management',
            'Multi-channel payment systems',
            'Advanced product search',
          ],
        },
        {
          title: 'Gosport.az',
          description: 'AI-powered e-commerce platform and backend solutions for sports products.',
          detailedDescription: 'In the Gosport.az project, we implemented backend systems development with AI technologies, product recommendation system, and API integration. The platform is built on high performance and user experience.',
          technologies: ['AI Integration', 'Backend Development', 'API Design', 'Recommendation Engine'],
          link: 'https://gosport.az/az/',
          features: [
            'AI-powered product recommendations',
            'RESTful API architecture',
            'Real-time data processing',
            'High-performance database',
          ],
        },
        {
          title: 'Courir.az',
          description: 'Modern e-commerce solution for premium footwear and apparel brand.',
          detailedDescription: 'For Courir.az, we created a modern, user-friendly e-commerce platform, product management system, and secure payment infrastructure. The project features responsive design and optimized performance.',
          technologies: ['Web Development', 'E-commerce', 'UI/UX Optimization', 'Security'],
          link: 'https://courir.az/az/',
          features: [
            'Modern and responsive design',
            'Fast loading times',
            'Secure payment system',
            'Easy product management',
          ],
        },
        {
          title: 'TrustGarant.com.tr',
          description: 'Financial technology and guarantee services platform in Turkey.',
          detailedDescription: 'For TrustGarant, we developed a secure financial transactions platform, customer management system, and automated guarantee processes. The project implements high security standards and compliance requirements.',
          technologies: ['Fintech Solutions', 'Security & Compliance', 'Automation', 'Backend Systems'],
          link: 'https://trustgarant.com.tr',
          features: [
            'Secure transaction processes',
            'Automated workflows',
            'Customer portal',
            'Compliance & reporting',
          ],
        },
        {
          title: 'DamlaMebel.az',
          description: 'Catalog and order management system for furniture industry.',
          detailedDescription: 'For Damla Mebel, we created a fully functional web platform with extensive product catalog, 3D visualization capabilities, and customer order system. User experience and visual presentation were prioritized in the project.',
          technologies: ['Web Development', 'Product Catalog', 'Order Management', 'Visual Design'],
          link: 'https://damlamebel.az',
          features: [
            'Extensive product catalog',
            'Visual product presentation',
            'Online ordering system',
            'Customer account panel',
          ],
        },
        {
          title: 'BarokMebel.az',
          description: 'Luxury-designed corporate website for premium furniture brand.',
          detailedDescription: 'For Barok Mebel, we developed a luxury-designed website reflecting the brand\'s premium character, portfolio gallery system, and customer contact modules. The project perfectly combines aesthetics and functionality.',
          technologies: ['Web Design', 'Portfolio System', 'CMS', 'Premium UI/UX'],
          link: 'https://barokmebel.az',
          features: [
            'Premium design and aesthetics',
            'Portfolio gallery system',
            'Customer contact forms',
            'Mobile adaptation',
          ],
        },
      ],
      viewProject: 'View Project',
      technologies: 'Technologies',
      keyFeatures: 'Key Features',
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24">
      {/* Header */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6">{content[language].title}</h1>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">{content[language].subtitle}</p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {content[language].projects.map((project, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Project Image/Visual */}
                  <div className="lg:col-span-2 bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-12 flex items-center justify-center">
                    <div className="text-center">
                      <Code className="w-24 h-24 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold">{project.title}</h3>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="lg:col-span-3 p-8">
                    <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                    <p className="text-xl text-gray-300 mb-6">{project.description}</p>
                    <p className="text-gray-400 mb-8 leading-relaxed">{project.detailedDescription}</p>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-purple-400" />
                        {content[language].technologies}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-purple-400" />
                        {content[language].keyFeatures}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Link */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      {content[language].viewProject}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Projects Coming Soon */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-purple-950/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'az' ? 'Daha çox layihələr tezliklə...' : 'More projects coming soon...'}
          </h2>
          <p className="text-gray-400">
            {language === 'az'
              ? 'Yeni layihələrimiz və əməkdaşlıqlarımız haqqında məlumat əldə etmək üçün bizimlə əlaqədə qalın.'
              : 'Stay tuned for updates on our new projects and collaborations.'}
          </p>
        </div>
      </section>
    </div>
  );
}
