import { BookOpen, Sparkles, Zap, TrendingUp, Play, Award } from "lucide-react";

export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-500/20 text-green-300 border-green-500/30";
    case "Medium":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    case "Hard":
      return "bg-red-500/20 text-red-300 border-red-500/30";
    default:
      return "bg-purple-500/20 text-purple-300 border-purple-500/30";
  }
};

export const getTypeIcon = (type) => {
  switch (type) {
    case "Activity":
      return <Zap className="h-4 w-4" />;
    case "Article":
      return <BookOpen className="h-4 w-4" />;
    case "Tip":
      return <Sparkles className="h-4 w-4" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
};

export const getCategoryIcon = (category) => {
  switch (category) {
    case "Development":
      return <TrendingUp className="h-4 w-4" />;
    case "Activities":
      return <Play className="h-4 w-4" />;
    case "Milestones":
      return <Award className="h-4 w-4" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
};
