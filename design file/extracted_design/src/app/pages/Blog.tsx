import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, User, ArrowRight } from 'lucide-react';

export function Blog() {
  const { language } = useLanguage();

  const content = {
    az: {
      title: 'Blog',
      subtitle: 'AI texnologiyaları və rəqəmsal transformasiya haqqında məqalələr',
      posts: [
        {
          title: 'Süni İntellekt Biznesinizi Necə Dəyişə Bilər',
          excerpt: 'AI texnologiyalarının biznes proseslərinə inteqrasiyası və onun gətirdiyi imkanlar haqqında ətraflı baxış.',
          date: '15 Yanvar 2026',
          author: 'PROEP Team',
          category: 'AI & Texnologiya',
        },
        {
          title: 'Backend Arxitekturasının Əhəmiyyəti',
          excerpt: 'Güclü backend sisteminin qurulması və miqyaslana bilən arxitektura prinsipləri.',
          date: '10 Yanvar 2026',
          author: 'PROEP Team',
          category: 'Development',
        },
        {
          title: 'API Təhlükəsizliyi: Best Practices',
          excerpt: 'Modern API sistemlərinin təhlükəsizliyinin təmin edilməsi üçün ən yaxşı təcrübələr və tövsiyələr.',
          date: '5 Yanvar 2026',
          author: 'PROEP Team',
          category: 'Təhlükəsizlik',
        },
        {
          title: 'Rəqəmsal Transformasiya Yol Xəritəsi',
          excerpt: 'Biznesinizi rəqəmsal dünyaya köçürmək üçün addım-addım təlimat və strategiyalar.',
          date: '1 Yanvar 2026',
          author: 'PROEP Team',
          category: 'Biznes',
        },
      ],
    },
    en: {
      title: 'Blog',
      subtitle: 'Articles about AI technologies and digital transformation',
      posts: [
        {
          title: 'How Artificial Intelligence Can Transform Your Business',
          excerpt: 'A detailed look at integrating AI technologies into business processes and the opportunities it brings.',
          date: 'January 15, 2026',
          author: 'PROEP Team',
          category: 'AI & Technology',
        },
        {
          title: 'The Importance of Backend Architecture',
          excerpt: 'Building a powerful backend system and principles of scalable architecture.',
          date: 'January 10, 2026',
          author: 'PROEP Team',
          category: 'Development',
        },
        {
          title: 'API Security: Best Practices',
          excerpt: 'Best practices and recommendations for ensuring security of modern API systems.',
          date: 'January 5, 2026',
          author: 'PROEP Team',
          category: 'Security',
        },
        {
          title: 'Digital Transformation Roadmap',
          excerpt: 'Step-by-step guide and strategies for transitioning your business to the digital world.',
          date: 'January 1, 2026',
          author: 'PROEP Team',
          category: 'Business',
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

      {/* Blog Posts */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content[language].posts.map((post, index) => (
              <article
                key={index}
                className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-purple-400 font-medium">{post.category}</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 hover:text-purple-400 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-300 mb-6 leading-relaxed">{post.excerpt}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  
                  <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                    {language === 'az' ? 'Oxu' : 'Read'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}