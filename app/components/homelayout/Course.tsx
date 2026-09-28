"use client"
import React, { useState, useRef } from "react";
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
  const [activePage, setActivePage] = useState(1);
  const totalDots = 4;

  const allCourses = (data?.courses as EducationCourseItem[]) || [];

  const isGrid = layout === "grid";
  const coursesList = isGrid ? allCourses : allCourses.slice(0, limit);
  const totalPages = Math.max(1, Math.ceil(allCourses.length / pageSize));
  const startIndex = (activePage - 1) * pageSize;
  const pagedCourses = isGrid
    ? allCourses.slice(startIndex, startIndex + pageSize)
    : coursesList;

  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(1, page), totalPages);
    setActivePage(nextPage);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const scrollFraction = scrollLeft / maxScroll;
        const currentDot = Math.min(
          totalDots - 1,
          Math.floor(scrollFraction * totalDots + 0.05)
        );
        setActiveDot(currentDot);
      }
    }
  };

  const scrollByCard = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector("div")?.clientWidth || 300;
      const scrollAmount = direction === "left" ? -(cardWidth + 24) : (cardWidth + 24);
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollToPage = (index: number) => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const targetScroll = (maxScroll / (totalDots - 1)) * index;
      scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
      setActiveDot(index);
    }
  };

  return (
    <section className={`py-8 md:py-12 bg-[#f8fafc] relative overflow-hidden ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-3 ${contentClassName}`}>
        
        {/* Header Section */}
        {showHeader && (
          <div className="text-center max-w-2xl mx-auto mb-8">
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
            <p className="text-slate-600 text-base  mt-1">
              {data?.desc}
            </p>
          </div>
        )}

        {/* Carousel Wrapper */}
        <div className="relative  px-0 ">
          
          {/* Left Arrow Button (Hidden on Mobile & Tablet) */}
          {!isGrid && (
            <button
              onClick={() => scrollByCard("left")}
              aria-label="Previous slide"
              className="hidden lg:flex absolute -left-10 top-1/2 -translate-y-1/2 -translate-x-2 w-12 h-12 rounded-full bg-white text-slate-800 shadow-xl items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 z-20 border border-slate-100"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow Button (Hidden on Mobile & Tablet) */}
          {!isGrid && (
            <button
              onClick={() => scrollByCard("right")}
              aria-label="Next slide"
              className="hidden lg:flex absolute -right-9 top-1/2 -translate-y-1/2 translate-x-2 w-12 h-12 rounded-full bg-white text-slate-800 shadow-xl items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 z-20 border border-slate-100"
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
                : "flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 pt-2 px-1 focus:outline-none"
            }
            style={isGrid ? undefined : { scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {pagedCourses?.map((course) => (
              <div
                key={course.id}
                className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col overflow-hidden group ${
                  isGrid
                    ? "w-full"
                    : "flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start"
                }`}
              >
                {/* Course Image & Top Tags */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                  {/* <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {course.studentsLabel}
                    </span>
                  </div> */}

                  <h3 className="text-lg min-h-[55px]  font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
                    {course.title}
                  </h3>

                  <p className="text-slate-600 text-sm line-clamp-2 mb-3 flex-grow">
                    {course.description}
                  </p>

                  <div className=" mt-auto flex items-center justify-between">
                    {/* <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-emerald-500">{course.price}</span>
                      <span className="text-sm text-slate-400 line-through font-medium">{course.oldPrice}</span>
                    </div> */}
                    <a
                      href={course.button.href}
                      className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
                    >
                      <span>{course.button.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Pagination Dots (carousel layout only) */}
          {!isGrid && (
            <div className="flex justify-center items-center gap-2 mt-4">
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
          )}

          {/* Numbered Pagination (grid layout only) */}
          {isGrid && totalPages > 1 && (
            <nav aria-label="Course pages" className="flex items-center justify-center gap-2 mt-10">
              <button
                type="button"
                onClick={() => goToPage(activePage - 1)}
                disabled={activePage === 1}
                aria-label="Previous page"
                className="w-11 h-11 rounded-xl bg-white text-slate-700 shadow-md border border-slate-100 flex items-center justify-center transition-all hover:bg-emerald-500 hover:text-white hover:border-emerald-500 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-700 disabled:cursor-not-allowed"
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
                    className={`w-11 h-11 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25 scale-105"
                        : "bg-white text-slate-700 shadow-sm border border-slate-100 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => goToPage(activePage + 1)}
                disabled={activePage === totalPages}
                aria-label="Next page"
                className="w-11 h-11 rounded-xl bg-white text-slate-700 shadow-md border border-slate-100 flex items-center justify-center transition-all hover:bg-emerald-500 hover:text-white hover:border-emerald-500 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-700 disabled:cursor-not-allowed"
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