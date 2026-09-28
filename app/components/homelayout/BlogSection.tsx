"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { site, SectionProps, EducationBlogData, EducationBlogPost } from "@/data";
import { Calendar, ArrowRight } from "lucide-react";

type BlogSectionProps = SectionProps<EducationBlogData> & {
  /** How many posts to render. Defaults to 3, pass no limit to render all. */
  limit?: number;
};

export default function BlogSection({
  data = site.blog,
  className = "",
  contentClassName = "",
  limit = 3,
}: BlogSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [totalDots, setTotalDots] = useState(1);

  const badge = data?.badge || "Our Blogs";
  const titleNormal = data?.title?.normal || "Latest News &";
  const titleHighlighted = data?.title?.highlighted || "Insights";
  const desc = data?.desc || "Stay updated with the latest trends, insights, and stories from the world of education and career development.";
  const posts = (data?.posts as EducationBlogPost[]) || [];
  const visiblePosts = typeof limit === "number" ? posts.slice(0, limit) : posts;

  // Dots follow the real amount of scrollable pages (mobile/tablet scroller)
  const measureDots = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const pages = Math.max(1, Math.ceil(container.scrollWidth / container.clientWidth));
    setTotalDots(pages);
    setActiveDot((current) => Math.min(current, pages - 1));
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const frame = requestAnimationFrame(measureDots);
    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measureDots);
    observer?.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [measureDots, visiblePosts.length]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const scrollFraction = scrollLeft / maxScroll;
        const currentDot = Math.min(
          totalDots - 1,
          Math.max(0, Math.floor(scrollFraction * totalDots + 0.05))
        );
        setActiveDot(currentDot);
      }
    }
  };

  const scrollToPage = (index: number) => {
    if (scrollContainerRef.current && totalDots > 1) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const targetScroll = (maxScroll / (totalDots - 1)) * index;
      scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
      setActiveDot(index);
    }
  };

  return (
    <section className={`py-8 md:py-12 bg-[#f8fafc] relative overflow-hidden ${className}`}>
      
      {/* Bottom Left Dot Grid Decoration */}
      <div className="absolute bottom-8 left-8 hidden sm:grid grid-cols-6 gap-2 w-fit opacity-40 z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        ))}
      </div>

      {/* Bottom Right Faded Wide Ring / Circle Decoration */}
      <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full border-[28px] border-emerald-500/10 pointer-events-none z-0" />
      
      {/* Bottom Right Dot Grid Decoration */}
      <div className="absolute bottom-8 right-8 hidden sm:grid grid-cols-6 gap-2 w-fit opacity-40 z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        ))}
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 ${contentClassName}`}>
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-5 space-y-0">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
            <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
              {badge}
            </span>
            <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            {titleNormal}{" "}
            <span className="text-emerald-600">{titleHighlighted}</span>
          </h2>

          <p className="text-slate-600 mt-3 text-base leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Mobile/Tablet: Swipeable scroll container | Desktop: 3-column grid */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex lg:grid lg:grid-cols-3 gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 pt-2 px-1 focus:outline-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              className="flex-shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-full snap-start bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col justify-between group"
            >
              {/* Image & Date Badge */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-2 text-xs font-semibold text-slate-800 border border-slate-100">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{post.date}</span>
                </div>
              </div>

              {/* Content Area */}
              <div className="py-3 px-6 flex flex-col flex-grow">
                {/* Category */}
                <div className="mb-2">
                  <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-1 leading-snug group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-2 flex-grow">
                  {post.description}
                </p>

                {/* Read More Link */}
                <div className="pt-2 border-t border-slate-100 mt-auto">
                  <a
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold text-sm transition-colors group/link"
                  >
                    <span>{post.readMoreText || "Read More"}</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Dots (Visible on Mobile & Tablet scroll view) */}
        <div className="flex lg:hidden justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToPage(index)}
              aria-label={`Go to slide page ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${
                activeDot === index
                  ? "w-8 h-2.5 bg-emerald-600"
                  : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}