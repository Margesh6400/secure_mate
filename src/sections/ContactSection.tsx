import React from 'react';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section id="contact" className="bg-white section">
      <div className="container-custom">
        <SectionTitle 
          title="Stay Updated or Reach Out"
          subtitle="Have questions or feedback? We'd love to hear from you."
          centered={true}
        />
        
        <div 
          ref={ref}
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="overflow-hidden bg-white shadow-xl rounded-xl">
            {/* Form Header */}
            <div className="p-6 text-white bg-primary">
              <div className="flex items-center justify-center">
                <MessageCircle className="w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">Send Us a Message</h3>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="p-6 md:p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-neutral-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-neutral-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-1 text-sm font-medium text-neutral-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="How can we help?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-1 text-sm font-medium text-neutral-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="p-3 transition-colors rounded-full bg-primary/10 hover:bg-primary/20"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 text-primary" />
                    </a>
                    <a
                      href="#"
                      className="p-3 transition-colors rounded-full bg-primary/10 hover:bg-primary/20"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-primary" />
                    </a>
                    <a
                      href="mailto:contact@securemate.in"
                      className="p-3 transition-colors rounded-full bg-primary/10 hover:bg-primary/20"
                      aria-label="Email"
                    >
                      <Mail className="w-5 h-5 text-primary" />
                    </a>
                  </div>
                  
                  <Button variant="primary" size="lg" type="submit">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;