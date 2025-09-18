import React from 'react';
import { useInView } from 'react-intersection-observer';
import Button from '../components/Button';
import { Shield, CheckCircle, Clock } from 'lucide-react';
import logoImage from '../assets/images/Subtract.png';
import heroImage from '../assets/images/hero.png';

const HeroSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section 
      id="home" 
      className="relative pt-32 pb-20 overflow-hidden md:pt-40 md:pb-32 bg-gradient-to-br from-neutral-50 via-white to-neutral-100"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        <div className="absolute rounded-full -right-10 -top-10 w-72 h-72 bg-accent blur-3xl opacity-20"></div>
        <div className="absolute rounded-full -left-10 top-40 w-72 h-72 bg-primary blur-3xl opacity-20"></div>
      </div>
      
      <div className="relative z-10 container-custom">
        <div className="flex flex-col items-center lg:flex-row">
          {/* Hero Text Content */}
          <div 
            ref={ref}
            className={`w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-pulse-slow">
              <Shield size={16} className="mr-2" />
              <span>India's first on-demand bodyguard app</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Your Personal Security, 
              <span className="block mt-2 text-accent">One Tap Away</span>
            </h1>
            
            <p className="max-w-lg mx-auto mb-8 text-lg text-neutral-700 lg:mx-0">
              Experience premium security with our elite, background-verified guards.
              Available 24/7 for personal protection, events, or travel security.
            </p>
            
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button variant="primary" size="lg">
                Book a Bodyguard
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div 
            className={`w-full lg:w-1/2 transition-all duration-700 delay-300 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative max-w-md mx-auto">
              {/* Phone Frame */}
              <div className="relative z-10 p-3 mx-auto bg-white rounded-[3rem] shadow-2xl">
                {/* Main App Screen */}
                <div className="relative overflow-hidden rounded-[2.5rem] w-full mx-auto">
                  <img 
                    src={heroImage}
                    alt="SecureMate App Interface" 
                    className="w-full h-auto"
                    style={{ maxWidth: "100%", display: "block" }}
                  />
                  {/* App UI Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="p-4 mb-4 bg-white/10 backdrop-blur-md rounded-2xl">
                        <div className="flex items-center mb-3">
                          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center p-2.5">
                            <img src={logoImage} alt="" className="object-contain w-full h-full" />
                          </div>
                          <div className="ml-3 text-white">
                            <p className="text-lg font-semibold">Guard Assigned</p>
                            <p className="text-sm opacity-90">Arriving in 1 hour</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute z-20 hidden p-4 bg-white shadow-lg top-10 -right-24 rounded-2xl lg:block">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center rounded-full bg-accent w-14 h-14">
                    <CheckCircle className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-medium">Guard Verified</p>
                    <div className="flex text-sm text-yellow-400">★★★★★</div>
                  </div>
                </div>
              </div>

              <div className="absolute z-20 hidden p-4 bg-white shadow-lg -bottom-10 -left-24 rounded-2xl lg:block">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center rounded-full bg-primary w-14 h-14">
                    <Clock className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Response Time</p>
                    <p className="font-semibold">Within 1 hour</p>
                  </div>
                </div>
              </div>

              {/* Background Elements */}
              <div className="absolute inset-y-8 -inset-x-12 bg-gradient-to-r from-primary to-accent opacity-10 rounded-[4rem] rotate-6 z-0"></div>
              <div className="absolute inset-y-8 -inset-x-12 bg-gradient-to-r from-accent to-primary opacity-10 rounded-[4rem] -rotate-6 z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;