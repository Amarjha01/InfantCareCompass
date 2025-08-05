"use client";

import "react";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
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
import { showErrorToast, showSuccessToast } from "../helpers/utils";
import commnApiEndpoint from "../common/backendAPI";

const Footer = () => {
  // ==================== STATE ====================
  const [email, setEmail] = useState("");

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
    { name: "Services", href: "/services" },
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

  // ==================== FUNCTIONS ====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(commnApiEndpoint.newsletter.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      showSuccessToast(data.message);
      setEmail("");
    } catch (error) {
      showErrorToast(error.message || "Something went wrong!");
    }
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
      <div className="flex justify-center">
        <div>
        <h4 className="text-2xl text-center font-bold text-white mb-8">Get In Touch</h4>
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
      </div>
      {/* Newsletter */}
      <div className="text-center lg:text-left">
        <h4 className="text-2xl font-bold text-white mb-8">Stay Updated</h4>
        <div className="space-y-6">
          <p className="text-gray-200 text-lg">
            Get health tips and updates delivered to your inbox
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:border-purple-400 focus:bg-white/25 transition-all text-white placeholder-gray-300 text-lg"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Subscribe Now</span>
              <ExternalLink className="w-5 h-5" />
            </button>
          </form>
        </div>
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
    <footer className="relative bg-gradient-to-br from-[#502478] to-[#9157C7] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[size:20px_20px]"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                HealthCare+
              </h3>
            </div>
            <p className="text-gray-100 leading-relaxed mb-6">
              Providing exceptional healthcare service and care to all our patients.
              Your health is our priority, and we are here to help you every step of the way.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Trusted by 10,000+ families
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Doctors", href: "/doctors" },
                { name: "Appointments", href: "/appointments" },
                { name: "Contact", href: "/contact" }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group flex items-center text-gray-100 hover:text-purple-200 transition-all duration-300 hover:translate-x-1 font-semibold"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 relative">
              Contact Info
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm">Email</p>
                  <a
                    href="mailto:help@infantcarecompass.live"
                    className="text-white hover:text-purple-200 transition-colors font-semibold"
                  >
                    help@infantcarecompass.live
                  </a>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm">Phone</p>
                  <a
                    href="tel:+919956****"
                    className="text-white hover:text-purple-200 transition-colors font-semibold"
                  >
                    +91 919956****
                  </a>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-500/20 transition-colors">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm">Address</p>
                  <p className="text-white font-semibold">
                    123 Healthcare Ave, Medical City
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 relative">
              Stay Connected
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </h4>
            <div className="mb-6">
              <p className="text-gray-100 text-sm mb-4">
                Subscribe to our newsletter for health tips and updates
              </p>
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-white/20 border border-white/30 rounded-l-lg focus:outline-none focus:border-purple-400 transition-colors text-white placeholder-gray-200"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-white"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </form>
            </div>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:text-purple-200 hover:bg-white/20 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center text-sm text-white">
          <p>&copy; 2024 HealthCare+. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-purple-200">Privacy Policy</a>
            <a href="#" className="hover:text-purple-200">Terms of Service</a>
            <a href="#" className="hover:text-purple-200">Cookie Policy</a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
