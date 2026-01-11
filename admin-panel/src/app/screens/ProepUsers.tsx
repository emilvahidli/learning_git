import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../../components/ProepButton';
import { Input } from '../../components/ProepInput';
import { Select } from '../../components/ProepSelect';
import { apiRequest, api } from '../../config/api';

interface User {
  id: number;
  username?: string;
  full_name: string;
  email: string;
  phone_number?: string;
  company?: string;
  position?: string;
  status: string;
  can_delete: boolean;
  created_at: string;
}

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    full_name: '',
    email: '',
    phone_number: '',
    company: '',
    position: '',
    status: 'active',
    can_delete: true,
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await apiRequest(api.admin.users);
      setUsers(data.data.users);
    } catch (error) {
      console.error('Users load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ 
      username: '', 
      password: '',
      full_name: '', 
      email: '', 
      phone_number: '', 
      company: '', 
      position: '', 
      status: 'active',
      can_delete: true,
    });
    setShowModal(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username || '',
      password: '', // Şifrə boş qalır (dəyişdirmək istəsə yazacaq)
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number || '',
      company: user.company || '',
      position: user.position || '',
      status: user.status,
      can_delete: user.can_delete,
    });
    setShowModal(true);
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const submitData = {
        username: formData.username,
        password: formData.password || undefined,
        full_name: formData.full_name,
        email: formData.email,
        phone_number: formData.phone_number || undefined,
        company: formData.company || undefined,
        position: formData.position || undefined,
        status: formData.status,
        can_delete: formData.can_delete,
      };

      if (editingUser) {
        await apiRequest(`${api.admin.users}/${editingUser.id}`, {
          method: 'PUT',
          body: JSON.stringify(submitData),
        });
      } else {
        await apiRequest(api.admin.users, {
          method: 'POST',
          body: JSON.stringify(submitData),
        });
      }
      
      await loadUsers();
      setShowModal(false);
    } catch (error: any) {
      console.error('Save error:', error);
      alert(error.message || 'Xəta baş verdi');
    }
  };

      if (editingUser) {
        await apiRequest(`${api.admin.users}/${editingUser.id}`, {
          method: 'PUT',
          body: JSON.stringify(submitData),
        });
      } else {
        await apiRequest(api.admin.users, {
          method: 'POST',
          body: JSON.stringify(submitData),
        });
      }
      
      await loadUsers();
      setShowModal(false);
    } catch (error: any) {
      console.error('Save error:', error);
      alert(error.message || 'Xəta baş verdi');
    }
  };

  const handleDelete = async (id: number, canDelete: boolean) => {
    if (!canDelete) {
      alert('Bu istifadəçini silmək üçün icazə yoxdur');
      return;
    }
    
    if (!confirm('İstifadəçini silmək istədiyinizdən əminsiniz?')) return;
    
    try {
      await apiRequest(`${api.admin.users}/${id}`, { method: 'DELETE' });
      await loadUsers();
    } catch (error: any) {
      console.error('Delete error:', error);
      alert(error.message || 'Xəta baş verdi');
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="İstifadəçilər"
        description="Frontend istifadəçi idarəetməsi"
        action={
          <Button onClick={handleAdd} icon={<Plus className="w-5 h-5" />}>
            Yeni İstifadəçi
          </Button>
        }
      />

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="İstifadəçilərdə axtar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11"
          />
        </div>
      </div>

      {/* Users Table */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Ad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Şirkət</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Vəzifə</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 text-sm text-gray-300 font-mono">{user.username || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{user.full_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{user.phone_number || '-'}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.status === 'active' ? 'bg-green-500/20 text-green-300' :
                        user.status === 'blocked' ? 'bg-red-500/20 text-red-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-1.5 rounded-lg hover:bg-blue-500/10 text-blue-400 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id, user.can_delete)}
                          disabled={!user.can_delete}
                          className={`p-1.5 rounded-lg transition-colors ${
                            user.can_delete 
                              ? 'hover:bg-red-500/10 text-red-400' 
                              : 'opacity-30 cursor-not-allowed text-gray-500'
                          }`}
                          title={user.can_delete ? 'Sil' : 'Bu istifadəçini silmək icazəsi yoxdur'}
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
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingUser ? 'İstifadəçini Redaktə Et' : 'Yeni İstifadəçi'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                placeholder="username"
              />
              
              <Input
                label={editingUser ? "Yeni Şifrə (boş qalsın dəyişməmək üçün)" : "Şifrə"}
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!editingUser}
                placeholder={editingUser ? "Yalnız dəyişdirmək istəsəniz yazın" : "Şifrə"}
              />
              
              <Input
                label="Ad Soyad"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
              />
              
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              
              <Input
                label="Telefon"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                placeholder="+994501234567"
              />
              
              <Input
                label="Şirkət"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
              
              <Input
                label="Vəzifə"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                    { value: 'blocked', label: 'Blocked' },
                  ]}
                />
                
                <Select
                  label="Silinə Bilər"
                  value={formData.can_delete ? 'true' : 'false'}
                  onChange={(e) => setFormData({ ...formData, can_delete: e.target.value === 'true' })}
                  options={[
                    { value: 'true', label: 'Bəli' },
                    { value: 'false', label: 'Xeyr' },
                  ]}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit">
                  {editingUser ? 'Yenilə' : 'Yarat'}
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
