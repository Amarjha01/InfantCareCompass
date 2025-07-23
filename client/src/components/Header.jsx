import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Home, User, BookOpen, Mail, Newspaper, Phone, Menu, X
} from "lucide-react";
// import navlogo from "../assets/navlogo.jpg";
import navlogo from "/logo.png";
import { motion } from "motion/react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { to: "/about", label: "About", icon: <User className="w-4 h-4" /> },
    { to: "/blog", label: "Blog", icon: <BookOpen className="w-4 h-4" /> },
    { to: "/contactus", label: "Contact", icon: <Mail className="w-4 h-4" /> },
    { to: "/news", label: "News", icon: <Newspaper className="w-4 h-4" /> },
    { to: "/consultation", label: "Consultation", icon: <Phone className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full fixed top-0 z-50 bg-white/40 backdrop-blur-2xl shadow-sm border-b">
      <header
        className={`transition-all duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between min-h-[64px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={navlogo}
              alt="Logo"
              className="h-12 w-12 object-contain rounded-full shadow"
            />
            <div className="leading-tight">
              <h1 className="text-lg font-bold text-gray-900">InfantCare</h1>
              <p className="text-[10px] text-gray-500 -mt-1">Compass</p>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                  ${isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600 hover:scale-110 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400/30"}
                  `
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/signin"
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-1.5 rounded-md text-sm transition duration-300 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400/30"
            >
              Sign In
            </Link>
            <Link
              to="/registration"
              className="bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-1.5 rounded-full text-white font-medium text-sm hover:scale-110 hover:shadow-lg hover:from-pink-600 hover:to-rose-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400/30"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
          initial={{opacity:0, y:-1}}
          animate={{opacity:1, y:0}}
          transition={{duration:0.4, ease:"easeInOut"}}
           className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-2">
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              <Link
                to="/signin"
                className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md text-sm text-center"
              >
                Sign In
              </Link>
              <Link
                to="/registration"
                className="bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-2 rounded-full text-white text-sm font-semibold text-center"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </header>
    </div>
  );
}
