import React from 'react';
import { Wand2 } from 'lucide-react';

const toneOptions = [
  { value: 'formal', label: 'Formal', description: 'Professional and structured', color: 'bg-blue-100 text-blue-800' },
  { value: 'informal', label: 'Informal', description: 'Casual and conversational', color: 'bg-green-100 text-green-800' },
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable', color: 'bg-purple-100 text-purple-800' },
  { value: 'professional', label: 'Professional', description: 'Business-appropriate', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'casual', label: 'Casual', description: 'Relaxed and everyday', color: 'bg-orange-100 text-orange-800' },
  { value: 'complaint', label: 'Complaint', description: 'Formal dissatisfaction', color: 'bg-red-100 text-red-800' },
  { value: 'persuasive', label: 'Persuasive', description: 'Convincing and influential', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'academic', label: 'Academic', description: 'Scholarly and research-oriented', color: 'bg-gray-100 text-gray-800' },
];

const ToneSelector = ({ selectedTone, onToneChange, disabled }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Wand2 className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-800">Tone Transformation</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {toneOptions.map((tone) => (
          <button
            key={tone.value}
            onClick={() => onToneChange(tone.value)}
            disabled={disabled}
            className={`
              p-3 rounded-lg border-2 transition-all duration-200 text-left
              ${selectedTone === tone.value 
                ? 'border-purple-500 bg-purple-50 shadow-md' 
                : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-25'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
            `}
          >
            <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${tone.color}`}>
              {tone.label}
            </div>
            <p className="text-xs text-gray-600 leading-tight">{tone.description}</p>
          </button>
        ))}
      </div>
      
      {selectedTone && (
        <div className="text-sm text-purple-600 font-medium animate-fade-in">
          Selected: {toneOptions.find(t => t.value === selectedTone)?.label}
        </div>
      )}
    </div>
  );
};

export default ToneSelector;