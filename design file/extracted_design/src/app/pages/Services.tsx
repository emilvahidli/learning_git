import { useLanguage } from '../contexts/LanguageContext';
import { Bot, Code, Database, Cloud, Workflow, Shield, Zap, LineChart } from 'lucide-react';

export function Services() {
  const { language } = useLanguage();

  const content = {
    az: {
      title: 'Xidmətlərimiz',
      subtitle: 'Müasir texnologiyalar əsasında innovativ həllər',
      services: [
        {
          icon: Bot,
          title: 'AI İnteqrasiya və Konsultasiya',
          description: 'Süni intellekt həllərinin biznes proseslərinizə inteqrasiyası, GPT modelləri, maşın öyrənməsi və deep learning sistemlərinin qurulması.',
          features: [
            'ChatGPT və LLM inteqrasiyası',
            'Custom AI model hazırlanması',
            'Natural Language Processing',
            'Computer Vision həlləri',
          ],
        },
        {
          icon: Code,
          title: 'Backend Development',
          description: 'Yüksək performanslı, miqyaslana bilən və etibarlı backend sistemlərinin və API-ların hazırlanması.',
          features: [
            'RESTful və GraphQL API',
            'Mikroservis arxitekturası',
            'Real-time sistemlər',
            'Database dizayn və optimallaşdırma',
          ],
        },
        {
          icon: Database,
          title: 'Verilənlər Bazası Həlləri',
          description: 'Verilənlərin saxlanması, idarə edilməsi və optimallaşdırılması üçün müasir həllər.',
          features: [
            'SQL və NoSQL database dizayn',
            'Database migration və replikasiya',
            'Performance tuning',
            'Backup və recovery strategiyaları',
          ],
        },
        {
          icon: Cloud,
          title: 'Cloud Solutions',
          description: 'Bulud texnologiyalarından istifadə edərək infrastrukturun qurulması və idarə edilməsi.',
          features: [
            'AWS, Azure, GCP deployment',
            'Serverless arxitektura',
            'Container orkestrasyonu',
            'CI/CD pipeline qurulması',
          ],
        },
        {
          icon: Workflow,
          title: 'Proseslərin Avtomatlaşdırılması',
          description: 'İş proseslərinin avtomatlaşdırılması və optimallaşdırılması, manual işlərin azaldılması.',
          features: [
            'Workflow automation',
            'RPA həlləri',
            'İnteqrasiya platformaları',
            'Custom automation tools',
          ],
        },
        {
          icon: Shield,
          title: 'Təhlükəsizlik və Compliance',
          description: 'Sistemlərin təhlükəsizliyinin təmin edilməsi və beynəlxalq standartlara uyğunluq.',
          features: [
            'Security audit',
            'Penetration testing',
            'GDPR və digər compliance',
            'Authentication və authorization',
          ],
        },
        {
          icon: Zap,
          title: 'Performance Optimallaşdırma',
          description: 'Mövcud sistemlərin performansının artırılması və resurs istehlakının azaldılması.',
          features: [
            'Code optimization',
            'Caching strategiyaları',
            'Load balancing',
            'Monitoring və alerting',
          ],
        },
        {
          icon: LineChart,
          title: 'Data Analytics və BI',
          description: 'Verilənlərin analizi və biznes kəşfiyyatı sistemlərinin qurulması.',
          features: [
            'Data warehouse dizayn',
            'ETL proseslər',
            'Reporting və dashboards',
            'Predictive analytics',
          ],
        },
      ],
    },
    en: {
      title: 'Our Services',
      subtitle: 'Innovative solutions based on modern technologies',
      services: [
        {
          icon: Bot,
          title: 'AI Integration & Consulting',
          description: 'Integration of artificial intelligence solutions into your business processes, GPT models, machine learning, and deep learning systems development.',
          features: [
            'ChatGPT and LLM integration',
            'Custom AI model development',
            'Natural Language Processing',
            'Computer Vision solutions',
          ],
        },
        {
          icon: Code,
          title: 'Backend Development',
          description: 'Development of high-performance, scalable, and reliable backend systems and APIs.',
          features: [
            'RESTful and GraphQL API',
            'Microservices architecture',
            'Real-time systems',
            'Database design and optimization',
          ],
        },
        {
          icon: Database,
          title: 'Database Solutions',
          description: 'Modern solutions for data storage, management, and optimization.',
          features: [
            'SQL and NoSQL database design',
            'Database migration and replication',
            'Performance tuning',
            'Backup and recovery strategies',
          ],
        },
        {
          icon: Cloud,
          title: 'Cloud Solutions',
          description: 'Infrastructure setup and management using cloud technologies.',
          features: [
            'AWS, Azure, GCP deployment',
            'Serverless architecture',
            'Container orchestration',
            'CI/CD pipeline setup',
          ],
        },
        {
          icon: Workflow,
          title: 'Process Automation',
          description: 'Automation and optimization of business processes, reducing manual work.',
          features: [
            'Workflow automation',
            'RPA solutions',
            'Integration platforms',
            'Custom automation tools',
          ],
        },
        {
          icon: Shield,
          title: 'Security & Compliance',
          description: 'Ensuring system security and compliance with international standards.',
          features: [
            'Security audit',
            'Penetration testing',
            'GDPR and other compliance',
            'Authentication and authorization',
          ],
        },
        {
          icon: Zap,
          title: 'Performance Optimization',
          description: 'Improving performance of existing systems and reducing resource consumption.',
          features: [
            'Code optimization',
            'Caching strategies',
            'Load balancing',
            'Monitoring and alerting',
          ],
        },
        {
          icon: LineChart,
          title: 'Data Analytics & BI',
          description: 'Data analysis and business intelligence systems development.',
          features: [
            'Data warehouse design',
            'ETL processes',
            'Reporting and dashboards',
            'Predictive analytics',
          ],
        },
      ],
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

      {/* Services Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {content[language].services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  <Icon className="w-14 h-14 text-purple-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === 'az' ? 'Layihəniz üçün hazırsınız?' : 'Ready for Your Project?'}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {language === 'az'
              ? 'Bizimlə əlaqə saxlayın və layihənizi müzakirə edək'
              : 'Contact us and let\'s discuss your project'}
          </p>
          <a
            href="/contact"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-lg text-lg transition-colors"
          >
            {language === 'az' ? 'Əlaqə saxlayın' : 'Get in Touch'}
          </a>
        </div>
      </section>
    </div>
  );
}