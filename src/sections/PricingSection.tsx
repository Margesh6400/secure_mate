import React from 'react';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { Check, IndianRupee, Clock, Tag, ShieldAlert, Star } from 'lucide-react';

const PricingSection: React.FC = () => {
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
        </div>
      </div>

      <div className="relative z-10 container-custom">
        <SectionTitle 
          title="Simple & Transparent Pricing"
          subtitle="Choose the perfect protection plan that suits your needs"
          centered={true}
        />
        
        <div 
          ref={ref}
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Promotion Tag */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-accent/20 blur"></div>
              <div className="relative flex items-center px-6 py-2 space-x-2 transition-all duration-300 transform rounded-full shadow-lg bg-accent text-primary hover:scale-105 hover:shadow-xl">
                <div className="p-1.5 bg-primary/10 rounded-full">
                  <Tag className="w-4 h-4" />
                </div>
                <span className="font-medium">10% off first booking: <span className="font-bold">SECURE10</span></span>
              </div>
            </div>
          </div>

          {/* Pricing Cards Container */}
          <div className="relative p-6 border shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl border-neutral-100/50">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-primary/20 rounded-br-2xl"></div>

            <div className="relative grid gap-6 md:grid-cols-2">
              {/* Hourly Rate Card */}
              <div className="relative group">
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl group-hover:opacity-100"></div>
                <div className="relative p-6 transition-all duration-300 border rounded-xl border-neutral-200 hover:border-accent/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-primary">Hourly Rate</h3>
                    </div>
                    <div className="flex items-baseline">
                      <IndianRupee className="w-5 h-5 text-primary" />
                      <span className="text-3xl font-bold text-primary">500</span>
                      <span className="ml-1 text-neutral-500">/hr</span>
                    </div>
                  </div>
                  
                  <p className="mb-4 text-sm text-neutral-600">
                    Perfect for short-term protection needs
                  </p>

                  <Button variant="primary" fullWidth className="group">
                    <span>Book Now</span>
                    <Star className="w-4 h-4 ml-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                  </Button>
                </div>
              </div>

              {/* Package Card */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                <div className="relative p-6 transition-all duration-300 bg-white rounded-xl">
                  <div className="absolute px-3 py-1 text-xs font-semibold rounded-full -top-3 right-4 bg-accent text-primary">
                    Save 17%
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <ShieldAlert className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold text-primary">3-Hour Package</h3>
                    </div>
                    <div className="flex items-baseline">
                      <IndianRupee className="w-5 h-5 text-primary" />
                      <span className="text-3xl font-bold text-primary">1500</span>
                    </div>
                  </div>
                  
                  <p className="mb-4 text-sm text-neutral-600">
                    Best value for events & longer durations
                  </p>

                  <Button variant="primary" fullWidth className="group">
                    <span>Book Package</span>
                    <Star className="w-4 h-4 ml-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="pt-6 mt-8 border-t border-neutral-200/50">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {[
                  'Premium Verified Guards',
                  'Real-time Tracking',
                  'In-app Support',
                  'Emergency Button',
                  'Professional Training',
                  'No Hidden Fees',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 group">
                    <div className="p-1 transition-colors duration-300 rounded-full bg-primary/10 group-hover:bg-accent/20">
                      <Check className="w-4 h-4 transition-colors duration-300 text-primary group-hover:text-accent" />
                    </div>
                    <span className="text-sm text-neutral-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;