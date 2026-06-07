import React from "react";
import { motion } from "motion/react";
import { SERVICES } from "../data";
import SectionHeading from "./SectionHeading";
import DynamicIcon from "./DynamicIcon";

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Professional Services"
          subtitle="From 24/7 trauma triage to digital consultations and cashless claims processing, explore our clinical workflow assets."
        />

        <div className="space-y-4 max-w-5xl mx-auto">
          {SERVICES.map((service, index) => {
            const isOdd = index % 2 === 1;
            return (
              <motion.div
                key={service.id}
                id={`srv-row-${service.id}`}
                initial={{ opacity: 0, x: isOdd ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex flex-col sm:flex-row items-start sm:items-center p-6 md:p-8 rounded-3xl border border-[#1A73A7]/5 transition-all duration-300 hover:shadow-md ${
                  isOdd ? "bg-[#E8F4FD] text-[#1E293B]" : "bg-white text-[#1E293B]"
                }`}
              >
                {/* Large Icon Column on Left */}
                <div className="mb-4 sm:mb-0 sm:mr-8 flex-shrink-0">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 hover:rotate-3 ${
                      isOdd ? "bg-white text-[#1A73A7]" : "bg-[#E8F4FD] text-[#0D9488]"
                    }`}
                  >
                    <DynamicIcon name={service.iconName} size={32} />
                  </div>
                </div>

                {/* Text content details */}
                <div className="text-left flex-grow space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#1E293B]">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#64748B] font-normal leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
