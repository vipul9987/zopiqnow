export interface CustomerRegistration {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  notify: boolean;
  timestamp: string;
}

export interface RestaurantRegistration {
  id: string;
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  cuisineType: string;
  averageDailyOrders: string;
  website?: string;
  message?: string;
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



