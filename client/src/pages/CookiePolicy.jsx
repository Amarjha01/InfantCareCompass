import React from 'react';
import ScrollToTop from '../components/ScrollToTop';

const CookiePolicy = () => {
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
            <h1 className="text-5xl font-bold text-white mb-8 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Cookie Policy
            </h1>
            
            <div className="text-gray-300 text-sm mb-8 bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <p><strong className="text-orange-300">Effective Date:</strong> January 1, 2024</p>
              <p><strong className="text-orange-300">Last Updated:</strong> January 1, 2024</p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-200">
              
              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-orange-400 to-pink-500 rounded-full mr-4"></span>
                  1. What Are Cookies?
                </h2>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 space-y-4">
                  <p className="text-gray-200 leading-relaxed">
                    Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit our website. 
                    They help us provide you with a better experience by remembering your preferences and improving our platform&apos;s functionality.
                  </p>
                  <p className="text-gray-200 leading-relaxed">
                    Similar technologies include web beacons, pixels, and local storage objects, which we collectively refer to as &quot;cookies&quot; in this policy.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-4"></span>
                  2. How We Use Cookies
                </h2>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <p className="mb-4 text-gray-200">InfantCare Compass uses cookies to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="text-gray-200">Keep you logged in to your account</li>
                    <li className="text-gray-200">Remember your preferences and settings</li>
                    <li className="text-gray-200">Provide personalized healthcare reminders</li>
                    <li className="text-gray-200">Improve our platform&apos;s performance and user experience</li>
                    <li className="text-gray-200">Understand how you interact with our platform</li>
                    <li className="text-gray-200">Prevent fraud and enhance security</li>
                    <li className="text-gray-200">Comply with legal and regulatory requirements</li>
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full mr-4"></span>
                  3. Types of Cookies We Use
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-medium text-blue-300 mb-4">3.1 Essential Cookies</h3>
                    <div className="bg-blue-500/20 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4">
                      <p className="text-blue-200"><strong>Purpose:</strong> These cookies are necessary for our platform to function properly.</p>
                    </div>
                    <ul className="list-disc pl-6 space-y-2">
                      <li className="text-gray-200"><strong className="text-blue-300">Authentication:</strong> Keep you logged in to your account</li>
                      <li className="text-gray-200"><strong className="text-blue-300">Security:</strong> Protect against cross-site request forgery</li>
                      <li className="text-gray-200"><strong className="text-blue-300">Session Management:</strong> Maintain your session state</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-medium text-green-300 mb-4">3.2 Functional Cookies</h3>
                    <div className="bg-green-500/20 border-l-4 border-green-400 p-4 rounded-r-lg mb-4">
                      <p className="text-green-200"><strong>Purpose:</strong> Enhance your user experience with personalized features.</p>
                    </div>
                    <ul className="list-disc pl-6 space-y-2">
                      <li className="text-gray-200"><strong className="text-green-300">Preferences:</strong> Remember your language, timezone, and notification settings</li>
                      <li className="text-gray-200"><strong className="text-green-300">Customization:</strong> Store your dashboard layout preferences</li>
                      <li className="text-gray-200"><strong className="text-green-300">Accessibility:</strong> Remember accessibility settings like font size</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-medium text-yellow-300 mb-4">3.3 Analytics Cookies</h3>
                    <div className="bg-yellow-500/20 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4">
                      <p className="text-yellow-200"><strong>Purpose:</strong> Help us understand how you use our platform to improve it.</p>
                    </div>
                    <ul className="list-disc pl-6 space-y-2">
                      <li className="text-gray-200"><strong className="text-yellow-300">Usage Analytics:</strong> Track which features are most used</li>
                      <li className="text-gray-200"><strong className="text-yellow-300">Performance Monitoring:</strong> Identify slow-loading pages or errors</li>
                      <li className="text-gray-200"><strong className="text-yellow-300">User Journey:</strong> Understand how users navigate through our platform</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-pink-400 to-red-500 rounded-full mr-4"></span>
                  4. Children&apos;s Privacy and Cookies
                </h2>
                <div className="bg-pink-500/20 border border-pink-400/30 rounded-xl p-6">
                  <p className="mb-4 text-gray-200">We take special care with children&apos;s data:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="text-gray-200">We do not set marketing cookies based on children&apos;s health information</li>
                    <li className="text-gray-200">Analytics cookies related to children&apos;s data are anonymized immediately</li>
                    <li className="text-gray-200">Parents can request deletion of all cookies related to their child&apos;s account</li>
                    <li className="text-gray-200">We comply with COPPA requirements for children under 13</li>
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-4"></span>
                  5. Managing Your Cookie Preferences
                </h2>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <p className="mb-4 text-gray-200">You can control cookies through your browser settings:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-cyan-300 font-semibold">Chrome:</p>
                      <p className="text-gray-200 text-sm">Settings → Privacy and Security → Cookies</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-cyan-300 font-semibold">Firefox:</p>
                      <p className="text-gray-200 text-sm">Preferences → Privacy &amp; Security → Cookies</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-cyan-300 font-semibold">Safari:</p>
                      <p className="text-gray-200 text-sm">Preferences → Privacy → Cookies</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-cyan-300 font-semibold">Edge:</p>
                      <p className="text-gray-200 text-sm">Settings → Cookies and Site Permissions</p>
                    </div>
                  </div>
                  <div className="bg-red-500/20 border-l-4 border-red-400 p-4 rounded-r-lg">
                    <p className="text-red-200">
                      <strong>Important:</strong> Disabling essential cookies may affect platform functionality, 
                      including your ability to log in and access your child&apos;s health records.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full mr-4"></span>
                  6. Contact Us About Cookies
                </h2>
                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-indigo-300/30">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-indigo-300 font-semibold">Email</p>
                      <p className="text-white">privacy@infantcarecompass.live</p>
                    </div>
                    <div className="text-center">
                      <p className="text-indigo-300 font-semibold">Phone</p>
                      <p className="text-white">+91 919956****</p>
                    </div>
                    <div className="text-center">
                      <p className="text-indigo-300 font-semibold">Address</p>
                      <p className="text-white">InfantCare Compass Cookie Privacy</p>
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

export default CookiePolicy;