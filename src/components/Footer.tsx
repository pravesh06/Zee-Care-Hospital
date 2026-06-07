import React from "react";
import DynamicIcon from "./DynamicIcon";
import { DEPARTMENTS } from "../data";
import { Department } from "../types";

interface FooterProps {
  onLinkClick: (href: string) => void;
  onAdminClick: () => void;
  departments?: Department[];
}

export default function Footer({ onLinkClick, onAdminClick, departments }: FooterProps) {
  const handleQuickLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onLinkClick(href);
  };

  const quickLinks = [
    { label: "Home Base", href: "#home" },
    { label: "About Hospital", href: "#about" },
    { label: "Medical Services", href: "#services" },
    { label: "Patient Care", href: "#why-choose-us" },
    { label: "Consultation Bookings", href: "#appointments" },
    { label: "Location & Contacts", href: "#contact" }
  ];

  // Pick top 5 departments to show in footer
  const visibleDepts = (departments || DEPARTMENTS).slice(0, 5);

  return (
    <footer className="bg-[#1A73A7] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Four-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12 text-left">
          {/* Column 1: Hospital Brand Blurb (lg:span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-white p-2 rounded-xl text-[#1A73A7]">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">Zee Care</span>
                <span className="text-[10px] uppercase tracking-widest text-white/80 font-bold -mt-1">
                  Hospital
                </span>
              </div>
            </div>
            <p className="text-sm text-white/80 font-normal leading-relaxed max-w-sm">
              Zee Care Hospital delivers compassionate clinical diagnostics, experienced academic nursing, 
              and state-of-the-art trauma surgery to families in full coordination with international guidelines.
            </p>
            <div className="flex items-center space-x-3 text-xs font-semibold bg-white/10 p-3 rounded-xl border border-white/5 w-fit">
              <span className="text-[#0D9488] animate-pulse">●</span>
              <span>24/7 Clinical Emergency Operational Status</span>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:span-3) */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-extrabold uppercase tracking-widest text-white mb-5 border-b border-white/20 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleQuickLink(e, link.href)}
                    className="text-white/85 hover:text-white hover:underline transition-colors focus:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Departments (lg:span-2) */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-extrabold uppercase tracking-widest text-white mb-5 border-b border-white/20 pb-2 inline-block">
              Departments
            </h3>
            <ul className="space-y-3 text-sm">
              {visibleDepts.map((dept) => (
                <li key={dept.id}>
                  <a
                    href="#departments"
                    onClick={(e) => handleQuickLink(e, "#departments")}
                    className="text-white/85 hover:text-white hover:underline transition-colors focus:outline-none"
                  >
                    {dept.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#departments"
                  onClick={(e) => handleQuickLink(e, "#departments")}
                  className="text-white/80 italic hover:text-white transition-colors focus:outline-none"
                >
                  View All ({(departments && departments.length) || DEPARTMENTS.length})...
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (lg:span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-base font-extrabold uppercase tracking-widest text-white mb-5 border-b border-white/20 pb-2 inline-block">
              Clinical Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2.5 text-white/85">
                <DynamicIcon name="MapPin" size={18} className="text-white/85 mt-0.5 flex-shrink-0" />
                <span>712 Serenity Boulevard, Health District</span>
              </li>
              <li className="flex items-center space-x-2.5 text-white/85">
                <DynamicIcon name="Phone" size={18} className="text-white/85 flex-shrink-0" />
                <span>OPD: +1 (800) 555-0199</span>
              </li>
              <li className="flex items-center space-x-2.5 text-white/85">
                <DynamicIcon name="ShieldAlert" size={18} className="text-white/85 flex-shrink-0" />
                <span>Trauma: +1 (800) 555-0100</span>
              </li>
              <li className="flex items-center space-x-2.5 text-white/85">
                <DynamicIcon name="Mail" size={18} className="text-white/85 flex-shrink-0" />
                <span>consultations@zeecare.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-white/20 my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-white/80 space-y-4 md:space-y-0 text-left">
          <p>© 2026 Zee Care Hospital. All rights reserved. Registered multi-specialty clinical organization.</p>
          <div className="flex items-center space-x-4">
            <a href="#privacy" className="hover:text-white hover:underline focus:outline-none">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#terms" className="hover:text-white hover:underline focus:outline-none">
              Terms of Service
            </a>
            <span>|</span>
            <button
              onClick={onAdminClick}
              className="hover:text-[#0D9488] active:scale-95 bg-white/10 hover:bg-white text-white hover:text-slate-950 font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer text-[10px] uppercase tracking-wider flex items-center space-x-1 border border-white/10"
              aria-label="Open staff administrator dashboard portal"
            >
              <span>🔑 Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
