import React, { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeading from "./SectionHeading";
import { Doctor, Department } from "../types";

interface DoctorsProps {
  activeFilter: string;
  setActiveFilter: (filterId: string) => void;
  onBookDoctor: (doctor: Doctor) => void;
  doctors: Doctor[];
  departments: Department[];
  isLoading: boolean;
}

export default function Doctors({ activeFilter, setActiveFilter, onBookDoctor, doctors, departments, isLoading }: DoctorsProps) {
  // Available tabs defined in requirements
  const tabs = [
    { id: "all", name: "All Specialists" },
    { id: "cardiology", name: "Cardiology" },
    { id: "neurology", name: "Neurology" },
    { id: "orthopedics", name: "Orthopedics" },
    { id: "pediatrics", name: "Pediatrics" }
  ];

  // Filtering doctors
  const filteredDoctors = useMemo(() => {
    if (activeFilter === "all") {
      // Return at least 12 doctors as requested in the requirements
      return doctors.slice(0, 12);
    }
    return doctors.filter((doc) => doc.departmentId === activeFilter);
  }, [activeFilter, doctors]);

  // Helper code to get initials from "Dr. Arvind Mehta" -> "AM"
  const getInitials = (name: string) => {
    let cleanName = name.replace(/^Dr\.\s+/i, "");
    const parts = cleanName.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (parts[0][0] || "MD").toUpperCase();
  };

  // Helper to get Department Name for subtitle badge
  const getDeptName = (deptId: string) => {
    const dept = departments.find((d) => d.id === deptId);
    return dept ? dept.name : "Specialist";
  };

  return (
    <section id="doctors" className="py-20 md:py-28 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Medical Specialists"
          subtitle="Consult our board-certified surgeons and clinical practitioners who offer decades of cumulative global experiences."
        />

        {/* Department Filter Tab Bar */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-12">
          {tabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                id={`doc-tab-${tab.id}`}
                onClick={() => setActiveFilter(tab.id)}
                className={`relative py-3 px-6 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1A73A7] ${
                  isActive
                    ? "text-white bg-[#1A73A7] shadow-[0_4px_14_rgba(26,115,167,0.25)]"
                    : "text-[#64748B] bg-[#E8F4FD]/40 hover:bg-[#E8F4FD]/80 hover:text-[#1E293B]"
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        {isLoading ? (
          /* High-Fidelity Animated Skeleton Grid for Specialists */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div
                key={num}
                className="bg-[#E8F4FD]/10 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between text-center shadow-[0_4px_16px_rgba(26,115,167,0.01)] animate-pulse"
              >
                <div className="flex flex-col items-center">
                  {/* Circle avatar skeleton */}
                  <div className="w-24 h-24 rounded-full bg-slate-200/80 mb-6" />
                  
                  {/* Department badge skeleton */}
                  <div className="h-4.5 bg-slate-200/80 rounded-full w-24 mb-4" />
                  
                  {/* Name header skeleton */}
                  <div className="h-5 bg-slate-200/80 rounded-md w-3/4 mb-2" />
                  
                  {/* Subtitle specialization skeleton */}
                  <div className="h-3.5 bg-slate-200/80 rounded-md w-1/2 mb-2" />
                  
                  {/* Qualification badge skeleton */}
                  <div className="h-4.5 bg-slate-200/80 rounded-md w-2/3 mb-4" />
                  
                  {/* Star rating/experience line skeleton */}
                  <div className="h-3.5 bg-slate-200/80 rounded-md w-11/12 mt-2 mb-6" />
                </div>

                {/* Main CTA button skeleton */}
                <div className="w-full h-11 bg-slate-200/80 rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          /* Doctor Grid and Animation Wrapper */
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredDoctors.map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  id={`doctor-card-${doc.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#E8F4FD]/30 border border-[#1A73A7]/10 hover:border-[#1A73A7]/30 rounded-3xl p-6 flex flex-col justify-between text-center transition-all duration-300 hover:shadow-[0_12px_28px_rgba(26,115,167,0.06)] group"
                >
                  <div className="flex flex-col items-center">
                    {/* Initials-based Avatar Placeholder */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-full bg-[#1A73A7] text-white font-bold text-2xl flex items-center justify-center shadow-[0_6px_16px_rgba(26,115,167,0.2)] group-hover:scale-105 transition-transform duration-300">
                        {getInitials(doc.name)}
                      </div>
                      {/* Active pulse status indicator */}
                      <span className="absolute bottom-1 right-1 flex h-4.5 w-4.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D9488] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-[#0D9488] border-2 border-white"></span>
                      </span>
                    </div>

                    {/* Badges / Experience */}
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#1A73A7] bg-[#E8F4FD] py-1 px-3 rounded-full mb-3">
                      {getDeptName(doc.departmentId)}
                    </span>

                    {/* Doctor Info */}
                    <h4 className="text-lg font-bold text-[#1E293B] line-clamp-1 group-hover:text-[#1A73A7] transition-colors duration-200">
                      {doc.name}
                    </h4>
                    <p className="text-xs text-[#64748B] font-medium mb-1 mt-0.5">
                      {doc.specialization}
                    </p>
                    <p className="text-xs text-[#1A73A7] font-semibold bg-white border border-[#1A73A7]/10 px-2.5 py-0.5 rounded-md mb-2 inline-block">
                      {doc.qualification}
                    </p>
                    
                    {/* Years of Experience */}
                    <div className="text-xs text-[#64748B] font-medium flex items-center justify-center space-x-1 mt-2 mb-6">
                      <span>★</span>
                      <span>{doc.experienceYears} Years of Clinical Experience</span>
                    </div>
                  </div>

                  {/* Call to action */}
                  <button
                    id={`doc-book-btn-${doc.id}`}
                    onClick={() => onBookDoctor(doc)}
                    className="w-full bg-[#1A73A7] hover:bg-[#125780] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl hover:shadow-[0_4px_10px_rgba(26,115,167,0.2)] transition-all focus:outline-none focus:ring-2 focus:ring-[#1A73A7]"
                    aria-label={`Book an appointment with ${doc.name}`}
                  >
                    Book Appointment
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
