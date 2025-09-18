import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Shield, Users, PersonStanding, Globe } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, delay }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-neutral-100/50 shadow-xl transition-all duration-700 hover:shadow-accent/10 hover:-translate-y-2 ${
        inView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Service Icon */}
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-all duration-500 rounded-xl bg-primary/10 text-primary group-hover:bg-accent group-hover:text-white">
        {icon}
      </div>

      {/* Service Title */}
      <h3 className="mb-4 text-xl font-semibold text-center transition-colors duration-300 text-primary group-hover:text-accent">
        {title}
      </h3>

      {/* Service Description */}
      <p className="leading-relaxed text-center text-neutral-600">
        {description}
      </p>

      {/* Subtle Hover Effects */}
      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none bg-gradient-to-br from-primary/5 to-transparent group-hover:opacity-100 rounded-2xl"></div>
      
      {/* Corner Accent */}
      <div className="absolute w-2 h-2 transition-opacity duration-300 rounded-full opacity-0 bg-accent top-4 right-4 group-hover:opacity-100"></div>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <PersonStanding className="w-8 h-8" />,
      title: "Personal Security Officers (PSOs)",
      description: "Trained professionals to accompany you for daily movements, business trips, or private outings.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Event Security & Bouncers",
      description: "Reliable crowd control and access management for weddings, parties, concerts, and corporate events.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Escort & Assistance Protection",
      description: "Special care for senior citizens, women, and travelers who need trusted security during travel, shopping, or hospital visits.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Tourist & NRI Protection",
      description: "Discreet bodyguards for visitors exploring Gujarat — ensuring safety at every step.",
    },
  ];

  return (
    <section className="relative overflow-hidden section">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full transform bg-grid-pattern rotate-3"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern -rotate-3"></div>
        </div>
      </div>

      <div className="relative z-10 container-custom">
        <SectionTitle
          title="Our Services"
          subtitle="At SecureMate, your safety is our mission. We connect you with verified, professional bodyguards and security staff who ensure protection, comfort, and peace of mind — anytime, anywhere."
          centered={true}
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index * 150}
            />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="max-w-3xl p-6 mx-auto mt-16 text-center border shadow-xl bg-white/80 backdrop-blur-sm border-neutral-100/50 rounded-2xl">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-base leading-relaxed text-neutral-600">
            Each professional is <strong className="text-primary">background-verified</strong>, <strong className="text-primary">physically trained</strong>, and committed to maintaining your <strong className="text-primary">privacy</strong> while providing <strong className="text-primary">top-class security</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

// onst ServicesSection: React.FC = () => {
//   const services = [
//     {
//       imageUrl: "https://i.ibb.co/5wRLkCX/Gemini-Generated-Image-xo579wxo579wxo57.png",
//       title: "Personal Security Officers",
//       description: "Elite trained professionals providing discrete protection for daily activities, business meetings, and personal engagements.",
//     },
//     {
//       imageUrl: "https://i.ibb.co/h6MBncS/Gemini-Generated-Image-6vpx5c6vpx5c6vpx.png",
//       title: "Event Security & Control",
//       description: "Advanced crowd management and access control for high-profile events, ensuring seamless security operations.",
//     },
//     {
//       imageUrl: "https://i.ibb.co/6JW20Z0D/Gemini-Generated-Image-igplw6igplw6igpl.png",
//       title: "Executive Protection",
//       description: "Specialized protection services for VIPs, executives, and families requiring the highest level of security expertise.",
//     },
//     {
//       imageUrl: "https://i.ibb.co/5gdXrg4z/Gemini-Generated-Image-b9t431b9t431b9t4.png",
//       title: "International Security",
//       description: "Global protection services for tourists and NRIs, providing world-class security with local expertise.",
//     },
//   ];
