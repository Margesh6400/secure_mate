import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="py-4 border-b border-neutral-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left focus:outline-none group"
      >
        <h3 className="text-lg font-medium text-primary group-hover:text-primary-dark transition-colors">{question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-primary group-hover:text-primary-dark transition-colors" />
        ) : (
          <ChevronDown className="w-5 h-5 text-primary group-hover:text-primary-dark transition-colors" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-56 opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-base text-neutral-600 leading-relaxed pb-3">{answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;