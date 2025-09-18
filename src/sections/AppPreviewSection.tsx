import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { appScreens } from '../data';
import { Shield, CheckCircle, Clock, CreditCard, MessageSquare, Apple, Play } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Button from '../components/Button';
import type { AppScreen } from '../types/app-screens';

const getIconComponent = (iconName: string) => {
  const icons = {
    Shield,
    Clock,
    CreditCard,
    MessageSquare,
  };
  return icons[iconName as keyof typeof icons] || Shield;
};

const AppPreviewSection: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<AppScreen>(appScreens[0]);
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-24 overflow-hidden pb-36">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full transform bg-grid-pattern rotate-3"></div>
          <div className="absolute top-0 left-0 w-full h-full transform bg-grid-pattern -rotate-3"></div>
        </div>
      </div>

      <div className="relative z-10 container-custom">
        <SectionTitle 
          title="Experience the App"
          subtitle="Our intuitive app makes booking and managing personal security services simple. See how it works."
          centered={true}
        />
        
        <div ref={ref} className="grid items-center grid-cols-1 gap-12 mt-16 lg:grid-cols-2">
          {/* Mobile Preview */}
          <div className="relative mx-auto">
            <div className="w-[280px] h-[560px] bg-gradient-to-b from-primary to-primary-dark rounded-[40px] shadow-xl overflow-hidden border-[14px] border-neutral-800 mx-auto relative z-10">
              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between h-6 px-4 bg-black/30 backdrop-blur-sm">
                <div className="text-xs font-medium text-white">9:41</div>
                <div className="flex space-x-2">
                  <div className="w-4 h-2 rounded-sm bg-white/90"></div>
                  <div className="w-2 h-2 rounded-full bg-white/90"></div>
                  <div className="w-2 h-2 rounded-full bg-white/90"></div>
                </div>
              </div>
              
              {/* App Content */}
              <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800">
                {/* Loading animation when image is not loaded */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                
                <img 
                  src={activeScreen.image}
                  alt={activeScreen.title}
                  className="object-cover w-full h-full opacity-90"
                />
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <h3 className="mb-2 text-lg font-bold text-white translate-y-4 opacity-0 animate-fadeInUp">
                    {activeScreen.title}
                  </h3>
                  <p className="text-sm leading-relaxed translate-y-4 opacity-0 text-white/90 animate-fadeInUp animation-delay-100">
                    {activeScreen.description}
                  </p>
                </div>

                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 mix-blend-overlay"></div>
              </div>
              
              {/* Home Indicator */}
              <div className="absolute left-0 right-0 flex justify-center bottom-1">
                <div className="w-32 h-1 rounded-full bg-white/50"></div>
              </div>
            </div>

            {/* Device shadows/reflections */}
            <div className="absolute top-0 bottom-0 left-0 right-0 w-[280px] h-[560px] rounded-[40px] border-[14px] border-transparent bg-transparent mx-auto shadow-inner shadow-primary/30"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent/10 -z-10 blur-2xl"></div>
          </div>

          {/* App Features */}
          <div>
            <div className="space-y-4">
              {appScreens.map((screen) => {
                const IconComponent = getIconComponent(screen.iconName);
                return (
                  <button
                    key={screen.id}
                    onClick={() => setActiveScreen(screen)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                      activeScreen.id === screen.id
                        ? 'border-accent bg-accent/5'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${
                        activeScreen.id === screen.id
                          ? 'bg-accent/10 text-accent'
                          : 'bg-neutral-100 text-primary'
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-bold text-primary">{screen.title}</h4>
                        <p className="text-sm text-neutral-600">{screen.description}</p>
                      </div>
                    </div>

                    {activeScreen.id === screen.id && (
                      <div className="pt-3 mt-3 border-t border-neutral-200">
                        <ul className="space-y-2">
                          {screen.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-sm text-neutral-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 mt-8 sm:flex-row">
              <Button 
                variant="primary" 
                size="lg"
                className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 group-hover:opacity-100"></div>
                <Apple className="w-5 h-5 mr-2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <span className="relative z-10">
                  Download iOS App
                  <span className="block text-xs transition-colors duration-300 opacity-80 group-hover:text-blue-200">
                    Available on App Store
                  </span>
                </span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-green-500/10 to-green-400/10 group-hover:opacity-100"></div>
                <Play className="w-5 h-5 mr-2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <span className="relative z-10">
                  Download Android App
                  <span className="block text-xs transition-colors duration-300 text-neutral-500 group-hover:text-green-600">
                    Get it on Play Store
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreviewSection;