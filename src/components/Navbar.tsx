import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ZopiqLogo from "./ZopiqLogo";

interface NavbarProps {
  onPreRegisterClick: () => void;
}

export default function Navbar({ onPreRegisterClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const menuItems = [
    { label: "Partnership Perks", id: "who-can-join" },
    { label: "Features", id: "features" },
    { label: "How it works", id: "how-it-works" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#F8F9FB]/95 backdrop-blur-md border-b border-[#EAEAEA]/50 shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#"
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <ZopiqLogo height="4.5rem" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#555555]">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="hover:text-[#111111] transition duration-200 cursor-pointer text-sm font-bold"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onPreRegisterClick}
            className="px-5 py-2.5 rounded-full bg-[#FA5903] hover:bg-[#EB5507] text-white font-extrabold text-sm shadow-[0_10px_30px_-10px_rgba(232,67,31,0.5)] transition duration-300 cursor-pointer transform hover:-translate-y-0.5"
          >
            Become a Launch Partner
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#EAEAEA] text-[#111111]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#F8F9FB] border-b border-[#EAEAEA] px-5 py-4 space-y-3"
          >
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-2 text-sm font-bold text-[#555555] hover:text-[#111111] cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <hr className="border-[#EAEAEA]/50" />

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPreRegisterClick();
                }}
                className="w-full py-2.5 rounded-full bg-[#FA5903] text-white text-xs font-bold shadow-md cursor-pointer text-center"
              >
                Become a Launch Partner
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
