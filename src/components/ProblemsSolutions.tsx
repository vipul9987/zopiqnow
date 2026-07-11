import { memo } from "react";
import { 
  Clock, DollarSign, MessageSquare, Utensils, TrendingDown, 
  EyeOff, ShieldAlert, BarChart3, Zap, ShieldCheck, 
  Sparkles, TrendingUp, Headphones, AlertCircle, LayoutDashboard
} from "lucide-react";
import { motion } from "motion/react";
import { restaurantProblems, solutions } from "../data";

// Icon mapping helper
const getIconComponent = (name: string, className: string) => {
  switch (name) {
    case "Clock": return <Clock className={className} />;
    case "DollarSign": return <DollarSign className={className} />;
    case "MessageSquare": return <MessageSquare className={className} />;
    case "Utensils": return <Utensils className={className} />;
    case "TrendingDown": return <TrendingDown className={className} />;
    case "EyeOff": return <EyeOff className={className} />;
    case "ShieldAlert": return <ShieldAlert className={className} />;
    case "BarChart3": return <BarChart3 className={className} />;
    case "Zap": return <Zap className={className} />;
    case "ShieldCheck": return <ShieldCheck className={className} />;
    case "Sparkles": return <Sparkles className={className} />;
    case "TrendingUp": return <TrendingUp className={className} />;
    case "Headphones": return <Headphones className={className} />;
    case "LayoutDashboard": return <LayoutDashboard className={className} />;
    default: return <AlertCircle className={className} />;
  }
};

function ProblemsSolutions() {
  return (
    <div className="relative overflow-hidden bg-[#FFFFFF] border-y border-[#EAEAEA]/60 pt-[70px] pb-[35px]">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-200/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto section-container-padding relative z-10">
        
        {/* SECTION HEADER: PROBLEMS */}
        <div id="problems" className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#FA5903] uppercase font-mono bg-[#FA5903]/5 px-3 py-1.5 rounded-full border border-[#FA5903]/20">
            The Industry Struggle
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#111111] mt-4 mb-6 leading-none">
            Why Traditional Delivery is <span className="text-[#FA5903]">Broken</span>.
          </h2>
          <p className="text-[#555555] text-base sm:text-lg">
            High marketplace standard commissions can erode independent margins, while search ranking algorithms favor major chains over local culinary spots.
          </p>
        </div>

        {/* PROBLEMS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[15px] mb-24">
          {restaurantProblems.map((prob, idx) => (
            <motion.div
              key={prob.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-[15px] bg-[#FFFFFF] border border-[#EAEAEA]/50 hover:border-[#FA5903]/60 shadow-md shadow-orange-950/2 group hover:bg-[#FFFFFF]/80 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-[#FA5903] mb-5 group-hover:scale-110 transition-transform">
                {getIconComponent(prob.iconName, "w-6 h-6")}
              </div>
              <p className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FA5903] mb-2">
                {prob.metrics}
              </p>
              <h3 className="text-lg font-bold text-[#111111] mb-2 font-display group-hover:text-[#EB5507] transition-colors">
                {prob.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                {prob.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* SECTION HEADER: SOLUTIONS */}
        <div id="solutions" className="text-center max-w-3xl mx-auto mb-16 pt-8">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase font-mono bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
            Why Join Before Launch?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#111111] mt-4 mb-6 leading-none">
            Secure Your Launch Partner Benefits.
          </h2>
          <p className="text-[#555555] text-base sm:text-lg">
            Shape the future of delivery in your area. Secure priority placement, direct expert setup, and early platform access by joining our initial launch wave.
          </p>
        </div>

        {/* SOLUTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
          {solutions.map((sol, idx) => (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="p-8 rounded-[15px] bg-[#FFFFFF] border border-[#EAEAEA]/50 hover:border-emerald-500/60 shadow-lg shadow-orange-950/2 group transition-all duration-300 hover:bg-[#FFFFFF]/85"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  {getIconComponent(sol.iconName, "w-7 h-7")}
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                  {sol.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-3 font-display group-hover:text-emerald-700 transition-colors">
                {sol.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                {sol.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(ProblemsSolutions);
