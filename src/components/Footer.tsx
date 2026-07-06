import { Instagram, Facebook, Linkedin, Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import ZopiqLogo from "./ZopiqLogo";

export default function Footer() {
  const [subbed, setSubbed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubbed(true);
      setEmail("");
      setTimeout(() => setSubbed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111111] border-t border-[#EAEAEA]/15 relative overflow-hidden py-16 sm:py-20">
      {/* Decorative Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#EAEAEA_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto section-container-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="space-y-6 text-left">
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={scrollToTop}
            >
              <ZopiqLogo height="4.5rem" textColorClass="text-white" />
            </div>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans">
              ZopiqNow is an upcoming, next-generation food delivery ecosystem. We connect foodies with local artisanal kitchens in record time at flat, transparent pricing.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://www.instagram.com/zopiqnow/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-[#111111] border border-[#EAEAEA]/15 flex items-center justify-center text-[#555555] hover:text-white hover:border-[#FA5903]/40 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-[#111111] border border-[#EAEAEA]/15 flex items-center justify-center text-[#555555] hover:text-white hover:border-[#FA5903]/40 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-[#111111] border border-[#EAEAEA]/15 flex items-center justify-center text-[#555555] hover:text-white hover:border-[#FA5903]/40 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Platform links */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono opacity-80">Platform</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#555555]">
              <li><button onClick={() => document.getElementById("problems")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#FA5903] transition-colors cursor-pointer">Pain Points</button></li>
              <li><button onClick={() => document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#FA5903] transition-colors cursor-pointer">The Solution</button></li>
              <li><button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#FA5903] transition-colors cursor-pointer">Exclusive Features</button></li>
              <li><button onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#FA5903] transition-colors cursor-pointer">How It Works</button></li>
              <li><button onClick={() => document.getElementById("pre-register")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#FA5903] transition-colors cursor-pointer font-bold text-[#FA5903]">Join Cohort</button></li>
            </ul>
          </div>

          {/* Column 3: Legal & General */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono opacity-80">Legal & General</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#555555]">
              <li><a href="#about" className="hover:text-[#FA5903] transition-colors">About Us</a></li>
              <li><a href="#privacy" className="hover:text-[#FA5903] transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-[#FA5903] transition-colors">Terms of Service</a></li>
              <li><a href="#partner-agreement" className="hover:text-[#FA5903] transition-colors">Restaurant Agreement</a></li>
              <li><a href="#courier-terms" className="hover:text-[#FA5903] transition-colors">Courier Guidelines</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono opacity-80">Stay Informed</h4>
            <p className="text-xs text-[#555555] leading-relaxed font-sans">
              Subscribe to receive wave launching announcements and priority partner invitations direct to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center bg-[#111111] border border-[#EAEAEA]/15 rounded-xl px-3 py-2.5 focus-within:border-[#FA5903]/40 transition-colors">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none text-white placeholder-[#555555] text-xs focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-1.5 rounded-lg bg-[#FA5903] hover:bg-[#EB5507] text-white transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <AnimatePresence>
                {subbed && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="flex items-center space-x-1.5 text-[11px] text-emerald-400 font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Subscribed! Check your inbox soon.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        <hr className="border-[#EAEAEA]/10 my-8" />

        {/* Contact and copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#555555] font-mono">
          <div className="flex flex-wrap items-center gap-6 justify-center sm:justify-start">
            <div className="flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-[#555555]" />
              <span>zopiqnow@gmail.com</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#555555]" />
              <span>F1, Bhagawati Complex, Vejalpur, Ahmedabad, Gujarat 380051</span>
            </div>
          </div>
          <p className="text-center sm:text-right">
            © 2026 ZopiqNow Inc. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
