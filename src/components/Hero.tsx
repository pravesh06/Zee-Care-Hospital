import React from "react";
import { motion } from "motion/react";

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onBookClick, onExploreClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-gradient-to-tr from-[#FFFFFF] via-[#F8FBFE] to-[#E8F4FD]"
    >
      {/* Background organic shape accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#1A73A7]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#0D9488]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-6 text-left"
          >
            {/* Trust badge */}
            <div className="inline-flex items-center space-x-2 bg-[#E8F4FD] border border-[#1A73A7]/20 rounded-full py-1.5 px-4 w-fit">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D9488] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488]"></span>
              </span>
              <span className="text-xs font-semibold text-[#1A73A7] uppercase tracking-wider">
                Accredited Multi-Specialty Care
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E293B] leading-[1.12] tracking-tight">
              Compassionate Care, <br />
              <span className="text-[#1A73A7]">Advanced Medicine</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-[#64748B] font-normal leading-relaxed max-w-xl">
              Your health is our highest priority. Expert doctors, modern facilities, and personalized care
              — all in one place. We deliver safe medical treatments designed around your specific recovery paths.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                id="hero-cta-book-appt"
                onClick={onBookClick}
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold px-8 py-3.5 rounded-full shadow-[0_4px_14px_rgba(13,148,136,0.25)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2"
                aria-label="Book your clinical appointment now"
              >
                Book an Appointment
              </button>
              <button
                id="hero-cta-explore-dept"
                onClick={onExploreClick}
                className="bg-transparent hover:bg-[#E8F4FD]/50 text-[#1A73A7] border-2 border-[#1A73A7] hover:border-[#1A73A7] font-semibold px-8 py-3.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1A73A7] focus:ring-offset-2"
                aria-label="Explore our global clinical departments"
              >
                Explore Departments
              </button>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8F4FD]">
              <div>
                <p className="text-2xl font-bold text-[#1E293B]">24/7</p>
                <p className="text-xs text-[#64748B] font-medium">Emergency Care</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1E293B]">100%</p>
                <p className="text-xs text-[#64748B] font-medium">Data Confidential</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1E293B]">Cashless</p>
                <p className="text-xs text-[#64748B] font-medium">Insurance Claims</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Abstract SVGs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:flex justify-center items-center relative"
          >
            {/* Visual element backdrop */}
            <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#E8F4FD] to-[#1A73A7]/10 -z-10 animate-pulse duration-[8s]" />

            <svg
              className="w-full max-w-[480px] h-auto drop-shadow-[0_10px_25px_rgba(26,115,167,0.12)]"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Pulse line circle frame */}
              <circle cx="250" cy="250" r="190" stroke="#1A73A7" strokeWidth="2" strokeDasharray="6 6" className="opacity-30" />
              <circle cx="250" cy="250" r="160" fill="#FFFFFF" fillOpacity="0.4" />
              
              {/* Hospital Crest Gradient */}
              <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1A73A7" />
                  <stop offset="100%" stopColor="#0B4B75" />
                </linearGradient>
                <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0D9488" />
                  <stop offset="100%" stopColor="#0F766E" />
                </linearGradient>
              </defs>

              {/* Central medically oriented abstract shapes */}
              <path
                d="M170 120H330C350 120 370 140 370 160V340C370 360 350 380 330 380H170C150 380 130 360 130 340V160C130 140 150 120 170 120Z"
                fill="#E8F4FD"
                className="opacity-70"
              />

              {/* Heart Pulse Visual */}
              <rect x="200" y="220" width="100" height="100" rx="20" fill="url(#shieldGrad)" />
              <path
                d="M215 270H230L236 250L245 290L253 260L258 275L263 270H285"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Floating Shield Accent */}
              <g className="animate-bounce" style={{ animationDuration: '4s' }}>
                <path
                  d="M130 200C130 200 150 190 170 190C190 190 210 200 210 200V250C210 280 170 300 170 300C170 300 130 280 130 250V200Z"
                  fill="url(#tealGrad)"
                />
                {/* Cross on Shield */}
                <path d="M170 215V245M155 230H185" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* Floating Specialist Doctor Avatar Representation */}
              <circle cx="340" cy="220" r="45" fill="#FFFFFF" stroke="#E8F4FD" strokeWidth="6" />
              <circle cx="340" cy="205" r="16" fill="#1A73A7" />
              <path d="M305 242C305 230 320 226 340 226C360 226 375 230 375 242" fill="#1A73A7" />

              {/* Stethoscope around */}
              <path
                d="M320 300C310 320 270 350 250 350C230 350 190 320 180 300"
                stroke="#1A73A7"
                strokeWidth="4"
                strokeLinecap="round"
                className="opacity-40"
              />
              
              {/* Decorative small circles */}
              <circle cx="310" cy="120" r="10" fill="#0D9488" className="opacity-60" />
              <circle cx="160" cy="380" r="14" fill="#1A73A7" className="opacity-50" />
              <circle cx="360" cy="360" r="8" fill="#E8F4FD" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
