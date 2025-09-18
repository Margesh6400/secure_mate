import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  quote,
  rating,
  image,
}) => {
  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl transition-all duration-500 h-full border border-neutral-100/50 hover:-translate-y-1">
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl transition-all duration-300 group-hover:border-accent/50 group-hover:scale-105"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-2xl transition-all duration-300 group-hover:border-accent/50 group-hover:scale-105"></div>

      {/* Quote Icon */}
      <div className="absolute -right-2 -top-2">
        <div className="relative">
          <div className="absolute inset-0 bg-accent/10 rounded-full blur-md transform group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative bg-white rounded-full p-2 shadow-sm border border-accent/20 group-hover:border-accent/40 transition-colors duration-300">
            <Quote className="w-4 h-4 text-accent" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col h-full">
        {/* Profile */}
        <div className="flex items-start mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full transform -rotate-6 scale-105 blur-sm group-hover:rotate-12 transition-transform duration-300"></div>
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-primary group-hover:text-accent transition-colors duration-300">{name}</h4>
            <p className="text-sm text-neutral-500">{role}</p>
            {/* Rating Stars */}
            <div className="flex mt-1 space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${i < rating ? 'text-accent fill-current' : 'text-neutral-300'} 
                    transition-colors duration-300 ${i < rating ? 'group-hover:text-accent-dark' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="flex-grow">
          <p className="text-neutral-600 group-hover:text-neutral-700 transition-colors duration-300 leading-relaxed italic relative">
            "{quote}"
          </p>
        </blockquote>
      </div>

      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </div>
  );
};

export default TestimonialCard;