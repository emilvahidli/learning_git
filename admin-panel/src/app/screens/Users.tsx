import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Switch } from '../components/Switch';

interface User {
  id: number;
  fullName: string;
  email: string;
  role: 'Admin' | 'Editor';
  status: 'Active' | 'Inactive';
  createdDate: string;
}

// Mock data
const mockUsers: User[] = [
  { id: 1, fullName: 'John Smith', email: 'john.smith@email.com', role: 'Admin', status: 'Active', createdDate: '2024-01-15' },
  { id: 2, fullName: 'Sarah Johnson', email: 'sarah.j@email.com', role: 'Editor', status: 'Active', createdDate: '2024-02-20' },
  { id: 3, fullName: 'Michael Brown', email: 'm.brown@email.com', role: 'Editor', status: 'Active', createdDate: '2024-03-10' },
  { id: 4, fullName: 'Emily Davis', email: 'emily.d@email.com', role: 'Editor', status: 'Inactive', createdDate: '2024-04-05' },
  { id: 5, fullName: 'David Wilson', email: 'david.w@email.com', role: 'Admin', status: 'Active', createdDate: '2024-05-12' },
];

export function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Editor',
    status: true,
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({ fullName: '', email: '', password: '', role: 'Editor', status: true });
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      password: '',
      role: user.role,
      status: user.status === 'Active',
    });
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      // Update existing user
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { 
              ...u, 
              fullName: formData.fullName, 
              email: formData.email, 
              role: formData.role as 'Admin' | 'Editor',
              status: formData.status ? 'Active' : 'Inactive'
            }
          : u
      ));
    } else {
      // Add new user
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role as 'Admin' | 'Editor',
        status: formData.status ? 'Active' : 'Inactive',
        createdDate: new Date().toISOString().split('T')[0],
      };
      setUsers([...users, newUser]);
    }
    
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: (value: string) => (
      <span className={`px-3 py-1 rounded-full text-xs ${
        value === 'Admin' 
          ? 'bg-purple-100 text-purple-700' 
          : 'bg-blue-100 text-blue-700'
      }`}>
        {value}
      </span>
    )},
    { key: 'status', label: 'Status', render: (value: string) => (
      <span className={`px-3 py-1 rounded-full text-xs ${
        value === 'Active' 
          ? 'bg-green-100 text-green-700' 
          : 'bg-gray-100 text-gray-700'
      }`}>
        {value}
      </span>
    )},
    { key: 'createdDate', label: 'Created Date' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (_: any, user: User) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditUser(user)}
            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDeleteUser(user.id)}
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
        title="Users Management"
        description="Manage your website users and their permissions"
        action={
          <Button onClick={handleAddUser} icon={Plus}>
            Add User
          </Button>
        }
      />

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
          />
        </div>
      </div>

      {/* Users Table */}
      <Table
        columns={columns}
        data={filteredUsers}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredUsers.length / 10)}
        onPageChange={setCurrentPage}
      />

      {/* Add/Edit User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Add New User'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Smith"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
          
          <Input
            label="Email"
            type="email"
            placeholder="john.smith@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          
          <Input
            label="Password"
            type="password"
            placeholder={editingUser ? 'Leave empty to keep current password' : 'Enter password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required={!editingUser}
          />
          
          <Select
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            options={[
              { value: 'Editor', label: 'Editor' },
              { value: 'Admin', label: 'Admin' },
            ]}
            required
          />
          
          <Switch
            label="Active Status"
            checked={formData.status}
            onChange={(checked) => setFormData({ ...formData, status: checked })}
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary">
              {editingUser ? 'Update User' : 'Add User'}
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
