import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Upload } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: string;
  status: 'Draft' | 'Published';
  publishDate: string;
  views: number;
  category: string;
}

// Mock data
const mockPosts: BlogPost[] = [
  { id: 1, title: 'Getting Started with React', slug: 'getting-started-with-react', author: 'Admin User', status: 'Published', publishDate: '2024-01-15', views: 1234, category: 'Development' },
  { id: 2, title: 'Modern CSS Techniques', slug: 'modern-css-techniques', author: 'Admin User', status: 'Published', publishDate: '2024-02-20', views: 892, category: 'Design' },
  { id: 3, title: 'JavaScript Best Practices', slug: 'javascript-best-practices', author: 'Editor', status: 'Published', publishDate: '2024-03-10', views: 1567, category: 'Development' },
  { id: 4, title: 'UI/UX Design Principles', slug: 'ui-ux-design-principles', author: 'Editor', status: 'Draft', publishDate: '2024-04-05', views: 0, category: 'Design' },
  { id: 5, title: 'Building Scalable Applications', slug: 'building-scalable-applications', author: 'Admin User', status: 'Draft', publishDate: '2024-05-12', views: 0, category: 'Development' },
];

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Development',
    shortDescription: '',
    content: '',
    coverImage: '',
    seoTitle: '',
    seoDescription: '',
    status: 'Draft',
  });

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleAddPost = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Development',
      shortDescription: '',
      content: '',
      coverImage: '',
      seoTitle: '',
      seoDescription: '',
      status: 'Draft',
    });
    setIsModalOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      category: post.category,
      shortDescription: '',
      content: '',
      coverImage: '',
      seoTitle: '',
      seoDescription: '',
      status: post.status,
    });
    setIsModalOpen(true);
  };

  const handleDeletePost = (id: number) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      // Update existing post
      setPosts(posts.map(p => 
        p.id === editingPost.id 
          ? { 
              ...p, 
              title: formData.title,
              slug: formData.slug,
              category: formData.category,
              status: formData.status as 'Draft' | 'Published'
            }
          : p
      ));
    } else {
      // Add new post
      const newPost: BlogPost = {
        id: Math.max(...posts.map(p => p.id)) + 1,
        title: formData.title,
        slug: formData.slug,
        author: 'Admin User',
        status: formData.status as 'Draft' | 'Published',
        publishDate: new Date().toISOString().split('T')[0],
        views: 0,
        category: formData.category,
      };
      setPosts([...posts, newPost]);
    }
    
    setIsModalOpen(false);
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'title', label: 'Title', render: (value: string) => (
      <div className="max-w-xs truncate">{value}</div>
    )},
    { key: 'author', label: 'Author' },
    { key: 'status', label: 'Status', render: (value: string) => (
      <span className={`px-3 py-1 rounded-full text-xs ${
        value === 'Published' 
          ? 'bg-green-100 text-green-700' 
          : 'bg-yellow-100 text-yellow-700'
      }`}>
        {value}
      </span>
    )},
    { key: 'publishDate', label: 'Publish Date' },
    { key: 'views', label: 'Views', render: (value: number) => value.toLocaleString() },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (_: any, post: BlogPost) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditPost(post)}
            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => alert('Preview functionality')}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleDeletePost(post.id)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    },
  ];

  return (
    <div>
      <PageHeader
        title="Blog Management"
        description="Create and manage your blog posts"
        action={
          <Button onClick={handleAddPost} icon={Plus}>
            Add Blog Post
          </Button>
        }
      />

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search posts by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
          />
        </div>
      </div>

      {/* Blog Posts Table */}
      <Table
        columns={columns}
        data={filteredPosts}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredPosts.length / 10)}
        onPageChange={setCurrentPage}
      />

      {/* Add/Edit Post Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            placeholder="Enter post title"
            value={formData.title}
            onChange={(e) => {
              setFormData({ 
                ...formData, 
                title: e.target.value,
                slug: generateSlug(e.target.value)
              });
            }}
            required
          />
          
          <Input
            label="Slug"
            placeholder="auto-generated-slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />

          {/* Cover Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-700">
              Cover Image <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#2563EB] transition-colors cursor-pointer">
              <Upload className="mx-auto mb-2 text-gray-400" size={32} />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>
          
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={[
              { value: 'Development', label: 'Development' },
              { value: 'Design', label: 'Design' },
              { value: 'Business', label: 'Business' },
              { value: 'Technology', label: 'Technology' },
            ]}
            required
          />
          
          <Textarea
            label="Short Description"
            placeholder="Brief description of the post..."
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            rows={3}
            required
          />

          <Textarea
            label="Content"
            placeholder="Write your blog post content here..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={10}
            required
          />

          {/* SEO Section */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm text-gray-900 mb-4">SEO Settings</h3>
            
            <div className="space-y-4">
              <Input
                label="SEO Title"
                placeholder="Title for search engines"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              />
              
              <Textarea
                label="SEO Description"
                placeholder="Description for search engines..."
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: 'Draft', label: 'Draft' },
              { value: 'Published', label: 'Published' },
            ]}
            required
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary">
              {editingPost ? 'Update Post' : 'Create Post'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
