import React from 'react';
import { benefits } from '../data';
import SectionTitle from '../components/SectionTitle';
import BenefitCard from '../components/BenefitCard';
import { useInView } from 'react-intersection-observer';

const BenefitsSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="absolute inset-0" style={{ opacity: 0.4 }}>
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rounded-full w-96 h-96 bg-gradient-to-r from-primary/10 to-transparent blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 delay-700 transform -translate-x-1/2 translate-y-1/2 rounded-full w-96 h-96 bg-gradient-to-r from-accent/10 to-transparent blur-3xl animate-pulse"></div>
        </div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full transform bg-grid-pattern rotate-3"></div>
          <div className="absolute top-0 left-0 w-full h-full transform bg-grid-pattern -rotate-3"></div>
        </div>
      </div>

      <div className="relative z-10 container-custom">
        <SectionTitle 
          title="Why Choose SecureMate"
          subtitle="Our app offers best-in-class features to ensure your safety and provide a seamless experience."
          centered={true}
        />
        
        <div 
          ref={ref}
          className="relative grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Connecting Lines */}
          <div className="absolute left-0 right-0 hidden top-1/2 lg:block">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
          </div>
          <div className="absolute inset-y-0 hidden left-1/3 lg:block">
            <div className="w-0.5 h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
          </div>
          <div className="absolute inset-y-0 hidden right-1/3 lg:block">
            <div className="w-0.5 h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
          </div>

          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className={`transform transition-all duration-700 ${
                inView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative p-8 transition-all duration-500 border group bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:-translate-y-1 border-neutral-100/50">
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 transition-all duration-300 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl group-hover:border-accent/50 group-hover:scale-105"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 transition-all duration-300 border-b-2 border-r-2 border-primary/20 rounded-br-2xl group-hover:border-accent/50 group-hover:scale-105"></div>
                
                <BenefitCard
                  title={benefit.title}
                  description={benefit.description}
                  icon={benefit.icon}
                  delay={index}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Background Accent Elements */}
        <div className="absolute rounded-full -bottom-24 -right-24 w-96 h-96 bg-accent/5 filter blur-3xl"></div>
        <div className="absolute rounded-full -top-24 -left-24 w-96 h-96 bg-primary/5 filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default BenefitsSection;