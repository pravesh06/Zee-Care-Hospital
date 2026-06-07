import React from "react";
import { motion } from "motion/react";
import SectionHeading from "./SectionHeading";
import DynamicIcon from "./DynamicIcon";

export default function Contact() {
  const contacts = [
    {
      id: "c-1",
      label: "Hospital Address",
      value: "712 Serenity Boulevard, Health District, Suite 100",
      iconName: "MapPin"
    },
    {
      id: "c-2",
      label: "OPD Appointments Desk",
      value: "+1 (800) 555-0199 (Mon - Sat)",
      iconName: "Phone"
    },
    {
      id: "c-3",
      label: "24/7 Trauma Dispatcher",
      value: "+1 (800) 555-0100 (Emergencies)",
      iconName: "ShieldAlert"
    },
    {
      id: "c-4",
      label: "Emergency Ambulance Support",
      value: "+1 (800) 555-0111",
      iconName: "Ambulance"
    },
    {
      id: "c-5",
      label: "Clinical Emails Desk",
      value: "consultations@zeecarehospital.com",
      iconName: "Mail"
    }
  ];

  const hours = [
    { day: "Monday - Saturday", time: "8:00 AM - 8:00 PM" },
    { day: "Sundays & National Holidays", time: "9:00 AM - 2:00 PM" },
    { day: "Trauma & Emergency Unit", time: "24 Hours / 7 Days" }
  ];

  const socials = [
    { name: "Facebook", icon: "Facebook", href: "#social-fb", color: "hover:text-[#1877F2]" },
    { name: "Twitter", icon: "Twitter", href: "#social-tw", color: "hover:text-[#1DA1F2]" },
    { name: "Instagram", icon: "Instagram", href: "#social-ig", color: "hover:text-[#E1306C]" },
    { name: "LinkedIn", icon: "Linkedin", href: "#social-li", color: "hover:text-[#0077B5]" },
    { name: "YouTube", icon: "Youtube", href: "#social-yt", color: "hover:text-[#FF0000]" }
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Contact & Location"
          subtitle="Get in touch with our medical staff, dispatch emergency trauma ambulances, or navigate directly to our medical site."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Details & Hours */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8 text-left"
          >
            {/* Contact Information Elements */}
            <div className="space-y-5">
              <h3 className="text-2xl font-bold text-[#1E293B]">Get In Touch</h3>
              <div className="space-y-4">
                {contacts.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3.5">
                    <div className="p-2.5 rounded-xl bg-[#E8F4FD] text-[#1A73A7] mt-0.5">
                      <DynamicIcon name={item.iconName} size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                        {item.label}
                      </h4>
                      <p className="text-sm sm:text-base font-semibold text-[#1E293B] mt-0.5">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Structured Working Hours Table */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#1E293B] flex items-center space-x-2">
                <span className="text-[#1A73A7]"><DynamicIcon name="Clock" size={20} /></span>
                <span>Hospital Working Hours</span>
              </h3>
              <div className="border border-[#E8F4FD] rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#E8F4FD]/40 border-b border-[#E8F4FD]">
                      <th className="px-5 py-3.5 font-bold text-[#1A73A7]">Clinical Division</th>
                      <th className="px-5 py-3.5 font-bold text-right text-[#1E293B]">Operational Timing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hours.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-[#E8F4FD]/60 last:border-b-0 ${
                          idx === 2 ? "bg-[#E8F4FD]/30 font-bold" : ""
                        }`}
                      >
                        <td className="px-5 py-3.5 text-[#64748B]">{row.day}</td>
                        <td className="px-5 py-3.5 text-right font-semibold text-[#1E293B]">
                          {idx === 2 ? (
                            <span className="text-[#0D9488] font-bold uppercase tracking-wider">
                              {row.time}
                            </span>
                          ) : (
                            row.time
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Social Media Link Icons */}
            <div className="space-y-3.5 pt-4 border-t border-[#E8F4FD]">
              <h4 className="text-sm font-bold text-[#1E293B] uppercase tracking-wider">
                Follow Our Clinical Portal
              </h4>
              <div className="flex items-center space-x-3">
                {socials.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.href}
                    id={`social-link-${platform.name.toLowerCase()}`}
                    className={`p-3 bg-[#E8F4FD]/50 hover:bg-[#E8F4FD] focus:bg-[#E8F4FD] rounded-2xl text-[#1A73A7] transition-all focus:outline-none focus:ring-2 focus:ring-[#1A73A7] ${platform.color}`}
                    aria-label={`Follow Zee Care Hospital on ${platform.name}`}
                  >
                    <DynamicIcon name={platform.icon} size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Google Maps embed iframe */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 w-full h-[450px]"
          >
            <div className="w-full h-full rounded-3xl overflow-hidden border border-[#1A73A7]/10 shadow-[0_8px_32px_rgba(26,115,167,0.08)] relative bg-[#F8FBFE] flex items-center justify-center">
              {/* Interactive Iframe Map (Standard Embed of a healthcare area or hospital coordinates) */}
              <iframe
                title="Zee Care Hospital Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0560738361734!2d-122.40428568468205!3d37.78759367975765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580892f392231%3A0xc6cb1c7dfba2574e!2sUnion%20Square%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2s!</textarea>!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full relative z-10"
              />
              
              {/* Fallback spinner watermark during loading */}
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-[#1A73A7]">
                <svg className="animate-spin h-8 w-8 text-[#1A73A7]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-xs font-semibold text-[#64748B]">Loading Interactive Map...</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
