import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, CheckCircle } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../../components/ProepButton';
import { Input } from '../../components/ProepInput';
import { Select } from '../../components/ProepSelect';
import { Textarea } from '../../components/ProepTextarea';
import { apiRequest, api } from '../../config/api';

interface Project {
  id: number;
  title_az: string;
  title_en: string;
  slug: string;
  short_description_az?: string;
  short_description_en?: string;
  detailed_description_az?: string;
  detailed_description_en?: string;
  status: string;
  project_url?: string;
  technologies?: string[];
  features_az?: string[];
  features_en?: string[];
}

export function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title_az: '',
    title_en: '',
    slug: '',
    short_description_az: '',
    short_description_en: '',
    detailed_description_az: '',
    detailed_description_en: '',
    project_url: '',
    status: 'draft',
    technologies: [] as string[],
    features_az: [] as string[],
    features_en: [] as string[],
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await apiRequest(api.admin.portfolio);
      setProjects(data.data.projects);
    } catch (error) {
      console.error('Projects load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingProject(null);
    setFormData({
      title_az: '',
      title_en: '',
      slug: '',
      short_description_az: '',
      short_description_en: '',
      detailed_description_az: '',
      detailed_description_en: '',
      project_url: '',
      status: 'draft',
      technologies: [],
      features_az: [],
      features_en: [],
    });
    setShowModal(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title_az: project.title_az,
      title_en: project.title_en,
      slug: project.slug,
      short_description_az: project.short_description_az || '',
      short_description_en: project.short_description_en || '',
      detailed_description_az: project.detailed_description_az || '',
      detailed_description_en: project.detailed_description_en || '',
      project_url: project.project_url || '',
      status: project.status,
      technologies: project.technologies || [],
      features_az: project.features_az || [],
      features_en: project.features_en || [],
    });
    setShowModal(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProject) {
        await apiRequest(`${api.admin.portfolio}/${editingProject.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiRequest(api.admin.portfolio, {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      
      await loadProjects();
      setShowModal(false);
    } catch (error: any) {
      console.error('Save error:', error);
      alert(error.message || 'Xəta baş verdi');
    }
  };

  const handlePublish = async (id: number) => {
    try {
      await apiRequest(`${api.admin.portfolio}/${id}/publish`, { method: 'PATCH' });
      await loadProjects();
    } catch (error) {
      console.error('Publish error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Layihəni silmək istədiyinizdən əminsiniz?')) return;
    
    try {
      await apiRequest(`${api.admin.portfolio}/${id}`, { method: 'DELETE' });
      await loadProjects();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title_az.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.title_en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Portfolio"
        description="Portfolio layihələrinin idarəetməsi"
        action={
          <Button onClick={handleAdd} icon={<Plus className="w-5 h-5" />}>
            Yeni Layihə
          </Button>
        }
      />

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Layihələrdə axtar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11"
          />
        </div>
      </div>

      {/* Projects Table */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Başlıq (AZ)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Başlıq (EN)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 text-sm text-gray-300">{project.title_az}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{project.title_en}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                        {project.project_url ? 'Link' : '-'}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        project.status === 'published' ? 'bg-green-500/20 text-green-300' :
                        project.status === 'archived' ? 'bg-gray-500/20 text-gray-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePublish(project.id)}
                          className="p-1.5 rounded-lg hover:bg-green-500/10 text-green-400 transition-colors"
                          title="Publish"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-1.5 rounded-lg hover:bg-blue-500/10 text-blue-400 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
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
              {editingProject ? 'Layihəni Redaktə Et' : 'Yeni Layihə'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Başlıq (AZ)"
                  value={formData.title_az}
                  onChange={(e) => {
                    setFormData({ 
                      ...formData, 
                      title_az: e.target.value,
                      slug: generateSlug(e.target.value)
                    });
                  }}
                  required
                />
                <Input
                  label="Başlıq (EN)"
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  required
                />
              </div>

              <Input
                label="Slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Textarea
                  label="Qısa Təsvir (AZ)"
                  value={formData.short_description_az}
                  onChange={(e) => setFormData({ ...formData, short_description_az: e.target.value })}
                  rows={3}
                  required
                />
                <Textarea
                  label="Qısa Təsvir (EN)"
                  value={formData.short_description_en}
                  onChange={(e) => setFormData({ ...formData, short_description_en: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <Input
                label="Layihə URL"
                value={formData.project_url}
                onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                type="url"
              />

              <Textarea
                label="Texnologiyalar (hər biri yeni sətirdə)"
                value={formData.technologies.join('\n')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  technologies: e.target.value.split('\n').filter(t => t.trim()) 
                })}
                rows={4}
                placeholder="React&#10;Node.js&#10;PostgreSQL"
              />

              <div className="grid grid-cols-2 gap-4">
                <Textarea
                  label="Xüsusiyyətlər (AZ) - hər biri yeni sətirdə"
                  value={formData.features_az.join('\n')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    features_az: e.target.value.split('\n').filter(f => f.trim()) 
                  })}
                  rows={5}
                  placeholder="Responsive dizayn&#10;Real-time updates&#10;API inteqrasiyası"
                />
                <Textarea
                  label="Xüsusiyyətlər (EN) - hər biri yeni sətirdə"
                  value={formData.features_en.join('\n')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    features_en: e.target.value.split('\n').filter(f => f.trim()) 
                  })}
                  rows={5}
                  placeholder="Responsive design&#10;Real-time updates&#10;API integration"
                />
              </div>

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

              <div className="flex gap-3 pt-4">
                <Button type="submit">
                  {editingProject ? 'Yenilə' : 'Yarat'}
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
