// Proep.az stilində textarea komponenti
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-200">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 bg-white/5 border ${
          error ? 'border-red-500' : 'border-white/10'
        } rounded-lg focus:outline-none focus:border-purple-500 transition-colors text-white placeholder:text-gray-500 resize-none ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
