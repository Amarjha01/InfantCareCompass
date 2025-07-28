import "react";
import { toast,ToastContainer } from "react-toastify";
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
  ArrowUp,
  ExternalLink
} from "lucide-react";
import { showErrorToast, showSuccessToast } from "../helpers/utils";
import commnApiEndpoint from "../common/backendAPI";

const Footer = () => {
  const [email, setemail] = useState("")
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      setemail("");
    } catch (error) {
      showErrorToast(error);
    }



  }
  const handlechange = (e) => {
    e.preventDefault();
    setemail(e.target.value);
  }
  // console.log(email);

  return (
    <footer className="relative bg-gradient-to-br from-[#502478] to-[#9157C7] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[size:20px_20px]"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Grid Layout for Footer */}
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
              Your health is our priority, and We are here to help you every step of the way.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Trusted by 10,000+ families</span>
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
                  <p className="text-gray-100">123 Healthcare Ave, Medical City, MC 12345</p>
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

            {/* Newsletter Signup */}
            <div className="mb-6">
              <p className="text-gray-100 text-sm mb-4">
                Subscribe to our newsletter for health tips and updates
              </p>
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={handlechange}
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-white/20 border border-white/30 rounded-l-lg focus:outline-none focus:border-purple-400 transition-colors text-white placeholder-gray-200"
                />
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-white">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Social Media Links */}
            <div>
              <p className="text-gray-100 text-sm mb-4">Follow us on social media</p>
              <div className="flex space-x-3">
                {[
                  { Icon: Facebook, href: "#" },
                  { Icon: Twitter, href: "#" },
                  { Icon: Instagram, href: "#" },
                  { Icon: Linkedin, href: "#" }
                ].map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:text-purple-200 hover:bg-white/20 transition-all duration-300`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm font-semibold text-white">
              <p>&copy; 2024 HealthCare+. All rights reserved.</p>
              <a href="#" className="hover:text-purple-200 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-200 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-purple-200 transition-colors">Cookie Policy</a>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 text-sm text-white hover:text-purple-200 transition-all duration-300 hover:translate-y-[-2px]"
            >
              <span>Back to top</span>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                <ArrowUp className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      <ToastContainer/>
    </footer>

  );
};

export default Footer;