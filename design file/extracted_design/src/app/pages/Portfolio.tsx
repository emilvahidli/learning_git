import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLink, Code, Cpu, Database } from 'lucide-react';

export function Portfolio() {
  const { language } = useLanguage();

  const content = {
    az: {
      title: 'Portfel',
      subtitle: 'Proep layihələrini və əməkdaşlıqlarını burada təqdim edir. Hazırda nümunə olaraq gosport.az göstərilir.',
      projects: [
        {
          title: 'Gosport.az',
          description: 'İdman platforması üçün AI əsaslı backend və endpoint inteqrasiyası.',
          detailedDescription: 'Gosport.az layihəsində süni intellekt texnologiyaları ilə backend sistemlərin qurulması və API inteqrasiyası həyata keçirilmişdir. Layihə yüksək performans və miqyaslanabilirlik prinsipləri əsasında hazırlanmışdır.',
          technologies: ['AI Integration', 'Backend Development', 'API Design', 'Database Optimization'],
          link: 'https://gosport.az',
          features: [
            'AI əsaslı məzmun idarəetməsi',
            'RESTful API arxitekturası',
            'Real-time data processing',
            'Yüksək performanslı database',
          ],
        },
      ],
      viewProject: 'Layihəyə bax',
      technologies: 'Texnologiyalar',
      keyFeatures: 'Əsas Xüsusiyyətlər',
    },
    en: {
      title: 'Portfolio',
      subtitle: 'Proep showcases its projects and collaborations here. Currently, gosport.az is displayed as a sample.',
      projects: [
        {
          title: 'Gosport.az',
          description: 'AI-powered backend and endpoint integration for a sports platform.',
          detailedDescription: 'In the Gosport.az project, backend systems development and API integration with artificial intelligence technologies were implemented. The project was developed based on high performance and scalability principles.',
          technologies: ['AI Integration', 'Backend Development', 'API Design', 'Database Optimization'],
          link: 'https://gosport.az',
          features: [
            'AI-powered content management',
            'RESTful API architecture',
            'Real-time data processing',
            'High-performance database',
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