import { useState, useRef, ReactNode } from "react";
import { Store, Receipt, Route, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const customerSteps: StepItem[] = [
  {
    step: "01",
    title: "Browse Restaurants",
    description: "Explore nearby restaurants, discover trending dishes, and choose your favorite meals.",
    icon: <Store className="w-6 h-6 text-[#FA5903]" />
  },
  {
    step: "02",
    title: "Place Your Order",
    description: "Customize your meal, add special instructions, and complete checkout in seconds.",
    icon: <Receipt className="w-6 h-6 text-[#FA5903]" />
  },
  {
    step: "03",
    title: "Real Time Tracking",
    description: "Track your order live from the restaurant to your doorstep with instant status updates.",
    icon: <Route className="w-6 h-6 text-[#FA5903]" />
  },
  {
    step: "04",
    title: "Enjoy Your Meal",
    description: "Receive your order quickly, enjoy fresh food, and rate your experience.",
    icon: <Sparkles className="w-6 h-6 text-[#FA5903]" />
  }
];

const restaurantSteps: StepItem[] = [
  {
    step: "01",
    title: "Register Your Restaurant",
    description: "Reserve your launch spot to secure priority onboarding before we go live in your city.",
    icon: <Store className="w-6 h-6 text-[#FA5903]" />
  },
  {
    step: "02",
    title: "Get Verified & Audited",
    description: "Our priority onboarding squad reviews your kitchen details and configures your digital menu.",
    icon: <Receipt className="w-6 h-6 text-[#FA5903]" />
  },
  {
    step: "03",
    title: "Promote Your Brand",
    description: "Collaborate on targeted local campaigns to drive maximum high-value customers on day one.",
    icon: <Route className="w-6 h-6 text-[#FA5903]" />
  },
  {
    step: "04",
    title: "Go Live on Launch Day",
    description: "Open your digital doors, receive direct orders, and pay a flat 8% low commission rate.",
    icon: <Sparkles className="w-6 h-6 text-[#FA5903]" />
  }
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"customers" | "restaurants">("customers");
  const sectionRef = useRef<HTMLDivElement>(null);

  const currentSteps = activeTab === "customers" ? customerSteps : restaurantSteps;

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FFFFFF] py-20 sm:py-24 md:py-28 border-b border-[#EAEAEA]/60"
    >
      {/* Decorative Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#EAEAEA_1px,transparent_1px)] [background-size:24px_24px] opacity-4 pointer-events-none" />

      <div className="max-w-7xl mx-auto section-container-padding relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="text-xs font-bold tracking-widest text-[#FA5903] uppercase font-mono bg-[#FA5903]/5 px-3 py-1.5 rounded-full border border-[#FA5903]/20">
              The Launch Playbook
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#111111] mt-2 mb-4 leading-tight">
            How ZopiqNow Works
          </h2>
          <p className="text-[#555555] text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-xl mx-auto">
            Get ready for a seamless launch. Here is how we coordinate exclusive access for our early cohort.
          </p>

          {/* Tab Selector */}
          <div className="flex items-center justify-center mt-8 p-1 bg-[#EAEAEA]/40 rounded-2xl max-w-sm mx-auto border border-[#EAEAEA]/60">
            <button
              onClick={() => setActiveTab("customers")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === "customers"
                  ? "bg-[#FFFFFF] text-[#FA5903] shadow-sm"
                  : "text-[#555555] hover:text-[#111111]"
              }`}
            >
              For Early Users
            </button>
            <button
              onClick={() => setActiveTab("restaurants")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === "restaurants"
                  ? "bg-[#FFFFFF] text-[#FA5903] shadow-sm"
                  : "text-[#555555] hover:text-[#111111]"
              }`}
            >
              For Launch Partners
            </button>
          </div>
        </div>

        {/* Desktop Alternating Wavy Layout */}
        <div className="hidden md:block relative w-full h-[400px] mt-12 mb-8">
          
          {/* Wave SVG Line Background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
          >
            {/* Solid part of the curve (Starts at (0,200), through Step 1 (125,320), Step 2 (375,80), and terminates at Step 3 (625,320)) */}
            <path
              d="M 0 200 C 60 200, 65 320, 125 320 C 185 320, 315 80, 375 80 C 435 80, 565 320, 625 320"
              fill="none"
              stroke="#FA5903"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="opacity-90"
            />
            {/* Dashed part of the curve (Starts at Step 3 (625,320), through Step 4 (875,80), and out at (1000, 200)) */}
            <path
              d="M 625 320 C 685 320, 815 80, 875 80 C 935 80, 940 200, 1000 200"
              fill="none"
              stroke="#FA5903"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="8 8"
              className="opacity-90"
            />
          </svg>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-4 h-full relative z-10">
            <AnimatePresence mode="popLayout">
              {currentSteps.map((item, idx) => {
                const isEven = idx % 2 === 1; // 0 (odd visually but 0 index) -> bottom icon; 1 -> top icon

                return (
                  <motion.div
                    key={`${activeTab}-${item.step}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex flex-col justify-between h-full px-4"
                  >
                    {/* Top Segment */}
                    <div className="h-[140px] flex flex-col justify-end">
                      {!isEven ? (
                        // Odd indexed step (01, 03) has Text at the top
                        <div className="text-left">
                          <span className="text-5xl font-display font-extrabold text-[#FA5903]/10 leading-none select-none -mb-1.5 block">
                            {item.step}
                          </span>
                          <h3 className="text-xl font-display font-extrabold text-[#111111] mb-2 leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#555555] leading-relaxed max-w-[240px]">
                            {item.description}
                          </p>
                        </div>
                      ) : (
                        // Even indexed step (02, 04) has Icon at the top
                        <div className="flex items-center justify-center h-full">
                          <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-white border border-[#EAEAEA]/80 text-[#111111] shadow-md hover:shadow-lg hover:border-[#FA5903]/30 transition-all duration-300 relative">
                            <div className="text-[#FA5903]">
                              {item.icon}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#111111] text-white text-[10px] font-mono font-bold flex items-center justify-center border border-white shadow-xs">
                              {parseInt(item.step)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Middle spacer to clear the wave path */}
                    <div className="h-[120px]" />

                    {/* Bottom Segment */}
                    <div className="h-[140px] flex flex-col justify-start">
                      {isEven ? (
                        // Even indexed step (02, 04) has Text at the bottom
                        <div className="text-left">
                          <span className="text-5xl font-display font-extrabold text-[#FA5903]/10 leading-none select-none -mb-1.5 block">
                            {item.step}
                          </span>
                          <h3 className="text-xl font-display font-extrabold text-[#111111] mb-2 leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#555555] leading-relaxed max-w-[240px]">
                            {item.description}
                          </p>
                        </div>
                      ) : (
                        // Odd indexed step (01, 03) has Icon at the bottom
                        <div className="flex items-center justify-center h-full">
                          <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-white border border-[#EAEAEA]/80 text-[#111111] shadow-md hover:shadow-lg hover:border-[#FA5903]/30 transition-all duration-300 relative">
                            <div className="text-[#FA5903]">
                              {item.icon}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#111111] text-white text-[10px] font-mono font-bold flex items-center justify-center border border-white shadow-xs">
                              {parseInt(item.step)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile / Tablet Vertical Layout */}
        <div className="md:hidden space-y-12 mt-12 relative">
          {/* vertical connecting line */}
          <div className="absolute top-10 bottom-10 left-[40px] w-[2px] bg-gradient-to-b from-[#FA5903] via-[#FA5903] to-[#FA5903]/20 pointer-events-none z-0" />

          <AnimatePresence mode="popLayout">
            {currentSteps.map((item, idx) => (
              <motion.div
                key={`${activeTab}-mobile-${item.step}`}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-6 relative z-10"
              >
                {/* Stepper Bubble */}
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-3xl bg-white border border-[#EAEAEA]/80 text-[#111111] shadow-md relative">
                  <div className="text-[#FA5903]">
                    {item.icon}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#111111] text-white text-[10px] font-mono font-bold flex items-center justify-center border border-white shadow-sm">
                    {parseInt(item.step)}
                  </div>
                </div>

                {/* Step Content */}
                <div className="pt-2 text-left">
                  <span className="text-4xl font-display font-extrabold text-[#FA5903]/10 leading-none select-none -mb-1 block">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-display font-bold text-[#111111] mb-1 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
