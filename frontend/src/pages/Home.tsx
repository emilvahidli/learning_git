import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, Bot, Zap, Shield, TrendingUp, Target } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useRef } from 'react';

export function Home() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const servicesRef = useRef<HTMLDivElement>(null);

  const content = {
    az: {
      hero: {
        title: 'Pro End Point – Süni İntellektlə Gələcəyin Həlləri',
        subtitle: 'Biz bizneslər üçün ağıllı, etibarlı və ölçülə bilən AI həllər yaradırıq.',
        cta1: 'Bizimlə əlaqə',
        cta2: 'Xidmətlərə bax',
        startButton: 'Başlayın',
      },
      servicesTitle: 'Xidmətlərimiz',
      services: [
        {
          icon: Bot,
          title: 'AI Konsaltinq və Strategiya',
          description: 'AI Consulting & Strategy',
          details: 'Biznesiniz üçün optimal AI strategiyası hazırlayırıq',
        },
        {
          icon: Target,
          title: 'AI Model İnteqrasiyası',
          description: 'AI Model Integration',
          details: 'GPT və digər AI modellərinin inteqrasiyası',
        },
        {
          icon: Shield,
          title: 'Endpoint & API Həlləri',
          description: 'Endpoint & API Solutions',
          details: 'Təhlükəsiz və miqyaslana bilən API sistemləri',
        },
        {
          icon: Zap,
          title: 'Avtomatlaşdırma Sistemləri',
          description: 'Intelligent Automation',
          details: 'İş proseslərinin ağıllı avtomatlaşdırılması',
        },
        {
          icon: TrendingUp,
          title: 'Data Analitika & ML',
          description: 'Data Analytics & Machine Learning',
          details: 'Verilənlərin analizi və maşın öyrənməsi',
        },
      ],
      whyProep: {
        title: 'Niyə proep?',
        reasons: [
          'Real biznes problemlərinə fokuslanırıq',
          'AI-ni sadəcə trend yox, real alət kimi istifadə edirik',
          'Ölçülə bilən nəticələr veririk',
          'Təhlükəsizlik və etibarlılıq prioritetimizdir',
          'Hər müştəri üçün fərdi yanaşma',
        ],
      },
      blog: {
        title: 'Son Məqalələr',
        readMore: 'Oxu',
        featured: {
          title: 'Bizneslər üçün AI Endpoint-lərin əhəmiyyəti',
          excerpt: 'Müasir dünyada API və endpoint-lərin necə AI ilə gücləndirilə biləcəyini və bunun biznesinizə necə dəyər qatacağını öyrənin.',
          date: '15 Yanvar 2026',
        },
      },
    },
    en: {
      hero: {
        title: 'Professional Endpoints for AI-Driven Solutions',
        subtitle: 'We build smart, reliable, and scalable AI-powered solutions.',
        cta1: 'Get in Touch',
        cta2: 'View Services',
        startButton: 'Get Started',
      },
      servicesTitle: 'Our Services',
      services: [
        {
          icon: Bot,
          title: 'AI Consulting & Strategy',
          description: 'AI Konsaltinq və Strategiya',
          details: 'We develop optimal AI strategies for your business',
        },
        {
          icon: Target,
          title: 'AI Model Integration',
          description: 'AI Model İnteqrasiyası',
          details: 'Integration of GPT and other AI models',
        },
        {
          icon: Shield,
          title: 'Endpoint & API Solutions',
          description: 'Endpoint & API Həlləri',
          details: 'Secure and scalable API systems',
        },
        {
          icon: Zap,
          title: 'Intelligent Automation',
          description: 'Avtomatlaşdırma Sistemləri',
          details: 'Smart automation of business processes',
        },
        {
          icon: TrendingUp,
          title: 'Data Analytics & ML',
          description: 'Data Analitika & ML',
          details: 'Data analysis and machine learning',
        },
      ],
      whyProep: {
        title: 'Why proep?',
        reasons: [
          'We focus on real business problems',
          'We treat AI as a tool, not a buzzword',
          'Measurable and scalable results',
          'Security-first approach',
          'Tailored solutions for every client',
        ],
      },
      blog: {
        title: 'Latest Articles',
        readMore: 'Read more',
        featured: {
          title: 'Why AI Endpoints Matter for Modern Businesses',
          excerpt: 'Learn how APIs and endpoints can be empowered with AI in the modern world and how this adds value to your business.',
          date: 'January 15, 2026',
        },
      },
    },
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
              <span className="text-gray-100">Pro End Point</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {language === 'az' ? 'Süni İntellektlə Gələcəyin Həlləri' : 'AI-Driven Solutions'}
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto font-light"
          >
            {content[language].hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to={`/contact/${language}`}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2"
            >
              {content[language].hero.cta1}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button
              onClick={scrollToServices}
              className="px-8 py-4 bg-white/5 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300"
            >
              {content[language].hero.startButton}
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Services Section with Smooth Transition */}
      <section ref={servicesRef} className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4">{content[language].servicesTitle}</h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content[language].services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative p-8 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-2xl hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <Icon className="w-10 h-10 text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{service.description}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.details}</p>
                    
                    <Link
                      to={`/services/${language}`}
                      className="inline-flex items-center gap-2 text-sm text-blue-400 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {language === 'az' ? 'Ətraflı' : 'Learn more'}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why proep Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-12">{content[language].whyProep.title}</h2>
              <ul className="space-y-6">
                {content[language].whyProep.reasons.map((reason, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2.5 group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-300 text-lg font-light">{reason}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl border border-white/5 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-light mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    pro<span className="text-white">.</span>ep
                  </div>
                  <p className="text-gray-400 font-light">Professional Endpoints</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4">{content[language].blog.title}</h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"></div>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group max-w-4xl mx-auto"
          >
            <Link to={`/blog/${language}`} className="block">
              <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/30 transition-all duration-300">
                {/* Featured Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Bot className="w-20 h-20 text-blue-400/30" />
                </div>
                
                <div className="p-8">
                  <div className="text-sm text-blue-400 mb-3">{content[language].blog.featured.date}</div>
                  <h3 className="text-2xl font-medium mb-4 group-hover:text-blue-400 transition-colors">
                    {content[language].blog.featured.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {content[language].blog.featured.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-blue-400">
                    {content[language].blog.readMore}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        </div>
      </section>
    </div>
  );
}
