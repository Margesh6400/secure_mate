import React from 'react';
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import whiteLogo from '../assets/images/Subtract (1).png';

const FooterSection: React.FC = () => {
  return (
    <footer className="relative pt-16 pb-8 text-white bg-primary">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="relative flex items-center justify-center w-8 h-8 glass-container">
                <img 
                  src={whiteLogo} 
                  alt="SecureMate Logo" 
                  className="w-8 h-8 object-contain brightness-[150] contrast-125 hover:scale-110 transition-all duration-300" 
                />
              </div>
              <span className="ml-2 text-xl font-bold font-poppins">SecureMate</span>
            </div>
            <p className="mb-4 text-neutral-300">
              India's first on-demand bodyguard booking platform. Professional security, one tap away.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="p-2 transition-colors rounded-full bg-primary-light hover:bg-primary-dark"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-accent" />
              </a>
              <a
                href="#"
                className="p-2 transition-colors rounded-full bg-primary-light hover:bg-primary-dark"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-accent" />
              </a>
              <a
                href="mailto:contact@securemate.in"
                className="p-2 transition-colors rounded-full bg-primary-light hover:bg-primary-dark"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-accent" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="pb-2 mb-4 text-lg font-semibold border-b border-primary-light">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Services', 'Pricing', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="transition-colors text-neutral-300 hover:text-accent">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="pb-2 mb-4 text-lg font-semibold border-b border-primary-light">Resources</h4>
            <ul className="space-y-2">
              {['Help Center', 'Safety Tips', 'Become a Guard', 'Blog', 'Press Kit'].map((link) => (
                <li key={link}>
                  <a href="#" className="transition-colors text-neutral-300 hover:text-accent">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="pb-2 mb-4 text-lg font-semibold border-b border-primary-light">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-accent mt-0.5 mr-3" />
                <span className="text-neutral-300">contact@securemate.in</span>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-accent mt-0.5 mr-3" />
                <span className="text-neutral-300">+91 9876543210</span>
              </div>
              <p className="mt-4 text-neutral-300">
                202, Techno Tower, 
                <br />
                GIFT City, Gandhinagar,
                <br />
                Gujarat - 382355
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-6 text-center border-t border-primary-light md:text-left">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-sm text-neutral-400 md:mb-0">
              &copy; {new Date().getFullYear()} SecureMate. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="transition-colors text-neutral-400 hover:text-accent">
                Terms of Service
              </a>
              <a href="#" className="transition-colors text-neutral-400 hover:text-accent">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors text-neutral-400 hover:text-accent">
                Help
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;