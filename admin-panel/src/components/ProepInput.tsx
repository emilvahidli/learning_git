// Proep.az stilində input komponenti
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-200">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-white/5 border ${
          error ? 'border-red-500' : 'border-white/10'
        } rounded-lg focus:outline-none focus:border-purple-500 transition-colors text-white placeholder:text-gray-500 ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
