import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Star, Github, Upload, FileText, X, BookOpen, Settings, Sparkles, Target, Clock, Shield } from 'lucide-react';
import { useTextAnalysis } from './hooks/useTextAnalysis';
import TextInput from './components/TextInput';
import ToneSelector from './components/ToneSelector';
import ResultDisplay from './components/ResultDisplay';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [text, setText] = useState('');
  const [selectedTone, setSelectedTone] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const fileInputRef = useRef(null);
  const { loading, error, result, analyzeText, reset } = useTextAnalysis();

  const handleAnalyze = async () => {
    if (!text.trim() && !uploadedFile) {
      alert('Please enter some text or upload a document to analyze');
      return;
    }

    const content = uploadedFile ? await readFileContent(uploadedFile) : text;
    await analyzeText(content, selectedTone);
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      
      if (file.type === 'application/pdf') {
        reader.readAsText(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  const handleFileUpload = (file) => {
    if (file) {
      const allowedTypes = [
        'text/plain',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid text file (TXT, PDF, DOC, DOCX)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setUploadedFile(file);
      setText('');
      setActiveTab('file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setActiveTab('text');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    setText('');
    setSelectedTone(null);
    setUploadedFile(null);
    setActiveTab('text');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    reset();
  };

  const handleCopyNotification = (section) => {
    console.log(`Copied ${section} to clipboard`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-poppins">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Text Analyzer AI
                </h1>
                <p className="text-gray-600 text-sm">
                  Smart text analysis made simple
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>AI Powered</span>
              </div>
              <a
                href="https://github.com"
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-100"
                title="View on GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Input Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Input Card */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/60"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Analyze Your Text</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Fast Results</span>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                  <button
                    onClick={() => setActiveTab('text')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex-1 ${
                      activeTab === 'text'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Write Text
                  </button>
                  <button
                    onClick={() => setActiveTab('file')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex-1 ${
                      activeTab === 'file'
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    Upload File
                  </button>
                </div>

                {/* Text Input */}
                {activeTab === 'text' && (
                  <div className="space-y-4">
                    <TextInput
                      value={text}
                      onChange={setText}
                      placeholder="Paste your text here... Stories, articles, emails, or any content you want to analyze. Our AI will extract key insights and help transform your writing."
                    />
                  </div>
                )}

                {/* File Upload */}
                {activeTab === 'file' && (
                  <div className="space-y-4">
                    <div
                      className={`border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-all duration-200 ${
                        isDragging ? 'border-blue-400 bg-blue-50' : 
                        uploadedFile ? 'border-green-400 bg-green-50' : 
                        'hover:border-gray-400'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {uploadedFile ? (
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                          <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-green-600" />
                            <div className="text-left">
                              <p className="font-medium text-gray-800">
                                {uploadedFile.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={removeFile}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600 mb-2 font-medium">
                            Drag and drop your file here
                          </p>
                          <p className="text-sm text-gray-500 mb-4">
                            Supports TXT, PDF, DOC, DOCX files (max 5MB)
                          </p>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 mx-auto"
                          >
                            <Upload className="w-4 h-4" />
                            Choose File
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept=".txt,.pdf,.doc,.docx"
                            onChange={handleFileInputChange}
                          />
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Tone Selector */}
                <div className="mt-6">
                  <ToneSelector
                    selectedTone={selectedTone}
                    onToneChange={setSelectedTone}
                    disabled={loading}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleAnalyze}
                    disabled={loading || (!text.trim() && !uploadedFile)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 flex-1"
                  >
                    <Zap className="w-5 h-5" />
                    {loading ? 'Analyzing...' : 'Analyze Text'}
                  </button>
                  
                  <button
                    onClick={handleReset}
                    disabled={loading}
                    className="bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-gray-50"
                  >
                    <Settings className="w-5 h-5" />
                    Reset
                  </button>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
                  >
                    <div className="flex items-center gap-2">
                      <X className="w-5 h-5" />
                      <strong>Error:</strong> {error}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Features Card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/60"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-600" />
                  What You Get
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Moral Extraction</h4>
                      <p className="text-sm text-gray-600">Find the core message and lessons</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Keyword Analysis</h4>
                      <p className="text-sm text-gray-600">Identify key phrases and concepts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Tone Transformation</h4>
                      <p className="text-sm text-gray-600">Change writing style instantly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Smart Insights</h4>
                      <p className="text-sm text-gray-600">Deep analysis and suggestions</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Results & Info */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {loading && <LoadingSpinner />}
                
                {result && !loading && (
                  <ResultDisplay 
                    result={result} 
                    onCopy={handleCopyNotification}
                  />
                )}
                
                {!result && !loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/60 h-full"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-8 h-8 text-gray-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Ready to Analyze
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Enter your text or upload a document to get powerful AI insights in seconds.
                      </p>
                      
                      <div className="space-y-3 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Perfect for all text types</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Fast and accurate results</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Multiple tone options</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span>Easy to use</span>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-2">Try These Examples:</h4>
                        <ul className="text-sm text-gray-600 space-y-1 text-left">
                          <li>• A short story or fable</li>
                          <li>• Business email draft</li>
                          <li>• Article or blog post</li>
                          <li>• Academic paragraph</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick Tips Card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-blue-50 rounded-2xl p-6 border border-blue-200"
              >
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Pro Tip
                </h4>
                <p className="text-blue-700 text-sm">
                  For best results, provide clear and complete text. The AI works better with context-rich content.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-white/80 backdrop-blur-lg border-t border-gray-200/60 mt-12"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-gray-600">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 md:mb-0 text-center sm:text-left">
              <span className="font-medium text-gray-700">© 2024 Text Analyzer AI</span>
              <span className="hidden md:inline text-gray-400">•</span>
              <span>Built with modern web technologies</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-blue-700">
                <Zap className="w-4 h-4" />
                <span className="font-medium">AI Powered</span>
              </span>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;