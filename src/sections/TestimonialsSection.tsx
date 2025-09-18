import React from 'react';
import SectionTitle from '../components/SectionTitle';
import TestimonialCard from '../components/TestimonialCard';
import Carousel from '../components/Carousel';
import { testimonials } from '../data';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonialsGroups = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    testimonialsGroups.push(testimonials.slice(i, i + 2));
  }
  
  return (
    <section className="relative py-24 overflow-hidden pb-36">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full transform bg-grid-pattern rotate-3"></div>
          <div className="absolute top-0 left-0 w-full h-full transform bg-grid-pattern -rotate-3"></div>
        </div>
      </div>

      {/* Large Quote Icons */}
      <div className="absolute transform top-20 left-10 text-accent/5 -rotate-12">
        <Quote size={120} />
      </div>
      <div className="absolute transform bottom-20 right-10 text-primary/5 rotate-12">
        <Quote size={120} />
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-3xl animate-pulse"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] -translate-x-1/2 translate-y-1/2">
        <div className="absolute inset-0 delay-700 rounded-full bg-gradient-to-tl from-primary/10 to-transparent blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container-custom" ref={ref}>
        <SectionTitle 
          title="What Our Users Say"
          subtitle="Join thousands of satisfied clients who trust SecureMate for their safety needs."
          centered={true}
        />
        
        {/* Desktop Carousel */}
        <div className="hidden mt-16 md:block">
          <Carousel>
            {testimonialsGroups.map((group, groupIndex) => (
              <div 
                key={groupIndex} 
                className="grid grid-cols-2 gap-8 px-4"
              >
                {group.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`transform transition-all duration-700 ${
                      inView
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: `${(groupIndex * 2 + index) * 150}ms` }}
                  >
                    <TestimonialCard
                      name={testimonial.name}
                      role={testimonial.role}
                      quote={testimonial.quote}
                      rating={testimonial.rating}
                      image={testimonial.image}
                    />
                  </div>
                ))}
              </div>
            ))}
          </Carousel>
        </div>
        
        {/* Mobile Carousel */}
        <div className="mt-16 md:hidden">
          <Carousel>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`px-4 transform transition-all duration-700 ${
                  inView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <TestimonialCard
                  name={testimonial.name}
                  role={testimonial.role}
                  quote={testimonial.quote}
                  rating={testimonial.rating}
                  image={testimonial.image}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;