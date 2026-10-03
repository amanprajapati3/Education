"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site, SectionProps, EducationCoursesData, EducationCourseItem } from "@/data";
import { 
  Code, 
  BarChart, 
  PenTool, 
  Megaphone, 
  Cpu, 
  Shield, 
  Globe, 
  Database, 
  Smartphone, 
  Book, 
  Clock, 
  Star, 
  ArrowLeft, 
  ArrowRight 
} from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "code": return <Code className="w-4 h-4" />;
    case "bar-chart": return <BarChart className="w-4 h-4" />;
    case "pen-tool": return <PenTool className="w-4 h-4" />;
    case "megaphone": return <Megaphone className="w-4 h-4" />;
    case "cpu": return <Cpu className="w-4 h-4" />;
    case "shield": return <Shield className="w-4 h-4" />;
    case "globe": return <Globe className="w-4 h-4" />;
    case "database": return <Database className="w-4 h-4" />;
    case "smartphone": return <Smartphone className="w-4 h-4" />;
    default: return <Book className="w-4 h-4" />;
  }
};

type CourseProps = SectionProps<EducationCoursesData> & {
  /** "carousel" keeps the home slider, "grid" renders a paginated card grid. */
  layout?: "carousel" | "grid";
  showHeader?: boolean;
  /** Cards shown in the carousel. The grid layout paginates the full list instead. */
  limit?: number;
  /** Cards per page when layout is "grid". */
  pageSize?: number;
};

