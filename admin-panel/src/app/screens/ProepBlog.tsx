import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, Eye, CheckCircle } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../../components/ProepButton';
import { Input } from '../../components/ProepInput';
import { Select } from '../../components/ProepSelect';
import { Textarea } from '../../components/ProepTextarea';
import { apiRequest, api } from '../../config/api';

interface BlogPost {
  id: number;
  post_id: string;
  title: string;
  slug: string;
  short_description?: string;
  content: string;
  status: string;
  language: string;
  category?: string;
  views: number;
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    content: '',
    category: '',
    status: 'draft',
    language: 'az',
    seo_title: '',
    seo_description: '',
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await apiRequest(api.admin.blog);
      setPosts(data.data.posts);
    } catch (error) {
      console.error('Posts load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      short_description: '',
      content: '',
      category: '',
      status: 'draft',
      language: 'az',
      seo_title: '',
      seo_description: '',
    });
    setShowModal(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      short_description: post.short_description || '',
      content: post.content,
      category: post.category || '',
      status: post.status,
      language: post.language,
      seo_title: '',
      seo_description: '',
    });
    setShowModal(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingPost) {
        await apiRequest(`${api.admin.blog}/${editingPost.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiRequest(api.admin.blog, {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      
      await loadPosts();
      setShowModal(false);
    } catch (error: any) {
      console.error('Save error:', error);
      alert(error.message || 'Xəta baş verdi');
    }
  };

  const handlePublish = async (id: number) => {
    try {
      await apiRequest(`${api.admin.blog}/${id}/publish`, { method: 'PATCH' });
      await loadPosts();
    } catch (error) {
      console.error('Publish error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Postu silmək istədiyinizdən əminsiniz?')) return;
    
    try {
      await apiRequest(`${api.admin.blog}/${id}`, { method: 'DELETE' });
      await loadPosts();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Blog yazılarının idarəetməsi"
        action={
          <Button onClick={handleAdd} icon={<Plus className="w-5 h-5" />}>
            Yeni Post
          </Button>
        }
      />

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Postlarda axtar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11"
          />
        </div>
      </div>

      {/* Posts Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Başlıq</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Dil</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Baxış</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 text-sm text-gray-300 font-mono">{post.post_id || post.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{post.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-400 font-mono text-xs">{post.slug}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        post.status === 'published' ? 'bg-green-500/20 text-green-300' :
                        post.status === 'archived' ? 'bg-gray-500/20 text-gray-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400 uppercase">{post.language}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{post.views || 0}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePublish(post.id)}
                          className="p-1.5 rounded-lg hover:bg-green-500/10 text-green-400 transition-colors"
                          title="Publish"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-1.5 rounded-lg hover:bg-blue-500/10 text-blue-400 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingPost ? 'Postu Redaktə Et' : 'Yeni Post'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Başlıq"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
                <Input
                  label="Slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
              </div>

              <Textarea
                label="Qısa Təsvir"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                rows={3}
              />

              <Textarea
                label="Məzmun"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                required
              />

              <div className="grid grid-cols-3 gap-4">
                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  options={[
                    { value: 'draft', label: 'Draft' },
                    { value: 'published', label: 'Published' },
                    { value: 'archived', label: 'Archived' },
                  ]}
                />
                <Select
                  label="Dil"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  options={[
                    { value: 'az', label: 'Azərbaycan' },
                    { value: 'en', label: 'English' },
                  ]}
                />
                <Input
                  label="Kateqoriya"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit">
                  {editingPost ? 'Yenilə' : 'Yarat'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                  Ləğv et
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
