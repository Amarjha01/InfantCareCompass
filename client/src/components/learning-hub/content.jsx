import { useState } from "react";
import {
  BookOpen,
  TrendingUp,
  Heart,
  Mail,
  Star,
  Trophy,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react";
import { getDifficultyColor, getTypeIcon } from "../../helpers/color.jsx";

const InteractiveHubSection = () => {
  const [email, setEmail] = useState("");

  const recommendations = [
    {
      title: "Activity: Story Builder Game",
      link: "#",
      type: "Activity",
      duration: "15 min",
      difficulty: "Easy",
    },
    {
      title: "Article: The Importance of Routine",
      link: "#",
      type: "Article",
      duration: "8 min",
      difficulty: "Medium",
    },
    {
      title: "Tip: Mindful Listening Practice",
      link: "#",
      type: "Tip",
      duration: "5 min",
      difficulty: "Easy",
    },
  ];

  const favorites = [
    {
      title: "Creative Crafts Article",
      link: "#",
      rating: 4.8,
      saves: 234,
    },
    {
      title: "Empathy Building Activities",
      link: "#",
      rating: 4.9,
      saves: 189,
    },
  ];

  const milestones = [
    { name: "First Steps", completed: true },
    { name: "Building Blocks", completed: true },
    { name: "Growing Strong", completed: true },
    { name: "Advanced Skills", completed: false },
    { name: "Mastery Level", completed: false },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16 relative">
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative bg-gradient-to-br from-black/30 to-black/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 animate-slideUp group hover:scale-[1.02] transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
                <BookOpen className="h-6 w-6 text-purple-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white">
                  Today&apos; Picks
                </h3>
                <p className="text-sm text-purple-200/70">Curated for you</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
              <Sparkles className="h-4 w-4 text-purple-300" />
              <span className="text-sm font-medium text-purple-300">New</span>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.map((item, i) => (
              <div
                key={i}
                className="group/item p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 animate-slideIn"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1 text-purple-300">
                        {getTypeIcon(item.type)}
                        <span className="text-xs font-medium">{item.type}</span>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                          item.difficulty
                        )}`}
                      >
                        {item.difficulty}
                      </div>
                    </div>
                    <h4 className="text-white font-medium group-hover/item:text-purple-200 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center space-x-3 mt-2 text-xs text-purple-200/70">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-purple-300 opacity-0 group-hover/item:opacity-100 transform translate-x-2 group-hover/item:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-black/30 to-black/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 animate-slideUp group hover:scale-[1.02] transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl border border-green-500/30">
                <TrendingUp className="h-6 w-6 text-green-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white">Progress</h3>
                <p className="text-sm text-green-200/70">Keep it up!</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
              <Trophy className="h-4 w-4 text-green-300" />
              <span className="text-sm font-medium text-green-300">60%</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">3 of 5</div>
              <p className="text-green-200/70">Milestones Completed</p>
            </div>

            <div className="space-y-3">
              {milestones.map((milestone, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      milestone.completed
                        ? "bg-green-500 border-green-500"
                        : "border-white/30 hover:border-green-500/50"
                    }`}
                  >
                    {milestone.completed && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      milestone.completed ? "text-white" : "text-white/50"
                    }`}
                  >
                    {milestone.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 h-full rounded-full transition-all duration-1000 ease-out relative">
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 text-white font-semibold py-3 px-6 rounded-2xl border border-green-500/30 hover:border-green-500/50 transition-all duration-300 group/btn">
              <span className="flex items-center justify-center space-x-2">
                <span>View Full Report</span>
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-black/30 to-black/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 animate-slideUp group hover:scale-[1.02] transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-2xl border border-pink-500/30">
                <Heart className="h-6 w-6 text-pink-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white">Favorites</h3>
                <p className="text-sm text-pink-200/70">Your top picks</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 bg-pink-500/20 px-3 py-1 rounded-full border border-pink-500/30">
              <Star className="h-4 w-4 text-pink-300" />
              <span className="text-sm font-medium text-pink-300">
                {favorites.length}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {favorites.map((item, i) => (
              <div
                key={i}
                className="group/item p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-medium group-hover/item:text-pink-200 transition-colors mb-3">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-pink-200/70">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{item.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{item.saves} saves</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-pink-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 bg-gradient-to-r from-pink-500/20 to-red-500/20 hover:from-pink-500/30 hover:to-red-500/30 py-3 px-6 rounded-2xl fixed-bottom-4">
            <span className="flex items-center justify-center space-x-2">
              <span>Browse All Favorites</span>
              <Heart className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-black/30 to-black/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30">
                <Mail className="h-6 w-6 text-blue-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white">Weekly Tips</h3>
                <p className="text-sm text-blue-200/70">Stay updated</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
              <Sparkles className="h-4 w-4 text-blue-300" />
              <span className="text-sm font-medium text-blue-300">Free</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-blue-200/90 leading-relaxed">
                Join <span className="font-semibold text-white">2,847</span>{" "}
                parents getting weekly developmental science tips delivered to
                their inbox.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-lg font-bold text-white">📚</div>
                <div className="text-xs text-blue-200/70 mt-1">Expert Tips</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-lg font-bold text-white">🎯</div>
                <div className="text-xs text-blue-200/70 mt-1">
                  Age-Specific
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-lg font-bold text-white">⚡</div>
                <div className="text-xs text-blue-200/70 mt-1">Quick Reads</div>
              </div>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-white/10 text-white placeholder-blue-200/50 border border-white/20 focus:border-blue-400 rounded-2xl px-4 py-4 transition-all duration-300 outline-none"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Subscribe Now</span>
                  <Mail className="h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveHubSection;
