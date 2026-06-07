import React from "react";
import { motion } from "motion/react";
import { HIGHLIGHTS } from "../data";
import SectionHeading from "./SectionHeading";
import DynamicIcon from "./DynamicIcon";

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-[#F8FBFE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Choose Zee Care"
          subtitle="Discover what sets Zee Care Hospital apart in delivering premium clinical governance, speed, and safety certifications."
        />

        {/* 4-column desktop, 2-column tablet, 1-column mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {HIGHLIGHTS.map((feat, index) => (
            <motion.div
              key={feat.id}
              id={`why-choose-${feat.id}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className="bg-white rounded-3xl p-6.5 text-left border border-[#1A73A7]/5 shadow-[0_4px_24px_rgba(26,115,167,0.03)] flex flex-col items-start transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] group"
            >
              {/* Animated Icon container with subtle spring bounce on hover */}
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 10 }}
                className="w-12 h-12 rounded-xl bg-[#E8F4FD] text-[#1A73A7] group-hover:bg-[#1A73A7] group-hover:text-white flex items-center justify-center mb-5 transition-colors duration-300"
              >
                <DynamicIcon name={feat.iconName} size={24} />
              </motion.div>

              {/* Title */}
              <h3 className="font-extrabold text-[#1E293B] text-lg mb-2 group-hover:text-[#1A73A7] transition-colors duration-200">
                {feat.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#64748B] font-normal leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
