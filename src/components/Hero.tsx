import { useState, useEffect, useRef, MouseEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, Star, Clock, Shield, Sparkles } from "lucide-react";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const [progress, setProgress] = useState(65);
  const [riderPos, setRiderPos] = useState({ x: 420, y: 230 });
  const [riderOpacity, setRiderOpacity] = useState(1);
  const [dashOffset, setDashOffset] = useState(0);
  const [totalLength, setTotalLength] = useState(810);

  const roadmapRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const pathEl = pathRef.current;
    if (pathEl) {
      try {
        const len = pathEl.getTotalLength();
        setTotalLength(len);
        setDashOffset(0);
      } catch (err) {
        console.warn("Could not get SVG path length", err);
      }
    }

    const handleScroll = () => {
      if (!roadmapRef.current || !pathRef.current) return;
      const rect = roadmapRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Progress calculation
      let p = (vh - rect.top) / (vh + rect.height);
      p = Math.max(0, Math.min(1, p));
      const draw = Math.max(0, Math.min(1, (p - 0.1) / 0.7));

      try {
        const pathEl = pathRef.current;
        const len = pathEl.getTotalLength();
        setDashOffset(len * (1 - draw));

        const currentLen = len * draw;
        const pt = pathEl.getPointAtLength(currentLen);
        setRiderPos({ x: pt.x, y: pt.y });

        if (draw > 0.02 && draw < 0.98) {
          setRiderOpacity(1);
        } else {
          setRiderOpacity(1); // Keep visible
        }

        const pct = Math.round(35 + draw * 50);
        setProgress(pct > 95 ? 95 : pct);
      } catch (err) {
        setProgress(Math.round(35 + draw * 50));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleSeeHowItWorks = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("how-it-works");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative overflow-hidden bg-transparent pt-32 pb-[70px]">
      {/* Ambient background decorative items */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full bg-[#FA5903]/5 blur-3xl" />
        <div className="absolute top-40 right-10 w-[550px] h-[550px] rounded-full bg-rose-200/5 blur-3xl" />
        <div className="absolute inset-0 grain opacity-[0.06] mix-blend-multiply" />
      </div>

      <div className="relative max-w-7xl mx-auto section-container-padding text-center z-10">
        {/* Micro status badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-[#FFFFFF]/80 px-4 py-1.5 text-xs font-bold text-[#111111] shadow-xs backdrop-blur-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
          </span>
          <span>Exclusive Launch Partner Program · Pre-registrations Now Live</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-8 font-hero font-black tracking-tight text-[2.85rem] leading-[1.05] sm:text-6xl lg:text-7xl text-[#111111] max-w-5xl mx-auto"
        >
          The Sustainable Food Delivery Platform <span className="text-[#FA5903] italic">Built for Merchants</span> —<br className="hidden sm:block" /> Secure Your Spot Now.
        </motion.h1>

        {/* Sub-headline description */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-[#555555] leading-relaxed font-sans"
        >
          Join an exclusive network of restaurants, cafes, cloud kitchens, bakeries, and food brands before the official public release. Lock in our flat 8% commission rate, free premium menu setup, and prime platform placement.
        </motion.p>

        {/* Dual CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
        >
          <button
            onClick={onCtaClick}
            className="whitespace-nowrap w-full sm:w-auto px-6 py-4 rounded-full bg-[#FA5903] hover:bg-[#EB5507] text-white font-black text-sm sm:text-base shadow-[0_12px_30px_-10px_rgba(255,90,54,0.6)] transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Pre-Register Your Business</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleSeeHowItWorks}
            className="whitespace-nowrap w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-[#FA5903]/5 border border-[#FA5903] text-[#FA5903] font-bold text-sm sm:text-base shadow-xs transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Explore Partner Benefits</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Trust row */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-[#555555] font-semibold"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="text-emerald-600 font-bold">✓</span> Flat 8% Sustainable Commission
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span>🕒</span> 0% commission for first 30 days
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span>🛡</span> Free Professional Menu Setup
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span>✨</span> Zero sign-up fee
          </span>
        </motion.div>
      </div>

      {/* ROADMAP / MAP SECTION */}
      <div 
        ref={roadmapRef}
        id="roadmap" 
        className="relative w-full max-w-4xl mx-auto px-4 md:px-8 py-14 md:py-20 z-10"
      >
        {/* 3D Map vector container */}
        <div className="absolute inset-0 top-6 overflow-hidden rounded-[2.5rem] flex items-center justify-center">
          <div className="relative w-[90%] h-[90%]">
            <img
              src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-SsfjxCJh43Hr1dqzkbFWUGH3ICZQbH.png&w=320&q=75"
              alt="Folded 3D delivery map"
              className="w-full h-full object-contain opacity-95 scale-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Floating food category tags */}
        <div aria-hidden="true" className="absolute left-[8%] top-[14%] hidden md:block float-y">
          <div className="rounded-2xl border border-[#EAEAEA]/60 px-3.5 py-2 shadow-xs flex items-center gap-2 bg-[#FFFFFF]/95 backdrop-blur-xs">
            <span className="text-sm">🍕</span>
            <span className="text-xs font-bold text-[#111111]">Pizzerias</span>
          </div>
        </div>
        <div aria-hidden="true" className="absolute right-[8%] top-[12%] hidden md:block float-y" style={{ animationDelay: "-2s" }}>
          <div className="rounded-2xl border border-[#EAEAEA]/60 px-3.5 py-2 shadow-xs flex items-center gap-2 bg-[#FFFFFF]/95 backdrop-blur-xs">
            <span className="text-sm">🍰</span>
            <span className="text-xs font-bold text-[#111111]">Bakeries</span>
          </div>
        </div>
        <div aria-hidden="true" className="absolute right-[12%] bottom-[16%] hidden md:block float-y" style={{ animationDelay: "-4s" }}>
          <div className="rounded-2xl border border-[#EAEAEA]/60 px-3.5 py-2 shadow-xs flex items-center gap-2 bg-[#FFFFFF]/95 backdrop-blur-xs">
            <span className="text-sm">🍔</span>
            <span className="text-xs font-bold text-[#111111]">QSR Brands</span>
          </div>
        </div>

        {/* Delivery curve route path and interactive status markers */}
        <div className="relative h-[340px] md:h-[400px]">
          <svg id="route-svg" width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="none" className="absolute inset-0">
            {/* animated dashed route line */}
            <path 
              ref={pathRef}
              id="route-path" 
              fill="none"
              stroke="#FA5903"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="8 6"
              className="opacity-95"
              d="M 60 340 Q 220 40 420 200 T 740 70"
            />
            {/* moving rider dot marker */}
            <circle 
              id="rider-dot" 
              r="7.5" 
              fill="#111111" 
              stroke="#FFF" 
              strokeWidth="2.5" 
              cx={riderPos.x} 
              cy={riderPos.y}
              style={{ 
                opacity: riderOpacity,
                transition: "opacity 0.2s ease, cx 0.1s ease-out, cy 0.1s ease-out"
              }}
            />
          </svg>

          {/* Staggered Step Markers */}
          {/* Step 1: Pre-Register */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute flex items-center gap-2" 
            style={{ top: "82%", left: "3%" }}
          >
            <div className="relative grid place-items-center w-7 h-7">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
            </div>
            <div className="rounded-full border border-[#EAEAEA]/60 px-3 py-1 text-[11px] font-bold shadow-xs bg-[#FFFFFF] text-[#111111]">
              Submit details
            </div>
          </motion.div>

          {/* Step 2: Verification */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute flex items-center gap-2" 
            style={{ top: "10%", left: "22%" }}
          >
            <div className="relative grid place-items-center w-7 h-7">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
            </div>
            <div className="rounded-full border border-[#EAEAEA]/60 px-3 py-1 text-[11px] font-bold shadow-xs bg-[#FFFFFF] text-[#111111]">
              Merchant audit
            </div>
          </motion.div>

          {/* Step 3: Direct Integration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute flex items-center gap-2" 
            style={{ top: "45%", left: "51%" }}
          >
            <div className="relative grid place-items-center w-7 h-7">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FA5903] opacity-75 animate-ping" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#FA5903]" />
              </span>
            </div>
            <div className="rounded-full border border-[#FA5903]/30 px-3 py-1 text-[11px] font-bold shadow-xs bg-[#FFFFFF] text-[#111111] inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FA5903]" />
              <span>Menu setup</span>
            </div>
          </motion.div>

          {/* Step 4: Live Launch */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute flex items-center gap-2" 
            style={{ top: "8%", right: "8%" }}
          >
            <div className="relative grid place-items-center w-7 h-7">
              <div className="h-2.5 w-2.5 rounded-full border border-gray-300 bg-white" />
            </div>
            <div className="rounded-full border border-[#EAEAEA]/60 px-3 py-1 text-[11px] font-bold shadow-xs bg-[#FFFFFF] text-[#555555]/60">
              Live Priority Launch
            </div>
          </motion.div>
        </div>
      </div>

      {/* LIVE ORDER PROGRESS STRIP */}
      <div className="relative max-w-4xl mx-auto px-5 md:px-8 pb-12 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-[#EAEAEA]/60 bg-[#FFFFFF] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-5 md:gap-6 shadow-md shadow-orange-950/2"
        >
          <div className="flex items-center gap-3.5">
            <div className="grid place-items-center w-12 h-12 rounded-2xl bg-[#FA5903]/5 text-2xl">🏬</div>
            <div className="text-left">
              <p className="text-sm sm:text-base font-extrabold leading-tight text-[#111111]">Exclusive Launch Program</p>
              <p className="text-xs text-[#555555] mt-0.5 font-semibold">Priority Feed Allocation · Sustainable 8% Flat Fee</p>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-12 bg-[#EAEAEA]/60" />
          
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-[#555555]">Launch Partner Allocations filled</span>
              <span className="text-[#FA5903]">{progress}% · Wave 1 Closing Soon</span>
            </div>
            <div className="h-2 rounded-full bg-[#EAEAEA] overflow-hidden">
              <div 
                className="h-full rounded-full bg-[#FA5903] transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button 
            onClick={onCtaClick}
            className="px-5 py-2.5 rounded-full border border-[#EAEAEA] text-[#111111] hover:bg-[#111111] hover:text-white font-extrabold text-xs transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center justify-center"
          >
            Become a Launch Partner
          </button>
        </motion.div>
      </div>

      {/* INFINITE RUNNING CATEGORIES MARQUEE */}
      <section className="relative border-y border-[#EAEAEA]/50 bg-[#FFFFFF]/60 overflow-hidden z-10">
        <div className="marquee-container py-3 text-xs font-bold tracking-wider text-[#555555] uppercase">
          <div className="marquee-content">
            <span>🍕 Pizzerias</span>
            <span>☕ Cafes</span>
            <span>🍳 Cloud Kitchens</span>
            <span>🥖 Bakeries</span>
            <span>🍰 Dessert Shops</span>
            <span>🍧 Sweet Shops</span>
            <span>🍹 Juice Bars</span>
            <span>🍔 Fast Food Chains</span>
            <span>🍷 Fine Dining</span>
            <span>🍱 Casual Dining</span>
            <span>🥡 Takeaways</span>
            <span>🚚 Food Trucks</span>
            
            {/* Duplicated for seamless loop */}
            <span>🍕 Pizzerias</span>
            <span>☕ Cafes</span>
            <span>🍳 Cloud Kitchens</span>
            <span>🥖 Bakeries</span>
            <span>🍰 Dessert Shops</span>
            <span>🍧 Sweet Shops</span>
            <span>🍹 Juice Bars</span>
            <span>🍔 Fast Food Chains</span>
            <span>🍷 Fine Dining</span>
            <span>🍱 Casual Dining</span>
            <span>🥡 Takeaways</span>
            <span>🚚 Food Trucks</span>
          </div>
        </div>
      </section>
    </div>
  );
}
