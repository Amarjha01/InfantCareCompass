import React from 'react';
import ScrollToTop from '../components/ScrollToTop';

const TermsOfService = () => {
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
            <h1 className="text-5xl font-bold text-white mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            
            <div className="text-gray-300 text-sm mb-8 bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <p><strong className="text-green-300">Effective Date:</strong> January 1, 2024</p>
              <p><strong className="text-green-300">Last Updated:</strong> January 1, 2024</p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-200">
              
              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-green-400 to-blue-500 rounded-full mr-4"></span>
                  1. Acceptance of Terms
                </h2>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <p className="mb-4 text-gray-200 leading-relaxed">
                    By accessing and using InfantCare Compass (&quot;the Platform,&quot; &quot;Service,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) 
                    agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Platform.
                  </p>
                  <div className="bg-yellow-500/20 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <p className="text-yellow-200">
                      <strong>Important:</strong> This Platform provides healthcare management tools but does not replace professional medical advice, 
                      diagnosis, or treatment. Always consult with qualified healthcare providers for medical decisions.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-4"></span>
                  2. Description of Service
                </h2>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <p className="mb-4 text-gray-200">InfantCare Compass provides:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li className="text-gray-200">Vaccination tracking and reminder systems</li>
                    <li className="text-gray-200">Educational resources for childcare</li>
                    <li className="text-gray-200">Healthcare consultation booking platform</li>
                    <li className="text-gray-200">AI-powered care guidance tools</li>
                    <li className="text-gray-200">Community resources and support</li>
                  </ul>
                  <div className="bg-blue-500/20 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="text-blue-200">
                      <strong>Medical Disclaimer:</strong> Our Platform is for informational and organizational purposes only. 
                      It is not intended to diagnose, treat, cure, or prevent any disease or medical condition.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full mr-4"></span>
                  3. User Responsibilities
                </h2>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li className="text-gray-200">You must be at least 18 years old or the legal guardian of a child</li>
                    <li className="text-gray-200">You must provide accurate and complete registration information</li>
                    <li className="text-gray-200">You are responsible for maintaining the confidentiality of your account</li>
                    <li className="text-gray-200">Use the Platform for legitimate healthcare management purposes</li>
                    <li className="text-gray-200">Follow healthcare providers&apos; professional guidance</li>
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-red-400 to-orange-500 rounded-full mr-4"></span>
                  4. Emergency Situations
                </h2>
                <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-6">
                  <div className="bg-red-500/30 border-l-4 border-red-400 p-4 rounded-r-lg mb-4">
                    <p className="text-red-200 font-semibold">EMERGENCY NOTICE:</p>
                    <p className="text-red-100">
                      For medical emergencies, call emergency services immediately. Do not rely on our Platform 
                      for urgent medical situations.
                    </p>
                  </div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="text-gray-200">Call 911 or local emergency services for immediate medical help</li>
                    <li className="text-gray-200">Contact your child&apos;s pediatrician for urgent health concerns</li>
                    <li className="text-gray-200">Use our Platform for routine healthcare management only</li>
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-teal-400 to-green-500 rounded-full mr-4"></span>
                  5. Contact Information
                </h2>
                <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-300/30">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-green-300 font-semibold">Email</p>
                      <p className="text-white">legal@infantcarecompass.live</p>
                    </div>
                    <div className="text-center">
                      <p className="text-green-300 font-semibold">Phone</p>
                      <p className="text-white">+91 919956****</p>
                    </div>
                    <div className="text-center">
                      <p className="text-green-300 font-semibold">Address</p>
                      <p className="text-white">InfantCare Compass Legal Department</p>
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

export default TermsOfService;