import React from 'react';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { MapPin, Mail, Building2, ArrowRight } from 'lucide-react';

const CoverageSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section className="relative overflow-hidden section">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full transform bg-grid-pattern rotate-3"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern -rotate-3"></div>
        </div>
      </div>

      <div className="relative z-10 container-custom">
        <SectionTitle 
          title="Serving Gujarat's Prime Cities"
          subtitle="Currently live in Ahmedabad and Gandhinagar, expanding soon to other mega cities across Gujarat."
          centered={true}
        />
        
        <div 
          ref={ref}
          className={`flex flex-col lg:flex-row items-center gap-12 mt-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Map Side */}
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden shadow-2xl rounded-2xl group">
              {/* Map Background Image */}
              <div className="relative h-[450px] overflow-hidden">
                <img 
                  src="/src/assets/images/map.jpeg" 
                  alt="Coverage Map"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/60 to-primary/60"></div>
                
                
                {/* State Outline - Simplified Gujarat Shape */}
                <div className="absolute inset-8 opacity-20">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Digital Circuit Lines */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full opacity-20">
                    <path 
                      d="M0,50 C20,40 40,60 60,30 S80,20 100,30" 
                      stroke="#FBBF24" 
                      strokeWidth="0.5" 
                      fill="none" 
                      className="animate-flow"
                    />
                    <path 
                      d="M0,70 C30,60 50,80 70,50 S90,40 100,50" 
                      stroke="#FBBF24" 
                      strokeWidth="0.5" 
                      fill="none" 
                      className="animate-flow"
                    />
                  </svg>
                </div>
              </div>

              {/* Active Cities */}
              <div className="absolute transform -translate-y-1/2 -translate-x-1/3 top-1/2 right-60">
                <div className="relative group/pin">
                  <div className="absolute transition-transform duration-300 transform rounded-full -inset-2 bg-accent/20 blur-md group-hover/pin:scale-110"></div>
                  <div className="relative flex items-center px-4 py-2 text-sm font-semibold transition-transform duration-300 transform rounded-full shadow-lg bg-accent hover:scale-105">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Ahmedabad</span>
                    <div className="absolute w-3 h-3 bg-green-500 border-2 border-white rounded-full -right-1 -top-1 animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/3 right-60">
                <div className="relative group/pin">
                  <div className="absolute transition-transform duration-300 transform rounded-full -inset-2 bg-accent/20 blur-md group-hover/pin:scale-110"></div>
                  <div className="relative flex items-center px-4 py-2 text-sm font-semibold transition-transform duration-300 transform rounded-full shadow-lg bg-accent hover:scale-105">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Gandhinagar</span>
                    <div className="absolute w-3 h-3 bg-green-500 border-2 border-white rounded-full -right-1 -top-1 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Upcoming Cities Panel */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-transform duration-500 transform translate-y-2 bg-gradient-to-t from-primary to-primary/90 group-hover:translate-y-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-accent" />
                    <h4 className="text-lg font-semibold">Coming Soon to Gujarat's Mega Cities</h4>
                  </div>
                  <ArrowRight className="w-5 h-5 text-accent animate-bounce" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar'].map((city) => (
                    <span key={city} className="px-3 py-1 text-sm rounded-full bg-white/10 backdrop-blur-sm">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <div className="p-8 border shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl border-neutral-100/50">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-2xl"></div>

              <h3 className="mb-2 text-2xl font-semibold text-primary">
                Get Early Access in Your City
              </h3>
              <p className="mb-6 leading-relaxed text-neutral-600">
                Be among the first to experience SecureMate's premium security services when we launch in your city. 
                Sign up now to receive exclusive early access and special launch offers.
              </p>
              
              <form className="space-y-4">
                <div className="group">
                  <label htmlFor="city" className="block mb-1 text-sm font-medium text-neutral-700">
                    Select Your City
                  </label>
                  <select 
                    id="city" 
                    className="w-full p-3 transition-all duration-300 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent bg-white/70 backdrop-blur-sm"
                  >
                    <option value="">Choose a city</option>
                    <option value="surat">Surat</option>
                    <option value="vadodara">Vadodara</option>
                    <option value="rajkot">Rajkot</option>
                    <option value="bhavnagar">Bhavnagar</option>
                    <option value="jamnagar">Jamnagar</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="group">
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-neutral-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="w-5 h-5 transition-colors duration-300 text-neutral-400 group-focus-within:text-accent" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      className="w-full p-3 pl-10 transition-all duration-300 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent bg-white/70 backdrop-blur-sm"
                    />
                  </div>
                </div>
                
                <Button variant="primary" fullWidth className="group">
                  <span>Notify Me</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" />
                </Button>
                
                <div className="flex items-center justify-center space-x-2 text-sm text-neutral-500">
                  <MapPin className="w-4 h-4 text-accent" />
                  <p>Priority access for Gujarat residents</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;