import { ProblemItem, SolutionItem, FeatureItem, FAQItem } from "./types";

export const restaurantProblems: ProblemItem[] = [
  {
    id: "rp1",
    title: "High Standard Commissions",
    description: "Traditional delivery platforms charge high commission rates that erode your business's core profitability.",
    iconName: "TrendingDown",
    metrics: "Margin Strain"
  },
  {
    id: "rp2",
    title: "Limited Day-One Visibility",
    description: "New restaurants struggle to stand out on crowded platforms without spending heavily on advertising.",
    iconName: "EyeOff",
    metrics: "Low Search Rank"
  },
  {
    id: "rp3",
    title: "Delayed Setup Times",
    description: "Onboarding processes can be slow and complex, keeping your business offline for weeks.",
    iconName: "ShieldAlert",
    metrics: "Process Friction"
  },
  {
    id: "rp4",
    title: "No Direct Customer Connection",
    description: "Most platforms shield your customer details, preventing you from building direct, loyal relationships.",
    iconName: "BarChart3",
    metrics: "Disconnected Data"
  }
];

export const solutions: SolutionItem[] = [
  {
    id: "s1",
    title: "Priority Onboarding",
    description: "Complete your setup early and be fully prepared to receive orders the moment we launch.",
    iconName: "Clock",
    badge: "Early Setup"
  },
  {
    id: "s2",
    title: "Early Platform Access",
    description: "Gain early access to our platform tools and systems to configure your operations at your own pace.",
    iconName: "ShieldCheck",
    badge: "Beta Access"
  },
  {
    id: "s3",
    title: "Launch Day Visibility",
    description: "Benefit from prominent exposure on the platform from Day 1 as an early launch partner.",
    iconName: "Sparkles",
    badge: "Prime Exposure"
  },
  {
    id: "s4",
    title: "Merchant Dashboard Access",
    description: "Explore our powerful merchant portal to manage menus, update listings, and track performance.",
    iconName: "LayoutDashboard",
    badge: "Dashboard"
  },
  {
    id: "s5",
    title: "Direct Onboarding Support",
    description: "Work directly with a designated partner specialist to assist with your menu integration and system setup.",
    iconName: "Headphones",
    badge: "Dedicated Help"
  },
  {
    id: "s6",
    title: "Early Product Updates",
    description: "Receive priority product announcements and contribute feedback to shape new features before the public release.",
    iconName: "Zap",
    badge: "Co-Development"
  }
];

export const features: FeatureItem[] = [
  {
    id: "f1",
    title: "Priority Onboarding",
    description: "Get verified and set up early in our systems so you are ready to go live immediately on Launch Day.",
    iconName: "Clock",
    badge: "Priority"
  },
  {
    id: "f2",
    title: "Early Platform Access",
    description: "Access our merchant portal weeks before release to configure menus, prep times, and business details.",
    iconName: "ShieldCheck",
    badge: "Early Entry"
  },
  {
    id: "f3",
    title: "Launch Day Visibility",
    description: "Secure dedicated placement on local feeds when we open, ensuring high organic reach from day one.",
    iconName: "Sparkles",
    badge: "Visibility"
  },
  {
    id: "f4",
    title: "Merchant Dashboard Access",
    description: "Utilize an intuitive merchant dashboard to configure multiple menus, update inventory, and analyze statistics.",
    iconName: "LayoutDashboard",
    badge: "Merchant Portal"
  },
  {
    id: "f5",
    title: "Direct Onboarding Support",
    description: "A single point of contact will guide you through menu imports, tablet setup, and operational training.",
    iconName: "Headphones",
    badge: "Live Support"
  },
  {
    id: "f6",
    title: "Early Product Updates",
    description: "Be the first to test and benefit from our latest software updates, merchant promotions, and tech features.",
    iconName: "Zap",
    badge: "Innovation"
  },
  {
    id: "f7",
    title: "Real-Time Order Routing",
    description: "Optimized driver matching and preparation buffer settings built to keep your delivery operations fluid.",
    iconName: "BarChart3",
    badge: "Efficiency"
  },
  {
    id: "f8",
    title: "Direct Payout Systems",
    description: "Transparent, predictable payout structures designed to protect cash flow for independent kitchens.",
    iconName: "CreditCard",
    badge: "Cash Flow"
  }
];

export const faqs: FAQItem[] = [
  {
    id: "faq1",
    question: "What is ZopiqNow?",
    answer: "ZopiqNow is an upcoming food delivery platform currently under development. We are establishing partnerships with top local food businesses to build a robust merchant-first delivery network before our official public launch.",
    category: "General"
  },
  {
    id: "faq2",
    question: "Who can pre register?",
    answer: "We welcome all registered local food businesses, including Restaurants, Cafes, Cloud Kitchens, Bakeries, Dessert Shops, Juice Bars, Food Courts, Mall Food Outlets, Fast Food Chains, and Food Trucks.",
    category: "Eligibility"
  },
  {
    id: "faq3",
    question: "Is there any registration fee?",
    answer: "No, there is absolutely zero registration or setup fee to join our Launch Partner Program during this pre-registration phase.",
    category: "Cost"
  },
  {
    id: "faq4",
    question: "When will ZopiqNow launch?",
    answer: "ZopiqNow is currently completing development. We will announce specific launching timelines for our partner cities soon, and pre-registered merchants will receive regular progress updates.",
    category: "Timeline"
  },
  {
    id: "faq5",
    question: "What happens after I submit my registration?",
    answer: "Your details are safely stored in our secure database. Our launch operations team will review your business information to ensure eligibility and place you on our launch partner update list.",
    category: "Process"
  },
  {
    id: "faq6",
    question: "How will I know when onboarding starts?",
    answer: "We will contact you via email or phone as soon as regional partner onboarding is ready to initiate in your city, giving you ample time to prepare before public launch.",
    category: "Process"
  },
  {
    id: "faq7",
    question: "Can I update my information later?",
    answer: "Yes, once we contact you for onboarding, a dedicated onboarding specialist will verify and update your menus, address, and contact preferences with you directly.",
    category: "Support"
  },
  {
    id: "faq8",
    question: "Which cities are you planning to launch in?",
    answer: "We are currently evaluating launch cities based on local merchant density and interest. Pre-registering your restaurant helps signal demand and accelerates our launch in your city.",
    category: "Timeline"
  },
  {
    id: "faq9",
    question: "Will every restaurant be onboarded immediately?",
    answer: "To ensure a premium and stable service, we will onboard restaurants in structured waves. Early pre-registrants are prioritized for the first wave of onboarding.",
    category: "Eligibility"
  }
];
