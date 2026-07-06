import { ProblemItem, SolutionItem, FeatureItem, Testimonial, FAQItem } from "./types";

export const customerProblems: ProblemItem[] = [
  {
    id: "cp1",
    title: "The 45+ Minute Wait",
    description: "Cold meals, delayed dinners, and broken promises. Current delivery platforms treat speed as an afterthought.",
    iconName: "Clock",
    metrics: "Average 48m delivery time"
  },
  {
    id: "cp2",
    title: "Hidden Fees & Markups",
    description: "Service charges, processing fees, distance surcharges, and marked-up menu prices. You pay up to 40% extra.",
    iconName: "DollarSign",
    metrics: "Up to 40% markup"
  },
  {
    id: "cp3",
    title: "Robot Customer Support",
    description: "Stuck in an endless chat loop with an AI bot when your food goes missing or arrives completely damaged.",
    iconName: "MessageSquare",
    metrics: "85% automated support"
  },
  {
    id: "cp4",
    title: "Homogeneous Selections",
    description: "The same massive corporate fast food chains highlighted repeatedly, burying local gems and authentic eateries.",
    iconName: "Utensils",
    metrics: "70% corporate chains"
  }
];

export const restaurantProblems: ProblemItem[] = [
  {
    id: "rp1",
    title: "Crushing 30% Commissions",
    description: "Delivery giants eat directly into your razor-thin profit margins, making delivery unprofitable for independent owners.",
    iconName: "TrendingDown",
    metrics: "25% - 35% commission rate"
  },
  {
    id: "rp2",
    title: "Pay-to-Play Visibility",
    description: "Unless you spend heavily on sponsored ad placements, your restaurant remains completely invisible to local diners.",
    iconName: "EyeOff",
    metrics: "90% organic traffic decline"
  },
  {
    id: "rp3",
    title: "Bureaucratic Onboarding",
    description: "Weeks of waiting for approvals, complicated system setups, and rigid platform mandates that slow you down.",
    iconName: "ShieldAlert",
    metrics: "14-day average setup time"
  },
  {
    id: "rp4",
    title: "Locked Data & Analytics",
    description: "No direct customer relationships. You receive basic summaries but never understand who your loyal diners actually are.",
    iconName: "BarChart3",
    metrics: "Zero raw database access"
  }
];

export const solutions: SolutionItem[] = [
  {
    id: "s1",
    title: "Sub-25 Minute Deliveries",
    description: "Our hyper-local predictive routing algorithm ensures hot meals arrive when they taste best — straight from stove to table.",
    iconName: "Zap",
    badge: "Ultralight Routing"
  },
  {
    id: "s2",
    title: "Zero Hidden Fees",
    description: "Transparent pricing. A single flat delivery rate, standard menu pricing, and zero complex processing or service markup additions.",
    iconName: "ShieldCheck",
    badge: "100% Transparent"
  },
  {
    id: "s3",
    title: "Partner-First 8% Commissions",
    description: "We charge a fraction of other platforms. Keep 92% of your hard-earned revenue and reinvest in your culinary craft.",
    iconName: "DollarSign",
    badge: "Saves Profits"
  },
  {
    id: "s4",
    title: "Predictive AI Personalization",
    description: "Our local tasting model matches diners with their exact cravings and introduces them to curated local culinary stars.",
    iconName: "Sparkles",
    badge: "Deep Recommender"
  },
  {
    id: "s5",
    title: "Democratized Organic Reach",
    description: "Fair-play algorithm. High ratings, local proximity, and preparation speeds drive ranking, not the size of your ad budget.",
    iconName: "TrendingUp",
    badge: "Community Owned"
  },
  {
    id: "s6",
    title: "Co-Operative Customer Care",
    description: "Live, human delivery operations team located locally. Speak with a real coordinator in two taps, guaranteed within 60 seconds.",
    iconName: "Headphones",
    badge: "Always Human"
  }
];

