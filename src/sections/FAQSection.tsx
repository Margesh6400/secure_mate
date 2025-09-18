import React from 'react';
import SectionTitle from '../components/SectionTitle';
import FAQItem from '../components/FAQItem';
import Button from '../components/Button';
import { faqItems } from '../data';
import { Mail, Bell, ArrowRight, Shield, MessageCircle } from 'lucide-react';

const FAQSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden section bg-gradient-to-br from-primary/5 via-white to-accent/5">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-rule='evenodd' stroke='%23ffffff50' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative z-10 container-custom">
        <SectionTitle 
          title="Support & Resources"
          subtitle="Get instant answers and stay informed about our latest security innovations."
          centered={true}
        />
        
        <div className="grid gap-8 mt-12 lg:grid-cols-2">
          {/* FAQ Side - Now with frosted glass effect */}
          <div className="relative group">
            <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl"></div>
            <div className="relative p-8 pb-10 border shadow-xl md:p-10 md:pb-12 backdrop-blur-xl bg-white/80 rounded-2xl border-white/20">
              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center justify-center text-white shadow-lg w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-primary to-primary-dark bg-clip-text">
                    Quick Answers
                  </h3>
                  <p className="text-base text-neutral-600">Common questions about our services</p>
                </div>
              </div>
              
              <div className="space-y-5">
                {faqItems.slice(0, 5).map((item) => (
                  <FAQItem 
                    key={item.id}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Updates Side - With matching design */}
          <div className="relative group">
            <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl blur-xl group-hover:blur-2xl"></div>
            <div className="relative p-6 border shadow-xl md:p-8 backdrop-blur-xl bg-gradient-to-br from-primary to-primary-dark rounded-2xl border-white/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center text-white shadow-lg w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <Shield className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Security Updates
                  </h3>
                  <p className="text-white/80">Stay informed and protected</p>
                </div>
              </div>

              <form className="space-y-5">
                <div className="relative group/input">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-5 py-4 text-white transition-all duration-300 border rounded-xl bg-white/10 placeholder-white/50 border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 focus:outline-none group-hover/input:bg-white/20"
                  />
                </div>

                <div className="relative group/input">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-5 py-4 text-white transition-all duration-300 border rounded-xl bg-white/10 placeholder-white/50 border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 focus:outline-none group-hover/input:bg-white/20"
                  />
                </div>

                <Button 
                  // variant="light" 
                  fullWidth 
                  className="py-4 mt-6 transition-all duration-300 group text-primary hover:text-white hover:bg-accent"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  <span>Get Security Updates</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" />
                </Button>

                {/* Benefits List */}
                <div className="pt-8 mt-8 border-t border-white/20">
                  <h4 className="flex items-center gap-2 mb-4 text-lg font-medium text-white/90">
                    <Bell className="w-5 h-5" />
                    Subscriber Benefits
                  </h4>
                  <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                      'Weekly Security Tips',
                      'Service Updates',
                      'Exclusive Offers',
                      'Priority Support'
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3 text-white/80 bg-white/5 rounded-lg px-4 py-2.5 backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;