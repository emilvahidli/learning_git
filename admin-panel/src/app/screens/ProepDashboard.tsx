import { useEffect, useState } from 'react';
import { Users, FileText, Mail, TrendingUp } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/StatCard';
import { apiRequest, api } from '../../config/api';

export function Dashboard() {
  const [stats, setStats] = useState({
    messages: { total: 0, unread: 0 },
    users: { total: 0, active: 0 },
    blog: { total: 0, published: 0 },
    portfolio: { total: 0, published: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [messagesData, usersData, blogData, portfolioData] = await Promise.all([
        apiRequest(api.admin.messages),
        apiRequest(api.admin.users),
        apiRequest(api.admin.blog),
        apiRequest(api.admin.portfolio),
      ]);

      setStats({
        messages: messagesData.data.stats,
        users: usersData.data.stats,
        blog: blogData.data.stats,
        portfolio: portfolioData.data.stats,
      });
    } catch (error) {
      console.error('Stats load error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Admin panelinizə xoş gəlmisiniz"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Mesajlar"
          value={stats.messages.total.toString()}
          icon={Mail}
          trend={{ value: `${stats.messages.unread} oxunmamış`, isPositive: true }}
        />
        <StatCard
          title="İstifadəçilər"
          value={stats.users.total.toString()}
          icon={Users}
          trend={{ value: `${stats.users.active} aktiv`, isPositive: true }}
        />
        <StatCard
          title="Blog Posts"
          value={stats.blog.total.toString()}
          icon={FileText}
          trend={{ value: `${stats.blog.published} dərc edilib`, isPositive: true }}
        />
        <StatCard
          title="Portfolio"
          value={stats.portfolio.total.toString()}
          icon={TrendingUp}
          trend={{ value: `${stats.portfolio.published} dərc edilib`, isPositive: true }}
        />
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Son Statistikalar</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Ümumi baxış sayı (Blog)</span>
              <span className="text-white font-medium">{stats.blog.total_views || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Aktiv istifadəçilər</span>
              <span className="text-white font-medium">{stats.users.active}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Bu ay yeni istifadəçi</span>
              <span className="text-white font-medium">{stats.users.new_this_month || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Tez Keçidlər</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
              → Yeni mesajlar: {stats.messages.unread}
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
              → Draft posts: {stats.blog.draft || 0}
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
              → Qeyri-aktiv istifadəçilər: {stats.users.inactive || 0}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
