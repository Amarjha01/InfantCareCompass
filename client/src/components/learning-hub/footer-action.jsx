import { Award, ArrowRight } from "lucide-react";

const FooterAction = () => {
  return (
    <section className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center animate-fadeIn overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-4 left-4 w-8 h-8 bg-purple-400/20 rounded-full animate-pulse"></div>
        <div
          className="absolute top-8 right-8 w-6 h-6 bg-pink-400/20 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-6 left-1/4 w-4 h-4 bg-blue-400/20 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full border border-purple-500/30 mb-6">
          <Award className="h-5 w-5 text-purple-300" />
          <span className="text-sm font-medium text-purple-300">
            Expert-Backed Content
          </span>
        </div>

        <h2 className="text-4xl font-bold text-white mb-6">
          Dive Deeper into Developmental Science
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-purple-200/90 mb-8 leading-relaxed">
          Understand the milestones and get tailored strategies to support your
          child&apos; unique journey. Join thousands of parents who trust our
          research-backed approach.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="flex items-center space-x-2 text-purple-200/80">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm">2,847+ Active Parents</span>
          </div>
          <div className="flex items-center space-x-2 text-purple-200/80">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm">500+ Expert Articles</span>
          </div>
          <div className="flex items-center space-x-2 text-purple-200/80">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-sm">Research-Backed</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl group">
            <span className="flex items-center space-x-2">
              <span>Explore Milestones</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 active:scale-95">
            Browse All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default FooterAction;
