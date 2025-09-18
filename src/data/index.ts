import { NavLink, Benefit, Testimonial, FaqItem, AppScreenshot } from '../types';

export const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'For Bodyguards', href: '#for-bodyguards' },
  { name: 'Contact', href: '#contact' },
];

export const benefits: Benefit[] = [
  {
    id: 1,
    title: 'Verified Guards',
    description: 'All our guards undergo rigorous background checks and training verification',
    icon: 'ShieldCheck',
  },
  {
    id: 2,
    title: 'Transparent Pricing',
    description: 'Know exactly what you pay upfront with no hidden charges',
    icon: 'IndianRupee',
  },
  {
    id: 3,
    title: 'Real-time Chat',
    description: 'Communicate directly with your assigned guard before and during service',
    icon: 'MessageCircle',
  },
  {
    id: 4,
    title: 'Easy Booking Flow',
    description: 'Book a trusted guard in under 2 minutes, anytime 24/7',
    icon: 'CalendarCheck',
  },
  {
    id: 5,
    title: 'Track Guard Location',
    description: 'Know your guard\'s location and ETA in real-time through the app',
    icon: 'MapPin',
  },
  {
    id: 6,
    title: 'Trusted by Professionals',
    description: 'Join thousands of satisfied clients who trust SecureMate for their safety',
    icon: 'UserCheck',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rajan Patel',
    role: 'Business Executive',
    quote: 'SecureMate helped me feel secure during late-night business trips. The app is intuitive and the guards are always professional.',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Event Planner',
    quote: 'I use SecureMate for all our high-profile events. Their guards are punctual, professional, and attentive to our specific needs.',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    name: 'Vikram Singh',
    role: 'Bodyguard Partner',
    quote: 'Since joining SecureMate, I\'ve maintained a steady income and can set my own hours. The platform is revolutionizing our industry.',
    rating: 4,
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    name: 'Anita Desai',
    role: 'Solo Traveler',
    quote: 'As a woman who travels frequently, SecureMate gives me peace of mind when I\'m in unfamiliar cities. Highly recommended!',
    rating: 5,
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export const faqItems: FaqItem[] = [
  {
    id: 1,
    question: 'Are guards verified?',
    answer: 'Yes, all guards undergo rigorous background checks, police verification, and training certification verification before being accepted on our platform. We also continuously monitor reviews and ratings to ensure high standards of service.',
  },
  {
    id: 2,
    question: 'How does payment work?',
    answer: 'We accept all major payment methods including credit/debit cards, UPI, and net banking. Payment is processed securely through our app once you book a guard. For longer assignments, payment is split into installments.',
  },
  {
    id: 3,
    question: 'What is your emergency response time?',
    answer: 'Our emergency response time is typically under 15 minutes in active service areas. We maintain a network of guards strategically positioned across the city to ensure rapid response to any security situation.',
  },
  {
    id: 4,
    question: 'Can I cancel?',
    answer: 'Yes, you can cancel anytime up to 2 hours before your scheduled appointment without any charges. Cancellations made under 2 hours incur a 50% fee to compensate the guard for their time commitment.',
  },
  {
    id: 4,
    question: 'What happens if I\'m not satisfied?',
    answer: 'Your satisfaction is our priority. If you\'re not satisfied with the service, you can rate and review the guard. For serious concerns, contact our 24/7 support team, and we\'ll resolve your issue, including potential refunds as per our satisfaction guarantee policy.',
  },
  {
    id: 5,
    question: 'Can I request a specific guard for future bookings?',
    answer: 'Absolutely! Once you find a guard you trust, you can add them to your favorites and request them for future bookings. Subject to their availability, you\'ll be able to work with them again.',
  },
  {
    id: 6,
    question: 'Do guards provide their own transportation?',
    answer: 'Yes, all SecureMate guards arrange their own transportation to reach your location. The travel time and estimated arrival are shown in the app once your booking is confirmed.',
  },
];

export const appScreenshots: AppScreenshot[] = [
  {
    id: 1,
    title: 'Login Screen',
    image: 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Secure authentication with multiple options',
  },
  {
    id: 2,
    title: 'Home Dashboard',
    image: 'https://images.pexels.com/photos/6633920/pexels-photo-6633920.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Browse and find guards near you',
  },
  {
    id: 3,
    title: 'Guard Profile',
    image: 'https://images.pexels.com/photos/6633912/pexels-photo-6633912.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'View guard details, ratings, and availability',
  },
  {
    id: 4,
    title: 'Chat & Booking',
    image: 'https://images.pexels.com/photos/6633909/pexels-photo-6633909.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Real-time communication with your guard',
  },
];

// Import app screenshots
import heroImg from '../assets/images/hero.png';

export const appScreens = [
  {
    id: 'browse',
    title: 'Find Guards',
    description: 'Browse through our verified guards and select the one that fits your needs.',
    iconName: 'Shield',
    image: heroImg, // Temporary image, replace with your app screenshot
    features: ['Filter by rating, price, and experience', 'View detailed profiles', 'See availability in real-time'],
  },
  {
    id: 'book',
    title: 'Easy Booking',
    description: 'Book your chosen guard for your required date, time, and duration in just a few taps.',
    iconName: 'Clock',
    image: heroImg, // Temporary image, replace with your app screenshot
    features: ['Select date and time', 'Choose duration', 'Add special requirements'],
  },
  {
    id: 'pay',
    title: 'Secure Payment',
    description: 'Pay securely through our integrated payment gateway with multiple options.',
    iconName: 'CreditCard',
    image: heroImg, // Temporary image, replace with your app screenshot
    features: ['Multiple payment methods', 'Transparent pricing', 'Electronic receipts'],
  },
  {
    id: 'track',
    title: 'Track & Chat',
    description: "Track your guard's location in real-time and communicate directly through the app.",
    iconName: 'MessageSquare',
    image: heroImg, // Temporary image, replace with your app screenshot
    features: ['Real-time location tracking', 'In-app messaging', 'Emergency alerts'],
  },
];