import React, { useState, useEffect } from "react";
import {
  Heart,
  Shield,
  BookOpen,
  Users,
  Star,
  ArrowRight,
  Play,
  Sparkles,
  Baby,
  Phone,
  Calendar,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate(); // ✅ Add this if missing
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      setIsVisible((prev) => ({
        ...prev,
        [entry.target.id]: entry.isIntersecting,
      }));
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "-50px",
    });

    document.querySelectorAll("[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const FloatingElement = ({ children, delay = 0 }) => (
    <div
      className="animate-pulse"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: "3s",
      }}
    >
      {children}
    </div>
  );

  const GlassCard = ({ children, className = "", hover = true }) => (
    <div
      className={`
      backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl
      shadow-2xl transition-all duration-500 ease-out
      ${hover ? "hover:bg-white/20 hover: hover:shadow-3xl " : ""}
      ${className}
    `}
    >
      {children}
    </div>
  );

  const services = [
    {
      icon: <Calendar className="w-12 h-12" />,
      title: "Smart Vaccination Tracking",
      description:
        "AI-powered reminders and personalized schedules that adapt to your child's needs",
      color: "from-blue-500 to-purple-600",
      image:
        "https://res.cloudinary.com/dbnticsz8/image/upload/v1734934194/Infant%20care%20Compass/gheqjy0npqdkyhgqds43.png",
      link: "#",
    },
    {
      icon: <Phone className="w-12 h-12" />,
      title: "Instant Expert Care",
      description:
        "24/7 access to pediatric specialists with video consultations and real-time support",
      color: "from-emerald-500 to-teal-600",
      image:
        "https://res.cloudinary.com/dbnticsz8/image/upload/v1734935048/Infant%20care%20Compass/crqtr4wfu69wmqnulmja.png",

      link: "#",
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Personalized Learning Hub",
      description:
        "Curated content that grows with your child, powered by developmental science",
      color: "from-pink-500 to-rose-600",
      image:
        "https://res.cloudinary.com/dbnticsz8/image/upload/v1734935847/Infant%20care%20Compass/yf0tea4dqhjf4ww3hjcz.png",
      link: "/learning-hub",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "New Mom",
      content:
        "The AI-powered insights helped me understand my baby's needs like never before. It's like having a pediatrician in your pocket!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1509868918748-a554ad25f858?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Michael Rodriguez",
      role: "Father of Two",
      content:
        "The community support and expert consultations saved us countless sleepless nights. Truly revolutionary!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Emily Johnson",
      role: "Pediatric Nurse",
      content:
        "As a healthcare professional, I'm impressed by the accuracy and quality of information. I recommend it to all my patients.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Samuel Lee",
      role: "Father of Two",
      content:
        "The community support and expert consultations saved us countless sleepless nights. Truly revolutionary!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "julie Smith",
      role: "Pediatric Nurse",
      content:
        "As a healthcare professional, I'm impressed by the accuracy and quality of information. I recommend it to all my patients.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1512288094938-363287817259?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden ">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Mouse Follower Effect */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <FloatingElement>
            <div className="mb-8">
              <Sparkles
                className="w-16 h-16 mx-auto mb-4 text-yellow-400 animate-spin"
                style={{ animationDuration: "4s" }}
              />
            </div>
          </FloatingElement>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
              InfantCare
              <br />
              <span className="text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Compass
              </span>
            </h1>

            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                Revolutionary AI-powered platform transforming how parents
                navigate their child's early years with
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold">
                  {" "}
                  confidence
                </span>
                ,
                <span className="text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text font-semibold">
                  {" "}
                  support
                </span>
                , and
                <span className="text-transparent bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text font-semibold">
                  {" "}
                  love
                </span>
                .
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <button
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
                onClick={() => navigate("/signin")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                className="group flex items-center gap-3 px-6 py-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
                onClick={() => {
                  const demoSection = document.getElementById("demo");
                  demoSection.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="absolute top-20 left-10 hidden lg:block">
          <FloatingElement delay={0.5}>
            <GlassCard className="p-4 w-48">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-pink-400" />
                <div>
                  <p className="font-semibold">98% Satisfaction</p>
                  <p className="text-sm text-gray-400">Happy Parents</p>
                </div>
              </div>
            </GlassCard>
          </FloatingElement>
        </div>

        <div className="absolute bottom-32 right-10 hidden lg:block">
          <FloatingElement delay={1}>
            <GlassCard className="p-4 w-48">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-emerald-400" />
                <div>
                  <p className="font-semibold">24/7 Support</p>
                  <p className="text-sm text-gray-400">Always Available</p>
                </div>
              </div>
            </GlassCard>
          </FloatingElement>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative overflow-x-visible z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Revolutionary Care Solutions
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover how our cutting-edge technology transforms childcare into
              an intuitive, supported experience.
            </p>
          </div>
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 200,
              modifier: 1,
              scale: 0.9,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2500, // 2.5 seconds
              disableOnInteraction: false, // Keeps autoplay running after user swipe
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full max-w-6xl mx-auto"
          >
            {services.map((service, index) => (
              <div key={index} className="group relative">
                <GlassCard className="p-8 h-full group-hover:bg-white/15">
                  <div className="relative">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {service.icon}
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {service.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="overflow-hidden rounded-xl mb-6">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      <Link to={service.link}>Learn More</Link>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </GlassCard>
                <SwiperSlide key={index} className="!w-80 !flex-shrink-0">
                  <GlassCard className="p-6 text-white text-center">
                    <div
                      className={`bg-gradient-to-br ${service.color} p-4 rounded-full inline-block`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mt-4">{service.title}</h3>
                    <p className="text-white-600 mt-2">{service.description}</p>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="mt-4 rounded-xl w-full h-40 object-cover"
                    />
                    <p className="mt-3 text-blue-600 font-medium">
                      Learn More →
                    </p>
                  </GlassCard>
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 relative bg-black/5 overflow-x-visible">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-left text-center font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Creating Magical Childhood Moments
              </h2>
              <p className="text-xl md:text-left text-center text-gray-300 mb-8 leading-relaxed">
                Every smile, every milestone, every precious moment deserves to
                be celebrated and supported with the best care possible.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8 items-center">
                <div className="md:text-left text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    50K+
                  </div>
                  <div className="text-gray-400">Happy Families</div>
                </div>
                <div className="md:text-left text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">
                    99.9%
                  </div>
                  <div className="text-gray-400">Uptime</div>
                </div>
              </div>
              <div className="flex justify-center md:justify-start">
                <button
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  onClick={() => navigate("/signin")}
                >
                  Join Our Community
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                "https://res.cloudinary.com/dbnticsz8/image/upload/v1734936845/Infant%20care%20Compass/rrhakzuhcryo7dewe57i.png",
                "https://res.cloudinary.com/dbnticsz8/image/upload/v1734936923/Infant%20care%20Compass/rx6c2iojkbym0u0nm8ph.png",
                "https://res.cloudinary.com/dbnticsz8/image/upload/v1734937330/Infant%20care%20Compass/ffktzdwhwkarwjhtvmnn.png",
              ].map((src, index) => (
                <div
                  key={index}
                  className={`${index === 2 ? "col-span-2" : ""}`}
                >
                  <div className="group relative overflow-hidden rounded-2xl">
                    <img
                      src={src}
                      alt={`Happy moment ${index + 1}`}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 relative" id="demo">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              See It In Action
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Watch our quick demo to see how InfantCareCompass makes parenting
              easier
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
            <div className="aspect-w-16 aspect-h-9 bg-black/20">
              <iframe
                className="w-full h-[500px]"
                src="https://www.youtube.com/embed/your-video-id"
                title="InfantCareCompass Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group hover:bg-white/30 transition-all duration-300 cursor-pointer">
                <Play
                  className="w-12 h-12 text-white ml-2 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Calendar className="w-8 h-8 text-blue-400" />,
                title: "Vaccination Tracking",
                description:
                  "Never miss an important vaccination with our smart tracking system",
              },
              {
                icon: <BookOpen className="w-8 h-8 text-purple-400" />,
                title: "Milestone Monitoring",
                description:
                  "Track your baby's growth and development with ease",
              },
              {
                icon: <Users className="w-8 h-8 text-pink-400" />,
                title: "Expert Community",
                description:
                  "Connect with other parents and healthcare professionals",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Voices of Trust
            </h2>
            <p className="text-xl text-gray-400">
              Real stories from parents who've transformed their journey with us
            </p>
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Autoplay, Pagination]}
            className="w-full overflow-visible pb-10"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <GlassCard className="p-8 relative group" hover={true}>
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <GlassCard className="p-12">
            <Baby className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Transform Your Parenting Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of parents who've discovered the confidence,
              support, and joy of modern childcare.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
                onClick={() => navigate("/signin")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="relative flex justify-center items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                className="px-8 py-4 border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
                onClick={() => navigate("/signin")}
              >
                Schedule Demo
              </button>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
