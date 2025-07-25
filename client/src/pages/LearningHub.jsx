import Articles from "../components/learning-hub/articles.jsx";
import InteractiveHubSection from "../components/learning-hub/content.jsx";
import { Book } from "lucide-react";

const PersonalizedLearningHub = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e103a] via-[#2a1a4c] to-[#3c2a6c] text-white font-sans relative overflow-hidden">
      <div className="absolute top-20 -left-10 w-48 h-48 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 animate-float"></div>
      <div
        className="absolute bottom-10 -right-10 w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-float"
      ></div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <header className="text-center mb-16">
          <div className="inline-block p-5 bg-pink-500/80 rounded-2xl mb-6 animate-fadeIn">
            <Book className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4 animate-fadeIn">
            Personalized Learning Hub
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-purple-200 animate-slideUp">
            Curated content that grows with your child, powered by developmental
            science.
          </p>
        </header>

        <InteractiveHubSection />

        <Articles />
      </main>

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
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out both;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out both;
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out both;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PersonalizedLearningHub;
