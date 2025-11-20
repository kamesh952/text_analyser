import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = "Analyzing your text..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-effect rounded-2xl flex flex-col items-center justify-center p-8 space-y-4"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full"
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 font-medium text-center"
      >
        {message}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-gray-500 text-center"
      >
        AI is extracting morals, keywords, and analyzing tone...
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;