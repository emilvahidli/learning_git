import { useLanguage } from '../contexts/LanguageContext';
import { Target, Users, Award, Lightbulb } from 'lucide-react';

export function About() {
  const { language } = useLanguage();

  const content = {
    az: {
      title: 'Haqqımızda',
      subtitle: 'Rəqəmsal transformasiya və AI həlləri sahəsində lider',
      intro: 'PROEP.AZ 2023-cü ildən etibarən Azərbaycanda süni intellekt texnologiyaları və rəqəmsal transformasiya sahəsində fəaliyyət göstərən innovativ komandadır. Biz müasir texnologiyalardan istifadə edərək, bizneslərin və təşkilatların rəqəmsal dünyadakı uğurunu təmin edirik.',
      mission: {
        title: 'Missiyamız',
        description: 'AI texnologiyalarını əlçatan və praktik edərək, Azərbaycan bizneslərinin rəqəmsal transformasiyasını sürətləndirmək və onları qlobal bazarda rəqabətədavamlı etmək.',
      },
      vision: {
        title: 'Vizyonumuz',
        description: 'Azərbaycanda AI və rəqəmsal transformasiya sahəsində aparıcı və etibarlı tərəfdaş olmaq, innovativ həllərlə bizneslərin inkişafına töhfə vermək.',
      },
      values: {
        title: 'Dəyərlərimiz',
        items: [
          {
            icon: Target,
            title: 'İnnovasiya',
            description: 'Ən son texnologiyalar və yaradıcı yanaşmalar',
          },
          {
            icon: Users,
            title: 'Müştəri Mərkəzlilik',
            description: 'Hər layihədə fərdi yanaşma və maksimum dəstək',
          },
          {
            icon: Award,
            title: 'Keyfiyyət',
            description: 'Yüksək standartlar və professional icra',
          },
          {
            icon: Lightbulb,
            title: 'Davamlı İnkişaf',
            description: 'Texnologiyalara və komandaya davamlı investisiya',
          },
        ],
      },
      team: {
        title: 'Komandamız',
        description: 'Təcrübəli mütəxəssislərdən ibarət komandamız, AI, backend development, və sistem arxitekturası sahələrində dərin biliklərə malikdir.',
      },
    },
    en: {
      title: 'About Us',
      subtitle: 'Leader in digital transformation and AI solutions',
      intro: 'PROEP.AZ is an innovative team operating in Azerbaijan since 2023 in the field of artificial intelligence technologies and digital transformation. We ensure the success of businesses and organizations in the digital world using modern technologies.',
      mission: {
        title: 'Our Mission',
        description: 'To accelerate digital transformation of Azerbaijani businesses by making AI technologies accessible and practical, and make them competitive in the global market.',
      },
      vision: {
        title: 'Our Vision',
        description: 'To be a leading and trusted partner in AI and digital transformation in Azerbaijan, contributing to business development with innovative solutions.',
      },
      values: {
        title: 'Our Values',
        items: [
          {
            icon: Target,
            title: 'Innovation',
            description: 'Latest technologies and creative approaches',
          },
          {
            icon: Users,
            title: 'Customer Centricity',
            description: 'Individual approach and maximum support for each project',
          },
          {
            icon: Award,
            title: 'Quality',
            description: 'High standards and professional execution',
          },
          {
            icon: Lightbulb,
            title: 'Continuous Development',
            description: 'Continuous investment in technology and team',
          },
        ],
      },
      team: {
        title: 'Our Team',
        description: 'Our team of experienced specialists has deep knowledge in AI, backend development, and system architecture.',
      },
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

      {/* Intro */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-300 leading-relaxed">{content[language].intro}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-600/10 to-transparent border border-white/10 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-4">{content[language].mission.title}</h2>
              <p className="text-gray-300 leading-relaxed">{content[language].mission.description}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600/10 to-transparent border border-white/10 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-4">{content[language].vision.title}</h2>
              <p className="text-gray-300 leading-relaxed">{content[language].vision.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-purple-950/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">{content[language].values.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content[language].values.items.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
                >
                  <Icon className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">{content[language].team.title}</h2>
          <p className="text-lg text-gray-300 leading-relaxed">{content[language].team.description}</p>
        </div>
      </section>
    </div>
  );
}