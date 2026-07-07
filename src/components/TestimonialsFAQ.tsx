import { useState } from "react";
import { Star, ChevronDown, ChevronUp, Quote, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { testimonials, faqs } from "../data";

export default function TestimonialsFAQ() {
  const [openFaq, setOpenFaq] = useState<string | null>("faq1");
  const [faqFilter, setFaqFilter] = useState<string>("All");

  const categories = ["All", "General", "Eligibility", "Onboarding", "Visibility"];

  const filteredFaqs = faqFilter === "All" 
    ? faqs 
    : faqs.filter(f => f.category === faqFilter);

  const toggleFaq = (id: string) => {
    if (openFaq === id) {
      setOpenFaq(null);
    } else {
      setOpenFaq(id);
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#FFFFFF] border-y border-[#EAEAEA]/60 py-20 sm:py-24 md:py-28">
      {/* Decorative gradient overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-200/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto section-container-padding relative z-10">
        
        {/* TESTIMONIALS SECTION */}
        <div className="mb-28">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#FA5903] uppercase font-mono bg-[#FA5903]/5 px-3 py-1.5 rounded-full border border-[#FA5903]/20">
              Voices of our Community
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111111] mt-4 leading-none">
              Trusted by Local Food Partners.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px]">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative p-8 rounded-[15px] bg-[#FFFFFF] border border-[#EAEAEA]/60 hover:border-[#FA5903]/50 flex flex-col justify-between shadow-md shadow-orange-950/2 group hover:bg-[#FFFFFF]/85 transition-all duration-300"
              >
                {/* Decorative quote icon */}
                <Quote className="absolute top-6 right-8 w-10 h-10 text-orange-200/10 group-hover:text-orange-500/10 transition-colors" />

                <div>
                  {/* Stars */}
                  <div className="flex items-center space-x-1 mb-5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#FA5903] fill-[#FA5903]" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#555555] italic leading-relaxed mb-8 font-sans font-medium text-left">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author profile */}
                <div className="flex items-center space-x-4 border-t border-[#EAEAEA]/40 pt-6">
                  <img
                    src={t.image}
                    alt={t.author}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-[#EAEAEA]/60 shadow-xs"
                  />
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-[#111111] font-display">{t.author}</h4>
                    <p className="text-xs text-[#555555] font-medium">{t.role}</p>
                    <span className="inline-block text-[9px] font-bold font-mono tracking-wider text-[#FA5903] uppercase bg-[#FA5903]/5 border border-[#FA5903]/20 px-2 py-0.5 rounded-full mt-1.5">
                      {t.tag}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <hr className="border-[#EAEAEA]/60 mb-28" />

        {/* FAQ SECTION */}
        <div id="faq" className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#FA5903] uppercase font-mono bg-[#FA5903]/5 px-3 py-1.5 rounded-full border border-[#FA5903]/20">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111111] mt-4 mb-4 leading-none">
              Frequently Asked Questions.
            </h2>
            <p className="text-[#555555] text-xs sm:text-sm">
              Can't find the answer you are looking for? Send us an email at <span className="text-[#FA5903] font-semibold">zopiqnow@gmail.com</span>.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setFaqFilter(cat);
                    setOpenFaq(null);
                  }}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    faqFilter === cat
                      ? "bg-[#FA5903] text-white shadow-xs"
                      : "bg-[#FFFFFF] border border-[#EAEAEA] text-[#555555] hover:text-[#111111]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion container */}
          <div className="space-y-[15px]">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-[15px] border border-[#EAEAEA]/60 bg-[#FFFFFF] overflow-hidden hover:border-[#FA5903]/40 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors hover:bg-orange-50/5 focus:outline-none"
                  >
                    <span className="font-display font-bold text-[#111111] text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                    <div className="shrink-0 p-1 rounded-full bg-white text-[#FA5903] border border-[#EAEAEA]/60 shadow-xs">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pt-4 pb-4 border-t border-[#EAEAEA]/40 text-xs sm:text-sm text-[#555555] leading-relaxed font-sans text-left">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12 text-[#555555]">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p>No questions found in this category.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
