import React from 'react';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../components/SectionTitle';
import { Map, Calendar, Shield } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const steps = [
    {
      icon: <Map className="w-10 h-10 text-accent" />,
      title: 'Choose Location & Guard',
      description: 'Enter your location, browse guards by ratings and reviews, and select the right match for your needs.'
    },
    {
      icon: <Calendar className="w-10 h-10 text-accent" />,
      title: 'Book & Pay Securely',
      description: 'Book instantly or schedule in advance. Make secure payments through multiple options including UPI and cards.'
    },
    {
      icon: <Shield className="w-10 h-10 text-accent" />,
      title: 'Get Protected',
      description: 'Track your guard in real-time, and enjoy professional protection services.'
    }
  ];
  
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden section">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full transform bg-grid-pattern rotate-3"></div>
          <div className="absolute top-0 left-0 w-full h-full transform bg-grid-pattern -rotate-3"></div>
        </div>
      </div>

      <div className="relative z-10 container-custom">
        <SectionTitle 
          title="How It Works"
          subtitle="Booking professional security has never been easier. Three simple steps to your peace of mind."
          centered={true}
        />
        
        <div 
          ref={ref}
          className="relative grid grid-cols-1 gap-8 mt-16 md:grid-cols-3"
        >
          {/* Connecting Lines */}
          <div className="absolute hidden md:block top-[88px] left-[15%] right-[15%]">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 h-0.5">
              <div className="w-20 h-full bg-accent/30 animate-[flow_3s_linear_infinite]"></div>
            </div>
          </div>
          
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`transform transition-all duration-700 ${
                inView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative p-8 text-center transition-all duration-500 border group bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:-translate-y-1 border-neutral-100/50">
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 transition-all duration-300 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl group-hover:border-accent/50 group-hover:scale-105"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 transition-all duration-300 border-b-2 border-r-2 border-primary/20 rounded-br-2xl group-hover:border-accent/50 group-hover:scale-105"></div>

                {/* Step Number with unique design */}
                <div className="relative inline-block mb-6">
                  {/* Icon Background */}
                  <div className="relative z-20">
                    <div className="absolute inset-0 transition-transform duration-300 transform scale-110 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl rotate-6 group-hover:rotate-12"></div>
                    <div className="relative flex items-center justify-center w-24 h-24 mx-auto transition-all duration-300 bg-white shadow-sm rounded-2xl group-hover:shadow-md">
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl group-hover:opacity-100"></div>
                      <div className="relative z-10 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                        {step.icon}
                      </div>
                      
                      {/* Step number badge */}
                      <div className="absolute flex items-center justify-center w-8 h-8 text-sm font-bold text-white transition-transform transform border-2 border-white rounded-full shadow-lg -right-2 -top-2 bg-accent group-hover:scale-110 group-hover:-translate-y-1">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="relative mb-3 text-xl font-semibold transition-colors text-primary group-hover:text-accent">
                  <span className="absolute w-2 h-2 transition-all duration-300 transform -translate-y-1/2 rounded-full opacity-0 -left-4 top-1/2 bg-accent group-hover:opacity-100"></span>
                  {step.title}
                </h3>
                <p className="leading-relaxed transition-colors duration-300 text-neutral-600 group-hover:text-neutral-700">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 delay-1000 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-2xl animate-pulse"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] translate-x-1/2 translate-y-1/2">
        <div className="absolute inset-0 delay-700 rounded-full bg-gradient-to-tl from-accent/5 to-transparent blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 delay-500 rounded-full bg-gradient-to-tl from-primary/10 to-transparent blur-2xl animate-pulse"></div>
      </div>
    </section>
  );
};

export default HowItWorksSection;