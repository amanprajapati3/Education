"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BannerPage from "../../shared/BannerPage";
import { site, EducationFacultyItem } from "@/data";
import { Share2, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import ScrollReveal from "../../shared/ScrollReveal";

const AQUA = "#19C2A1";

export default function Faculty() {
  const facultyData = site.faculty;
  const { banner, badge, title, desc, facultyItems, carousel } = facultyData;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(carousel.activeDot || 0);
  const totalDots = carousel.totalDots || 3;

  const [shareTarget, setShareTarget] = useState<EducationFacultyItem | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [shareText, setShareText] = useState("");

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const fraction = scrollLeft / maxScroll;
        const current = Math.min(totalDots - 1, Math.floor(fraction * totalDots + 0.05));
        setActiveDot(current);
      }
    }
  };

  const scrollToPage = (index: number) => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const target = (maxScroll / (totalDots - 1)) * index;
      scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
      setActiveDot(index);
    }
  };

  const scrollByCard = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector("article")?.clientWidth || 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -(cardWidth + 24) : cardWidth + 24,
        behavior: "smooth",
      });
    }
  };

  const openShare = (member: EducationFacultyItem) => {
    setShareUrl(`${window.location.origin}/faculty/${member.slug}`);
    setShareText(`${member.name} - ${member.designation} at Edusity`);
    setShareTarget(member);
  };

  const closeShare = () => setShareTarget(null);

  // Escape to dismiss, and stop the page behind the modal from scrolling.
  useEffect(() => {
    if (!shareTarget) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeShare();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [shareTarget]);

  const shareLinks = shareTarget
    ? [
        {
          name: "WhatsApp",
          icon: <FaWhatsapp className="w-6 h-6" />,
          color: "#25D366",
          href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
        },
        {
          name: "Facebook",
          icon: <FaFacebookF className="w-6 h-6" />,
          color: "#1877F2",
          href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        },
        {
          name: "Instagram",
          icon: <FaInstagram className="w-6 h-6" />,
          color: "#E4405F",
          // Instagram has no public web share intent, so it opens the network.
          href: "https://www.instagram.com/",
        },
        {
          name: "Twitter",
          icon: <FaXTwitter className="w-6 h-6" />,
          color: "#0A2540",
          href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
        },
      ]
    : [];

  return (
    <main className="min-h-screen bg-slate-50/40  overflow-hidden">
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
          className="flex justify-center mb-8 gap-6 text-center "
          direction="up"
          distance={40}
          duration={0.7}
        >
          <div className="max-w-2xl mx-auto md:mx-0 ">
            <div className="inline-flex items-center justify-center gap-3 w-full">
              <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
              <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
                {badge}
              </span>
              <span className="w-8 h-0.5 bg-emerald-500 inline-block md:hidden"></span>
            </div>

            <h2 className="text-3xl mb-3 sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              {title.normal}{" "}
              <span style={{ color: AQUA }}>{title.highlighted}</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {desc}
            </p>
          </div>


        </ScrollReveal>

        {/* Faculty Cards Container: Horizontal Scroll on Mobile, Grid on Desktop */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-none pb-6 pt-2  focus:outline-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {facultyItems.map((member, memberIndex) => (
            <ScrollReveal
              key={member.id}
              as="article"
              className="flex-shrink-0 w-[82vw] sm:w-[calc(50%-12px)] lg:w-full snap-start bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col justify-between group"
              direction="up"
              distance={40}
              duration={0.65}
              delay={0.05}
              staggerChildren={0.08}
              index={memberIndex}
            >
              <div>
                {/* Image and Share Button Overlay */}
                <div className="relative rounded-2xl h-[300px] sm:h-[340px] w-full bg-slate-100 mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1280px) 292px, (min-width: 1024px) calc((100vw - 112px) / 4), (min-width: 640px) calc(50vw - 36px), 82vw"
                    className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Share button badge */}
                  <button
                    aria-label={`Share ${member.name}`}
                    onClick={() => openShare(member)}
                    className="swp swp-blue-950 swp-abs -bottom-6 right-2 border-4 border-white w-11 h-11 rounded-full text-white flex items-center justify-center shadow-lg cursor-pointer"
                  >
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>

                {/* Faculty Details */}
                <div className="space-y-2 px-1">
                  <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase block">
                    {member.designation}
                  </span>
                  
                  <Link href={`/faculty/${member.slug}`}>
                    <h3 className="text-xl font-bold text-slate-900 hover:text-emerald-600 transition-colors">
                      {member.name}
                    </h3>
                  </Link>

                  {/* Divider line under designation/name */}
                  <div className="w-8 h-0.5 bg-emerald-400 my-2"></div>

                  <p className="text-slate-600 text-base  pt-1">
                    {member.quote}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Carousel Pagination Dots (Mobile Only) */}
        {carousel.hasDots && (
          <div className="flex lg:hidden justify-center items-center gap-2 mt-6">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToPage(index)}
                aria-label={`Go to slide ${index + 1}`}
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
      </section>

      {/* Share Modal */}
      {shareTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop: click to dismiss */}
          <div
            onClick={closeShare}
            aria-hidden="true"
            className="absolute inset-0 bg-[#0A2540]/60 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-title"
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 sm:p-10"
          >
            {/* Cross button */}
            <button
              onClick={closeShare}
              aria-label="Close share dialog"
              className="swp-gray-100 swp-out swp-abs top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pr-10">
              <h3 id="share-title" className="text-2xl font-bold text-slate-900">
                Share {shareTarget.name}
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                {shareTarget.designation}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="swp text-white rounded-2xl py-5 flex flex-col items-center justify-center gap-2 shadow-sm cursor-pointer"
                  style={{ "--swp-color": link.color } as React.CSSProperties}
                >
                  {link.icon}
                  <span className="text-xs font-bold">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}