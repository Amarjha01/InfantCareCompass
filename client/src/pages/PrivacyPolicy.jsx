import React from 'react';
import ScrollToTop from '../components/ScrollToTop';

const PrivacyPolicy = () => {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(139,92,246,0.15),_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(236,72,153,0.15),_transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-pink-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20 max-w-5xl">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8 md:p-12">
            <h1 className="text-5xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            
            <div className="text-gray-300 text-sm mb-8 bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <p><strong className="text-purple-300">Effective Date:</strong> January 1, 2024</p>
              <p><strong className="text-purple-300">Last Updated:</strong> January 1, 2024</p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-200">
              
              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-4"></span>
                  1. Introduction
                </h2>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <p className="mb-4 text-gray-200 leading-relaxed">
                    InfantCare Compass (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy and the privacy of your children. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                    healthcare platform designed to assist parents in managing their child&apos;s healthcare needs.
                  </p>
                  <div className="bg-blue-500/20 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="text-blue-200">
                      <strong>Important:</strong> This platform deals with children&apos;s health information. We comply with the Children&apos;s 
                      Online Privacy Protection Act (COPPA) and take extra precautions to protect children&apos;s data.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full mr-4"></span>
                  2. Information We Collect
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-medium text-purple-300 mb-4">2.1 Personal Information</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      <li className="text-gray-200">Parent/Guardian contact information (name, email, phone number)</li>
                      <li className="text-gray-200">Account credentials (username, encrypted password)</li>
                      <li className="text-gray-200">Profile information and preferences</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-medium text-purple-300 mb-4">2.2 Child Health Information</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      <li className="text-gray-200">Child&apos;s name, date of birth, and basic demographics</li>
                      <li className="text-gray-200">Vaccination records and schedules</li>
                      <li className="text-gray-200">Health-related notes and reminders</li>
                      <li className="text-gray-200">Consultation records (with explicit consent)</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-medium text-purple-300 mb-4">2.3 Technical Information</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      <li className="text-gray-200">Device information and browser type</li>
                      <li className="text-gray-200">IP address and location data (when permitted)</li>
                      <li className="text-gray-200">Usage analytics and interaction data</li>
                      <li className="text-gray-200">Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-pink-400 to-red-500 rounded-full mr-4"></span>
                  3. How We Use Your Information
                </h2>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <ul className="list-disc pl-6 mb-4 space-y-3">
                    <li className="text-gray-200"><strong className="text-blue-300">Healthcare Management:</strong> Track vaccination schedules and send reminders</li>
                    <li className="text-gray-200"><strong className="text-blue-300">Educational Content:</strong> Provide personalized parenting resources</li>
                    <li className="text-gray-200"><strong className="text-blue-300">Communication:</strong> Send important health notifications and updates</li>
                    <li className="text-gray-200"><strong className="text-blue-300">Platform Improvement:</strong> Analyze usage to enhance our services</li>
                    <li className="text-gray-200"><strong className="text-blue-300">Safety &amp; Security:</strong> Protect against fraud and ensure platform security</li>
                    <li className="text-gray-200"><strong className="text-blue-300">Legal Compliance:</strong> Meet regulatory requirements and legal obligations</li>
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-green-400 to-teal-500 rounded-full mr-4"></span>
                  4. Contact Information
                </h2>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-300/30">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-purple-300 font-semibold">Email</p>
                      <p className="text-white">privacy@infantcarecompass.live</p>
                    </div>
                    <div className="text-center">
                      <p className="text-purple-300 font-semibold">Phone</p>
                      <p className="text-white">+91 919956****</p>
                    </div>
                    <div className="text-center">
                      <p className="text-purple-300 font-semibold">Address</p>
                      <p className="text-white">InfantCare Compass Privacy Office</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;