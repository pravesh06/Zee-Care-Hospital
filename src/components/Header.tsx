import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import DynamicIcon from "./DynamicIcon";

interface HeaderProps {
  onBookClick: () => void;
}

export default function Header({ onBookClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Departments", href: "#departments" },
    { label: "Doctors", href: "#doctors" },
    { label: "Services", href: "#services" },
    { label: "Appointments", href: "#appointments" },
    { label: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky shadow
      setIsScrolled(window.scrollY > 10);

      // Detect active section on scroll
      const scrollPos = window.scrollY + 120; // offset navbar height
      for (const link of navLinks) {
        const element = document.querySelector(link.href);
        if (element) {
          const top = (element as HTMLElement).offsetTop;
          const height = (element as HTMLElement).offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.href.substring(1));
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const topOffset = (targetElement as HTMLElement).offsetTop - 80; // height of sticking navbar
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
      setActiveSection(href.substring(1));
    }
  };

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-[0_4px_20px_rgba(26,115,167,0.1)] border-b border-[#E8F4FD] py-3"
          : "bg-white/95 backdrop-blur-md border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo on Left */}
          <a
            href="#home"
            id="nav-logo"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center space-x-2.5 group focus:outline-none focus:ring-2 focus:ring-[#1A73A7] focus:ring-offset-2 rounded-lg p-1"
            aria-label="Zee Care Hospital Home"
          >
            <div className="bg-[#E8F4FD] p-2 rounded-xl group-hover:bg-[#1A73A7] transition-colors duration-300">
              <svg
                className="w-6 h-6 text-[#1A73A7] group-hover:text-white transition-colors duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#1E293B] tracking-tight group-hover:text-[#1A73A7] transition-colors duration-300">
                Zee Care
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#64748B] font-semibold -mt-1">
                Hospital
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  id={`nav-link-${link.href.substring(1)}`}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-sm font-medium relative py-1.5 transition-colors duration-200 focus:outline-none focus:text-[#1A73A7] ${
                    isActive
                      ? "text-[#1A73A7]"
                      : "text-[#64748B] hover:text-[#1E293B]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A73A7] rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Book Now Button Desktop */}
          <div className="hidden lg:block">
            <button
              id="header-cta-book"
              onClick={onBookClick}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white text-sm font-semibold px-5.5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(13,148,136,0.25)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2"
              aria-label="Book an Appointment"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="lg:hidden flex items-center">
            <button
              id="mobile-nav-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#1E293B] hover:text-[#1A73A7] hover:bg-[#E8F4FD] rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A73A7]"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <DynamicIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#1E293B] z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 p-6 flex flex-col lg:hidden border-l border-[#E8F4FD]"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8F4FD]">
                <div className="flex items-center space-x-2">
                  <div className="bg-[#E8F4FD] p-1.5 rounded-lg text-[#1A73A7]">
                    <svg
                      className="w-5 h-5 text-[#1A73A7]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                  </div>
                  <span className="font-bold text-[#1E293B]">Zee Care Hospital</span>
                </div>
                <button
                  id="mobile-nav-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-[#64748B] hover:text-[#1E293B] hover:bg-[#E8F4FD] rounded-lg transition-colors focus:outline-none"
                  aria-label="Close menu"
                >
                  <DynamicIcon name="X" size={20} />
                </button>
              </div>

              {/* Navigation Links inside Drawer */}
              <nav className="flex flex-col space-y-4 mb-8">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.href}
                      id={`mobile-nav-link-${link.href.substring(1)}`}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`text-base font-semibold py-2 px-3 rounded-xl transition-all duration-150 ${
                        isActive
                          ? "bg-[#E8F4FD] text-[#1A73A7]"
                          : "text-[#64748B] hover:bg-[#E8F4FD]/50 hover:text-[#1E293B]"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>

              {/* Drawer Book Appointment Button */}
              <div className="mt-auto">
                <button
                  id="mobile-drawer-book"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white text-center font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-teal-100 transition-all focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                  aria-label="Book an Appointment"
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
