import { ProblemItem, SolutionItem, FeatureItem, Testimonial, FAQItem } from "./types";

export const customerProblems: ProblemItem[] = [
  {
    id: "cp1",
    title: "The Lukewarm Wait",
    description: "Cold meals, broken delivery windows, and zero accountability. Legacy platforms treat delivery speed as a secondary concern.",
    iconName: "Clock",
    metrics: "Average 45+ min wait time"
  },
  {
    id: "cp2",
    title: "Aggressive Hidden Markup",
    description: "Service charges, processing fees, platform fees, and marked-up menu prices. You often pay up to 40% extra.",
    iconName: "DollarSign",
    metrics: "Up to 40% hidden markups"
  },
  {
    id: "cp3",
    title: "Soulless Chatbots",
    description: "Trapped in an infinite loop with automated support bots when your food is cold, wrong, or never arrives.",
    iconName: "MessageSquare",
    metrics: "85% automated chatbot loops"
  },
  {
    id: "cp4",
    title: "Algorithmic Monotony",
    description: "National fast-food conglomerates get top billing, completely burying local culinary artisans and authentic creators.",
    iconName: "Utensils",
    metrics: "70% corporate bias"
  }
];

export const restaurantProblems: ProblemItem[] = [
  {
    id: "rp1",
    title: "Hostile 30% Commissions",
    description: "Legacy delivery giants consume your hard-earned margins, turning high-volume delivery into a loss leader.",
    iconName: "TrendingDown",
    metrics: "30%+ platform commission tax"
  },
  {
    id: "rp2",
    title: "The Visibility Tax",
    description: "Unless you pay massive advertising premiums, your kitchen remains completely invisible to local hungry diners.",
    iconName: "EyeOff",
    metrics: "90% visibility drop for local spots"
  },
  {
    id: "rp3",
    title: "Frictional Onboarding",
    description: "Weeks of waiting, convoluted dashboard systems, and rigid, unfriendly platform rules that slow down your growth.",
    iconName: "ShieldAlert",
    metrics: "14-day average onboarding delay"
  },
  {
    id: "rp4",
    title: "Locked Customer Data",
    description: "No direct customer connection. You get high-level summaries, but you can never engage directly with your loyal patrons.",
    iconName: "BarChart3",
    metrics: "Zero direct customer access"
  }
];

export const solutions: SolutionItem[] = [
  {
    id: "s1",
    title: "Sub-25 Minute Deliveries",
    description: "Hyper-local routing keeps delivery times ultra-fast. Your food arrives in thermal-sealed packaging, exactly how the chef intended.",
    iconName: "Zap",
    badge: "Ultra-Fast Routing"
  },
  {
    id: "s2",
    title: "100% Transparent Pricing",
    description: "Flat, honest delivery fees. Standard menu pricing with zero hidden surcharges, zero platform fees, and zero surprises.",
    iconName: "ShieldCheck",
    badge: "Zero Hidden Fees"
  },
  {
    id: "s3",
    title: "Partner-First 8% Commission",
    description: "Keep 92% of your hard-earned revenue. A fair commission structure designed to support local independent businesses.",
    iconName: "DollarSign",
    badge: "Saves Your Profit"
  },
  {
    id: "s4",
    title: "Curated Local Discovery",
    description: "An organic matching engine that connects food lovers with authentic local culinary stars instead of commercial chains.",
    iconName: "Sparkles",
    badge: "Authentic Discoveries"
  },
  {
    id: "s5",
    title: "Organic Ranking Engine",
    description: "Rankings are driven purely by diner satisfaction, proximity, and freshness—never by who paid for premium visibility.",
    iconName: "TrendingUp",
    badge: "Pure Meritocracy"
  },
  {
    id: "s6",
    title: "Local Human Dispatchers",
    description: "Skip the bots. Get instant access to local, real-time dispatch teams dedicated to resolving issues in seconds.",
    iconName: "Headphones",
    badge: "Real Human Support"
  }
];

