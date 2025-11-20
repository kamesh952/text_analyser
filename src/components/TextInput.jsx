import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';

const TextInput = ({ value, onChange, placeholder, maxLength = 10000 }) => {
  const charCount = value.length;
  const isNearLimit = charCount > maxLength * 0.9;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <FileText className="w-5 h-5 text-blue-600" />
          Input Text
        </label>
        <div className={`text-sm ${isNearLimit ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
          {charCount} / {maxLength}
        </div>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={8}
          className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 glass-effect"
        />
        
        {isNearLimit && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Near limit</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;