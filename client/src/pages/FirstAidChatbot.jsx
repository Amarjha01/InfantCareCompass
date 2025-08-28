import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Send, 
  AlertTriangle, 
  Heart, 
  Baby, 
  Clock, 
  Loader2,
  Info,
  Shield,
  Phone,
  MapPin
} from "lucide-react";

const FirstAidChatbot = () => {
  const [formData, setFormData] = useState({
    prompt: "",
    patientAge: "",
    patientWeight: "",
    additionalContext: ""
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

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
      setResponse(data.data);

      // Reset form
      setFormData({
        prompt: "",
        patientAge: "",
        patientWeight: "",
        additionalContext: ""
      });

    } catch (err) {
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
    setResponse(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  First Aid AI Assistant
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Powered by Gemini 2.5 Flash
                </p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Clear Chat
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    First Aid Guidance
                  </h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Describe the situation and get immediate first aid guidance
                </p>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-4">
                      <Baby className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Welcome to First Aid AI Assistant
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      Describe the situation or symptoms below to receive immediate first aid guidance and medical advice.
                    </p>
                  </div>
                ) : (
                  chatHistory.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        {message.type === 'ai' && message.requiresMedicalAttention && (
                          <div className="mb-3 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                              <span className="text-sm font-medium text-red-800 dark:text-red-200">
                                Medical Attention Required
                              </span>
                            </div>
                          </div>
                        )}
                        
                        <div 
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ 
                            __html: formatResponse(message.content) 
                          }}
                        />
                        
                        <div className="flex items-center justify-between mt-3 text-xs opacity-70">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.type === 'ai' && (
                            <span className="flex items-center space-x-1">
                              <Shield className="h-3 w-3" />
                              <span>AI Powered</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}

                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Analyzing situation...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Form */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      name="prompt"
                      value={formData.prompt}
                      onChange={handleInputChange}
                      placeholder="Describe the situation or symptoms..."
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading || !formData.prompt.trim()}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  
                  {error && (
                    <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Patient Information Form */}
          <div className="space-y-6">
            {/* Patient Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Baby className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>Patient Information</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleInputChange}
                    placeholder="e.g., 2"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="patientWeight"
                    value={formData.patientWeight}
                    onChange={handleInputChange}
                    placeholder="e.g., 12.5"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Additional Context
                  </label>
                  <textarea
                    name="additionalContext"
                    value={formData.additionalContext}
                    onChange={handleInputChange}
                    placeholder="Any additional information..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Information */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-6">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Emergency Information</span>
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <Phone className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200">Emergency Services</p>
                    <p className="text-red-700 dark:text-red-300">Call 911 (US) or 112 (EU)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200">Nearest Hospital</p>
                    <p className="text-red-700 dark:text-red-300">Locate your nearest emergency room</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Disclaimer */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-6">
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>Important Notice</span>
              </h3>
              
              <div className="space-y-3 text-sm text-yellow-700 dark:text-yellow-300">
                <p>
                  This AI assistant provides educational first aid guidance only and is not a replacement for professional medical care.
                </p>
                <p>
                  Always seek immediate medical attention for serious injuries or medical emergencies.
                </p>
                <p>
                  When in doubt, contact a healthcare professional immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstAidChatbot;
