import React, { useState, useEffect, useRef } from "react";
import AnimatedCounter from "../components/AnimatedCounter";
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
import { useTranslation } from "react-i18next";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      id: 1,
      title: t('about.services.consultation.title'),
      icon: <Clock className="w-8 h-8" />,
      description: t('about.services.consultation.description'),
      gradient: "from-amber-400 via-orange-500 to-yellow-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      features: [
        t('about.services.consultation.features[0]'),
        t('about.services.consultation.features[1]'),
        t('about.services.consultation.features[2]'),
        t('about.services.consultation.features[3]'),
      ],
    },
    {
      id: 2,
      title: t('about.services.education.title'),
      icon: <BookOpen className="w-8 h-8" />,
      description: t('about.services.education.description'),
      gradient: "from-blue-500 via-purple-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
      features: [
        t('about.services.education.features[0]'),
        t('about.services.education.features[1]'),
        t('about.services.education.features[2]'),
        t('about.services.education.features[3]'),
      ],
    },
    {
      id: 3,
      title: t('about.services.news.title'),
      icon: <Newspaper className="w-8 h-8" />,
      description: t('about.services.news.description'),
      gradient: "from-green-500 via-teal-500 to-cyan-600",
      bgColor: "bg-gradient-to-br from-green-50 to-teal-50",
      features: [
        t('about.services.news.features[0]'),
        t('about.services.news.features[1]'),
        t('about.services.news.features[2]'),
        t('about.services.news.features[3]'),
      ],
    },
    {
      id: 4,
      title: t('about.services.ai.title'),
      icon: <Heart className="w-8 h-8" />,
      description: t('about.services.ai.description'),
      gradient: "from-pink-500 via-rose-500 to-red-500",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
      features: [
        t('about.services.ai.features[0]'),
        t('about.services.ai.features[1]'),
        t('about.services.ai.features[2]'),
        t('about.services.ai.features[3]'),
      ],
    },
  ];

  // Improved stat parser for K, +, %
  const parseStat = (str) => {
    if (str === "24/7") return { value: 24, suffix: "/7", raw: str };
    // e.g. 50K+, 98%, 1000+
    const match = str.match(/([\d,.]+)(K)?([%+])?/i);
    if (!match) return { value: str, suffix: "", raw: str };
    let value = parseFloat(match[1].replace(/,/g, ""));
    let suffix = "";
    if (match[2]) {
      value = value * 1000;
      suffix += "K";
    }
    if (match[3]) {
      suffix += match[3];
    }
    return { value, suffix, raw: str };
  };

  const stats = [
    {
      number: t('about.stats.happyParents'),
      label: t('about.stats.happyParents'),
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: t('about.stats.availability'),
      label: t('about.stats.availability'),
      icon: <Shield className="w-6 h-6" />,
    },
    {
      number: t('about.stats.expertDoctors'),
      label: t('about.stats.expertDoctors'),
      icon: <Star className="w-6 h-6" />,
    },
    {
      number: t('about.stats.consultations'),
      label: t('about.stats.consultations'),
      icon: <BookOpen className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4">
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
                {t('about.title')}
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {t('about.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const { value, suffix } = parseStat(stat.number);
                return (
                  <div
                    key={index}
                    className={`text-center group transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                      <div className="text-purple-400 mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        <AnimatedCounter
                          target={value}
                          duration={1200 + index * 300}
                          format={n => {
                            if (suffix === "K+") return `${Math.round(n / 1000)}K+`;
                            if (suffix === "K") return `${Math.round(n / 1000)}K`;
                            if (suffix === "%") return `${Math.round(n)}%`;
                            if (suffix === "+") return `${Math.round(n)}+`;
                            if (suffix === "/7") return `${Math.round(n)}/7`;
                            return Math.round(n);
                          }}
                          start={isVisible}
                        />
                      </div>
                      <div className="text-gray-300 text-sm">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4">
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
                <div
                  key={service.id}
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-700 hover:scale-105 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setActiveCard(service.id)}
                  onMouseLeave={() => setActiveCard(null)}
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
                        <div
                          key={featureIndex}
                          className={`flex items-center gap-3 transition-all duration-300 ${
                            activeCard === service.id
                              ? "opacity-100 translate-x-0"
                              : "opacity-70 translate-x-2"
                          }`}
                          style={{ transitionDelay: `${featureIndex * 100}ms` }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Learn More Button */}
                    <div className="mt-8">
                      <button className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-all duration-300 group-hover:gap-4" aria-label="Learn more about this service feature">
                        <span>{t('about.learnMore')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {t('about.cta.title')}
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {t('about.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25" aria-label="Start your free trial of Infant Care Compass">
                  {t('about.cta.buttons.trial')}
                </button>
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105" aria-label="Learn more about Infant Care Compass features and benefits">
                  {t('about.cta.buttons.learnMore')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
