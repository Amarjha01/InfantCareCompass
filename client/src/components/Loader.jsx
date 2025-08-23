import { useState, useEffect } from 'react';
import { Heart, Baby, Shield, Users } from 'lucide-react';
import PropTypes from 'prop-types';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const icons = [
    { 
      icon: Heart, 
      color: 'text-red-500', 
      bgColor: 'bg-red-500/20',
      glowColor: 'shadow-red-500/50',
      text: 'Caring for your little ones',
      animation: 'animate-bounce'
    },
    { 
      icon: Baby, 
      color: 'text-blue-500', 
      bgColor: 'bg-blue-500/20',
      glowColor: 'shadow-blue-500/50',
      text: 'Expert pediatric guidance',
      animation: 'animate-pulse'
    },
    { 
      icon: Shield, 
      color: 'text-green-500', 
      bgColor: 'bg-green-500/20',
      glowColor: 'shadow-green-500/50',
      text: 'Safe and secure platform',
      animation: 'animate-spin'
    },
    { 
      icon: Users, 
      color: 'text-purple-500', 
      bgColor: 'bg-purple-500/20',
      glowColor: 'shadow-purple-500/50',
      text: 'Community support',
      animation: 'animate-ping'
    }
  ];

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 200);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    // Update percentage in sync with progress
    const percentageTimer = setInterval(() => {
      setPercentage(prev => {
        const newPercentage = prev + increment;
        if (newPercentage >= 100) {
          clearInterval(percentageTimer);
          return 100;
        }
        return newPercentage;
      });
    }, interval);

    // Change icon every 1000ms (4 icons in 4 seconds)
    const iconTimer = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(percentageTimer);
      clearInterval(iconTimer);
    };
  }, [onComplete, icons.length]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-[9999] flex items-center justify-center cursor-default">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Logo/Brand */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6 drop-shadow-lg">
            InfantCareCompass
          </h1>
          <p className="text-gray-100 text-xl font-medium drop-shadow-md">Your digital healthcare companion</p>
        </div>

        {/* Animated Icon with Amazing Effects */}
        <div className="mb-12">
          <div className="relative h-32 mb-8">
            {icons.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                  index === currentIcon 
                    ? 'opacity-100 scale-110 rotate-0' 
                    : 'opacity-0 scale-50 rotate-12'
                }`}
              >
                {/* Glowing Background Circle */}
                <div className={`absolute w-28 h-28 rounded-full ${item.bgColor} blur-xl animate-pulse`}></div>
                
                {/* Icon Container with Multiple Effects */}
                <div className={`relative z-10 p-6 rounded-full ${item.bgColor} backdrop-blur-sm`}>
                  <item.icon 
                    className={`w-16 h-16 ${item.color} ${item.animation} drop-shadow-2xl ${item.glowColor} filter brightness-110`} 
                  />
                </div>
                
                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')} animate-ping`}
                      style={{
                        top: `${20 + (i * 15)}%`,
                        left: `${10 + (i * 20)}%`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '2s'
                      }}
                    />
                  ))}
                </div>
                
                {/* Rotating Ring */}
                <div className={`absolute w-32 h-32 border-2 border-dashed ${item.color.replace('text-', 'border-')} rounded-full animate-spin`} 
                     style={{ animationDuration: '3s' }}>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced Text with Glow */}
          <div className="relative">
            <p className="text-gray-100 text-lg font-semibold animate-pulse min-h-[1.5rem] drop-shadow-md relative z-10">
              {icons[currentIcon].text}
            </p>
            {/* Text Glow Effect */}
            <div className={`absolute inset-0 blur-sm ${icons[currentIcon].bgColor} rounded-lg -z-10`}></div>
          </div>
        </div>

        {/* Progress Bar with Percentage */}
        <div className="w-full max-w-xs mx-auto mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-base font-bold drop-shadow-md">
              {Math.round(percentage)}%
            </span>
            <span className="text-white text-base font-medium drop-shadow-md">Loading...</span>
          </div>
          <div className="bg-gray-700 rounded-full h-3 overflow-hidden shadow-lg">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-100 ease-out shadow-inner"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-200 text-base font-medium mb-6 drop-shadow-md">
          Loading your healthcare experience...
        </p>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className={`w-3 h-3 rounded-full transition-all duration-300 shadow-lg ${
                progress > (dot + 1) * 33 ? 'bg-green-500 animate-pulse' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/6 left-1/6 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-4/5 right-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/6 left-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Additional Floating Elements */}
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-yellow-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-6 h-6 bg-cyan-400/30 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  onComplete: PropTypes.func.isRequired
};

export default Loader; 