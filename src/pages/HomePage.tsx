import React from 'react';
import HeroSection from '../sections/HeroSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import BenefitsSection from '../sections/BenefitsSection';
import ServicesSection from '../sections/ServicesSection';
import AppPreviewSection from '../sections/AppPreviewSection';
import BodyguardsSection from '../sections/BodyguardsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import CoverageSection from '../sections/CoverageSection';
import PricingSection from '../sections/PricingSection';
import FAQSection from '../sections/FAQSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
      <BenefitsSection />
      <AppPreviewSection />
      <BodyguardsSection />
      <TestimonialsSection />
      <CoverageSection />
      <PricingSection />
      <FAQSection />
    </>
  );
};

export default HomePage;