import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Key, 
  MessageSquare, 
  Copy, 
  CheckCircle,
  TrendingUp 
} from 'lucide-react';

const ResultDisplay = ({ result, onCopy }) => {
  const [copiedSection, setCopiedSection] = React.useState(null);

  const handleCopy = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    onCopy?.(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (!result) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 animate-slide-up"
    >
      {/* Moral Section */}
      <motion.div variants={itemVariants} className="glass-effect rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-800">Moral of the Story</h3>
          </div>
          <button
            onClick={() => handleCopy(result.moral, 'moral')}
            className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            {copiedSection === 'moral' ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            Copy
          </button>
        </div>
        <p className="text-gray-700 leading-relaxed bg-yellow-50 rounded-lg p-4 border border-yellow-100">
          {result.moral}
        </p>
      </motion.div>

      {/* Keywords Section */}
      <motion.div variants={itemVariants} className="glass-effect rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Key Phrases</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingUp className="w-4 h-4" />
            {result.keywords.length} extracted
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {result.keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200"
            >
              {keyword}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Tone Analysis */}
      <motion.div variants={itemVariants} className="glass-effect rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">Tone Analysis</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-600">Original Tone</div>
            <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg font-medium capitalize">
              {result.original_tone}
            </div>
            <div className="text-xs text-gray-500">
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </div>
          </div>
          {result.target_tone && (
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Target Tone</div>
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium capitalize">
                {result.target_tone}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Transformed Text */}
      {result.transformed_text && (
        <motion.div variants={itemVariants} className="glass-effect rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Transformed Text</h3>
            </div>
            <button
              onClick={() => handleCopy(result.transformed_text, 'transformed')}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              {copiedSection === 'transformed' ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              Copy All
            </button>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {result.transformed_text}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResultDisplay;