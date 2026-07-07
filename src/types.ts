export interface RestaurantRegistration {
  id: string;
  restaurantName: string;
  ownerName?: string;
  cityAddress: string;
  phone: string;
  instagram?: string;
  menu?: string;
  timestamp: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  tag: string;
  image: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ProblemItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metrics?: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  details?: string;
}



