import { useEffect, useState } from 'react';
import { Search, Eye, Reply, Archive, Trash2 } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { apiRequest, api } from '../../config/api';
import { Button } from '../../components/ProepButton';
import { Input } from '../../components/ProepInput';
import { Textarea } from '../../components/ProepTextarea';

interface Message {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  message: string;
  status: string;
  created_at: string;
  reply_message?: string;
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await apiRequest(api.admin.messages);
      setMessages(data.data.messages);
    } catch (error) {
      console.error('Messages load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (message: Message) => {
    setSelectedMessage(message);
    setReplyText('');
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    setReplyLoading(true);
    try {
      await apiRequest(`${api.admin.messages}/${selectedMessage.id}/reply`, {
        method: 'POST',
        body: JSON.stringify({ reply_message: replyText }),
      });
      
      await loadMessages();
      setSelectedMessage(null);
      setReplyText('');
    } catch (error) {
      console.error('Reply error:', error);
      alert('Cavab göndərilmədi');
    } finally {
      setReplyLoading(false);
    }
  };

  const handleArchive = async (id: number) => {
    try {
      await apiRequest(`${api.admin.messages}/${id}/archive`, { method: 'PATCH' });
      await loadMessages();
    } catch (error) {
      console.error('Archive error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Mesajı silmək istədiyinizdən əminsiniz?')) return;
    
    try {
      await apiRequest(`${api.admin.messages}/${id}`, { method: 'DELETE' });
      await loadMessages();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedMessage) {
    return (
      <div>
        <button
          onClick={() => setSelectedMessage(null)}
          className="mb-4 text-purple-400 hover:text-purple-300 flex items-center gap-2"
        >
          ← Geriyə
        </button>

        <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">{selectedMessage.name}</h2>
            <div className="text-gray-400 text-sm space-y-1">
              <p>Email: {selectedMessage.email}</p>
              <p>Telefon: {selectedMessage.phone_number}</p>
              <p>Tarix: {new Date(selectedMessage.created_at).toLocaleString('az')}</p>
              <p>Status: <span className={`px-2 py-1 rounded text-xs ${
                selectedMessage.status === 'unread' ? 'bg-yellow-500/20 text-yellow-300' :
                selectedMessage.status === 'replied' ? 'bg-green-500/20 text-green-300' :
                'bg-blue-500/20 text-blue-300'
              }`}>{selectedMessage.status}</span></p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Mesaj:</h3>
            <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
          </div>

          {selectedMessage.reply_message && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <h3 className="text-lg font-semibold text-green-300 mb-2">Cavab:</h3>
              <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.reply_message}</p>
            </div>
          )}

          {selectedMessage.status !== 'replied' && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Cavab yaz:</h3>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Cavabınızı yazın..."
                rows={6}
                className="mb-4"
              />
              <Button onClick={handleReply} isLoading={replyLoading} icon={<Reply className="w-5 h-5" />}>
                Cavab Göndər
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Mesajlar"
        description="Contact form mesajları"
      />

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Mesajlarda axtar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11"
          />
        </div>
      </div>

      {/* Messages Table */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Mesaj</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Tarix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMessages.map((message) => (
                  <tr key={message.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 text-sm text-gray-300">{message.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{message.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {message.message.substring(0, 50)}...
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        message.status === 'unread' ? 'bg-yellow-500/20 text-yellow-300' :
                        message.status === 'replied' ? 'bg-green-500/20 text-green-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {message.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(message.created_at).toLocaleDateString('az')}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(message)}
                          className="p-1.5 rounded-lg hover:bg-blue-500/10 text-blue-400 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleArchive(message.id)}
                          className="p-1.5 rounded-lg hover:bg-purple-500/10 text-purple-400 transition-colors"
                        >
                          <Archive size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(message.id)}
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
    </div>
  );
}
