import {
  Clock,
  Star,
  ArrowRight,
  Heart,
  Share2,
  Users,
  Sparkles,
} from "lucide-react";
import { getDifficultyColor, getCategoryIcon } from "../../helpers/color";
import FooterAction from "./footer-action";

const Articles = () => {
  const articles = [
    {
      title: "The Power of Play: How Games Boost Cognitive Skills",
      category: "Age 2-3",
      img: "https://neurosciencenews.com/files/2024/10/cognition-gaming-exercise-mental-health-neurosiceince.jpg.webp",
      link: "https://neurosciencenews.com/cognition-exercise-gaming-27891",
      readTime: "6 min read",
      difficulty: "Intermediate",
      rating: 4.8,
      likes: 245,
      type: "Article",
      featured: true,
      author: "Neuroscience News Staff",
      tags: ["Cognitive Development", "Games", "Play"],
    },
    {
      title: "Nurturing Empathy in Your Preschooler",
      category: "Social-Emotional",
      img: "https://ggsc.s3.us-west-2.amazonaws.com/assets/images/374_-_abcdef_-_b5a6588aa0402433fda311fa1a0782b0f6623c94.webp",
      link: "https://greatergood.berkeley.edu/article/item/why_we_should_teach_empathy_preschoolers",
      readTime: "7 min read",
      difficulty: "Beginner",
      rating: 4.9,
      likes: 198,
      type: "Guide",
      featured: false,
      author: "Greater Good Science Center",
      tags: ["Empathy", "Preschool", "Social-Emotional"],
    },
    {
      title: "Creative Crafts for Developing Fine Motor Skills",
      category: "Age 4-5",
      img: "https://cdn.prod.website-files.com/662e704eb034195395259c7c/663a38ac45463beeb50a12cb_The-Role-of-Art-and-Craft-in-Enhancing-Fine-Motor-Skills-for-Young-Children-2-1024x536.png",
      link: "https://www.fennies.com/post/the-role-of-art-and-craft-in-enhancing-fine-motor-skills-for-young-children",
      readTime: "5 min read",
      difficulty: "Easy",
      rating: 4.7,
      likes: 172,
      type: "Activity Guide",
      featured: false,
      author: "Fennies Education Team",
      tags: ["Motor Skills", "Crafts", "Creativity"],
    },
  ];

  return (
    <div className="relative">
      <div className="relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full border border-purple-500/30 mb-4">
            <Sparkles className="h-5 w-5 text-purple-300" />
            <span className="text-sm font-medium text-purple-300">
              Curated Content
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 animate-fadeIn">
            Explore Articles & Activities
          </h2>
          <p className="text-xl text-purple-200/80 max-w-2xl mx-auto animate-fadeIn">
            Discover expert-backed insights and engaging activities to support
            your child&apos; development journey
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {articles.map((article) => (
            <div
              key={article.title}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 animate-slideUp"
            >
              {article.featured && (
                <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-current" />
                  <span>Featured</span>
                </div>
              )}

              <div className="relative overflow-hidden">
                <img
                  src={article.img || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                  {getCategoryIcon(article.category)}
                  <span className="text-sm font-medium text-white">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                        article.difficulty
                      )}`}
                    >
                      {article.difficulty}
                    </div>
                    <div className="flex items-center space-x-1 text-purple-200/70 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-purple-200/70 text-xs">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span>{article.rating}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
                      {article.type}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h4>
                </div>

                <div className="flex items-center space-x-2 text-sm text-purple-200/70">
                  <Users className="h-4 w-4" />
                  <span>by {article.author}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-white/10 text-purple-200/80 px-2 py-1 rounded-full border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 2 && (
                    <span className="text-xs text-purple-200/60">
                      +{article.tags.length - 2} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-4 text-sm text-purple-200/70">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{article.likes}</span>
                    </div>
                    <button className="flex items-center space-x-1 hover:text-purple-200 transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                  <a
                    href={article.link}
                    className="flex items-center space-x-2 font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 hover:scale-105 transform"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <FooterAction />
      </div>
    </div>
  );
};

export default Articles;
