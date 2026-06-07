import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Departments from "./components/Departments";
import Doctors from "./components/Doctors";
import Services from "./components/Services";
import AppointmentForm from "./components/AppointmentForm";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { Doctor, Department } from "./types";
import { DEPARTMENTS, DOCTORS } from "./data";
import { supabase } from "./supabaseClient";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Coordinating states for selective bookings
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
  const [activeDoctorFilter, setActiveDoctorFilter] = useState<string>("all");
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Dynamic state loaded from Supabase
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [dataError, setDataError] = useState<string | null>(null);
  const [showSQLNotice, setShowSQLNotice] = useState<boolean>(false);

  useEffect(() => {
    async function fetchClinicData() {
      setIsLoadingData(true);
      setDataError(null);
      setShowSQLNotice(false);

      try {
        const [deptResult, docResult] = await Promise.all([
          supabase.from("departments").select("*"),
          supabase.from("doctors").select("*")
        ]);

        let failDetected = false;
        let failMessage = "";

        if (deptResult.error) {
          console.warn("Supabase departments fetch failed:", deptResult.error.message);
          failDetected = true;
          failMessage = deptResult.error.message;
        }
        if (docResult.error) {
          console.warn("Supabase doctors fetch failed:", docResult.error.message);
          failDetected = true;
          failMessage = docResult.error.message;
        }

        const retrievedDepts = deptResult.data || [];
        const retrievedDocs = docResult.data || [];

        if (failDetected || retrievedDepts.length === 0 || retrievedDocs.length === 0) {
          // If query failed or tables are empty, fall back gracefully
          console.info("Using local DEPARTMENTS and DOCTORS fallback data.");
          setDepartments(DEPARTMENTS);
          setDoctors(DOCTORS);
          
          if (failDetected) {
            setDataError(failMessage);
            // This is likely because the table doesn't exist yet
            if (failMessage.includes("relation") || failMessage.includes("not found")) {
              setShowSQLNotice(true);
            }
          } else {
            // Tables exist but are empty
            setDataError("tables-empty");
          }
        } else {
          // Map database structure securely to TypeScript types
          const mappedDepts: Department[] = retrievedDepts.map((d: any) => ({
            id: d.id,
            name: d.name,
            iconName: d.icon_name || d.iconName || "Activity",
            shortDescription: d.short_description || d.shortDescription || ""
          }));

          const mappedDocs: Doctor[] = retrievedDocs.map((d: any) => ({
            id: d.id,
            name: d.name,
            departmentId: d.department_id || d.departmentId || "",
            specialization: d.specialization || "",
            qualification: d.qualification || "",
            experienceYears: Number(d.experience_years || d.experienceYears || 0)
          }));

          setDepartments(mappedDepts);
          setDoctors(mappedDocs);
        }
      } catch (err: any) {
        console.error("Critical error fetching clinic data from Supabase:", err);
        setDepartments(DEPARTMENTS);
        setDoctors(DOCTORS);
        setDataError(err.message || "Failed to make a server request.");
      } finally {
        // Enforce a minimum loader layout of 1.2s to prevent jarring content snap
        setTimeout(() => {
          setIsLoadingData(false);
        }, 1250);
      }
    }

    fetchClinicData();
  }, []);

  const scrollToSection = (id: string) => {
    const targetElement = document.querySelector(id);
    if (targetElement) {
      const topOffset = (targetElement as HTMLElement).offsetTop - 85; // accounts for sticky header
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  // Callback when user books special doctor card directly
  const handleBookDoctorFromCard = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDepartmentId(doctor.departmentId);
    scrollToSection("#appointments");
  };

  // Callback when user selects "View Doctors" link on a Department card
  const handleSelectDepartmentFromCard = (deptId: string) => {
    // 1. Set the filter tab on active doctors view
    setActiveDoctorFilter(deptId);
    
    // 2. Clear previous specific doctor select so booking doesn't get locked to old state,
    // but preset the department ID for convenience
    setSelectedDoctor(null);
    setSelectedDepartmentId(deptId);

    // 3. Scroll user down to the doctors panel
    scrollToSection("#doctors");
  };

  const handleClearSelections = () => {
    setSelectedDoctor(null);
    setSelectedDepartmentId(null);
  };

  return (
    <div id="app-root-container" className="bg-white min-h-screen text-[#1E293B] antialiased selection:bg-[#E8F4FD] selection:text-[#1A73A7]">
      {/* 1. Sticky Navigation Bar */}
      <Header onBookClick={() => scrollToSection("#appointments")} />

      {/* Main Content Layout Block */}
      <main className="flex flex-col">
        {/* 2. Hero Section */}
        <Hero
          onBookClick={() => scrollToSection("#appointments")}
          onExploreClick={() => scrollToSection("#departments")}
        />

        {/* 3. Stats Banner */}
        <Stats />

        {/* 4. About Us Section */}
        <About />

        {/* 5. Departments Section */}
        <Departments 
          onSelectDepartment={handleSelectDepartmentFromCard} 
          departments={departments}
          isLoading={isLoadingData}
        />

        {/* 6. Doctors Section */}
        <Doctors
          activeFilter={activeDoctorFilter}
          setActiveFilter={setActiveDoctorFilter}
          onBookDoctor={handleBookDoctorFromCard}
          doctors={doctors}
          departments={departments}
          isLoading={isLoadingData}
        />

        {/* 7. Services Section */}
        <Services />

        {/* 8. Appointment Booking Form Section */}
        <AppointmentForm
          selectedDoctor={selectedDoctor}
          selectedDepartmentId={selectedDepartmentId}
          onClearSelections={handleClearSelections}
          departments={departments}
          doctors={doctors}
        />

        {/* 9. Patient Testimonials Carousel Section */}
        <Testimonials />

        {/* 10. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 11. Health Blog & Clinical Insights */}
        <Blog />

        {/* 12. Contact Details & Leaflet Maps */}
        <Contact />
      </main>

      {/* 13. High-Fidelity Footer details */}
      <Footer 
        onLinkClick={scrollToSection} 
        onAdminClick={() => setIsAdminOpen(true)} 
        departments={departments}
      />

      {/* 14. Admin Portal Modal Block */}
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Dynamic First-Paint Full-Page Global Loading Overlay */}
      <AnimatePresence>
        {isLoadingData && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] bg-slate-900 flex flex-col items-center justify-center text-white"
          >
            <div className="relative flex flex-col items-center space-y-6 max-w-sm px-6 text-center">
              {/* Outer ring ripple animation */}
              <div className="relative w-20 h-20 bg-[#1A73A7]/10 rounded-full flex items-center justify-center border border-[#1A73A7]/30">
                <div className="absolute inset-x-0 inset-y-0 rounded-full bg-[#1A73A7] opacity-20 animate-ping" />
                <span className="text-3xl font-extrabold text-[#38BDF8]">ZC</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-base font-bold tracking-tight text-white">Zee Care Digital Health</h3>
                <p className="text-xs text-[#94A3B8] font-medium leading-relaxed">
                  Synchronizing clinic data resources &amp; real-time reservation schedules directly with Supabase cloud infrastructure...
                </p>
              </div>
              
              {/* Pulsing Loading bar */}
              <div className="w-48 h-1.2 bg-slate-800 rounded-full overflow-hidden relative">
                <div className="absolute top-0 bottom-0 left-0 w-3/4 bg-gradient-to-r from-[#1A73A7] to-[#0D9488] rounded-full animate-pulse animate-infinite" />
              </div>
              
              <div className="text-[10px] uppercase tracking-widest text-[#64748B] font-bold">
                ESTABLISHING SECURE CONNECTION
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
