import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Star, 
  GitBranch, 
  Users, 
  Heart, 
  Sparkles, 
  ArrowUpRight,
  Calendar,
  MapPin,
  Globe
} from 'lucide-react';

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalContributors: 0,
    totalCommits: 0,
    totalStars: 0,
    totalForks: 0
  });

  // GitHub repository details
  const REPO_OWNER = 'Amarjha01'; // Correct owner from the repository
  const REPO_NAME = 'InfantCareCompass'; // Correct repository name

  useEffect(() => {
    fetchContributors();
    fetchRepoStats();
    fetchCommitStats();
  }, []);

  const fetchContributors = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=100`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch contributors');
      }

      const data = await response.json();
      setContributors(data);
      setStats(prev => ({ ...prev, totalContributors: data.length }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepoStats = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setStats(prev => ({
          ...prev,
          totalStars: data.stargazers_count,
          totalForks: data.forks_count
        }));
      }
    } catch (err) {
      console.error('Failed to fetch repo stats:', err);
    }
  };

  const fetchCommitStats = async () => {
    try {
      // Use GitHub's participation API to get commit statistics
      const response = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/stats/participation`
      );
      
      if (response.ok) {
        const data = await response.json();
        // Sum up all commits from the participation data
        const totalCommits = data.all ? data.all.reduce((sum, commits) => sum + commits, 0) : 0;
        setStats(prev => ({
          ...prev,
          totalCommits: totalCommits
        }));
      } else {
        // Fallback: try to get a basic commit count
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=1`
        );
        if (commitsResponse.ok) {
          const linkHeader = commitsResponse.headers.get('Link');
          if (linkHeader) {
            const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
            if (lastPageMatch) {
              const totalCommits = parseInt(lastPageMatch[1]);
              setStats(prev => ({
                ...prev,
                totalCommits: totalCommits
              }));
            }
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch commit stats:', err);
      // Set a fallback value based on the repository info
      setStats(prev => ({
        ...prev,
        totalCommits: 171 // Based on the repository info showing 171 commits
      }));
    }
  };

  const FloatingElement = ({ children, delay = 0 }) => (
    <div 
      className="animate-pulse"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: '3s'
      }}
    >
      {children}
    </div>
  );

  const GlassCard = ({ children, className = "", hover = true }) => (
    <div className={`
      backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl
      shadow-2xl transition-all duration-500 ease-out
      ${hover ? 'hover:bg-white/20 hover:scale-105 hover:shadow-3xl hover:-translate-y-2' : ''}
      ${className}
    `}>
      {children}
    </div>
  );

  const statsData = [
    { 
      number: stats.totalContributors, 
      label: "Contributors", 
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-400"
    },
    { 
      number: stats.totalStars, 
      label: "Stars", 
      icon: <Star className="w-6 h-6" />,
      color: "text-yellow-400"
    },
    { 
      number: stats.totalForks, 
      label: "Forks", 
      icon: <GitBranch className="w-6 h-6" />,
      color: "text-green-400"
    },
    { 
      number: stats.totalCommits, 
      label: "Commits", 
      icon: <Heart className="w-6 h-6" />,
      color: "text-purple-400"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-xl">Loading contributors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400 mb-4">Error: {error}</p>
          <p className="text-gray-300">Please check the repository configuration</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <FloatingElement>
            <div className="mb-8">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          </FloatingElement>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
              Our
              <br />
              <span className="text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Contributors
              </span>
            </h1>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                Meet the amazing developers who are building the future of 
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold"> healthcare</span> with us
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center group">
                <GlassCard className="p-6 hover:bg-white/15">
                  <div className={`${stat.color} mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Meet Our Contributors
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              These amazing developers are helping us build the future of healthcare technology
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {contributors.map((contributor, index) => (
              <div key={contributor.id} className="group">
                <GlassCard className="p-8 text-center group-hover:bg-white/15">
                  <div className="relative mb-6">
                    <img 
                      src={contributor.avatar_url} 
                      alt={contributor.login}
                      className="w-24 h-24 rounded-full mx-auto border-4 border-white/20 group-hover:border-purple-400/50 transition-all duration-300"
                    />
                    {index < 3 && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        Top {index + 1}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {contributor.login}
                  </h3>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-300 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{contributor.contributions}</span>
                    </div>
                  </div>

                  <a 
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Profile</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <GlassCard className="p-12">
            <Github className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Want to Join Our Community?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contribute to our open-source project and help us build the future of healthcare technology
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="relative flex justify-center items-center gap-2">
                  Contribute Now
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a> 
              
              <button className="px-8 py-4 border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default Contributors; 