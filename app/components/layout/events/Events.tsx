"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import BannerPage from "../../shared/BannerPage";
import { site } from "@/data";
import { Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "../../shared/ScrollReveal";

const AQUA = "#19C2A1";

export default function Event() {
  const eventData = site.events;
  const { banner, badge, title, desc, categories, eventItems } = eventData;

  const [activeCategory, setActiveCategory] = useState("All Events");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid layout

  // Filter events based on selected category
  const filteredEvents = useMemo(() => {
    if (activeCategory === "All Events") {
      return eventItems;
    }
    return eventItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, eventItems]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(start, start + itemsPerPage);
  }, [filteredEvents, currentPage]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  return (
    <main className="min-h-screen bg-slate-50/40 overflow-hidden">
      {/* Reusable Banner Page */}
      <BannerPage
        title={banner.title}
        home={banner.home}
        current={banner.current}
        bgImage={banner.bgImage}
      />

      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <ScrollReveal
          as="div"
          className="text-center max-w-3xl mx-auto mb-5 "
          direction="up"
          distance={40}
          duration={0.7}
        >
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
            <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
              {badge}
            </span>
            <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
          </div>

          <h2 className="text-3xl pb-3 pt-2 sm:text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight">
            {title.normal}{" "}
            <span style={{ color: AQUA }}>{title.highlighted}</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {desc}
          </p>
        </ScrollReveal>

        {/* Filter Section */}
        <ScrollReveal
          as="div"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8"
          direction="up"
          distance={30}
          duration={0.6}
          delay={0.1}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer shadow-sm ${
                  isActive
                    ? "text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
                style={isActive ? { backgroundColor: AQUA } : {}}
              >
                {category}
              </button>
            );
          })}
        </ScrollReveal>

        {/* Events Grid (3x3 on desktop, 2x2/responsive on tablet, 1 col on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {paginatedEvents.length > 0 ? (
            paginatedEvents.map((item, itemIndex) => (
              <ScrollReveal
                key={item.id}
                as="article"
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col justify-between group"
                direction="up"
                distance={40}
                duration={0.65}
                delay={0.05}
                staggerChildren={0.08}
                index={itemIndex}
              >
                <div>
                  {/* Image Container with Date Badge */}
                  <div className="relative h-[220px]  w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1280px) 395px, (min-width: 1024px) calc((100vw - 96px) / 3), (min-width: 640px) calc((100vw - 64px) / 2), calc(100vw - 32px)"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Date Tag Overlay (Top-Left) */}
                    <div className="absolute bottom-0 left-4 bg-gradient-to-b from-[#0779eb] via-[#0779eb] to-emerald-600 text-white rounded-xl px-6 py-4 text-center shadow-lg">
                      <span className="block text-3xl font-bold leading-none">
                        {item.date.day}
                      </span>
                      <span className="block text-[16px] font-bold tracking-widest uppercase mt-0.5 text-white" >
                        {item.date.month}
                      </span>
                      <span className="block text-[14px] font-bold text-white/70">
                        {item.date.year}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="py-2 px-5 rounded-xl space-y-1">
                    {/* Category Tag */}
                    <span className="text-sm bg-blue-100 rounded-2xl p-2 w-fit font-bold text-blue-600 tracking-wider  block">
                      {item.category}
                    </span>

                    {/* Event Title */}
                    <Link href={`/events/${item.slug}`}>
                      <h3 className="text-xl min-h-14 font-bold text-blue-800 hover:text-blue-900 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className="text-slate-600 text-base leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>

                    {/* Time & Location Meta */}
                    <div className="space-y-2.5 pt-2 border-slate-100 flex flex-col sm:flex-row sm:justify-between justify-start text-xs sm:text-sm font-medium text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 shrink-0 text-[#085c83]" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex sm:-mt-2 items-center gap-2">
                        <MapPin className="w-5 h-5 shrink-0 text-[#085c83]" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Read More Footer */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/events/${item.slug}`}
                    className="inline-flex text-[#085c83] items-center gap-2 text-sm font-bold transition-colors hover:opacity-80"
                    
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-slate-500 font-medium">
              No events found for this category.
            </div>
          )}
        </div>

        {/* Dynamic Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              const isActive = currentPage === pageNumber;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  aria-label={`Page ${pageNumber}`}
                  className={`w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer shadow-sm ${
                    isActive
                      ? "text-white shadow-md"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                  style={isActive ? { backgroundColor: AQUA } : {}}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}