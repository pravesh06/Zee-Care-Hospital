import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeading from "./SectionHeading";
import DynamicIcon from "./DynamicIcon";

export default function About() {
  const [showMore, setShowMore] = useState(false);

  const pillars = [
    {
      id: "p-1",
      title: "Compassion",
      description: "Treating every patient like family, practicing human empathy, and listening closely to your individual needs.",
      iconName: "Heart",
      color: "text-[#0D9488]"
    },
    {
      id: "p-2",
      title: "Excellence",
      description: "Adhering strictly to international clinical standards, utilizing high-precision diagnostics, and striving for outcomes.",
      iconName: "Award",
      color: "text-[#1A73A7]"
    },
    {
      id: "p-3",
      title: "Innovation",
      description: "Integrating pioneering robotic surgical assistants, digital medicine consults, and computer-guided therapeutic tracks.",
      iconName: "Cpu",
      color: "text-[#1A73A7]"
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About Us" subtitle="Providing exceptional, human-centric medical experiences since 2001." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Blue-toned Medical Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden bg-gradient-to-tr from-[#E8F4FD] to-[#1A73A7]/20 p-8 shadow-[0_12px_40px_rgba(26,115,167,0.12)] border border-[#1A73A7]/10 flex items-center justify-center">
              {/* Abstract blue patterns inside */}
              <div className="absolute top-2 left-2 w-12 h-12 rounded-full bg-[#1A73A7]/5" />
              <div className="absolute bottom-6 right-6 w-24 h-24 rounded-full bg-[#0D9488]/5" />
              
              <svg className="w-4/5 h-4/5 drop-shadow-md" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Hospital building visual container */}
                <rect x="35" y="60" width="130" height="110" rx="16" fill="#FFFFFF" stroke="#1A73A7" strokeWidth="3" />
                <path d="M70 60V30H130V60" stroke="#1A73A7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Red cross representation but stylized in blue colors */}
                <path d="M100 40V50M95 45H105" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
                
                {/* Windows */}
                <rect x="55" y="80" width="24" height="20" rx="4" fill="#E8F4FD" />
                <rect x="55" y="115" width="24" height="20" rx="4" fill="#E8F4FD" />
                <rect x="120" y="80" width="24" height="20" rx="4" fill="#E8F4FD" />
                <rect x="120" y="115" width="24" height="20" rx="4" fill="#E8F4FD" />
                
                {/* Entrance Door */}
                <path d="M90 170V145C90 142.2 92.2 140 95 140H105C107.8 140 110 142.2 110 145V170" fill="#1A73A7" />
                
                {/* Heart-beat rhythm floating lines */}
                <path d="M10 100H25L30 85L38 120L44 95L48 105L53 100H70" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80" />
                <path d="M130 100H145L150 90L158 115L164 95L168 105L173 100H190" stroke="#1A73A7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-50" />
              </svg>
            </div>
          </motion.div>

          {/* Right Column: Text & Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col space-y-6 text-left"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#1E293B]">Our Founding Story</h3>
              <p className="text-base text-[#64748B] leading-relaxed">
                Founded in 2001 by a dedicated coalition of healthcare visionaries,{" "}
                <strong className="text-[#1A73A7] font-semibold">Zee Care Hospital</strong> was created to bridge
                the gap between high-complexity clinical technologies and warm, compassionate patient care.
                Over the past 25 years, we have transitioned from a localized nursing hub to an award-winning,
                multi-specialty, NABH-accredited academic healthcare destination.
              </p>
            </div>

            {/* Toggle-able additional block for the story */}
            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden space-y-4 text-sm text-[#64748B] border-l-2 border-[#1A73A7]/30 pl-4 py-1"
                >
                  <p>
                    Our mission is to consistently deliver precise diagnostic clarity, therapeutic medical
                    efficacy, and compassionate nursing care to individuals across all ages and socioeconomic strata.
                  </p>
                  <p>
                    Our vision is to serve as a national beacon of smart clinical science and patient advocacy,
                    advancing healing parameters through ongoing medical training, evidence-based research, and 
                    preventive wellness screenings. We envision a community where excellent medical help is accessible 
                    with speed and ease.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <button
                id="about-toggle-more"
                onClick={() => setShowMore(!showMore)}
                className="text-sm font-bold text-[#1A73A7] hover:text-[#0D9488] transition-colors flex items-center space-x-1 border border-[#1A73A7]/30 hover:border-[#1A73A7] px-4 py-2 rounded-lg"
              >
                <span>{showMore ? "Show Less" : "Learn More About Our Journey"}</span>
                <span className="text-xs">{showMore ? "▲" : "▼"}</span>
              </button>
            </div>

            {/* Values Horizontal/Vertical Items */}
            <div className="pt-4 border-t border-[#E8F4FD]">
              <h4 className="text-lg font-bold text-[#1E293B] mb-5">Our Core Value Pillars</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.id}
                    id={pillar.id}
                    className="p-4 rounded-2xl bg-[#E8F4FD]/40 border border-[#1A73A7]/5 hover:bg-[#E8F4FD]/70 transition-all duration-200"
                  >
                    <div className={`${pillar.color} mb-3.5`}>
                      <DynamicIcon name={pillar.iconName} size={28} />
                    </div>
                    <h5 className="font-bold text-[#1E293B] text-base mb-1">{pillar.title}</h5>
                    <p className="text-xs text-[#64748B] leading-relaxed">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
