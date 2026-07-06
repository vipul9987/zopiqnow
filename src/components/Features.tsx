import { 
  Zap, Navigation, Sparkles, LayoutDashboard, 
  BarChart3, Calendar, CreditCard, Gift, AlertCircle 
} from "lucide-react";
import { motion } from "motion/react";
import { features } from "../data";

// Helper to resolve Icons
const getFeatureIcon = (name: string, className: string) => {
  switch (name) {
    case "Zap": return <Zap className={className} />;
    case "Navigation": return <Navigation className={className} />;
    case "Sparkles": return <Sparkles className={className} />;
    case "LayoutDashboard": return <LayoutDashboard className={className} />;
    case "BarChart3": return <BarChart3 className={className} />;
    case "Calendar": return <Calendar className={className} />;
    case "CreditCard": return <CreditCard className={className} />;
    case "Gift": return <Gift className={className} />;
    default: return <AlertCircle className={className} />;
  }
};

export default function Features() {
  return (
    <div id="features" className="relative overflow-hidden bg-[#FFFFFF] border-y border-[#EAEAEA]/60 py-20 sm:py-24 md:py-28">
      {/* Abstract Background Accents */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-orange-200/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto section-container-padding relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-widest text-[#FA5903] uppercase font-mono bg-[#FA5903]/5 px-3 py-1.5 rounded-full border border-[#FA5903]/20">
            The ZopiqNow Stack
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#111111] mt-4 mb-6 leading-none">
            Engineered for Excellence.
          </h2>
          <p className="text-[#555555] text-base sm:text-lg">
            We've built an infrastructure that prioritizes product quality, dispatch speed, and financial fairness from the ground up.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[15px]">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="p-6 rounded-[15px] bg-[#FFFFFF] border border-[#EAEAEA]/50 hover:border-[#FA5903]/50 hover:bg-[#FFFFFF]/80 shadow-md shadow-orange-950/2 transition-all duration-300 flex flex-col group"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#FA5903]/5 flex items-center justify-center text-[#FA5903] group-hover:scale-110 transition-all duration-300">
                  {getFeatureIcon(feat.iconName, "w-6 h-6")}
                </div>
                <span className="text-[10px] font-mono tracking-wider text-[#555555] uppercase font-bold bg-[#FFFFFF] border border-[#EAEAEA]/60 px-2.5 py-1 rounded-full">
                  {feat.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#111111] mb-2 font-display group-hover:text-[#FA5903] transition-colors">
                {feat.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans mt-1">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Feature stats summary / visual banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 p-8 sm:p-12 rounded-[15px] bg-[#FFFFFF] border border-[#EAEAEA]/60 shadow-lg shadow-orange-950/2 flex flex-col lg:flex-row items-center justify-between gap-[15px]"
        >
          <div className="max-w-xl text-left">
            <h3 className="text-2xl font-bold font-display text-[#111111] mb-3">
              Ready to experience food delivery, reimagined?
            </h3>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              We are finalizing our platform integrations with major POS systems, fleet schedules, and payment gateways. Pre-register below to get early invitations and live launch credits.
            </p>
          </div>
          <div className="flex items-center gap-[15px] shrink-0 flex-wrap">
            <div className="bg-[#FFFFFF] border border-[#EAEAEA]/60 p-4 rounded-[15px] text-center w-28 sm:w-32 shadow-xs">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#FA5903] font-display">8%</p>
              <p className="text-[10px] uppercase font-bold text-[#555555] tracking-wider">Commission</p>
            </div>
            <div className="bg-[#FFFFFF] border border-[#EAEAEA]/60 p-4 rounded-[15px] text-center w-28 sm:w-32 shadow-xs">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#FA5903] font-display">&lt;25m</p>
              <p className="text-[10px] uppercase font-bold text-[#555555] tracking-wider">Avg Speed</p>
            </div>
            <div className="bg-[#FFFFFF] border border-[#EAEAEA]/60 p-4 rounded-[15px] text-center w-28 sm:w-32 shadow-xs">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#FA5903] font-display">$0</p>
              <p className="text-[10px] uppercase font-bold text-[#555555] tracking-wider">Setup Fees</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
