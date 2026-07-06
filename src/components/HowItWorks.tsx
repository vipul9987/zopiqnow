import { useRef, ReactNode } from "react";
import { Store, Receipt, Route, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const stepsData: StepItem[] = [
  {
    step: "01",
    title: "Browse Restaurants",
    description: "Explore nearby restaurants, discover trending dishes, and choose your favorite meals.",
    icon: <Store className="w-5 h-5 md:w-6 md:h-6 text-[#FA5903]" />
  },
  {
    step: "02",
    title: "Place Your Order",
    description: "Customize your meal, add special instructions, and complete checkout in seconds.",
    icon: <Receipt className="w-5 h-5 md:w-6 md:h-6 text-[#FA5903]" />
  },
  {
    step: "03",
    title: "Real Time Tracking",
    description: "Track your order live from the restaurant to your doorstep with instant status updates.",
    icon: <Route className="w-5 h-5 md:w-6 md:h-6 text-[#FA5903]" />
  },
  {
    step: "04",
    title: "Enjoy Your Meal",
    description: "Receive your order quickly, enjoy fresh food, and rate your experience.",
    icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#FA5903]" />
  }
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll tracking to draw the SVG curve as user scrolls through the section
  const pathLength = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FFFFFF] py-[70px]"
    >
      {/* Decorative Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#EAEAEA_1px,transparent_1px)] [background-size:24px_24px] opacity-4 pointer-events-none" />

      <div className="max-w-7xl mx-auto section-container-padding relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="text-xs font-bold tracking-widest text-[#FA5903] uppercase font-mono bg-[#FA5903]/5 px-3 py-1.5 rounded-full border border-[#FA5903]/20">
              How It Works
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#111111] mt-2 mb-4 leading-tight">
            From Order to Doorstep
          </h2>
          <p className="text-[#555555] text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-xl mx-auto">
            Getting your favorite food delivered is simple, fast, and hassle free.
          </p>
        </div>

        {/* Desktop & Tablet Curved Horizontal Journey (mdBreakpoint and above) */}
        <div className="hidden md:block relative h-[380px] md:h-[420px] lg:h-[500px] w-full mt-12 select-none">
          
          {/* Connecting Curved SVG Path Background */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
              {/* Soft guide dashed path */}
              <path
                d="M 0,250 C 50,250 80,380 125,380 C 200,380 300,120 375,120 C 450,120 550,380 625,380 C 700,380 800,120 875,120 C 920,120 950,250 1000,250"
                stroke="#FA5903"
                strokeWidth="3"
                strokeDasharray="8 6"
                className="opacity-15"
                fill="none"
              />
              {/* Scroll animated drawn curve */}
              <motion.path
                d="M 0,250 C 50,250 80,380 125,380 C 200,380 300,120 375,120 C 450,120 550,380 625,380 C 700,380 800,120 875,120 C 920,120 950,250 1000,250"
                stroke="url(#timeline-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FA5903" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FF7A5C" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FA5903" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* 4 Interactive Columns with alternating visual balance */}
          <div className="grid grid-cols-4 h-full relative z-10">
            
            {/* Step 1 Column */}
            <div className="relative h-full">
              {/* Content Block (Above path) */}
              <div className="absolute top-[5%] left-0 right-4 text-left">
                <div className="relative">
                  <span className="absolute -top-12 -left-3 text-7xl font-display font-black text-[#FA5903]/5 select-none pointer-events-none">
                    01
                  </span>
                  <div className="relative z-10 pt-2 pl-2">
                    <h3 className="text-lg lg:text-xl font-display font-bold text-[#111111] mb-2">Browse Restaurants</h3>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      Explore nearby restaurants, discover trending dishes, and choose your favorite meals.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Icon Card (Below path) */}
              <div className="absolute top-[76%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <FloatingIconCard step={1} icon={stepsData[0].icon} />
              </div>
            </div>

            {/* Step 2 Column */}
            <div className="relative h-full">
              {/* Floating Icon Card (Above path) */}
              <div className="absolute top-[24%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <FloatingIconCard step={2} icon={stepsData[1].icon} />
              </div>

              {/* Content Block (Below path) */}
              <div className="absolute bottom-[5%] left-4 right-0 text-left">
                <div className="relative">
                  <span className="absolute -top-12 -left-3 text-7xl font-display font-black text-[#FA5903]/5 select-none pointer-events-none">
                    02
                  </span>
                  <div className="relative z-10 pt-2 pl-2">
                    <h3 className="text-lg lg:text-xl font-display font-bold text-[#111111] mb-2">Place Your Order</h3>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      Customize your meal, add special instructions, and complete checkout in seconds.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 Column */}
            <div className="relative h-full">
              {/* Content Block (Above path) */}
              <div className="absolute top-[5%] left-4 right-4 text-left">
                <div className="relative">
                  <span className="absolute -top-12 -left-3 text-7xl font-display font-black text-[#FA5903]/5 select-none pointer-events-none">
                    03
                  </span>
                  <div className="relative z-10 pt-2 pl-2">
                    <h3 className="text-lg lg:text-xl font-display font-bold text-[#111111] mb-2">Real Time Tracking</h3>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      Track your order live from the restaurant to your doorstep with instant status updates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Icon Card (Below path) */}
              <div className="absolute top-[76%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <FloatingIconCard step={3} icon={stepsData[2].icon} />
              </div>
            </div>

            {/* Step 4 Column */}
            <div className="relative h-full">
              {/* Floating Icon Card (Above path) */}
              <div className="absolute top-[24%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <FloatingIconCard step={4} icon={stepsData[3].icon} />
              </div>

              {/* Content Block (Below path) */}
              <div className="absolute bottom-[5%] left-4 right-4 text-left">
                <div className="relative">
                  <span className="absolute -top-12 -left-3 text-7xl font-display font-black text-[#FA5903]/5 select-none pointer-events-none">
                    04
                  </span>
                  <div className="relative z-10 pt-2 pl-2">
                    <h3 className="text-lg lg:text-xl font-display font-bold text-[#111111] mb-2">Enjoy Your Meal</h3>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      Receive your order quickly, enjoy fresh food, and rate your experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Vertical Timeline Layout (Below mdBreakpoint) */}
        <div className="md:hidden relative mt-10 space-y-12 pl-6 text-left">
          {/* Connecting vertical line with gradient fade */}
          <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#FA5903] via-[#FA5903]/40 to-[#FA5903]/10 pointer-events-none" />

          {stepsData.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative flex items-start space-x-6"
            >
              {/* Floating Icon Card on left vertical axis */}
              <div className="relative shrink-0 z-10">
                <FloatingIconCard step={idx + 1} icon={item.icon} />
              </div>

              {/* Content Block on right side */}
              <div className="relative flex-1 pt-1">
                <span className="absolute -top-6 left-0 text-5xl font-display font-black text-[#FA5903]/5 select-none pointer-events-none">
                  {item.step}
                </span>
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-display font-bold text-[#111111] mb-1">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// Reusable micro-interactive Floating Icon Card component
interface FloatingIconProps {
  step: number;
  icon: ReactNode;
}

function FloatingIconCard({ step, icon }: FloatingIconProps) {
  return (
    <motion.div
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: step * 0.4,
      }}
      whileHover={{ scale: 1.08, y: -10 }}
      className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-[15px] bg-white border border-[#EAEAEA]/30 text-[#111111] shadow-[0_10px_30px_-5px_rgba(31,26,21,0.05)] hover:shadow-[0_20px_40px_-5px_rgba(255,90,54,0.18)] hover:border-[#FA5903]/30 transition-all duration-300 cursor-pointer"
    >
      {/* Subtle hover radial glow ring around active steps */}
      <div className="absolute inset-0 rounded-[15px] bg-[radial-gradient(#FA5903_1px,transparent_1px)] [background-size:16px_16px] opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
      
      {/* Micro-hover rotating icon */}
      <div className="relative z-10 transform group-hover:rotate-12 transition-transform duration-300">
        {icon}
      </div>

      {/* Clean high-contrast step identifier badge */}
      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#111111] text-white text-[9px] md:text-[10px] font-mono font-bold flex items-center justify-center border border-white shadow-sm">
        {step}
      </div>
    </motion.div>
  );
}
