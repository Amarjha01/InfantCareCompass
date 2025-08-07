"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Footer = () => {
  // ==================== DATA & CONSTANTS ====================
  const companyInfo = {
    name: "HealthCare+",
    description:
      "Providing exceptional healthcare service and care to all our patients. Your health is our priority, and we are here to help you every step of the way.",
    trustBadge: "Trusted by 10,000+ families",
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "#services" },
    { name: "Doctors", href: "/doctors" },
    { name: "Appointments", href: "/appointments" },
    { name: "Contact", href: "/contact" },
  ];

  const contactInfo = [
    {
      type: "email",
      label: "Email",
      value: "help@infantcarecompass.live",
      href: "mailto:help@infantcarecompass.live",
      icon: Mail,
    },
    {
      type: "phone",
      label: "Phone",
      value: "+91 919956****",
      href: "tel:+919956****",
      icon: Phone,
    },
    {
      type: "address",
      label: "Address",
      value: "123 Healthcare Ave, Medical City, MC 12345",
      href: null,
      icon: MapPin,
    },
  ];

  const socialLinks = [
    { Icon: Facebook, href: "#", name: "Facebook" },
    { Icon: Twitter, href: "#", name: "Twitter" },
    { Icon: Instagram, href: "#", name: "Instagram" },
    { Icon: Linkedin, href: "#", name: "LinkedIn" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ];
  // ==================== NEWSLETTER STATE VARIABLES ====================
  const [email, setEmail] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');

  // ==================== FUNCTIONS ====================

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle newsletter subscription
  const  handleNewsletterSubmit =async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      setConfirmation('');
      return;
    }
     try {
      const response = await axios.post('http://localhost:5000/api/subscribe', { email });
      alert(response.data.message);
      setEmail('');
    } catch (error) {
      console.log(error);
      
    }
    setError('');
    setConfirmation('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  // ==================== RENDER COMPONENTS ====================
  const renderTopSection = () => (
    <div className="text-center mb-16">
      {/* Logo and Company Name */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center mr-4 shadow-xl">
          <Heart className="w-9 h-9 text-white" />
        </div>
        <h3 className="text-4xl font-bold text-white">{companyInfo.name}</h3>
      </div>

      {/* Company Description */}
      <p className="text-gray-200 leading-relaxed text-xl max-w-2xl mx-auto mb-8">
        {companyInfo.description}
      </p>

      {/* Trust Badge */}
      <div className="inline-flex items-center space-x-3 bg-white/15 backdrop-blur-sm rounded-full px-6 py-3">
        <Heart className="w-6 h-6 text-red-400" />
        <span className="text-white font-semibold text-lg">
          {companyInfo.trustBadge}
        </span>
      </div>
    </div>
  );

  const renderMainContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
      {/* Quick Links */}
      <div className="text-center lg:text-left">
        <h4 className="text-2xl font-bold text-white mb-8">Quick Links</h4>
        <div className="grid grid-cols-2 gap-4">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-200 hover:text-white transition-all duration-300 text-lg font-medium hover:scale-105 inline-block p-2 rounded-lg hover:bg-white/10"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="text-center lg:text-left">
        <h4 className="text-2xl font-bold text-white mb-8">Get In Touch</h4>
        <div className="space-y-6">
          {contactInfo.map((contact, index) => {
            const IconComponent = contact.icon;
            const content = contact.href ? (
              <a
                href={contact.href}
                className="text-white hover:text-purple-200 transition-colors font-medium"
              >
                {contact.value}
              </a>
            ) : (
              <p className="text-gray-200">{contact.value}</p>
            );

            return (
              <div
                key={index}
                className="flex items-center justify-center lg:justify-start space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-purple-200 text-sm font-medium uppercase tracking-wide">
                    {contact.label}
                  </p>
                  <div className="text-lg">{content}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-md mx-auto text-center">
      <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '8px', borderRadius: '10px', border: '1px solid #ccc' , color: '#333'}}
          required
        />
        <button
          type="submit"
          className="w-25 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-xl group-hover:rotate-12"
        >
          Subscribe
        </button>
      </form>
      {error && <p className="mt-4 text-red-400 font-medium">{error}</p>}
      {confirmation && <p className="mt-4 text-green-400 font-medium">{confirmation}</p>}
    </div>
    </div>
  );

  const renderSocialSection = () => (
    <div className="text-center mb-12">
      <h4 className="text-2xl font-bold text-white mb-8">Connect With Us</h4>
      <div className="flex justify-center space-x-6">
        {socialLinks.map(({ Icon, href, name }, index) => {
          const isTwitter = name === "Twitter";

          return (
            <a
              key={index}
              href={href}
              aria-label={`Follow us on ${name}`}
              className="group relative"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-xl group-hover:rotate-12">
                {isTwitter ? (
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-xl group-hover:rotate-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1200 1227"
                      width="32"
                      height="32"
                      fill="white"
                    >
                      <path d="M714.492 548.125 1174.73 0H1070.63L665.52 486.5 338.729 0H0L481.446 702.833 0 1226.35H104.104L537.15 711.208 881.5 1226.35H1200L714.492 548.125ZM584.896 641.396 545.812 585.583 146.771 89.25H282.917L621.417 567.521 660.5 623.333 1070.62 1138.48H934.479L584.896 641.396Z" />
                    </svg>
                  </div>
                ) : (
                  <Icon className="w-8 h-8" />
                )}
              </div>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );

  const renderFooterBottom = () => (
    <div className="border-t border-white/20 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Copyright */}
        <div className="text-center md:text-left">
          <p className="text-gray-300 text-lg">
            &copy; 2024 {companyInfo.name}. All rights reserved.
          </p>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center md:justify-end space-x-8">
          {legalLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="text-gray-300 hover:text-white transition-colors text-lg hover:underline"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  // ==================== MAIN RENDER ====================
  return (
    <footer className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(139,92,246,0.15),_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(236,72,153,0.15),_transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-pink-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {renderTopSection()}
        {renderMainContent()}
        {renderSocialSection()}
        {renderFooterBottom()}
      </div>
    </footer>
  );
};

export default Footer;
