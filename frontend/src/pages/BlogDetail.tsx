import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, User, ArrowLeft } from 'lucide-react';
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

export function BlogDetail() {
  const { postId, lang } = useParams<{ postId: string; lang: string }>();
  const { language, setLanguage } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lang && (lang === 'az' || lang === 'en')) {
      setLanguage(lang);
    }
  }, [lang, setLanguage]);

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${api.public.blog}/${postId}`);
      const data = await response.json();
      
      if (data.success) {
        setPost(data.data);
      } else {
        setError(data.message || 'Post tapılmadı');
      }
    } catch (error) {
      console.error('Blog post load error:', error);
      setError('Xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return language === 'az' ? 'Tarix yoxdur' : 'No date';
    const date = new Date(dateString);
    if (language === 'az') {
      return date.toLocaleDateString('az-AZ', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white pt-24">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">{language === 'az' ? 'Xəta' : 'Error'}</h1>
          <p className="text-gray-400 mb-8">{error || (language === 'az' ? 'Post tapılmadı' : 'Post not found')}</p>
          <Link
            to={`/blog/${language}`}
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {language === 'az' ? 'Blog səhifəsinə qayıt' : 'Back to Blog'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24">
      {/* Header */}
      <section className="py-20 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <Link
            to={`/blog/${language}`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            {language === 'az' ? 'Blog-a qayıt' : 'Back to Blog'}
          </Link>

          {post.category && (
            <div className="mb-4">
              <span className="text-sm text-purple-400 font-medium">{post.category}</span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(post.published_at)}</span>
            </div>
            {(post.author_full_name || post.author_name) && (
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author_full_name || post.author_name}</span>
              </div>
            )}
            <div className="text-sm">
              {post.views || 0} {language === 'az' ? 'baxış' : 'views'}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <article className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <div 
            className="text-gray-300 leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />
        </article>
      </section>
    </div>
  );
}