export const features: FeatureItem[] = [
  {
    id: "f1",
    title: "Thermal-Sealed Courier Network",
    description: "Our dedicated launch fleet uses state-of-the-art insulated cargo bags to maintain perfect temperature control.",
    iconName: "Zap",
    badge: "Pristine Delivery"
  },
  {
    id: "f2",
    title: "Block-by-Block GPS Tracking",
    description: "Watch your delivery journey in real-time with zero lag, providing exact-minute ETA updates.",
    iconName: "Navigation",
    badge: "High Fidelity"
  },
  {
    id: "f3",
    title: "Curated Culinary Recommendations",
    description: "Our localized recommendation engine maps flavor profiles to suggest dishes tailored to your taste.",
    iconName: "Sparkles",
    badge: "Personalized Discovery"
  },
  {
    id: "f4",
    title: "Launch Partner Dashboard",
    description: "A premium, lightning-fast dashboard to manage live menus, view insights, and customize launch promotions.",
    iconName: "LayoutDashboard",
    badge: "Partner Exclusives"
  },
  {
    id: "f5",
    title: "Intelligent Peak Predictions",
    description: "Anticipate high-volume slots and order density with predictive analytics designed for smooth kitchen flow.",
    iconName: "BarChart3",
    badge: "Flow Optimizer"
  },
  {
    id: "f6",
    title: "Scheduled Recurring Deliveries",
    description: "Set up recurring meal routines—like a fresh, hand-tossed Cobb Salad arriving every Tuesday at 12:15 PM.",
    iconName: "Calendar",
    badge: "Automated Routine"
  },
  {
    id: "f7",
    title: "Frictionless Checkout",
    description: "Express checkouts with support for secure digital wallets, major cards, and instant peer splitting.",
    iconName: "CreditCard",
    badge: "Instant Checkout"
  },
  {
    id: "f8",
    title: "Launch Partner Network",
    description: "Introduce your favorite local kitchens to ZopiqNow and unlock permanent platform benefits.",
    iconName: "Gift",
    badge: "Partner Perks"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "Standard platforms take nearly 30% of our hard-earned revenue. ZopiqNow's flat 8% launch commission means we can protect our margins and expand our kitchen staff. It feels like a true culinary partnership.",
    author: "Elena Rostova",
    role: "Head Chef & Owner, Basil & Vine Bistro",
    tag: "Launch Partner",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5
  },
  {
    id: "t2",
    quote: "As part of the initial city pilot, the average delivery is incredibly quick—consistently arriving under 22 minutes. The food arrives piping hot, and knowing exactly where my delivery fee goes is a game-changer.",
    author: "Marcus Vance",
    role: "Early Access User",
    tag: "Early Access Diner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5
  },
  {
    id: "t3",
    quote: "ZopiqNow is exactly what our local culinary scene needs. By highlighting authentic independent eateries over national fast-food chains, it provides a premium platform for real culinary craftsmanship.",
    author: "Sienna Brooks",
    role: "Creator of @TheSaltyBite",
    tag: "Launch Culinary Partner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5
  }
];

export const faqs: FAQItem[] = [
  {
    id: "faq1",
    question: "When is the official launch of ZopiqNow?",
    answer: "ZopiqNow is currently finishing its final city pilot phase. We are officially launching in our first wave of major cities in late October 2026. Pre-registered users will secure private access invitations 2 weeks before the public launch.",
    category: "General"
  },
  {
    id: "faq2",
    question: "Which cities are included in the launch?",
    answer: "Our Wave 1 launch includes San Francisco, New York, Seattle, Austin, and Chicago. We will rapidly expand to additional metropolitan regions based on local pre-registration density.",
    category: "General"
  },
  {
    id: "faq3",
    question: "How do we become a Launch Partner?",
    answer: "Restaurant and cafe owners can pre-register using the 'Become a Launch Partner' form. Our dedicated launch squad will contact you within 24 hours to secure your spot, arrange free professional photography, and customize your menu.",
    category: "Partners"
  },
  {
    id: "faq4",
    question: "Are there any hidden fees or long-term contracts?",
    answer: "Pre-registration is completely free. We do not require lock-in periods, registration fees, or hidden onboarding costs. We are committed to earning your partnership with every order.",
    category: "Partners"
  },
  {
    id: "faq5",
    question: "How does ZopiqNow offer an 8% commission rate?",
    answer: "By deploying hyper-local routing networks and serverless dispatch algorithms, we eliminate the heavy corporate overhead of traditional platforms. We pass those structural savings back to local kitchens and couriers.",
    category: "Partners"
  },
  {
    id: "faq6",
    question: "How do I secure early customer access?",
    answer: "Simply pre-register on this page using the 'Get Early Access' tab. You will secure priority dispatch status, exclusive launch day offers, and your first 5 deliveries completely free when we go live.",
    category: "Early Access"
  },
  {
    id: "faq7",
    question: "How do you support independent local delivery couriers?",
    answer: "Our launch fleet receives industry-leading distance payouts, flexible routing routines, and comprehensive safety equipment. We believe in providing flat, honest compensation with zero platform cuts on tips.",
    category: "Fleet"
  },
  {
    id: "faq8",
    question: "What exclusive incentives are available for pre-registering?",
    answer: "Early access diners get their first 5 deliveries free and priority matching. Launch partner kitchens secure a 0% commission rate for their first 30 days of operation and a featured 'First Wave Partner' badge for premium visibility.",
    category: "Early Access"
  }
];
