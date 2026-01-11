import { motion } from 'motion/react';
import { Sparkles, Split, Moon, Minimize2, ArrowRight } from 'lucide-react';

interface LoginDemoProps {
  onSelectLogin: (type: string) => void;
}

export function LoginDemo({ onSelectLogin }: LoginDemoProps) {
  const loginStyles = [
    {
      id: 'glassmorphism',
      title: 'Glassmorphism',
      subtitle: 'Premium look',
      description: 'Frosted glass effect with floating animations and soft gradients',
      icon: Sparkles,
      gradient: 'from-blue-500 to-purple-500',
      preview: 'bg-gradient-to-br from-blue-100 to-purple-100',
    },
    {
      id: 'split',
      title: 'Split Screen',
      subtitle: 'Corporate style',
      description: 'Professional layout with illustration side and clean form card',
      icon: Split,
      gradient: 'from-blue-600 to-blue-500',
      preview: 'bg-gradient-to-br from-blue-50 to-white',
    },
    {
      id: 'dark',
      title: 'Dark Mode',
      subtitle: 'Developer vibe',
      description: 'Modern dark theme with neon glow effects and tech aesthetics',
      icon: Moon,
      gradient: 'from-slate-700 to-slate-900',
      preview: 'bg-gradient-to-br from-slate-800 to-slate-950',
    },
    {
      id: 'minimal',
      title: 'Minimal',
      subtitle: 'Apple style',
      description: 'Clean and simple with smooth micro-interactions and animations',
      icon: Minimize2,
      gradient: 'from-gray-600 to-gray-800',
      preview: 'bg-gradient-to-br from-gray-50 to-white',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            proep.az Login Screens
          </h1>
          <p className="text-lg text-gray-600">
            Choose your preferred login style for the admin panel
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {loginStyles.map((style, index) => {
            const Icon = style.icon;
            
            return (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group cursor-pointer"
                onClick={() => onSelectLogin(style.id)}
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                  {/* Preview Area */}
                  <div className={`h-40 ${style.preview} relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 bg-gradient-to-br ${style.gradient} rounded-2xl shadow-lg flex items-center justify-center`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {style.title}
                        </h3>
                        <p className="text-sm text-blue-600 font-medium">
                          {style.subtitle}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {style.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center"
        >
          <p className="text-blue-900 text-sm">
            <strong>Note:</strong> All login screens use demo credentials: <code className="bg-blue-100 px-2 py-1 rounded font-mono text-xs">admin / admin</code>
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => onSelectLogin('dashboard')}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            ← Back to Dashboard
          </button>
        </motion.div>
      </div>
    </div>
  );
}
