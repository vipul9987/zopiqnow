import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemsSolutions from "./components/ProblemsSolutions";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import WhoCanJoin from "./components/WhoCanJoin";
import TestimonialsFAQ from "./components/TestimonialsFAQ";
import PreRegistration from "./components/PreRegistration";
import Footer from "./components/Footer";

export default function App() {
  // 1. Scroll & Focus Trigger
  const triggerPreRegisterFocus = () => {
    const element = document.getElementById("pre-register");
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-cream text-brand-dark font-sans selection:bg-brand-primary selection:text-white overflow-x-hidden antialiased">
      {/* Dynamic Glowing background blobs for Frosted Glass theme */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-[20%] right-[-100px] w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[55%] left-[-200px] w-[700px] h-[700px] bg-orange-100/40 rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-rose-200/20 rounded-full blur-[110px] pointer-events-none z-0"></div>

      {/* 1. Glassmorphic Header / Navbar */}
      <Navbar
        onPreRegisterClick={triggerPreRegisterFocus}
      />

      {/* 2. Premium Hero Section */}
      <Hero onCtaClick={triggerPreRegisterFocus} />

      {/* 3. Comparative Problem & Solution Panels */}
      <ProblemsSolutions />

      {/* 4. Interactive How It Works Onboarding Steps */}
      <HowItWorks />

      {/* 5. Sleek Features Bento Grid */}
      <Features />

      {/* 6. Dynamic Call-To-Action Cards */}
      <WhoCanJoin onCtaClick={triggerPreRegisterFocus} />

      {/* 7. Community Testimonials & Accordion FAQ */}
      <TestimonialsFAQ />

      {/* 8. Conversion Pre-Registration Module */}
      <PreRegistration
        onRestaurantRegister={() => {}}
      />

      {/* 11. Footer Section with Newsletter signup */}
      <Footer />
    </div>
  );
}
