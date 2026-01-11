import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLink, Code, Cpu, Database } from 'lucide-react';
import { api } from '../config/api';

interface PortfolioProject {
  id: number;
  title_az: string;
  title_en: string;
  slug: string;
  short_description_az: string;
  short_description_en: string;
  detailed_description_az?: string;
  detailed_description_en?: string;
  project_url?: string;
  technologies: string[];
  features_az: string[];
  features_en: string[];
  status: string;
}

export function Portfolio() {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api.public.portfolio}?limit=20`);
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Portfolio load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const content = {
    az: {
      title: 'Portfel',
      subtitle: 'Proep-in müxtəlif sahələrdə həyata keçirdiyi uğurlu layihələr və əməkdaşlıqlar.',
      viewProject: 'Layihəyə bax',
      technologies: 'Texnologiyalar',
      keyFeatures: 'Əsas Xüsusiyyətlər',
      noProjects: 'Heç bir layihə tapılmadı',
      loading: 'Yüklənir...',
    },
    en: {
      title: 'Portfolio',
      subtitle: 'Successful projects and collaborations implemented by Proep across various sectors.',
      viewProject: 'View Project',
      technologies: 'Technologies',
      keyFeatures: 'Key Features',
      noProjects: 'No projects found',
      loading: 'Loading...',
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

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
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">{content[language].noProjects}</p>
            </div>
          ) : (
            <div className="space-y-12">
              {projects.map((project) => {
                const title = language === 'az' ? project.title_az : project.title_en;
                const description = language === 'az' ? project.short_description_az : project.short_description_en;
                const detailedDescription = language === 'az' ? project.detailed_description_az : project.detailed_description_en;
                const features = language === 'az' ? project.features_az : project.features_en;

                return (
                  <div
                    key={project.id}
                    className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                      {/* Project Image/Visual */}
                      <div className="lg:col-span-2 bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-12 flex items-center justify-center">
                        <div className="text-center">
                          <Code className="w-24 h-24 text-purple-400 mx-auto mb-4" />
                          <h3 className="text-3xl font-bold">{title}</h3>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="lg:col-span-3 p-8">
                        <h2 className="text-3xl font-bold mb-4">{title}</h2>
                        <p className="text-xl text-gray-300 mb-6">{description}</p>
                        {detailedDescription && (
                          <p className="text-gray-400 mb-8 leading-relaxed">{detailedDescription}</p>
                        )}

                        {/* Technologies */}
                        {project.technologies && project.technologies.length > 0 && (
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
                        )}

                        {/* Key Features */}
                        {features && features.length > 0 && (
                          <div className="mb-8">
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Database className="w-5 h-5 text-purple-400" />
                              {content[language].keyFeatures}
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {features.map((feature, idx) => (
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
                        )}

                        {/* Link */}
                        {project.project_url && (
                          <a
                            href={project.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                          >
                            {content[language].viewProject}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* More Projects Coming Soon */}
      {projects.length > 0 && (
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
      )}
    </div>
  );
}
