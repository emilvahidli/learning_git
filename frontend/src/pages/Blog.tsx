import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../config/api';

interface BlogPost {
  id: number;
  post_id: string;
  title: string;
  slug: string;
  short_description?: string;
  content: string;
  category?: string;
  published_at: string;
  author_full_name?: string;
  author_name?: string;
  language: string;
  views: number;
}

export function Blog() {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, [language]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api.public.blog}?language=${language}&limit=20`);
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Blog load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const content = {
    az: {
      title: 'Blog',
      subtitle: 'AI texnologiyaları və rəqəmsal transformasiya haqqında məqalələr',
      readMore: 'Oxu',
      noPosts: 'Heç bir məqalə tapılmadı',
      loading: 'Yüklənir...',
    },
    en: {
      title: 'Blog',
      subtitle: 'Articles about AI technologies and digital transformation',
      readMore: 'Read',
      noPosts: 'No articles found',
      loading: 'Loading...',
    },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'az') {
      return date.toLocaleDateString('az-AZ', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">{content[language].noPosts}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {post.category && (
                      <span className="text-sm text-purple-400 font-medium">{post.category}</span>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4 hover:text-purple-400 transition-colors">
                    <Link to={`/blog/${post.post_id}/${language}`} className="block">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {post.short_description || post.content.substring(0, 150) + '...'}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                      {(post.author_full_name || post.author_name) && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{post.author_full_name || post.author_name}</span>
                        </div>
                      )}
                    </div>
                    
                    <Link 
                      to={`/blog/${post.post_id}/${language}`}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {content[language].readMore}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