export default function Course({
  data = site.courses,
  className = "",
  contentClassName = "",
  layout = "carousel",
  showHeader = true,
  limit = 12,
  pageSize = 8,
}: CourseProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [totalDots, setTotalDots] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const allCourses = (data?.courses as EducationCourseItem[]) || [];

  const isGrid = layout === "grid";
  const coursesList = isGrid ? allCourses : allCourses.slice(0, limit);
  const totalPages = Math.max(1, Math.ceil(allCourses.length / pageSize));
  const startIndex = (activePage - 1) * pageSize;
  const pagedCourses = isGrid
    ? allCourses.slice(startIndex, startIndex + pageSize)
    : coursesList;

  // Measure dots dynamically based on container scrollWidth vs clientWidth (just like testimonials)
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
  }, [measureDots, coursesList.length]);

  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(1, page), totalPages);
    setActivePage(nextPage);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setActiveDot(0);
      return;
    }
    // Proportional rounding for smooth dot transitions
    const currentDot = Math.min(
      totalDots - 1,
      Math.max(0, Math.round((scrollLeft / maxScroll) * (totalDots - 1)))
    );
    setActiveDot(currentDot);
  };

  // Precise card-by-card scrolling using actual element offset measurements
  const scrollByCard = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".snap-start");
    if (cards.length === 0) return;

    let scrollAmount = (cards[0] as HTMLElement).offsetWidth + 24;
    if (cards.length >= 2) {
      scrollAmount = (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft;
    }

    const targetScroll = direction === "left"
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  // Precise dot navigation scrolling cleanly into position
  const scrollToPage = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container || totalDots <= 1) return;

    const { scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    const targetScroll = (maxScroll / (totalDots - 1)) * index;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
    setActiveDot(index);
  };

  return (
    <section className={`py-8 md:py-12 bg-[#f8fafc] relative overflow-hidden ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-3 ${contentClassName}`}>
        
        {/* Header Section */}
        {showHeader && (
          <ScrollReveal
            as="div"
            className="text-center max-w-2xl mx-auto mb-8"
            direction="up"
            distance={40}
            duration={0.7}
          >
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
              <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
                {data?.badge || "Popular Courses"}
              </span>
              <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {data?.title?.normal}{" "}
              <span className="text-emerald-600">{data?.title?.highlighted}</span>
            </h2>
            <p className="text-slate-600 text-base mt-1">
              {data?.desc}
            </p>
          </ScrollReveal>
        )}

        {/* Carousel Wrapper */}
        <div className="relative px-0">
          
          {/* Left Arrow Button */}
          {!isGrid && (
            <button
              onClick={() => scrollByCard("left")}
              aria-label="Previous slide"
              className="swp-out swp-emerald-500 swp-abs hidden lg:flex -left-10 top-1/2 -translate-y-1/2 -translate-x-2 w-12 h-12 rounded-full text-slate-800 shadow-xl items-center justify-center z-20 border border-slate-100 transition-transform active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow Button */}
          {!isGrid && (
            <button
              onClick={() => scrollByCard("right")}
              aria-label="Next slide"
              className="swp-out swp-emerald-500 swp-abs hidden lg:flex -right-9 top-1/2 -translate-y-1/2 translate-x-2 w-12 h-12 rounded-full text-slate-800 shadow-xl items-center justify-center z-20 border border-slate-100 transition-transform active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          )}

          {/* Scrollable Course Cards Container / Paginated Grid */}
          <div
            ref={isGrid ? gridRef : scrollContainerRef}
            onScroll={isGrid ? undefined : handleScroll}
            className={
              isGrid
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-mt-28"
                : "flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none pb-8 pt-2 px-1 focus:outline-none [-webkit-overflow-scrolling:touch]"
            }
            style={isGrid ? undefined : { scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {pagedCourses?.map((course, cardIndex) => (
              <ScrollReveal
                key={course.id}
                as="div"
                className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col overflow-hidden group ${
                  isGrid
                    ? "w-full"
                    : "flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start"
                }`}
                direction="up"
                distance={40}
                duration={0.65}
                delay={0.05}
                staggerChildren={0.08}
                index={cardIndex}
              >
                {/* Course Image & Top Tags */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(min-width: 1280px) 296px, (min-width: 1024px) calc(25vw - 18px), (min-width: 640px) calc(50vw - 24px), calc(100vw - 32px)"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-blue-900 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                    {getCategoryIcon(course.categoryIcon)}
                    <span>{course.category}</span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-md text-slate-800 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Course Body Content */}
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-lg min-h-[55px] font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
                    {course.title}
                  </h3>

                  <p className="text-slate-600 text-sm line-clamp-2 mb-3 flex-grow">
                    {course.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <a
                      href={course.button.href}
                      className="swp swp-emerald-500 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-emerald-500/20 transition-transform active:scale-95"
                    >
                      <span>{course.button.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Dynamic Pagination Dots (carousel layout only) */}
          {!isGrid && totalDots > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              {Array.from({ length: totalDots }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToPage(index)}
                  aria-label={`Go to slide page ${index + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeDot === index
                      ? "w-8 h-2.5 bg-emerald-600"
                      : "swp-out w-2.5 h-2.5"
                  }`}
                  style={
                    activeDot === index
                      ? undefined
                      : ({ "--swp-color": "#10b981", "--swp-rest": "#cbd5e1" } as React.CSSProperties)
                  }
                />
              ))}
            </div>
          )}

          {/* Numbered Pagination (grid layout only) */}
          {isGrid && totalPages > 1 && (
            <nav aria-label="Course pages" className="flex items-center justify-center gap-2 mt-10">
              <button
                type="button"
                onClick={() => goToPage(activePage - 1)}
                disabled={activePage === 1}
                aria-label="Previous page"
                className="swp-out swp-emerald-500 w-11 h-11 rounded-xl text-slate-700 shadow-md border border-slate-100 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                const isActive = page === activePage;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-11 h-11 rounded-xl text-sm font-bold ${
                      isActive
                        ? "swp swp-emerald-500 shadow-md shadow-emerald-500/25 scale-105"
                        : "swp-out swp-emerald-600 text-slate-700 shadow-sm border border-slate-100"
                    }`}
                  >
                    <span>{page}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => goToPage(activePage + 1)}
                disabled={activePage === totalPages}
                aria-label="Next page"
                className="swp-out swp-emerald-500 w-11 h-11 rounded-xl text-slate-700 shadow-md border border-slate-100 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </nav>
          )}

        </div>

      </div>
    </section>
  );
}