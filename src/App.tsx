import React, { useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './sections/HeroSection';
import HowItWorksSection from './sections/HowItWorksSection';
import BenefitsSection from './sections/BenefitsSection';
import ServicesSection from './sections/ServicesSection';
import AppPreviewSection from './sections/AppPreviewSection';
import BodyguardsSection from './sections/BodyguardsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CoverageSection from './sections/CoverageSection';
import PricingSection from './sections/PricingSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

function App() {
  useEffect(() => {
    // Update the document title on component mount
    document.title = 'SecureMate - Your Personal Security, One Tap Away';
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
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
        {/* <ContactSection /> */}
      </main>
      <FooterSection />
    </div>
  );
}

export default App;