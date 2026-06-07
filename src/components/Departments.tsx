import React from "react";
import { motion } from "motion/react";
import { Department } from "../types";
import SectionHeading from "./SectionHeading";
import DynamicIcon from "./DynamicIcon";

interface DepartmentsProps {
  onSelectDepartment: (deptId: string) => void;
  departments: Department[];
  isLoading: boolean;
}

export default function Departments({ onSelectDepartment, departments, isLoading }: DepartmentsProps) {
  return (
    <section id="departments" className="py-20 md:py-28 bg-[#F8FBFE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Clinical Departments"
          subtitle="Comprehensive multi-specialty care led by industry-leading healthcare specialists under absolute compliance."
        />

        {isLoading ? (
          /* High-Fidelity Animated Skeleton Grid for Departments */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 p-6.5 text-left flex flex-col justify-between shadow-[0_4px_16px_rgba(26,115,167,0.02)] animate-pulse"
              >
                <div className="space-y-4">
                  {/* Icon Card skeleton */}
                  <div className="w-14 h-14 rounded-2xl bg-slate-200/80" />
                  
                  {/* Name header skeleton */}
                  <div className="h-5.5 bg-slate-200/80 rounded-md w-1/2" />
                  
                  {/* Description text skeleton */}
                  <div className="space-y-2">
                    <div className="h-3.5 bg-slate-200/80 rounded-md w-full" />
                    <div className="h-3.5 bg-slate-200/80 rounded-md w-5/6" />
                  </div>
                </div>

                {/* Footer action skeleton */}
                <div className="mt-6 pt-4 border-t border-slate-100/60 flex items-center">
                  <div className="h-3.5 bg-slate-200/80 rounded-md w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Actual Interactive Departments Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.id}
                id={`dept-card-${dept.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 25px -5px rgba(26,115,167,0.1), 0 10px 10px -5px rgba(26,115,167,0.04)",
                  borderColor: "#1A73A7"
                }}
                className="bg-white rounded-2xl border-2 border-transparent p-6.5 text-left flex flex-col justify-between transition-all duration-300 shadow-[0_4px_16px_rgba(26,115,167,0.04)] cursor-pointer group"
                onClick={() => onSelectDepartment(dept.id)}
              >
                <div className="space-y-4">
                  {/* Department Icon container */}
                  <div className="w-14 h-14 rounded-2xl bg-[#E8F4FD] text-[#1A73A7] group-hover:bg-[#1A73A7] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                    <DynamicIcon name={dept.iconName} size={28} />
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-[#1E293B] group-hover:text-[#1A73A7] transition-colors duration-200">
                    {dept.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2">
                    {dept.shortDescription}
                  </p>
                </div>

                {/* View Doctors Link */}
                <div className="mt-6 pt-4 border-t border-[#E8F4FD]/60">
                  <button
                    id={`dept-btn-${dept.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDepartment(dept.id);
                    }}
                    className="inline-flex items-center text-xs font-bold text-[#1A73A7] uppercase tracking-wider hover:text-[#0D9488] transition-colors focus:outline-none"
                    aria-label={`View clinical doctors from the ${dept.name} department`}
                  >
                    <span>View Doctors</span>
                    <span className="ml-1 text-base leading-none group-hover:translate-x-1 transition-transform inline-block">
                      →
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
