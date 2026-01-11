import { useState } from 'react';
import { Search, ArrowLeft, Reply } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { Table } from '../components/Table';

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  content: string;
  date: string;
  status: 'Read' | 'Unread';
}

// Mock data
const mockMessages: Message[] = [
  { 
    id: 1, 
    name: 'Alice Cooper', 
    email: 'alice.cooper@email.com',
    subject: 'Question about pricing', 
    content: 'Hello, I would like to know more about your pricing plans and whether you offer any discounts for annual subscriptions. I am particularly interested in the enterprise plan. Could you provide more details about what\'s included?',
    date: '2026-01-11 10:30', 
    status: 'Unread' 
  },
  { 
    id: 2, 
    name: 'Bob Wilson', 
    email: 'bob.wilson@company.com',
    subject: 'Partnership inquiry', 
    content: 'We are interested in exploring potential partnership opportunities with your company. We believe there could be significant synergies between our organizations. Would it be possible to schedule a call to discuss this further?',
    date: '2026-01-11 08:15', 
    status: 'Unread' 
  },
  { 
    id: 3, 
    name: 'Emma Davis', 
    email: 'emma.davis@email.com',
    subject: 'Technical support', 
    content: 'I am experiencing some issues with the login functionality on your website. When I try to log in with my credentials, I get an error message. Could you please help me resolve this issue?',
    date: '2026-01-11 06:45', 
    status: 'Read' 
  },
  { 
    id: 4, 
    name: 'James Taylor', 
    email: 'james.t@email.com',
    subject: 'Feature request', 
    content: 'I love your product! I have a feature request that I think would be valuable for many users. It would be great if you could add a dark mode option to the interface. This would make it easier to use the application in low-light conditions.',
    date: '2026-01-10 18:20', 
    status: 'Read' 
  },
  { 
    id: 5, 
    name: 'Sophia Martinez', 
    email: 'sophia.m@email.com',
    subject: 'Account verification issue', 
    content: 'I registered for an account yesterday but have not received the verification email yet. I have checked my spam folder and it is not there either. Can you please resend the verification email or help me verify my account manually?',
    date: '2026-01-10 14:50', 
    status: 'Unread' 
  },
];

export function Messages() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    // Mark as read
    setMessages(messages.map(m => 
      m.id === message.id ? { ...m, status: 'Read' as const } : m
    ));
  };

  const handleBackToList = () => {
    setSelectedMessage(null);
  };

  const handleReply = () => {
    if (selectedMessage) {
      alert(`Reply to: ${selectedMessage.email}`);
    }
  };

  const filteredMessages = messages.filter(message => 
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If viewing a message detail
  if (selectedMessage) {
    return (
      <div>
        <div className="mb-6">
          <Button variant="ghost" icon={ArrowLeft} onClick={handleBackToList}>
            Back to Messages
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Message Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl text-gray-900 mb-4">{selectedMessage.subject}</h2>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
                  {selectedMessage.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm text-gray-900">{selectedMessage.name}</p>
                  <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{selectedMessage.date}</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs ${
                  selectedMessage.status === 'Unread' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {selectedMessage.status}
                </span>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="p-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.content}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <Button variant="primary" icon={Reply} onClick={handleReply}>
              Reply
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Message list view
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'subject', label: 'Subject', render: (value: string, message: Message) => (
      <div className="flex items-center gap-2">
        {message.status === 'Unread' && (
          <span className="w-2 h-2 bg-[#2563EB] rounded-full"></span>
        )}
        <span className={message.status === 'Unread' ? 'font-medium' : ''}>{value}</span>
      </div>
    )},
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: (value: string) => (
      <span className={`px-3 py-1 rounded-full text-xs ${
        value === 'Unread' 
          ? 'bg-blue-100 text-blue-700' 
          : 'bg-gray-100 text-gray-700'
      }`}>
        {value}
      </span>
    )},
    { 
      key: 'actions', 
      label: 'Actions',
      render: (_: any, message: Message) => (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => handleViewMessage(message)}
        >
          View
        </Button>
      )
    },
  ];

  const unreadCount = messages.filter(m => m.status === 'Unread').length;

  return (
    <div>
      <PageHeader
        title="Messages"
        description={`You have ${unreadCount} unread message${unreadCount !== 1 ? 's' : ''}`}
      />

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
          />
        </div>
      </div>

      {/* Messages Table */}
      <Table
        columns={columns}
        data={filteredMessages}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredMessages.length / 10)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