export const features: FeatureItem[] = [
  {
    id: "f1",
    title: "Lightning Fast Delivery",
    description: "Proprietary dispatch system pairs orders immediately with thermal-insulated cargo couriers for rapid transit.",
    iconName: "Zap",
    badge: "Hot & Fresh"
  },
  {
    id: "f2",
    title: "Live High-Fidelity Tracking",
    description: "Watch your food traverse block-by-block with ultra-low latency real-time telemetry and exact-minute arrivals.",
    iconName: "Navigation",
    badge: "Real-Time"
  },
  {
    id: "f3",
    title: "AI Culinary Recommendations",
    description: "Taste-graph technology maps your favorite profiles, textures, and reviews to recommend dishes you will genuinely love.",
    iconName: "Sparkles",
    badge: "AI Powered"
  },
  {
    id: "f4",
    title: "Exclusive Partner Dashboard",
    description: "A gorgeous, responsive command center for owners. Manage inventory, live menus, payout metrics, and custom campaigns.",
    iconName: "LayoutDashboard",
    badge: "For Restaurants"
  },
  {
    id: "f5",
    title: "Precision Analytics Engine",
    description: "Track customer demographics, return rates, heatmaps of high demand, and custom peak hour predictions effortlessly.",
    iconName: "BarChart3",
    badge: "Data Rich"
  },
  {
    id: "f6",
    title: "Scheduled Smart Deliveries",
    description: "Order ahead for the entire week. Set custom routines like 'Fresh salad every Tuesday at 12:15 PM' and never forget.",
    iconName: "Calendar",
    badge: "Auto-Pilot"
  },
  {
    id: "f7",
    title: "Flexible Payment Infrastructure",
    description: "Secure, frictionless transactions with immediate payouts, split-bill groups, Apple Pay, credit cards, and crypto.",
    iconName: "CreditCard",
    badge: "Modern Pay"
  },
  {
    id: "f8",
    title: "Frictionless Referral Network",
    description: "Introduce friends to ZopiqNow and earn permanent delivery credits, custom perks, and free dishes from local favorites.",
    iconName: "Gift",
    badge: "Earn Credits"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "Standard platforms take almost 32% of our sales. With ZopiqNow, their 8% commission rate is allowing us to hire two new kitchen staff and expand our organic menu. This is the platform restaurants have been praying for.",
    author: "Elena Rostova",
    role: "Head Chef & Owner, Basil & Vine Bistro",
    tag: "Restaurant Partner",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5
  },
  {
    id: "t2",
    quote: "I was lucky enough to join the ZopiqNow closed pilot. The average delivery time is shockingly fast—consistently under 22 minutes. The food arrives piping hot, and I love seeing exactly what my delivery fee covers.",
    author: "Marcus Vance",
    role: "Early Access Beta Tester",
    tag: "Hungry Customer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5
  },
  {
    id: "t3",
    quote: "As a professional food photographer and creator, platform quality is everything. ZopiqNow's focus on showcasing authentic, local, craft food creators rather than just national burger chains is a massive breath of fresh air.",
    author: "Sienna Brooks",
    role: "Creator of @TheSaltyBite",
    tag: "Food Creator",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5
  }
];

export const faqs: FAQItem[] = [
  {
    id: "faq1",
    question: "When is ZopiqNow launching?",
    answer: "ZopiqNow is currently finishing its closed beta test. We are officially scheduled to launch in our first wave of major cities in late October 2026. Pre-registered users will receive invitations 2 weeks early with custom launch deals.",
    category: "General"
  },
  {
    id: "faq2",
    question: "Which cities will you launch in first?",
    answer: "Our Initial Wave includes San Francisco, New York, Seattle, Austin, and Chicago. We plan to expand rapidly to second-tier metro regions and regional hubs based directly on the density of our customer pre-registration signups!",
    category: "General"
  },
  {
    id: "faq3",
    question: "How can restaurants join the platform?",
    answer: "Restaurants can register using the 'Partner Your Restaurant' form on this page. Our verification team will contact you within 48 hours to collect menu details, dispatch professional photography teams (completely free!), and schedule your setup.",
    category: "Restaurants"
  },
  {
    id: "faq4",
    question: "Is registration free and are there long-term commitments?",
    answer: "Pre-registration and onboarding are 100% free with absolutely no signup or setup fees. There are no contracts or termination penalties—we believe in earning your partnership with every single order.",
    category: "Restaurants"
  },
  {
    id: "faq5",
    question: "How can you charge only 8% commission when others charge 30%?",
    answer: "We use hyper-local routing networks and serverless dispatch operations that reduce massive corporate overhead. Instead of inflating fees to fund bloated corporate hierarchies, we pass those savings back to local kitchens and couriers.",
    category: "Restaurants"
  },
  {
    id: "faq6",
    question: "Will there be delivery charges for customers?",
    answer: "Yes, but they are flat, transparent, and go directly to rewarding your local courier. There are never any obscure service charges, platform fees, or peak-demand surge markups.",
    category: "Customers"
  },
  {
    id: "faq7",
    question: "Can I become a delivery partner with ZopiqNow?",
    answer: "Absolutely! We will open our dedicated Courier Onboarding portal in August 2026. We offer industry-leading mileage payouts, flexible shift scheduling, and comprehensive health/injury protection packages.",
    category: "Couriers"
  },
  {
    id: "faq8",
    question: "What exclusive benefits do early registrants receive?",
    answer: "Customers who pre-register today receive a 'First 5 Deliveries Free' pack, priority matching status, and access to private chef tables. Restaurants receive a 0% commission rate for their first 30 days of operation and featured listing tags.",
    category: "Customers"
  }
];
