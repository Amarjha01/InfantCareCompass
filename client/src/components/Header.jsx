import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice.jsx";
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
  LogOut,
  UserCircle,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import navlogo from "/logo.png";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { to: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { to: "/about", label: "About", icon: <User className="w-4 h-4" /> },
    { to: "/blog", label: "Blog", icon: <BookOpen className="w-4 h-4" /> },
    { to: "/contactus", label: "Contact", icon: <Mail className="w-4 h-4" /> },
    { to: "/news", label: "News", icon: <Newspaper className="w-4 h-4" /> },
    {
      to: "/consultation",
      label: "Consultation",
      icon: <Phone className="w-4 h-4" />,
    },
    {
      to: "/care-co-pilot",
      label: "Care Co-Pilot",
      icon: <Heart className="w-4 h-4" />,
    },
    {
      to: "/growth-tracker",
      label: "Growth Tracker",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      to: "/contributors",
      label: "Contributors",
      icon: <Users className="w-4 h-4" />,
    },
  ];

  return (
    <>
      {/* HEADER */}
      <div
        className={`fixed top-0 left-0 h-[80px] flex right-0 z-50 transition-all duration-300 
        ${isScrolled ? "shadow-md" : ""} 
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700`}
      >

        <div className="w-full  flex items-center px-4 py-2">
          <div className="flex items-center gap-5 flex-shrink-0">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 ">

              <img
                src={navlogo}
                alt="Logo"
                className="h-12 w-12 rounded-full shadow-lg"
              />
              <div className="leading-tight">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  InfantCare
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Compass
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}

            <div className="hidden lg:flex items-center gap-2 mx-auto">

              {navItems.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow"
                        : "text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400"
                    }`
                  }
                >
                  {icon}
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Theme Toggle */}

            <div className="hidden lg:flex items-center gap-3 ml-auto">

              <ThemeToggle />
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center w-150">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-full">
                    <UserCircle className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">
                      {user.name} ({user.role === 'doctor' ? 'Doctor' : 'Patient'})
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-1.5 text-sm font-medium rounded-full transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-1.5 text-sm font-medium rounded-full transition whitespace-nowrap"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/registration"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-1.5 ml-2 text-sm font-semibold rounded-full shadow hover:scale-105 transition-transform whitespace-nowrap"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Hamburger */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="p-2 rounded-md bg-purple-100 dark:bg-gray-100 hover:bg-purple-200 dark:hover:bg-gray-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 " />
                ) : (
                  <Menu className="w-6 h-6 " />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - OUTSIDE header container */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-gray-900 shadow-xl lg:hidden"
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {navItems.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg mb-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {icon}
                  {label}
                </NavLink>
              ))}
              
              {/* Theme Toggle in Mobile Menu */}
              <div className="flex items-center justify-center p-3 mt-4">
                <ThemeToggle />
              </div>
            </div>

            <div className="p-4 border-t space-y-2">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-2">
                    <UserCircle className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">
                      {user.name} ({user.role === 'doctor' ? 'Doctor' : 'Patient'})
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 text-red-600 border border-red-600 px-4 py-2 rounded-full text-center text-sm font-medium hover:bg-red-600 hover:text-white transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-purple-600 border border-purple-600 px-4 py-2 rounded-full text-center text-sm font-medium hover:bg-purple-600 hover:text-white transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/registration"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-white rounded-full text-center text-sm font-semibold hover:scale-105 transition-transform"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
