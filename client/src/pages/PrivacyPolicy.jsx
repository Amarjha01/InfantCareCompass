import React from 'react';
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin, Baby, UserCheck, Bell, Database, AlertCircle, Calendar, Users } from 'lucide-react';

const ScrollToTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

const PrivacyPolicy = () => {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-white">
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Your trust is our priority. Learn how we protect your family's data.
            </p>
          </div>

          {/* Date Info Card */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-xl p-5 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-400">Effective Date:</span>
                  <span className="text-white font-semibold">January 1, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-pink-400" />
                  <span className="text-gray-400">Last Updated:</span>
                  <span className="text-white font-semibold">January 1, 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Introduction */}
            <section className="bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-3">Introduction</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  InfantCare Compass ("we," "our," or "us") is committed to protecting your privacy and the privacy of your children. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                  healthcare platform designed to assist parents in managing their child's healthcare needs.
                </p>
                
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 mt-6">
                  <div className="flex gap-3">
                    <Baby className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-blue-300 font-semibold mb-2">Important Notice</p>
                      <p className="text-blue-200/80 text-sm leading-relaxed">
                        This platform deals with children's health information. We comply with the Children's 
                        Online Privacy Protection Act (COPPA) and take extra precautions to protect children's data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-3">Information We Collect</h2>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Personal Information */}
                <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <UserCheck className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>Parent/Guardian contact information (name, email, phone number)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>Account credentials (username, encrypted password)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>Profile information and preferences</span>
                    </li>
                  </ul>
                </div>

                {/* Child Health Information */}
                <div className="bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/30 rounded-xl p-6 hover:border-pink-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <Baby className="w-6 h-6 text-pink-400" />
                    <h3 className="text-xl font-semibold text-white">Child Health Information</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>Child's name, date of birth, and basic demographics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>Vaccination records and schedules</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>Health-related notes and reminders</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>Consultation records (with explicit consent)</span>
                    </li>
                  </ul>
                </div>

                {/* Technical Information */}
                <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">Technical Information</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Device information and browser type</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>IP address and location data (when permitted)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Usage analytics and interaction data</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Cookies and similar tracking technologies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-3">How We Use Your Information</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Healthcare Management */}
                <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-xl p-5 hover:border-green-500/40 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Bell className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Healthcare Management</h4>
                      <p className="text-gray-400 text-sm">Track vaccination schedules and send reminders</p>
                    </div>
                  </div>
                </div>

                {/* Educational Content */}
                <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-5 hover:border-blue-500/40 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Educational Content</h4>
                      <p className="text-gray-400 text-sm">Provide personalized parenting resources</p>
                    </div>
                  </div>
                </div>

                {/* Communication */}
                <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl p-5 hover:border-purple-500/40 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Mail className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Communication</h4>
                      <p className="text-gray-400 text-sm">Send important health notifications and updates</p>
                    </div>
                  </div>
                </div>

                {/* Platform Improvement */}
                <div className="bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 rounded-xl p-5 hover:border-pink-500/40 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-pink-500/20 rounded-lg">
                      <Eye className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Platform Improvement</h4>
                      <p className="text-gray-400 text-sm">Analyze usage to enhance our services</p>
                    </div>
                  </div>
                </div>

                {/* Safety & Security */}
                <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl p-5 hover:border-yellow-500/40 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Lock className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Safety & Security</h4>
                      <p className="text-gray-400 text-sm">Protect against fraud and ensure platform security</p>
                    </div>
                  </div>
                </div>

                {/* Legal Compliance */}
                <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-5 hover:border-cyan-500/40 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <Shield className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Legal Compliance</h4>
                      <p className="text-gray-400 text-sm">Meet regulatory requirements and legal obligations</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-3">Contact Information</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-600 hover:border-purple-500/50 transition-all duration-300 group">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-purple-400 font-semibold mb-2 text-sm uppercase tracking-wide">Email</p>
                  <p className="text-white text-sm break-all">privacy@infantcarecompass.live</p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-600 hover:border-pink-500/50 transition-all duration-300 group">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-pink-400 font-semibold mb-2 text-sm uppercase tracking-wide">Phone</p>
                  <p className="text-white text-sm">+91 919956****</p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-600 hover:border-blue-500/50 transition-all duration-300 group">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-blue-400 font-semibold mb-2 text-sm uppercase tracking-wide">Address</p>
                  <p className="text-white text-sm">InfantCare Compass<br/>Privacy Office</p>
                </div>
              </div>
            </section>

          </div>

          {/* Footer Note */}
          <div className="max-w-6xl mx-auto mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <Shield className="w-4 h-4" />
              <span>Thank you for trusting InfantCare Compass with your family's healthcare journey.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;