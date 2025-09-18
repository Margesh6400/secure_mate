import React from 'react';
import { useInView } from 'react-intersection-observer';
import Button from '../components/Button';
import { BadgeCheck, CalendarClock, IndianRupee } from 'lucide-react';

const BodyguardsSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section id="for-bodyguards" className="text-white section bg-primary">
      <div className="container-custom">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Image Side */}
          <div 
            className={`w-full lg:w-1/2 flex justify-center transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative w-full max-w-xl lg:max-w-2xl"> {/* Increased max width */}
              <div className="absolute inset-0 transform rounded-xl bg-accent opacity-20 -rotate-3"></div>
              <img 
                src="https://i.ibb.co/Z12vKcHZ/Chat-GPT-Image-May-18-2025-08-57-03-PM.png" 
                alt="Professional bodyguard" 
                className="relative z-10 rounded-xl shadow-2xl w-full h-[350px] md:h-[420px] object-cover" // Increased height and shadow
              />
              
              {/* Stats Card */}
              <div className="absolute z-20 p-6 bg-white rounded-xl shadow-2xl text-primary flex flex-col items-center min-w-[180px] text-center -bottom-12 right-0 lg:-bottom-10 lg:-right-10">
                <p className="text-3xl font-extrabold">₹50,000+</p>
                <p className="text-base font-medium">Avg. Monthly Earnings</p>
              </div>
            </div>
          </div>
          
          {/* Content Side */}
          <div 
            ref={ref}
            className={`w-full lg:w-1/2 transition-all duration-700 delay-300 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Earn by Protecting Others
            </h2>
            <p className="mb-8 text-lg text-neutral-200">
              If you're a trained bodyguard, join SecureMate and get hired by real clients. 
              Set your own schedule, rates, and manage your bookings professionally.
            </p>
            
            <div className="mb-8 space-y-4">
              <div className="flex items-start">
                <div className="p-2 mt-1 mr-4 rounded-full bg-primary-light">
                  <IndianRupee className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Weekly Payouts</h4>
                  <p className="text-neutral-300">
                    Get paid directly to your bank account every week, with detailed earnings reports.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 mt-1 mr-4 rounded-full bg-primary-light">
                  <CalendarClock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Choose Your Schedule</h4>
                  <p className="text-neutral-300">
                    Set your availability and work when it's convenient for you. No minimum hours required.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 mt-1 mr-4 rounded-full bg-primary-light">
                  <BadgeCheck className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Verified Clients Only</h4>
                  <p className="text-neutral-300">
                    Work with verified clients only. Our platform ensures your safety and security.
                  </p>
                </div>
              </div>
            </div>
            
            <Button variant="primary" size="lg">
              Become a Bodyguard
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BodyguardsSection;