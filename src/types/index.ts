export interface NavLink {
  name: string;
  href: string;
}

export interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface AppScreenshot {
  id: number;
  title: string;
  image: string;
  description: string;
}