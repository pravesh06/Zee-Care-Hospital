import React from "react";
import { motion } from "motion/react";
import { BLOGS } from "../data";
import SectionHeading from "./SectionHeading";
import DynamicIcon from "./DynamicIcon";

export default function Blog() {
  return (
    <section id="blog" className="py-20 md:py-28 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Health Tips & News"
          subtitle="Keep up with specialized clinical publications, cardiac guidelines, pediatric details, and wellness schedules compiled by our specialists."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOGS.map((blog, idx) => (
            <motion.article
              key={blog.id}
              id={`blog-card-${blog.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(26,115,167,0.06)" }}
              className="bg-white rounded-3xl overflow-hidden border-b-4 border-b-[#1A73A7] border border-[#1A73A7]/5 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_rgba(26,115,167,0.02)] text-left"
            >
              <div>
                {/* Image Placeholder at the top: Blue-toned medical mockup */}
                <div className="h-48 w-full bg-gradient-to-tr from-[#1A73A7]/10 to-[#E8F4FD] flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-white text-[#1A73A7] flex items-center justify-center shadow-md">
                    <DynamicIcon name={idx === 0 ? "Heart" : idx === 1 ? "Brain" : "Baby"} size={32} />
                  </div>
                  {/* Category Stamp overlay */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1A73A7] text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full shadow-sm">
                    {blog.category}
                  </span>
                </div>

                {/* Main Text block */}
                <div className="p-6 md:p-7 space-y-3">
                  <div className="flex items-center space-x-2.5 text-xs text-[#64748B] font-semibold font-mono">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>By {blog.authorName}</span>
                  </div>

                  <h3 className="text-xl font-bold font-sans text-[#1E293B] leading-snug line-clamp-2 hover:text-[#1A73A7] transition-colors duration-200">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-[#64748B] font-normal leading-relaxed line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="p-6 pt-0 mt-2">
                <a
                  href={`#blog-read-${blog.id}`}
                  className="inline-flex items-center text-xs font-bold text-[#1A73A7] uppercase tracking-wider hover:text-[#0D9488] transition-colors focus:outline-none"
                  aria-label={`Read article about ${blog.title}`}
                >
                  <span>Read More</span>
                  <span className="ml-1 text-sm font-light">→</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
