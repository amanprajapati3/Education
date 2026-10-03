"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site, SectionProps, EducationTestimonialData, EducationTestimonialItem } from "@/data";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";

type TestimonialSectionProps = SectionProps<EducationTestimonialData> & {
  layout?: "split" | "centered";
  showButton?: boolean;
  showArrows?: boolean;
};

export default function TestimonialSection({
  data = site.testimonial,
  className = "",
  contentClassName = "",
  layout = "split",
  showButton = true,
  showArrows = true,
}: TestimonialSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [totalDots, setTotalDots] = useState(1);

  const badge = data?.badge || "Testimonials";
  const titleNormal = data?.title?.normal || "What Our Students";
  const titleHighlighted = data?.title?.highlighted || "Have To Say";
  const desc = data?.desc || "Real stories from learners who have gained new skills, advanced their careers, and achieved their goals with us.";
  const button = data?.button || { label: "View All Testimonials", href: "/testimonial" };
  const testimonials = (data?.testimonialItems as EducationTestimonialItem[]) || [];

  const isCentered = layout === "centered";

  // Number of dots follows the amount of scrollable pages, so the same
  // component works for the home slider and the wider testimonial page.
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
  }, [measureDots, testimonials.length]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setActiveDot(0);
      return;
    }
    const currentDot = Math.min(
      totalDots - 1,
      Math.max(0, Math.floor((scrollLeft / maxScroll) * totalDots + 0.05))
    );
    setActiveDot(currentDot);
  };

  const scrollByCard = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector("div")?.clientWidth || 350;
      const scrollAmount = direction === "left" ? -(cardWidth + 24) : (cardWidth + 24);
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollToPage = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container || totalDots <= 1) return;
    const { scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    const targetScroll = (maxScroll / (totalDots - 1)) * index;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
    setActiveDot(index);
  };

  const heading = (
    <>
      {/* Badge */}
      <div
        className={`inline-flex items-center gap-3 ${
          isCentered ? "justify-center" : "mb-3"
        }`}
      >
        <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
        <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
          {badge}
        </span>
      </div>

      {/* Title */}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight ${
          isCentered ? "mb-4" : "mb-3"
        }`}
      >
        {titleNormal}{" "}
        <span className="text-emerald-600">{titleHighlighted}</span>
      </h2>

      {/* Description */}
      <p
        className={`text-slate-600 text-base sm:text-lg leading-relaxed ${
          isCentered ? "mx-auto max-w-2xl" : "max-w-[400px]"
        }`}
      >
        {desc}
      </p>
    </>
  );

  const cards = (data?.testimonialItems as EducationTestimonialItem[]) || [];
  const scroller = (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className={
        isCentered
          ? "flex snap-x snap-mandatory overflow-x-auto sm:snap-none sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 scrollbar-none pb-4 pt-2 px-1 focus:outline-none"
          : "flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-2 px-1 focus:outline-none"
      }
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {cards.map((item, cardIndex) => (
        <ScrollReveal
          key={item.id}
          as="div"
          className={`bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col justify-between relative group ${
            isCentered
              ? "w-full shrink-0 snap-start sm:w-auto sm:shrink sm:snap-none"
              : "flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(50%-12px)] snap-start"
          }`}
          direction="up"
          distance={40}
          duration={0.65}
          delay={0.05}
          staggerChildren={0.08}
          index={cardIndex}
        >
          {/* Top Row: Avatar and Quote Icon */}
          <div className="flex items-center justify-between mb-6">
            <Image
              src={item.image}
              alt={item.name}
              width={64}
              height={64}
              sizes="64px"
              className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-emerald-500/20"
            />
            <Quote className="w-12 h-12 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors" />
          </div>

          {/* Quote text */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-0 flex-grow">
            &quot;{item.quote}&quot;
          </p>

          {/* Student Details */}
          <div className="border-t border-slate-100 pt-4 mt-auto">
            <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">{item.designation}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );

  const dots = (
    <div className="flex justify-center items-center gap-2 mt-6">
      {Array.from({ length: totalDots }).map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToPage(index)}
          aria-label={`Go to slide page ${index + 1}`}
          className={`transition-all duration-300 rounded-full ${
            activeDot === index
              ? "w-8 h-2.5 bg-emerald-600"
              : "swp-out w-2.5 h-2.5"
          }`}
          style={
            activeDot === index
              ? undefined
              : ({ "--swp-color": "#0d9488", "--swp-rest": "#cbd5e1" } as React.CSSProperties)
          }
        />
      ))}
    </div>
  );

  if (isCentered) {
    return (
      <section className={`py-8 md:py-12 bg-[#f8fafc] relative overflow-hidden ${className}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${contentClassName}`}>
          {/* Centered Heading */}
          <ScrollReveal
            as="div"
            className="text-center pb-2"
            direction="up"
            distance={40}
            duration={0.7}
          >
            {heading}
          </ScrollReveal>

          {/* 4x2 grid on desktop, 2 column grid on tablet, swipeable cards on mobile */}
          <div className="relative">
            {scroller}
            {/* Dots only matter on mobile where the cards stay in a scroller */}
            {totalDots > 1 && dots}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-8 md:py-12 bg-[#f8fafc] relative overflow-hidden ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${contentClassName}`}>
        
        {/* Main Grid: On mobile/tablet, cards appear FIRST (order-1), left section SECOND (order-2). On desktop, left section is on left and cards on right. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">
          
          {/* Right Side: Scrollable Testimonial Cards (Appears first on mobile/tablet) */}
          <ScrollReveal
            as="div"
            className="lg:col-span-7 order-2 relative"
            direction="right"
            mobileDirection="up"
            distance={60}
            duration={0.8}
          >
            {scroller}
            {dots}
          </ScrollReveal>

          {/* Left Side: Fixed Content & Slider Buttons (Appears below cards on mobile/tablet) */}
          <ScrollReveal
            as="div"
            className="lg:col-span-5 order-1 space-y-0"
            direction="left"
            mobileDirection="up"
            distance={60}
            duration={0.8}
            delay={0.1}
          >
            {heading}

            {/* Action Button & Carousel Slider Buttons */}
            <div className="pt-4 flex flex-wrap flex-col items-start gap-6">
              {showButton && (
                <a
                  href={button.href}
                  className="swp swp-teal-700 inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-teal-700/20"
                >
                  <span>{button.label}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              )}

              {/* Slider Arrows */}
              {showArrows && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => scrollByCard("left")}
                    aria-label="Previous slide"
                    className=" w-11 h-11 cursor-pointer hover:bg-teal-600 hover:text-white rounded-full text-slate-800 shadow-md flex items-center justify-center border border-slate-100"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollByCard("right")}
                    aria-label="Next slide"
                    className=" w-11 h-11 rounded-full cursor-pointer hover:bg-teal-600 hover:text-white  shadow-md flex items-center justify-center"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
