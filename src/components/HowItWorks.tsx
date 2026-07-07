import { useState, useRef, ReactNode } from "react";
import { Store, Receipt, Route, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const customerSteps: StepItem[] = [
  {
    step: "01",
    title: "Reserve Your Spot",
    description: "Sign up today in under 30 seconds to lock in priority launch status and your early user rewards.",
    icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#FA5903]" />
  },
  {
    step: "02",
    title: "Get Launch Updates",
    description: "Receive exclusive sneak-peeks, exact launch dates, and private beta invitations for your city.",
    icon: <Route className="w-5 h-5 md:w-6 md:h-6 text-[#FA5903]" />
  },
  {
    step: "03",
    title: "Start Ordering",
    description: "Experience ultra-fast deliveries with zero hidden fees, plus get your first 5 deliveries 100% free.",
    icon: <Store className="w-5 h-5 md:w-6 md:h-6 text-[#FA5903]" />
  }
];

const restaurantSteps: StepItem[] = [
  {
    step: "01",
    title: "Register Your Restaurant",
    description: "Reserve your launch spot to secure priority onboarding before we go live in your city.",
    icon: <Store className="w-5 h-5 md:w-6 md:h-6 text-[#FA5903]" />
  },
  {
    step: "02",
    title: "Get Verified & Audited",
    description: "Our priority onboarding squad reviews your kitchen details and configures your digital menu.",
    icon: <Receipt className="w-5 h-5 md:w-6 md:h-6 text-[#FA5903]" />
  },
  {
    step: "03",
    title: "Go Live on Launch Day",
    description: "Open your digital doors, receive direct orders, and pay a flat 8% commission rate.",
    icon: <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#FA5903]" />
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
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
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

        {/* 3-Step Grid (Horizontal for md+, Vertical for mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12 relative">
          
          {/* Subtle connecting lines for horizontal desktop steps */}
          <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-orange-200 via-orange-400/50 to-orange-200 pointer-events-none z-0" />

          {currentSteps.map((item, idx) => (
            <motion.div
              key={`${activeTab}-${item.step}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col items-center md:items-start text-center md:text-left z-10 group"
            >
              {/* Stepper Bubble */}
              <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-white border border-[#EAEAEA]/80 text-[#111111] shadow-md group-hover:shadow-lg group-hover:border-[#FA5903]/30 transition-all duration-300 mb-6 relative">
                <div className="text-[#FA5903] transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                {/* Numeric Step Badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#111111] text-white text-[10px] font-mono font-bold flex items-center justify-center border border-white shadow-sm">
                  {item.step}
                </div>
              </div>

              {/* Step Content */}
              <div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-[#111111] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
