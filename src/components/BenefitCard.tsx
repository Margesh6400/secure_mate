import React from 'react';
import * as Icons from 'lucide-react';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  description,
  icon,
  delay = 0,
}) => {
  // Dynamically get the icon component
  const IconComponent = (Icons as any)[icon] || Icons.Shield;
  
  return (
    <div className="relative">
      {/* Icon Container */}
      <div className="relative z-20 mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl transform rotate-6 scale-110 group-hover:rotate-12 transition-transform duration-300"></div>
        <div className="relative flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <IconComponent className="relative w-8 h-8 text-primary transform group-hover:scale-110 group-hover:text-accent transition-all duration-300" />
        </div>
      </div>

      {/* Content */}
      <h3 className="relative mb-3 text-xl font-semibold text-primary group-hover:text-accent transition-colors duration-300">
        <div className="absolute -left-4 top-1/2 w-2 h-2 rounded-full bg-accent transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        {title}
      </h3>
      
      <p className="relative text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
        {description}
      </p>

      {/* Hover Effect Highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </div>
  );
};

export default BenefitCard;