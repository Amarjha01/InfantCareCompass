import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Home,
  User,
  BookOpen,
  Mail,
  Newspaper,
  Phone,
  Menu,
  X,
  Users,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import navlogo from "/logo.png";

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
    { to: "/care-co-pilot", label: "Care Co-Pilot", icon: <Heart className="w-4 h-4" /> },
    { to: "/contributors", label: "Contributors", icon: <Users className="w-4 h-4" /> },
    { to: "/babyfeeder", label: "Baby Feeder", icon: <User className="w-4 h-4" /> },
    { to: "/sleeper", label: "Sleeper", icon: <User className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* HEADER */}
      <div
        className={`fixed top-0 left-0 h-[80px] flex items-center right-0 z-50 transition-all duration-300 
        ${isScrolled ? "shadow-md" : ""} 
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700`}
      >
        <div className="w-full px-4 py-2">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={navlogo}
                alt="Logo"
                className="h-12 w-12 rounded-full shadow-lg"
              />
              <div className="leading-tight">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  InfantCare
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Compass</p>
              </div>
            </Link>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-2 flex-wrap max-w-full overflow-x-auto">
                {navItems.map(({ to, label, icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                          : "text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400"
                      }`
                    }
                  >
                    {icon}
                    {label}
                  </NavLink>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  to="/signin"
                  className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-1.5 text-sm font-medium rounded-full transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/registration"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-1.5 text-sm font-semibold rounded-full shadow hover:scale-105 transition-transform"
                >
                  Get Started
                </Link>
              </div>

              {/* Hamburger */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle mobile menu"
                  className="p-2 rounded-md bg-purple-100 dark:bg-gray-800 hover:bg-purple-200 dark:hover:bg-gray-700"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white dark:bg-gray-900 px-4 pt-4 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-700"
          >
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Link
                to="/signin"
                className="w-full text-purple-600 border border-purple-600 px-4 py-2 rounded-full text-center text-sm font-medium hover:bg-purple-600 hover:text-white transition"
              >
                Sign In
              </Link>
              <Link
                to="/registration"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-white rounded-full text-center text-sm font-semibold hover:scale-105 transition-transform"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
