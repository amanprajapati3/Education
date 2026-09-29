"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import BannerPage from "../../shared/BannerPage";
import { site } from "@/data";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const AQUA = "#19C2A1";

export default function News() {
  const newsData = site.news;
  const { banner, badge, title, desc, newsItems } = newsData;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Shows 6 items per page matching design rows

  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return newsItems.slice(start, start + itemsPerPage);
  }, [newsItems, currentPage]);

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
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-0">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
            <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
              {badge}
            </span>
            <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
          </div>

          <h2 className="text-3xl pt-2 pb-3 sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            {title.normal}{" "}
            <span style={{ color: AQUA }}>{title.highlighted}</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {desc}
          </p>
        </div>

        {/* News Items List / Cards */}
        <div className="space-y-6 mb-10">
          {paginatedNews.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-6"
            >
              {/* Left: Date Badge / Numbering (Left-aligned on mobile/tablet and desktop) */}
              <div className="flex items-center gap-4 w-full lg:w-auto shrink-0">
                <div className="bg-blue-100 text-slate-900 rounded-2xl px-4 py-3 text-center shadow-inner min-w-[90px]">
                  <span className="block text-3xl md:text-4xl font-bold leading-none text-[#073869]">
                    {item.date.day}
                  </span>
                  <span className="block text-[14px] font-bold tracking-widest uppercase mt-1 text-slate-500">
                    {item.date.month}
                  </span>
                </div>
              </div>

              {/* Middle: Content (Centered on mobile/tablet, left-aligned on desktop) */}
              <div className="flex-1 text-center lg:text-left space-y-2">
                <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white uppercase tracking-wider mb-1">
                  {item.category}
                </span>

                <Link href={`/news/${item.slug}`}>
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-900 hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                </Link>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {item.desc}
                </p>
              </div>

              {/* Right: Read More Link */}
              <div className="w-full lg:w-auto flex justify-center lg:justify-end shrink-0 pt-0 lg:pt-0">
                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex text-blue-900 hover:text-blue-600 items-center gap-2 text-base font-bold transition-opacity hover:opacity-80"
                  
                >
                  <span>Read More</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </article>
          ))}
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