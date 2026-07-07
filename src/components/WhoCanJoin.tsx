import { Check, ArrowRight, Store, Coffee, Pizza, CookingPot } from "lucide-react";
import { motion } from "motion/react";

interface WhoCanJoinProps {
  onCtaClick: () => void;
}

export default function WhoCanJoin({ onCtaClick }: WhoCanJoinProps) {
  const categories = [
    {
      title: "Restaurants & Dining",
      description: "Fine Dining, Casual Dining, Fast Food Chains, QSR Brands, and Pizzerias looking to scale high-margin deliveries.",
      icon: <Pizza className="w-5 h-5 text-[#FA5903]" />,
      features: ["Flat 8% Commission", "Next-Day Payouts", "First Wave Badging"]
    },
    {
      title: "Cafes & Sweet Shops",
      description: "Cafes, Bakeries, Dessert Shops, Sweet Shops, and Juice Bars requiring fast, temperature-managed dispatch.",
      icon: <Coffee className="w-5 h-5 text-[#FA5903]" />,
      features: ["Thermal-Insulated Fleet", "Menu Customization", "Staff Setup Kits"]
    },
    {
      title: "Cloud & Virtual Kitchens",
      description: "Cloud Kitchens, Virtual Brands, Takeaway Outlets, and Food Trucks with a focus on high-efficiency logistics.",
      icon: <CookingPot className="w-5 h-5 text-[#FA5903]" />,
      features: ["Direct API Dashboard", "Custom Flow Buffer", "Peak Slot Predictions"]
    },
    {
      title: "Food Courts & Outlets",
      description: "Mall Food Outlets, Food Courts, and multi-concept food spaces looking to aggregate local customer demand.",
      icon: <Store className="w-5 h-5 text-[#FA5903]" />,
      features: ["Multi-Menu Setup", "Bulk Invoicing", "Dedicated Operations Support"]
    }
  ];

  return (
    <div id="who-can-join" className="relative overflow-hidden bg-[#F8F9FB] py-20 sm:py-24 md:py-28">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-orange-200/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto section-container-padding relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#FA5903] uppercase font-mono bg-[#FA5903]/5 px-3 py-1.5 rounded-full border border-[#FA5903]/20">
            Eligible Partners
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#111111] mt-4 mb-6 leading-none">
            Designed for Every Food Business.
          </h2>
          <p className="text-[#555555] text-base sm:text-lg">
            We are curating an elite network of culinary partners for our launch program. Review our eligibility circles and claim your spot today.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative overflow-hidden rounded-[20px] bg-[#FFFFFF] border border-[#EAEAEA]/60 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-[#FA5903]/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center space-x-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FA5903]/5 flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] font-display">{cat.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 text-left">
                  {cat.description}
                </p>
              </div>

              <div className="border-t border-[#EAEAEA]/50 pt-5 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {cat.features.map((feat) => (
                    <span 
                      key={feat}
                      className="text-[10px] font-mono tracking-wider font-extrabold text-[#FA5903] bg-[#FA5903]/5 px-2.5 py-1 rounded-full border border-[#FA5903]/10"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Container */}
        <div className="text-center">
          <button
            onClick={onCtaClick}
            className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-[#FA5903] hover:bg-[#EB5507] text-white font-extrabold text-sm transition-all duration-300 shadow-md hover:shadow-orange-950/20 cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Become a Launch Partner</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </div>
  );
}
