import React, { useState, useEffect } from "react";
import {
  Clock,
  BookOpen,
  Newspaper,
  Heart,
  Shield,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      id: 1,
      title: "24/7 Consultation",
      icon: <Clock className="w-8 h-8" />,
      description:
        "We connect parents with pediatric experts for one-on-one virtual consultations, available around the clock. This ensures access to professional advice at any time, making it easier to handle both emergencies and routine health concerns from the comfort of your home.",
      gradient: "from-amber-400 via-orange-500 to-yellow-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      features: [
        "24/7 Availability",
        "Expert Pediatricians",
        "Virtual Consultations",
        "Emergency Support",
      ],
    },
    {
      id: 2,
      title: "Childcare Education",
      icon: <BookOpen className="w-8 h-8" />,
      description:
        "Our platform offers a library of expertly curated articles and educational content, guiding parents at every stage of their child's development. From nutrition and safety to growth tips, we ensure you have the knowledge needed for excellent child care.",
      gradient: "from-blue-500 via-purple-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
      features: [
        "Curated Content",
        "Development Guides",
        "Safety Tips",
        "Nutrition Advice",
      ],
    },
    {
      id: 3,
      title: "News and Updates",
      icon: <Newspaper className="w-8 h-8" />,
      description:
        "Stay informed with our regularly updated news section, featuring the latest developments in pediatric health, safety, and childcare practices. We make sure you're equipped with accurate and timely information to make the best decisions for your family.",
      gradient: "from-green-500 via-teal-500 to-cyan-600",
      bgColor: "bg-gradient-to-br from-green-50 to-teal-50",
      features: [
        "Latest Updates",
        "Health News",
        "Safety Alerts",
        "Expert Insights",
      ],
    },
    {
      id: 4,
      title: "AI-Driven First Aid",
      icon: <Heart className="w-8 h-8" />,
      description:
        "Our intelligent AI-powered first aid guide provides parents with step-by-step instructions for handling common infant health issues. Whether it's a fever or minor injury, you can trust our tool to guide you until professional help is available.",
      gradient: "from-pink-500 via-rose-500 to-red-500",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
      features: [
        "AI-Powered",
        "Step-by-Step Guide",
        "Emergency Response",
        "Instant Help",
      ],
    },
  ];

  const stats = [
    {
      number: "50K+",
      label: "Happy Parents",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "24/7",
      label: "Expert Support",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      number: "98%",
      label: "Satisfaction Rate",
      icon: <Star className="w-6 h-6" />,
    },
    {
      number: "1000+",
      label: "Health Articles",
      icon: <BookOpen className="w-6 h-6" />,
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden"
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
        ></motion.div>
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.7 }}
        ></motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          className="py-20 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="container mx-auto max-w-6xl">
            <div
              className={`text-center transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-2 mb-6">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">
                  Welcome to InfantCareCompass
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                About Us
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                At{" "}
                <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  InfantCareCompass
                </span>
                , we are committed to supporting parents and caregivers by
                offering comprehensive child care services, including 24/7
                consultations, insightful news, and educational resources.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          className="py-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`text-center group transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                    <div className="text-purple-400 mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          className="py-20 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Our Services
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Comprehensive care solutions designed to support you at every
                step of your parenting journey
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-700 hover:scale-105 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setActiveCard(service.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  {/* Card Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                  ></div>

                  {/* Card Content */}
                  <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-8 h-full">
                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{service.icon}</div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className={`flex items-center gap-3 transition-all duration-300 ${
                            activeCard === service.id
                              ? "opacity-100 translate-x-0"
                              : "opacity-70 translate-x-2"
                          }`}
                          style={{ transitionDelay: `${featureIndex * 100}ms` }}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.4, delay: featureIndex * 0.07 }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Learn More Button */}
                    <div className="mt-8">
                      <button className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-all duration-300 group-hover:gap-4">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-20 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="container mx-auto max-w-4xl">
            <div className="text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of parents who trust InfantCareCompass for their
                child's health and development needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                  Start Free Trial
                </button>
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default About;
