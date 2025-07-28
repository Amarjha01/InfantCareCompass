import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  ArrowRight,
  Heart,
  Share2,
  BookOpen,
  Sparkles,
} from "lucide-react";

const newsData = [
  {
    id: 1,
    title: "New Guidelines for Infant Care",
    description:
      "Learn about the latest recommendations for taking care of your child, from nutrition to daily routines.",
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=200&q=80",
    link: "https://en.wikipedia.org/wiki/Newborn_care_and_safety#:~:text=Don't%20smoke%20before%20or,is%20comfortable%20for%20an%20adult.",
    category: "Health",
    date: "2 days ago",
    readTime: "5 min read",
    author: "Dr. Sarah Wilson",
    featured: true,
  },
  {
    id: 2,
    title: "The Benefits of Vaccination",
    description:
      "Explore how vaccinations can protect your child and ensure a healthy future.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=200&q=80",
    link: "https://www.who.int/health-topics/vaccines-and-immunization#tab=tab_1",
    category: "Prevention",
    date: "4 days ago",
    readTime: "7 min read",
    author: "Dr. Michael Chen",
    featured: false,
  },
  {
    id: 3,
    title: "Top Childcare Tips for 2024",
    description:
      "A comprehensive guide to the best childcare practices recommended by experts this year.",
    image:
      "https://images.unsplash.com/photo-1541557435984-1c79685a082b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=200&q=80",
    link: "https://en.wikipedia.org/wiki/Child_care",
    category: "Tips",
    date: "1 week ago",
    readTime: "12 min read",
    author: "Emma Rodriguez",
    featured: false,
  },
  {
    id: 4,
    title: "AI in First Aid for Kids",
    description:
      "Discover how artificial intelligence is transforming first aid practices for children.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=200&q=80",
    link: "https://en.wikipedia.org/wiki/First_aid",
    category: "Technology",
    date: "2 weeks ago",
    readTime: "8 min read",
    author: "Dr. Alex Johnson",
    featured: true,
  },
];

const categoryColors = {
  Health: "bg-emerald-100 text-emerald-800",
  Prevention: "bg-blue-100 text-blue-800",
  Tips: "bg-purple-100 text-purple-800",
  Technology: "bg-orange-100 text-orange-800",
};

const News = () => {
  const [likedArticles, setLikedArticles] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const toggleLike = (articleId) => {
    setLikedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const handleReadMore = (link) => {
    try {
      // Check if the route exists before navigating
      if (isValidRoute(link)) {
        navigate(link);
      } else {
        // Fallback to a generic article page with the article ID
        const articleId = link.split("/").pop();
        navigate(`/article/${articleId}`, { state: { notFound: true } });
      }
    } catch (error) {
      console.error("Navigation error:", error);
      navigate("/error", { state: { error: error.message } });
    }
  };

  // This would be replaced with your actual route validation logic
  const isValidRoute = (path) => {
    // In a real app, you might check against your route configuration
    return newsData.some((article) => article.link === path);
  };

  const NewsCard = ({ news, index }) => {
    const isLiked = likedArticles.has(news.id);
    const isHovered = hoveredCard === news.id;
    const [imageError, setImageError] = useState(false);

    return (
      <div
        className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl  transition-all duration-500 transform hover:-translate-y-2 ${
          news.featured ? " from-indigo-500 to-purple-500" : ""
        }`}
        style={{
          animationDelay: `${index * 0.1}s`,
        }}

        onMouseEnter={() => setHoveredCard(news.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Featured Badge */}
        {newsData.featured && (
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-lg">
            <Sparkles className="w-4 h-4 mr-1" />
            Featured
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {imageError ? (
            <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-indigo-300" />
            </div>
          ) : (
            <img
              src={news.image}
              alt={news.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Floating Action Buttons */}
          <div
            className={`absolute top-4 right-4 flex space-x-2 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(news.id);
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                isLiked
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-white/80 text-gray-700 hover:bg-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white transition-all duration-300"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta Information */}
          <div className="flex items-center justify-between mb-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                categoryColors[news.category]
              }`}
            >
              {news.category}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {news.date}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
            {news.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-3">{news.description}</p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {news.readTime}
            </div>

            <a
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300 group/btn"
            >
              <span className="mr-2">Read More</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </div>

          {/* Author */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {news.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span className="ml-3 text-sm text-gray-600">
                By {news.author}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-6 shadow-lg animate-pulse">
            <BookOpen className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fadeIn">
            Latest News & Updates
          </h1>

          <p
            className="text-xl text-gray-600 max-w-2xl mx-auto animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            Stay informed with the latest developments in childcare, health, and
            technology
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* News Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news, index) => (
            <div key={news.id} className="animate-slideUp">
              <NewsCard news={news} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center pb-20">
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Load More Articles
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out both;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out both;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default News;