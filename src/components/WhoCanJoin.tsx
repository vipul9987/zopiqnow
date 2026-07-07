import { Utensils, Check, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface WhoCanJoinProps {
  onCtaClick: () => void;
}

export default function WhoCanJoin({ onCtaClick }: WhoCanJoinProps) {
  const restaurantPerks = [
    "Sustainable flat 8% platform commission rates",
    "Featured 'First Wave Partner' badge for high visibility",
    "Free professional photography and menu setup",
    "Dedicated 1-on-1 launch coordination specialist"
  ];

  const customerPerks = [
    "First 5 deliveries completely free at launch",
    "Priority dispatch matching for ultra-fast deliveries",
    "Exclusive sneak-peeks and private beta access",
    "Standard menu pricing with zero hidden markups"
  ];

  return (
    <div id="who-can-join" className="relative overflow-hidden bg-[#F8F9FB] py-20 sm:py-24 md:py-28">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-orange-200/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto section-container-padding relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#FA5903] uppercase font-mono bg-[#FA5903]/5 px-3 py-1.5 rounded-full border border-[#FA5903]/20">
            Exclusive Cohort
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#111111] mt-4 mb-6 leading-none">
            Join the Launch Program.
          </h2>
          <p className="text-[#555555] text-base sm:text-lg">
            We are selecting a limited group of pioneering restaurant partners and early access users for our Wave 1 city launch. Claim your exclusive access below.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: For Restaurants */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[24px] bg-[#FFFFFF] border border-[#EAEAEA]/60 p-8 sm:p-10 shadow-md shadow-orange-950/2 flex flex-col justify-between group h-full"
          >
            {/* Soft decorative light */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-200/5 rounded-full blur-2xl group-hover:bg-orange-200/10 transition-all duration-500" />

            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FA5903]/5 flex items-center justify-center text-[#FA5903]">
                  <Utensils className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold font-mono tracking-wider text-[#FA5903] uppercase">Restaurant Cohort</span>
                  <h3 className="text-2xl font-bold text-[#111111] font-display">Become a Launch Partner</h3>
                </div>
              </div>

              <p className="text-sm text-[#555555] leading-relaxed mb-8 text-left">
                Reclaim your profits. Stop sacrificing 30%+ margins to giant delivery conglomerates. Secure priority onboarding, list your menus, and keep 92% of your revenue.
              </p>

              <ul className="space-y-4 mb-10 text-left">
                {restaurantPerks.map((perk, i) => (
                  <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-[#555555] font-sans font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#FA5903]/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#FA5903]" />
                    </div>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={onCtaClick}
              className="w-full flex items-center justify-center space-x-2 py-4 rounded-full bg-[#FA5903] hover:bg-[#EB5507] text-white font-extrabold text-sm transition-all duration-300 shadow-md hover:shadow-orange-950/20 cursor-pointer"
            >
              <span>Become a Launch Partner</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Card 2: For Customers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative overflow-hidden rounded-[24px] bg-[#FFFFFF] border border-[#EAEAEA]/60 p-8 sm:p-10 shadow-md shadow-orange-950/2 flex flex-col justify-between group h-full"
          >
            {/* Soft decorative light */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-200/5 rounded-full blur-2xl group-hover:bg-orange-200/10 transition-all duration-500" />

            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FA5903]/5 flex items-center justify-center text-[#FA5903]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold font-mono tracking-wider text-[#FA5903] uppercase">User Cohort</span>
                  <h3 className="text-2xl font-bold text-[#111111] font-display">Get Early Access</h3>
                </div>
              </div>

              <p className="text-sm text-[#555555] leading-relaxed mb-8 text-left">
                Enjoy hot, rapid food delivery with zero hidden markups. Secure private beta access before the public launch and receive automatic launch rewards.
              </p>

              <ul className="space-y-4 mb-10 text-left">
                {customerPerks.map((perk, i) => (
                  <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-[#555555] font-sans font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#FA5903]/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#FA5903]" />
                    </div>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={onCtaClick}
              className="w-full flex items-center justify-center space-x-2 py-4 rounded-full bg-white border border-[#FA5903] text-[#FA5903] hover:bg-[#FA5903]/5 font-extrabold text-sm transition-all duration-300 shadow-md hover:shadow-orange-950/10 cursor-pointer"
            >
              <span>Get Early Access</span>
              <ArrowRight className="w-4 h-4 text-[#FA5903] group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
