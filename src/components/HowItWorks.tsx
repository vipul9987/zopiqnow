import { ReactNode } from "react";
import { Store, ShieldCheck, ClipboardCheck, Play } from "lucide-react";
import { motion } from "motion/react";

interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const merchantSteps: StepItem[] = [
  {
    step: "01",
    title: "Reserve Your Spot",
    description: "Submit your pre-registration in under 2 minutes. Secure early launch benefits and lock in introductory pricing.",
    icon: <Store className="w-6 h-6 text-[#FA5903]" />
  },
  {
    step: "02",
    title: "Business Verification",
    description: "Our merchant team verifies your kitchen operations, licensing, and menu structure to ensure top-tier quality standards.",
    icon: <ShieldCheck className="w-6 h-6 text-[#FA5903]" />
  },
  {
    step: "03",
    title: "Onboarding & Training",
    description: "Receive free professional menu photography, custom tablet kits, and step-by-step training for your kitchen staff.",
    icon: <ClipboardCheck className="w-6 h-6 text-[#FA5903]" />
  },
  {
    step: "04",
    title: "Go Live on Launch Day",
    description: "Open your virtual doors to high-volume local customer groups on Launch Day with a flat, sustainable 8% commission.",
    icon: <Play className="w-6 h-6 text-[#FA5903]" />
  }
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#FFFFFF] pt-[35px] pb-[35px] border-b border-[#EAEAEA]/60"
    >
      {/* Decorative Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#EAEAEA_1px,transparent_1px)] [background-size:24px_24px] opacity-4 pointer-events-none" />

      <div className="max-w-7xl mx-auto section-container-padding relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="text-xs font-bold tracking-widest text-[#FA5903] uppercase font-mono bg-[#FA5903]/5 px-3 py-1.5 rounded-full border border-[#FA5903]/20">
              Merchant Journey
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#111111] mt-2 mb-4 leading-tight">
            How to Get Started
          </h2>
          <p className="text-[#555555] text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-xl mx-auto">
            A simple, high-support onboarding blueprint designed to prepare your food business for high-volume orders from Day 1.
          </p>
        </div>

        {/* Desktop Alternating Wavy Layout */}
        <div className="hidden md:block relative w-full h-[400px] mt-12 mb-8">
          
          {/* Wave SVG Line Background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
          >
            {/* Solid part of the curve */}
            <path
              d="M 0 200 C 60 200, 65 320, 125 320 C 185 320, 315 80, 375 80 C 435 80, 565 320, 625 320"
              fill="none"
              stroke="#FA5903"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="opacity-90"
            />
            {/* Dashed part of the curve */}
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
            {merchantSteps.map((item, idx) => {
              const isEven = idx % 2 === 1; // 0 (odd visually) -> bottom icon; 1 -> top icon

              return (
                <div
                  key={item.step}
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
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Layout */}
        <div className="md:hidden space-y-12 mt-12 relative">
          {/* vertical connecting line */}
          <div className="absolute top-10 bottom-10 left-[40px] w-[2px] bg-gradient-to-b from-[#FA5903] via-[#FA5903] to-[#FA5903]/20 pointer-events-none z-0" />

          {merchantSteps.map((item) => (
            <div
              key={`mobile-${item.step}`}
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
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
