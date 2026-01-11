import { Users, FileText, Mail, TrendingUp } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/StatCard';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for charts
const visitorsData = [
  { day: 'Mon', visitors: 1200 },
  { day: 'Tue', visitors: 1900 },
  { day: 'Wed', visitors: 1500 },
  { day: 'Thu', visitors: 2100 },
  { day: 'Fri', visitors: 2400 },
  { day: 'Sat', visitors: 1800 },
  { day: 'Sun', visitors: 1600 },
];

const blogActivityData = [
  { month: 'Jan', posts: 12 },
  { month: 'Feb', posts: 18 },
  { month: 'Mar', posts: 15 },
  { month: 'Apr', posts: 22 },
  { month: 'May', posts: 19 },
  { month: 'Jun', posts: 25 },
];

// Mock recent data
const recentUsers = [
  { id: 1, name: 'John Smith', email: 'john.smith@email.com', date: '2 hours ago' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', date: '5 hours ago' },
  { id: 3, name: 'Michael Brown', email: 'm.brown@email.com', date: '1 day ago' },
];

const recentPosts = [
  { id: 1, title: 'Getting Started with React', author: 'Admin User', date: '3 hours ago' },
  { id: 2, title: 'Modern CSS Techniques', author: 'Admin User', date: '1 day ago' },
  { id: 3, title: 'JavaScript Best Practices', author: 'Editor', date: '2 days ago' },
];

const recentMessages = [
  { id: 1, name: 'Alice Cooper', subject: 'Question about pricing', date: '1 hour ago', unread: true },
  { id: 2, name: 'Bob Wilson', subject: 'Partnership inquiry', date: '4 hours ago', unread: true },
  { id: 3, name: 'Emma Davis', subject: 'Technical support', date: '6 hours ago', unread: false },
];

export function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your website."
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value="2,543"
          icon={Users}
          trend={{ value: '+12.5%', isPositive: true }}
        />
        <StatCard
          title="Total Blog Posts"
          value="187"
          icon={FileText}
          trend={{ value: '+8.2%', isPositive: true }}
        />
        <StatCard
          title="New Messages"
          value="23"
          icon={Mail}
          trend={{ value: '+3', isPositive: true }}
        />
        <StatCard
          title="Monthly Visitors"
          value="45.2K"
          icon={TrendingUp}
          trend={{ value: '+15.3%', isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Website Visitors Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg text-gray-900 mb-4">Website Visitors (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={visitorsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="visitors" 
                stroke="#2563EB" 
                strokeWidth={3}
                dot={{ fill: '#2563EB', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Blog Activity Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg text-gray-900 mb-4">Blog Activity (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={blogActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }} 
              />
              <Bar dataKey="posts" fill="#2563EB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg text-gray-900 mb-4">Recently Added Users</h3>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] flex-shrink-0">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <span className="text-xs text-gray-400">{user.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg text-gray-900 mb-4">Recently Published Posts</h3>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <p className="text-sm text-gray-900 mb-1">{post.title}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{post.author}</p>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Messages */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg text-gray-900 mb-4">Latest Messages</h3>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex items-start gap-2 mb-1">
                  <p className="text-sm text-gray-900 flex-1">{message.subject}</p>
                  {message.unread && (
                    <span className="w-2 h-2 bg-[#2563EB] rounded-full mt-1.5"></span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{message.name}</p>
                  <span className="text-xs text-gray-400">{message.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
