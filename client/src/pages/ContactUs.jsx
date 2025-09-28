import React, { useState } from "react";
import { Mail, User, MessageCircle, Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

// Simplified InputField for a classic form experience
const InputField = ({
  icon: Icon,
  name,
  value,
  error,
  isFocused,
  onChange,
  onFocus,
  onBlur,
  type = "text",
  placeholder,
  rows
}) => {
  const Component = rows ? 'textarea' : 'input';

  return (
    <div className="relative">
      <Icon className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-indigo-600' : error ? 'text-red-500' : 'text-gray-400'
        }`} />

      <Component
        name={name}
        type={type}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white ${error
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
          : isFocused
            ? 'border-indigo-500 focus:border-indigo-600 focus:ring-indigo-500/20 shadow-lg'
            : 'border-gray-200 hover:border-gray-300'
          } focus:outline-none focus:ring-4 ${rows ? 'resize-none' : ''}`}
        style={{ backgroundColor: value === '' ? '#f3e8ff' : 'white' }} // Light placeholder color when empty
      />

      {error && (
        <p className="mt-2 text-sm text-red-600 animate-slideIn">{error}</p>
      )}
    </div>
  );
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    try {
      const response = await axios.post("http://localhost:5000/api/contact-us", formData);

      if (response.data && response.data.success) {
        toast.success("Message sent successfully!");
        setIsSuccess(true);

        // Reset form after success
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      } else {
        toast.error(response.data?.message || "Failed to send message.");
      }

    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center animate-fadeIn">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Message Sent!</h2>
            <p className="text-gray-600">Thank you for reaching out. We'll get back to you shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Let's Connect
          </h1>
          <p className="text-lg text-white max-w-md mx-auto">
            Have questions or need assistance? We'd love to hear from you.
          </p>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-3xl shadow-xl p-8 animate-slideUp">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={User}
                name="name"
                placeholder="Full Name"
                value={formData.name}
                error={errors.name}
                isFocused={focusedField === 'name'}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />

              <InputField
                icon={Mail}
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                error={errors.email}
                isFocused={focusedField === 'email'}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <InputField
              icon={MessageCircle}
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              error={errors.subject}
              isFocused={focusedField === 'subject'}
              onChange={handleChange}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
            />

            <InputField
              icon={MessageCircle}
              name="message"
              rows={4}
              placeholder="Message"
              value={formData.message}
              error={errors.message}
              isFocused={focusedField === 'message'}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
            />

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl active:scale-95'
                  } focus:outline-none focus:ring-4 focus:ring-indigo-500/50`}
                aria-label="Send your contact message to Infant Care Compass support"
              >
                <div className="flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out 0.2s both;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactUs;