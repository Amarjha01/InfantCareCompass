import React, { useState, useEffect } from "react";
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  Sparkles,
  Eye,
  Heart,
  Share2,
  BookOpen,
  TrendingUp,
  Star,
} from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Top 10 Parenting Tips for Newborns",
    description: `Learn the most essential tips to take care of your newborn. From feeding schedules to sleep routines, we've got you covered with expert advice.`,
    image:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=400&fit=crop",
    date: "December 20, 2024",
    author: "Dr. Sarah Johnson",
    readTime: "8 min read",
    category: "Newborn Care",
    views: "2.4k",
    likes: 156,
    featured: true,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 2,
    title: "Understanding Infant Vaccinations",
    description: `Everything you need to know about your child's vaccination schedule and why timely vaccinations are crucial for their health.`,
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    date: "December 15, 2024",
    author: "Dr. Emily Brown",
    readTime: "6 min read",
    category: "Health",
    views: "3.1k",
    likes: 203,
    featured: false,
    gradient: "from-blue-500 to-purple-500",
  },
  {
    id: 3,
    title: `5 Foods to Boost Your Child's Immunity`,
    description: `Discover the best foods to strengthen your child's immune system and keep them healthy during seasonal changes.`,
    image:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=400&fit=crop",
    date: "December 10, 2024",
    author: "Dr. Michael Smith",
    readTime: "5 min read",
    category: "Nutrition",
    views: "1.8k",
    likes: 124,
    featured: false,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    title: "Creating the Perfect Sleep Environment",
    description:
      "Essential tips for creating a safe and comfortable sleep space that promotes healthy sleep patterns for your infant.",
    image:
      "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&h=400&fit=crop",
    date: "December 5, 2024",
    author: "Dr. Lisa Chen",
    readTime: "7 min read",
    category: "Sleep",
    views: "2.7k",
    likes: 189,
    featured: false,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: 5,
    title: "The Ultimate Guide to Baby-Proofing Your Home",
    description:
      "Complete checklist and expert advice on making your home safe for your curious little explorer.",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    date: "November 30, 2024",
    author: "Dr. James Wilson",
    readTime: "10 min read",
    category: "Safety",
    views: "4.2k",
    likes: 267,
    featured: true,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 6,
    title: "Milestones Every Parent Should Know",
    description: `Track your child's development with this comprehensive guide to important milestones in their first year.`,
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop",
    date: "November 25, 2024",
    author: "Dr. Maria Rodriguez",
    readTime: "9 min read",
    category: "Development",
    views: "3.5k",
    likes: 215,
    featured: false,
    gradient: "from-cyan-500 to-blue-500",
  },
];

const categories = [
  "All",
  "Newborn Care",
  "Health",
  "Nutrition",
  "Sleep",
  "Safety",
  "Development",
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [isVisible, setIsVisible] = useState({});

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlogs = filteredBlogs.filter((blog) => blog.featured);
  const regularBlogs = filteredBlogs.filter((blog) => !blog.featured);

  const handleLike = (blogId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(blogId)) {
        newSet.delete(blogId);
      } else {
        newSet.add(blogId);
      }
      return newSet;
    });
  };

  const BlogCard = ({ blog, featured = false }) => (
    <div
      className={`group relative overflow-hidden transition-all rounded-3xl duration-500 hover:scale-105 ${
        featured ? "lg:col-span-1 lg:row-span-1" : ""
      }`}
    >
      <div className="relative h-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className={`w-full object-cover transition-all duration-700 group-hover:scale-110 ${
              featured ? "h-64 lg:h-80" : "h-48"
            }`}
          />

          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          ></div>

          {/* Category Badge */}
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${blog.gradient} shadow-lg`}
          >
            {blog.category}
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <button
              onClick={() => handleLike(blog.id)}
              className={`p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 ${
                likedPosts.has(blog.id)
                  ? "bg-red-500/80 text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  likedPosts.has(blog.id) ? "fill-current" : ""
                }`}
              />
            </button>
            <button className="p-2 rounded-full backdrop-blur-sm bg-white/20 border border-white/20 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className={`p-6 ${featured ? "lg:p-8" : ""}`}>
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          <h2
            className={`font-bold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300 ${
              featured ? "text-2xl lg:text-3xl" : "text-xl"
            }`}
          >
            {blog.title}
          </h2>

          <p
            className={`text-gray-300 mb-6 leading-relaxed ${
              featured ? "text-base lg:text-lg" : "text-sm"
            }`}
          >
            {blog.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{blog.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{blog.likes + (likedPosts.has(blog.id) ? 1 : 0)}</span>
              </div>
            </div>

            <button className="group/btn flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-all duration-300">
              Read More
              <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <BookOpen className="w-16 h-16 text-blue-400" />
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Expert Insights
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover evidence-based articles, expert advice, and practical tips
            to support your parenting journey with confidence and knowledge.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredBlogs.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">
                Featured Articles
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {featuredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        {regularBlogs.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-white/10 rounded-full flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-4">
              No Articles Found
            </h3>
            <p className="text-gray-400 mb-8">
              Try adjusting your search terms or category filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300"
            >
              Show All Articles
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredBlogs.length > 0 && (
          <div className="text-center mt-16">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
              <div className="flex items-center gap-2">
                Load More Articles
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
