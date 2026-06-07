import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "../data";
import SectionHeading from "./SectionHeading";
import DynamicIcon from "./DynamicIcon";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const length = TESTIMONIALS.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  // Auto-rotates slide indices every 4000ms (4 seconds)
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Patients Say"
          subtitle="Read honest reviews and testimonials from our community detailing their curative journeys at Zee Care."
        />

        {/* Carousel Inner Panel */}
        <div
          id="testimonial-carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative min-h-[340px] flex items-center justify-center bg-[#E8F4FD]/50 border border-[#1A73A7]/5 p-6 sm:p-10.5 rounded-3xl"
        >
          {/* Arrow Left */}
          <button
            id="testimonial-nav-prev"
            onClick={prevSlide}
            className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 bg-white text-[#1A73A7] hover:text-[#0D9488] p-3 rounded-full shadow-lg border border-[#E8F4FD] transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1A73A7] z-10"
            aria-label="Previous patient testimonial"
          >
            <DynamicIcon name="ChevronLeft" size={20} />
          </button>

          {/* Arrow Right */}
          <button
            id="testimonial-nav-next"
            onClick={nextSlide}
            className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 bg-white text-[#1A73A7] hover:text-[#0D9488] p-3 rounded-full shadow-lg border border-[#E8F4FD] transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1A73A7] z-10"
            aria-label="Next patient testimonial"
          >
            <DynamicIcon name="ChevronRight" size={20} />
          </button>

          {/* Animated Slide container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, scale: 0.98, x: 25 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -25 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full flex flex-col justify-between text-left space-y-6"
            >
              {/* Top Row: Stars and Date */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-1 text-[#0D9488]">
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <span key={i}><DynamicIcon name="Star" size={18} className="fill-[#0D9488]" /></span>
                  ))}
                </div>
                <span className="text-xs text-[#64748B] font-semibold font-mono uppercase">
                  {activeTestimonial.date}
                </span>
              </div>

              {/* Patient review quote */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#1A73A7]/5 relative">
                {/* Decorative Quote Icon watermark */}
                <span className="absolute right-6 top-4 text-6xl text-[#E8F4FD] font-serif leading-none select-none pointer-events-none">
                  “
                </span>
                <p className="text-base sm:text-lg text-[#1E293B] italic font-normal leading-relaxed relative z-10">
                  "{activeTestimonial.quoteText}"
                </p>
              </div>

              {/* Botton Row: Persona profiling */}
              <div className="flex items-center space-x-4 pt-2">
                <div className="w-12 h-12 bg-[#1A73A7] text-white rounded-full flex items-center justify-center font-bold text-lg select-none">
                  {activeTestimonial.patientName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-base leading-snug">
                    {activeTestimonial.patientName}
                  </h4>
                  <p className="text-xs text-[#64748B] font-medium mt-0.5">
                    Age {activeTestimonial.age} | Visited:{" "}
                    <span className="text-[#1A73A7] font-semibold">
                      {activeTestimonial.departmentVisited}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bullet Progress Indicators */}
        <div className="flex items-center justify-center space-x-2.5 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                currentIndex === idx
                  ? "bg-[#1A73A7] w-6"
                  : "bg-[#E8F4FD] hover:bg-[#1A73A7]/40"
              }`}
              aria-label={`Show review panel index number ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
