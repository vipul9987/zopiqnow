import { UserCheck, Utensils, Check, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface WhoCanJoinProps {
  onCtaClick: (type: "customer" | "restaurant") => void;
}

export default function WhoCanJoin({ onCtaClick }: WhoCanJoinProps) {
  const customerPerks = [
    "Early access priority queue for launch day ordering",
    "Exclusive initial rewards package ($25 equivalent credits)",
    "Priority VIP matching status for faster courier dispatch",
    "Permanent 20% launch discounts on partnering restaurants"
  ];

  const restaurantPerks = [
    "Industry-disrupting flat 8% platform commission rates",
    "Featured 'First Wave Partner' badge for premium visibility",
    "Free marketing support, photography, and menu configuration",
    "Dedicated 1-on-1 launch operations manager"
  ];

  return (
    <div id="who-can-join" className="relative overflow-hidden bg-[#F8F9FB] py-20 sm:py-24 md:py-28">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-orange-200/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto section-container-padding relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#FA5903] uppercase font-mono bg-[#FA5903]/5 px-3 py-1.5 rounded-full border border-[#FA5903]/20">
            Our Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#111111] mt-4 mb-6 leading-none">
            Join the ZopiqNow Movement.
          </h2>
          <p className="text-[#555555] text-base sm:text-lg">
            We are selecting a limited cohort of early-access customers and pioneering local restaurants for our Wave 1 launch. Claim your spot today.
          </p>
        </div>

        {/* Two Large Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[15px] max-w-5xl mx-auto">
          {/* Card 1: Customers */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[15px] bg-[#FFFFFF] border border-[#EAEAEA]/60 p-8 sm:p-10 shadow-md shadow-orange-950/2 flex flex-col group justify-between"
          >
            {/* Soft decorative light */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-200/5 rounded-full blur-2xl group-hover:bg-orange-200/10 transition-all duration-500" />
            
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FA5903]/5 flex items-center justify-center text-[#FA5903]">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold font-mono tracking-wider text-[#FA5903] uppercase">Early Access</span>
                  <h3 className="text-2xl font-bold text-[#111111] font-display">For Customers</h3>
                </div>
              </div>

              <p className="text-sm text-[#555555] leading-relaxed mb-8 text-left">
                Tired of massive markups, slow deliveries, and cold fries? Join the initial wave of ZopiqNow foodies and secure priority access.
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
              onClick={() => onCtaClick("customer")}
              className="w-full flex items-center justify-center space-x-2 py-4 rounded-full bg-[#FA5903] hover:bg-[#EB5507] text-white font-extrabold text-sm transition-all duration-300 shadow-md hover:shadow-orange-950/20 cursor-pointer"
            >
              <span>Secure Early Access</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Card 2: Restaurants */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[15px] bg-[#FFFFFF] border border-[#EAEAEA]/60 p-8 sm:p-10 shadow-md shadow-orange-950/2 flex flex-col group justify-between"
          >
            {/* Soft decorative light */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-200/5 rounded-full blur-2xl group-hover:bg-orange-200/10 transition-all duration-500" />

            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FA5903]/5 flex items-center justify-center text-[#FA5903]">
                  <Utensils className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold font-mono tracking-wider text-[#FA5903] uppercase">Growth Partnership</span>
                  <h3 className="text-2xl font-bold text-[#111111] font-display">For Restaurants</h3>
                </div>
              </div>

              <p className="text-sm text-[#555555] leading-relaxed mb-8 text-left">
                Reclaim your profits. Stop paying 30%+ in commissions. Join ZopiqNow to receive orders, coordinate dispatches, and keep 92% of your revenue.
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
              onClick={() => onCtaClick("restaurant")}
              className="w-full flex items-center justify-center space-x-2 py-4 rounded-full bg-[#FFFFFF] border border-[#FA5903] hover:bg-[#FA5903]/5 text-[#FA5903] font-extrabold text-sm transition-all duration-300 shadow-xs cursor-pointer"
            >
              <span>Apply for Launch Cohort</span>
              <ArrowRight className="w-4 h-4 text-[#FA5903] group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
