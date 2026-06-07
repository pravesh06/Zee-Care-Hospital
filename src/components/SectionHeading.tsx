import React from "react";
import { motion } from "motion/react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center text-center mb-16 px-4">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[#1A73A7] bg-[#E8F4FD] text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-3 inline-block"
      >
        Zee Care Hospital
      </motion.span>
      
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-[36px] font-extrabold text-[#1E293B] tracking-tight relative pb-4 leading-tight max-w-2xl"
      >
        {title}
        {/* Short Underline Accent */}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#1A73A7] rounded-full" />
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#64748B] text-sm sm:text-base mt-4 max-w-xl font-normal leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
