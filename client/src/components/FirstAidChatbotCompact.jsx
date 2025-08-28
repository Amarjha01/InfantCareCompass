import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  AlertTriangle, 
  Baby, 
  Loader2,
  Shield,
  Phone,
  Info,
  Heart,
  Sparkles,
  Zap,
  Clock,
  CheckCircle,
  X
} from "lucide-react";

const FirstAidChatbotCompact = () => {
  const [formData, setFormData] = useState({
    prompt: "",
    patientAge: "",
    patientWeight: "",
    additionalContext: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Pulse effect for emergency button
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseEffect(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.prompt.trim()) {
      setError("Please describe the situation or symptoms");
      return;
    }

    setLoading(true);
    setError(null);
    setTypingIndicator(true);

    // Add user message to chat history
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: formData.prompt,
      timestamp: new Date(),
      patientInfo: {
        age: formData.patientAge,
        weight: formData.patientWeight,
        context: formData.additionalContext
      }
    };

    setChatHistory(prev => [...prev, userMessage]);
    setMessageCount(prev => prev + 1);

    try {
      const res = await fetch("http://localhost:5000/api/first-aid-chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Simulate typing delay for better UX
      setTimeout(() => {
        setTypingIndicator(false);
        
        // Add AI response to chat history
        const aiMessage = {
          id: Date.now() + 1,
          type: "ai",
          content: data.data.guidance,
          timestamp: new Date(),
          requiresMedicalAttention: data.data.requiresMedicalAttention,
          model: data.data.model
        };

        setChatHistory(prev => [...prev, aiMessage]);
        setMessageCount(prev => prev + 1);
        
        // Show confetti for milestone messages
        if (messageCount % 5 === 0 && messageCount > 0) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      }, 1500);

      // Reset form
      setFormData({
        prompt: "",
        patientAge: "",
        patientWeight: "",
        additionalContext: ""
      });

    } catch (err) {
      setTypingIndicator(false);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (text) => {
    if (!text) return "";
    
    // Convert markdown-style formatting to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/🚨/g, '🚨')
      .replace(/⚠️/g, '⚠️')
      .replace(/✅/g, '✅')
      .replace(/❌/g, '❌')
      .replace(/🏥/g, '🏥')
      .replace(/👨‍⚕️/g, '👨‍⚕️')
      .replace(/📞/g, '📞')
      .replace(/\n/g, '<br>');
  };

  const clearChat = () => {
    setChatHistory([]);
    setError(null);
    setMessageCount(0);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 100
      }
    },
    exit: { 
      opacity: 0, 
      x: 20, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const typingVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const dotVariants = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div 
      className="h-full flex flex-col bg-white dark:bg-gray-800 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  rotate: 0,
                  scale: 0
                }}
                animate={{
                  y: window.innerHeight + 10,
                  rotate: 360,
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 0.5,
                  ease: "easeOut"
                }}
                onAnimationComplete={() => {
                  if (i === 19) setShowConfetti(false);
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-0 w-20 h-20 bg-red-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-10 right-10 w-16 h-16 bg-blue-500 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-10 w-12 h-12 bg-green-500 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Compact Header */}
      <motion.div 
        className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 relative z-10"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Baby className="h-4 w-4 text-red-600 dark:text-red-400" />
            </motion.div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              First Aid Assistant
            </span>
            {messageCount > 0 && (
              <motion.div
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {messageCount} messages
              </motion.div>
            )}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Sparkles className="h-3 w-3 text-yellow-500" />
            </motion.div>
          </motion.div>
                      <motion.button
              onClick={clearChat}
              className="text-xs text-gray-500 hover:text-red-500 transition-colors relative group"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Clear</span>
              <div className="absolute inset-0 bg-red-100 dark:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <motion.div
                className="absolute -top-1 -right-1 w-1 h-1 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.button>
        </div>
        <motion.p 
          className="text-xs text-gray-600 dark:text-gray-400 mt-1 flex items-center space-x-1"
          variants={itemVariants}
        >
          <Zap className="h-3 w-3 text-yellow-500" />
          <span>Powered by Gemini 2.5 Flash</span>
        </motion.p>
      </motion.div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 relative z-10">
        <AnimatePresence mode="wait">
          {chatHistory.length === 0 ? (
            <motion.div 
              key="empty-state"
              className="text-center py-4"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-3"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Baby className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <motion.h3 
                className="text-sm font-medium text-gray-900 dark:text-white mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                First Aid AI Assistant
              </motion.h3>
              <motion.p 
                className="text-xs text-gray-600 dark:text-gray-400"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Describe the situation for immediate first aid guidance.
              </motion.p>
            </motion.div>
          ) : (
            chatHistory.map((message) => (
              <motion.div
                key={message.id}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div
                  className={`max-w-[85%] p-3 rounded-lg text-sm relative ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white shadow-md'
                  }`}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Message indicator */}
                  {message.type === 'user' && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                  
                  {message.type === 'ai' && message.requiresMedicalAttention && (
                    <motion.div 
                      className="mb-2 p-2 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <div className="flex items-center space-x-1">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          <AlertTriangle className="h-3 w-3 text-red-600 dark:text-red-400" />
                        </motion.div>
                        <span className="font-medium text-red-800 dark:text-red-200">
                          Medical Attention Required
                        </span>
                      </div>
                    </motion.div>
                  )}
                  
                  <div 
                    className="prose prose-xs max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: formatResponse(message.content) 
                    }}
                  />
                  
                  <motion.div 
                    className="flex items-center justify-between mt-2 text-xs opacity-70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                    </span>
                    {message.type === 'ai' && (
                      <span className="flex items-center space-x-1">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <Shield className="h-3 w-3" />
                        </motion.div>
                        <span>AI</span>
                      </span>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {typingIndicator && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <motion.div
                    variants={typingVariants}
                    animate="animate"
                    className="flex space-x-1"
                  >
                    <motion.div
                      variants={dotVariants}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      variants={dotVariants}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      variants={dotVariants}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  </motion.div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    AI is thinking...
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="h-3 w-3" />
                </motion.div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Analyzing...
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Compact Input Form */}
      <motion.div 
        className="p-3 border-t border-gray-200 dark:border-gray-700 relative z-10"
        variants={itemVariants}
      >
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex space-x-2">
            <motion.input
              type="text"
              name="prompt"
              value={formData.prompt}
              onChange={handleInputChange}
              placeholder="Describe symptoms..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              disabled={loading}
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.button
              type="submit"
              disabled={loading || !formData.prompt.trim()}
              className={`px-3 py-2 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
                formData.prompt.trim() 
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' 
                  : 'bg-gradient-to-r from-gray-400 to-gray-500'
              } ${loading || !formData.prompt.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileHover={formData.prompt.trim() ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
              animate={formData.prompt.trim() ? {
                boxShadow: ["0 4px 12px rgba(239, 68, 68, 0.3)", "0 6px 20px rgba(239, 68, 68, 0.4)", "0 4px 12px rgba(239, 68, 68, 0.3)"]
              } : {}}
              transition={{ 
                type: "spring", 
                stiffness: 400,
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="h-4 w-4" />
                </motion.div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </motion.button>
          </div>
          
          {/* Quick Patient Info */}
          <motion.div 
            className="grid grid-cols-2 gap-2"
            variants={itemVariants}
          >
            <motion.input
              type="number"
              name="patientAge"
              value={formData.patientAge}
              onChange={handleInputChange}
              placeholder="Age (years)"
              className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
            />
            <motion.input
              type="number"
              name="patientWeight"
              value={formData.patientWeight}
              onChange={handleInputChange}
              placeholder="Weight (kg)"
              className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
            />
          </motion.div>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                className="p-2 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs"
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="flex items-center space-x-1">
                  <X className="h-3 w-3 text-red-600" />
                  <p className="text-red-800 dark:text-red-200">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Emergency Info */}
        <motion.div 
          className="mt-2 p-2 bg-red-50 dark:bg-red-900/10 rounded text-xs relative overflow-hidden"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <motion.div 
              className="flex items-center space-x-1 text-red-700 dark:text-red-300"
              animate={pulseEffect ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Phone className="h-3 w-3" />
              </motion.div>
              <span className="font-medium">Emergency: 911 (US) / 112 (EU)</span>
            </motion.div>
            <motion.p 
              className="text-red-600 dark:text-red-400 mt-1 flex items-center space-x-1"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Info className="h-3 w-3" />
              <span>This is for educational purposes only. Seek medical attention for serious conditions.</span>
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FirstAidChatbotCompact;
