import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  Camera, 
  Mic, 
  Send, 
  Image as ImageIcon, 
  X, 
  Play, 
  Pause, 
  Upload,
  MessageCircle,
  Stethoscope,
  User,
  Clock,
  CheckCircle,
  Reply,
  Edit3
} from "lucide-react";
import commnApiEndpoint from "../common/backendAPI.jsx";
import SkeletonLoader from "../components/SkeletonLoader.jsx";
import DoctorCard from "../components/DoctorCard.jsx";

const ConsultationPage = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Set default active tab based on user role
  const [activeTab, setActiveTab] = useState('doctors');
  
  // Patient question state
  const [questionText, setQuestionText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Doctor answer state
  const [answerText, setAnswerText] = useState({});
  const [isAnswering, setIsAnswering] = useState({});
  const [showAnswerForm, setShowAnswerForm] = useState({});
  
  // Refs
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Get user from Redux store
  const { user, isAuthenticated } = useSelector(state => state.user);
  
  // TEMPORARY: Override user for testing doctor view
  // Remove this after testing
  const testDoctorUser = {
    id: "test-doctor-id",
    name: "Dr. John Smith",
    email: "doctor@test.com",
    role: "doctor"
  };
  
  // Use test user if no real user is logged in
  const currentUser = user || testDoctorUser;
  const currentIsAuthenticated = isAuthenticated || true; // Force authenticated for testing
  
  // Check if user is patient or doctor
  const isPatient = currentUser?.role === 'patient' || !currentUser?.role; // Default to patient if no role
  const isDoctor = currentUser?.role === 'doctor';

  const doctorInfo = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(commnApiEndpoint.doctorInfo.url);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }

      const data = await response.json();
      setDoctorData(data.data);
    } catch (error) {
      console.error("Something went wrong:", error);
      setError("Failed to fetch doctors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  // Voice recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Image handling
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert('Each image must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImages(prev => [...prev, {
          file,
          url: e.target.result,
          id: Date.now() + Math.random()
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setSelectedImages(prev => prev.filter(img => img.id !== id));
  };

  // Submit question
  const submitQuestion = async () => {
    if (!questionText.trim() && selectedImages.length === 0 && !audioBlob) {
      alert('Please add a question, image, or voice message');
      return;
    }

    setIsSubmitting(true);
    try {
      // For now, we'll handle this locally since the backend endpoint doesn't exist yet
      // TODO: Implement proper API endpoint on backend
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add to local state for immediate feedback
      const newQuestion = {
        id: Date.now(),
        question: questionText,
        images: selectedImages.map(img => img.url),
        audioUrl: audioUrl,
        timestamp: new Date(),
        status: 'pending',
        patientName: currentUser?.name || 'Anonymous Patient'
      };
      
      setQuestions(prev => [newQuestion, ...prev]);
      
      // Reset form
      setQuestionText("");
      setSelectedImages([]);
      setAudioBlob(null);
      setAudioUrl(null);
      
      alert('Question submitted successfully! (Currently using local storage - backend integration pending)');
      
      /* 
      // Uncomment this when backend endpoint is ready:
      
      const formData = new FormData();
      formData.append('question', questionText);
      formData.append('patientId', user?.id || 'anonymous');
      
      selectedImages.forEach((img, index) => {
        formData.append(`images`, img.file);
      });
      
      if (audioBlob) {
        formData.append('audio', audioBlob, 'voice_message.wav');
      }

      const response = await fetch(commnApiEndpoint.submitQuestion.url, {
        method: commnApiEndpoint.submitQuestion.method,
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // if auth is required
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Question submitted successfully:', result);
      */
      
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('Failed to submit question. Please try again. Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Doctor answer functions
  const handleAnswerSubmit = async (questionId) => {
    const answer = answerText[questionId]?.trim();
    if (!answer) {
      alert('Please enter an answer');
      return;
    }

    setIsAnswering(prev => ({ ...prev, [questionId]: true }));
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the question with doctor's answer
      setQuestions(prev => prev.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              status: 'answered', 
              answer: answer,
              answeredBy: currentUser?.name || 'Dr. Anonymous',
              answeredAt: new Date()
            }
          : q
      ));
      
      // Reset answer form
      setAnswerText(prev => ({ ...prev, [questionId]: '' }));
      setShowAnswerForm(prev => ({ ...prev, [questionId]: false }));
      
      alert('Answer submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Failed to submit answer. Please try again.');
    } finally {
      setIsAnswering(prev => ({ ...prev, [questionId]: false }));
    }
  };

  const toggleAnswerForm = (questionId) => {
    setShowAnswerForm(prev => ({ 
      ...prev, 
      [questionId]: !prev[questionId] 
    }));
  };

  useEffect(() => {
    console.log('ConsultationPage mounted');
    console.log('User:', currentUser);
    console.log('isAuthenticated:', currentIsAuthenticated);
    console.log('isPatient:', isPatient);
    console.log('isDoctor:', isDoctor);
    
    // Set default tab based on user role
    if (isPatient) {
      setActiveTab('ask');
    } else if (isDoctor) {
      setActiveTab('doctors');
    }
    
    doctorInfo();
    
    // Mock questions for demo
    setQuestions([
      {
        id: 1,
        question: "My baby has been crying a lot lately and seems uncomfortable. What could be the reason?",
        images: [],
        audioUrl: null,
        timestamp: new Date(Date.now() - 3600000),
        status: 'answered',
        patientName: 'Sarah Johnson',
        answer: "This could be due to several reasons including colic, hunger, or discomfort. I recommend checking feeding schedule and consulting for physical examination."
      },
      {
        id: 2,
        question: "Should I be concerned about this rash on my infant's skin?",
        images: ['https://via.placeholder.com/200x150'],
        audioUrl: null,
        timestamp: new Date(Date.now() - 7200000),
        status: 'pending',
        patientName: 'Mike Chen'
      },
      {
        id: 3,
        question: "My 6-month-old baby is not sleeping through the night. Any suggestions?",
        images: [],
        audioUrl: null,
        timestamp: new Date(Date.now() - 1800000),
        status: 'pending',
        patientName: 'Emma Wilson'
      }
    ]);
  }, [currentUser, isPatient, isDoctor]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-300 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-slate-950/50 backdrop-blur-xl border-r border-slate-800/50">
        
        {/* User Info Header */}
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isPatient ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
            }`}>
              {isPatient ? <User className="w-5 h-5" /> : <Stethoscope className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-semibold text-white">{currentUser?.name || 'Guest User'}</h3>
              <p className="text-sm text-gray-400 capitalize">
                {isPatient ? 'Patient' : isDoctor ? 'Doctor' : 'Guest'}
              </p>
            </div>
          </div>
          
          {/* Tab Navigation - Show different tabs based on user role */}
          {isPatient ? (
            // Patients only see Patient Portal (no switching)
            <div className="flex gap-2">
              <div className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                Patient Portal
              </div>
            </div>
          ) : isDoctor ? (
            // Doctors only see Doctors Dashboard (no switching)
            <div className="flex gap-2">
              <div className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Doctors Dashboard
              </div>
            </div>
          ) : (
            // Guest users see both tabs with switching capability
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('doctors')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'doctors' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Doctors
              </button>
              <button
                onClick={() => setActiveTab('ask')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'ask' 
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Ask Question
              </button>
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
          
          {/* Doctors Tab - Only show for doctors or guest users (NOT patients) */}
          {(activeTab === 'doctors' && !isPatient) && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Stethoscope className="w-6 h-6 text-blue-400" />
                {isDoctor ? 'Patient Questions' : 'Available Doctors'}
              </h2>

              {isDoctor ? (
                /* Doctor view - Show patient questions */
                <div className="space-y-4">
                  {questions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No patient questions at the moment.</p>
                  ) : (
                    questions.map((q) => (
                      <div key={q.id} className="bg-slate-800/50 border border-slate-600/50 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-blue-400 font-medium">{q.patientName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-400">
                              {q.timestamp.toLocaleString()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              q.status === 'answered' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}>
                              {q.status === 'answered' ? 'Answered' : 'Pending'}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-3">{q.question}</p>
                        
                        {q.images.length > 0 && (
                          <div className="flex gap-2 mb-3">
                            {q.images.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt="Question attachment"
                                className="w-16 h-16 object-cover rounded-lg border border-slate-600"
                              />
                            ))}
                          </div>
                        )}
                        
                        {q.audioUrl && (
                          <div className="mb-3">
                            <audio controls className="w-full h-8">
                              <source src={q.audioUrl} type="audio/wav" />
                            </audio>
                          </div>
                        )}
                        
                        {q.answer ? (
                          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-sm font-medium text-green-400">
                                Your Response {q.answeredAt && `• ${q.answeredAt.toLocaleString()}`}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm">{q.answer}</p>
                          </div>
                        ) : (
                          <div className="mt-4">
                            {!showAnswerForm[q.id] ? (
                              <button
                                onClick={() => toggleAnswerForm(q.id)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                              >
                                <Reply className="w-4 h-4" />
                                Provide Answer
                              </button>
                            ) : (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                                  <Edit3 className="w-4 h-4" />
                                  Write your medical advice
                                </div>
                                <textarea
                                  value={answerText[q.id] || ''}
                                  onChange={(e) => setAnswerText(prev => ({ 
                                    ...prev, 
                                    [q.id]: e.target.value 
                                  }))}
                                  placeholder="Provide your professional medical advice and recommendations..."
                                  className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                  rows="4"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleAnswerSubmit(q.id)}
                                    disabled={isAnswering[q.id] || !answerText[q.id]?.trim()}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {isAnswering[q.id] ? (
                                      <>
                                        <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                                        Submitting...
                                      </>
                                    ) : (
                                      <>
                                        <Send className="w-4 h-4" />
                                        Submit Answer
                                      </>
                                    )}
                                  </button>
                                  <button
                                    onClick={() => toggleAnswerForm(q.id)}
                                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              ) : (
                /* Guest view - Show available doctors */
                <div>
                  {loading && (
                    <div className="space-y-4">
                      <SkeletonLoader />
                      <SkeletonLoader />
                      <SkeletonLoader />
                    </div>
                  )}

                  {error && (
                    <div className="text-red-300 p-4 bg-red-900/20 rounded-lg border border-red-800/30">
                      <p className="font-semibold">An Error Occurred</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  {!loading && !error && doctorData.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No doctors available at the moment.</p>
                  )}

                  {!loading && !error && doctorData.length > 0 && (
                    <div className="space-y-4">
                      {doctorData.map((doctor) => (
                        <DoctorCard key={doctor._id} doctor={doctor} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Ask Question Tab - Show for patients or guest users (NOT doctors) */}
          {(activeTab === 'ask' && !isDoctor) && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-purple-400" />
                Ask a Question
              </h2>

              {/* Question Form */}
              <div className="space-y-4">
                {/* Text Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Describe your health concern
                  </label>
                  <textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Describe your symptoms, concerns, or questions in detail..."
                    className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows="4"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Add Images (Optional)
                  </label>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-3 border-2 border-dashed border-slate-600 rounded-lg hover:border-purple-500 transition-colors flex items-center justify-center gap-2 text-gray-400 hover:text-purple-400"
                  >
                    <ImageIcon className="w-5 h-5" />
                    Click to upload images (max 5, 5MB each)
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  
                  {/* Image Preview */}
                  {selectedImages.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {selectedImages.map((img) => (
                        <div key={img.id} className="relative">
                          <img
                            src={img.url}
                            alt="Upload preview"
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(img.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Voice Recording */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Voice Message (Optional)
                  </label>
                  <div className="flex items-center gap-3">
                    {!isRecording ? (
                      <button
                        onClick={startRecording}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Mic className="w-4 h-4" />
                        Start Recording
                      </button>
                    ) : (
                      <button
                        onClick={stopRecording}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors animate-pulse"
                      >
                        <Mic className="w-4 h-4" />
                        Stop Recording
                      </button>
                    )}
                    
                    {audioUrl && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={isPlaying ? pauseAudio : playAudio}
                          className="p-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => {
                            setAudioBlob(null);
                            setAudioUrl(null);
                            setIsPlaying(false);
                          }}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  {audioUrl && (
                    <audio
                      ref={audioRef}
                      src={audioUrl}
                      onEnded={() => setIsPlaying(false)}
                      className="hidden"
                    />
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={submitQuestion}
                  disabled={isSubmitting || (!questionText.trim() && selectedImages.length === 0 && !audioBlob)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Question
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-6 md:p-8 overflow-y-auto">
        {(activeTab === 'doctors' && !isPatient) ? (
          <div className="bg-slate-800/30 backdrop-blur-xl p-8 rounded-2xl h-full border border-slate-700/50">
            {isDoctor ? (
              /* Doctor Dashboard Content */
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Doctor Dashboard</h2>
                    <p className="text-gray-400">
                      Manage patient questions and provide medical advice
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
                      <p className="text-yellow-400 font-semibold text-lg">
                        {questions.filter(q => q.status === 'pending').length}
                      </p>
                      <p className="text-yellow-400/80 text-sm">Pending</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                      <p className="text-green-400 font-semibold text-lg">
                        {questions.filter(q => q.status === 'answered').length}
                      </p>
                      <p className="text-green-400/80 text-sm">Answered</p>
                    </div>
                  </div>
                </div>

                {questions.length === 0 ? (
                  <div className="text-center py-20">
                    <MessageCircle className="w-20 h-20 text-gray-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-300 mb-4">No Patient Questions</h3>
                    <p className="text-gray-400">
                      Patient questions will appear here when they submit health concerns.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Recent Questions</h3>
                    <div className="space-y-4">
                      {questions.map((q) => (
                        <div key={q.id} className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-white">{q.patientName}</h4>
                                <p className="text-sm text-gray-400">{q.timestamp.toLocaleString()}</p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              q.status === 'answered' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}>
                              {q.status === 'answered' ? 'Answered' : 'Pending Response'}
                            </span>
                          </div>
                          
                          <div className="mb-4">
                            <h5 className="text-gray-300 font-medium mb-2">Patient Question:</h5>
                            <p className="text-gray-200 bg-slate-800/50 p-3 rounded-lg">{q.question}</p>
                          </div>
                          
                          {q.images.length > 0 && (
                            <div className="mb-4">
                              <h5 className="text-gray-300 font-medium mb-2">Attachments:</h5>
                              <div className="flex gap-3">
                                {q.images.map((img, idx) => (
                                  <img
                                    key={idx}
                                    src={img}
                                    alt="Question attachment"
                                    className="w-20 h-20 object-cover rounded-lg border border-slate-600 cursor-pointer hover:border-blue-400 transition-colors"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {q.audioUrl && (
                            <div className="mb-4">
                              <h5 className="text-gray-300 font-medium mb-2">Voice Message:</h5>
                              <audio controls className="w-full max-w-md">
                                <source src={q.audioUrl} type="audio/wav" />
                              </audio>
                            </div>
                          )}
                          
                          {q.answer ? (
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span className="font-medium text-green-400">Your Response</span>
                                {q.answeredAt && (
                                  <span className="text-green-400/70 text-sm">
                                    • {q.answeredAt.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-200">{q.answer}</p>
                            </div>
                          ) : (
                            <div className="border-t border-slate-600 pt-4">
                              {!showAnswerForm[q.id] ? (
                                <button
                                  onClick={() => toggleAnswerForm(q.id)}
                                  className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors font-medium"
                                >
                                  <Reply className="w-5 h-5" />
                                  Provide Medical Advice
                                </button>
                              ) : (
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2 text-blue-400 font-medium">
                                    <Edit3 className="w-5 h-5" />
                                    Provide Professional Medical Advice
                                  </div>
                                  <textarea
                                    value={answerText[q.id] || ''}
                                    onChange={(e) => setAnswerText(prev => ({ 
                                      ...prev, 
                                      [q.id]: e.target.value 
                                    }))}
                                    placeholder="Provide your professional medical advice, recommendations, and next steps for the patient..."
                                    className="w-full p-4 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    rows="6"
                                  />
                                  <div className="flex gap-3">
                                    <button
                                      onClick={() => handleAnswerSubmit(q.id)}
                                      disabled={isAnswering[q.id] || !answerText[q.id]?.trim()}
                                      className="flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {isAnswering[q.id] ? (
                                        <>
                                          <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                                          Submitting Response...
                                        </>
                                      ) : (
                                        <>
                                          <Send className="w-5 h-5" />
                                          Submit Medical Advice
                                        </>
                                      )}
                                    </button>
                                    <button
                                      onClick={() => toggleAnswerForm(q.id)}
                                      className="px-6 py-3 text-gray-400 hover:text-white transition-colors font-medium"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        ) : (
          /* Patient Questions Display - Show for patients or guest users asking questions */
          <div className="space-y-6">
            <div className="bg-slate-800/30 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-purple-400" />
                Your Health Questions
              </h2>
              <p className="text-gray-400 mb-6">
                Track your submitted questions and get expert medical advice from our doctors.
              </p>
              
              {questions.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No questions submitted yet</p>
                  <p className="text-gray-600 text-sm">Ask your first question to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {questions.map((q) => (
                    <div key={q.id} className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-blue-400 font-medium">{q.patientName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-400">
                            {q.timestamp.toLocaleString()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            q.status === 'answered' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {q.status === 'answered' ? 'Answered' : 'Pending'}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-3">{q.question}</p>
                      
                      {q.images.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {q.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt="Question attachment"
                              className="w-16 h-16 object-cover rounded-lg border border-slate-600"
                            />
                          ))}
                        </div>
                      )}
                      
                      {q.audioUrl && (
                        <div className="mb-3">
                          <audio controls className="w-full h-8">
                            <source src={q.audioUrl} type="audio/wav" />
                          </audio>
                        </div>
                      )}
                      
                      {q.answer && (
                        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-medium text-green-400">Doctor's Response</span>
                          </div>
                          <p className="text-gray-300 text-sm">{q.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationPage;
