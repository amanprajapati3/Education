"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  site,
  SectionProps,
  EducationGalleryData,
  EducationGalleryImageItem,
  EducationGalleryVideoItem,
  EducationGalleryFilter,
  EducationGallerySortOption,
} from "@/data";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Play,
  X,
} from "lucide-react";
import Image from "next/image";
import BannerPage from "../../shared/BannerPage";
import ScrollReveal from "../../shared/ScrollReveal";

type GalleryProps = SectionProps<EducationGalleryData>;

// Stable empty fallbacks so the memoized lists below keep a constant identity
const NO_IMAGES: EducationGalleryImageItem[] = [];
const NO_VIDEOS: EducationGalleryVideoItem[] = [];

/**
 * Tracks how many pages the horizontal mobile/tablet scroller is split into
 * so the dot indicators always match the real scroll width.
 */
function useSnapDots(
  scrollerRef: React.RefObject<HTMLDivElement | null>,
  itemCount: number,
) {
  const [activeDot, setActiveDot] = useState(0);
  const [totalDots, setTotalDots] = useState(1);

  const measure = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const pages = Math.max(
      1,
      Math.ceil(scroller.scrollWidth / scroller.clientWidth),
    );
    setTotalDots(pages);
    setActiveDot((current) => Math.min(current, pages - 1));
  }, [scrollerRef]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const frame = requestAnimationFrame(measure);
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measure);
    observer?.observe(scroller);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [measure, itemCount, scrollerRef]);

  const handleScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const { scrollLeft, scrollWidth, clientWidth } = scroller;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setActiveDot(0);
      return;
    }
    setActiveDot(
      Math.min(
        totalDots - 1,
        Math.max(0, Math.floor((scrollLeft / maxScroll) * totalDots + 0.05)),
      ),
    );
  }, [scrollerRef, totalDots]);

  const scrollToPage = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current;
      if (!scroller || totalDots <= 1) return;
      const { scrollWidth, clientWidth } = scroller;
      const target = ((scrollWidth - clientWidth) / (totalDots - 1)) * index;
      scroller.scrollTo({ left: target, behavior: "smooth" });
      setActiveDot(index);
    },
    [scrollerRef, totalDots],
  );

  return { activeDot, totalDots, handleScroll, scrollToPage };
}

function SnapDots({
  activeDot,
  totalDots,
  onSelect,
}: {
  activeDot: number;
  totalDots: number;
  onSelect: (index: number) => void;
}) {
  if (totalDots <= 1) return null;

  return (
    <div className="flex lg:hidden justify-center items-center gap-2 mt-6">
      {Array.from({ length: totalDots }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          aria-label={`Go to slide page ${index + 1}`}
          className={`transition-all duration-300 rounded-full ${
            activeDot === index
              ? "w-8 h-2.5 bg-emerald-600"
              : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
          }`}
        />
      ))}
    </div>
  );
}

function LoadMoreButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div className="hidden lg:flex justify-center mt-8 md:mt-10">
      <button
        onClick={onClick}
        className="inline-flex items-center cursor-pointer justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-teal-700/20 transition-all transform hover:-translate-y-0.5"
      >
        <span>{label}</span>
        {icon}
      </button>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="w-full py-16 text-center text-slate-500 text-base">
      {text}
    </div>
  );
}

export default function Gallery({
  data = site.gallery,
  className = "",
  contentClassName = "",
}: GalleryProps) {
  const banner = data?.banner;
  const controls = data?.controls;

  const images =
    (data?.images as EducationGalleryImageItem[] | undefined) ?? NO_IMAGES;
  const videos =
    (data?.videos as EducationGalleryVideoItem[] | undefined) ?? NO_VIDEOS;
  const filters =
    (data?.imageGallery?.filters as EducationGalleryFilter[]) || [];
  const sortOptions =
    (data?.videoGallery?.sortOptions as EducationGallerySortOption[]) || [];

  const imageLimit = data?.imageGallery?.visibleCount ?? 8;
  const videoLimit = data?.videoGallery?.visibleCount ?? 8;

  /*  image gallery  */
  const [activeFilter, setActiveFilter] = useState(filters[0]?.id ?? "all");
  const [imagesExpanded, setImagesExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const imageScrollerRef = useRef<HTMLDivElement>(null);

  const filteredImages = useMemo(
    () =>
      activeFilter === "all"
        ? images
        : images.filter((item) => item.category === activeFilter),
    [activeFilter, images],
  );

  const visibleImages = imagesExpanded
    ? filteredImages
    : filteredImages.slice(0, imageLimit);

  const imageDots = useSnapDots(imageScrollerRef, visibleImages.length);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setImagesExpanded(false);
    setLightboxIndex(null);
    imageScrollerRef.current?.scrollTo({ left: 0 });
  };

  /*  video gallery  */
  const [sortOrder, setSortOrder] =
    useState<EducationGallerySortOption["id"]>("desc");
  const [videosExpanded, setVideosExpanded] = useState(false);
  const [videoIndex, setVideoIndex] = useState<number | null>(null);

  const videoScrollerRef = useRef<HTMLDivElement>(null);

  const sortedVideos = useMemo(
    () =>
      [...videos].sort((a, b) =>
        sortOrder === "asc"
          ? a.publishedAt.localeCompare(b.publishedAt)
          : b.publishedAt.localeCompare(a.publishedAt),
      ),
    [sortOrder, videos],
  );

  const visibleVideos = videosExpanded
    ? sortedVideos
    : sortedVideos.slice(0, videoLimit);

  const videoDots = useSnapDots(videoScrollerRef, visibleVideos.length);

  const handleSortChange = (order: EducationGallerySortOption["id"]) => {
    setSortOrder(order);
    setVideosExpanded(false);
    setVideoIndex(null);
    videoScrollerRef.current?.scrollTo({ left: 0 });
  };

  /*  lightbox  */
  const activeImage =
    lightboxIndex === null ? null : (visibleImages[lightboxIndex] ?? null);
  const activeVideo =
    videoIndex === null ? null : (visibleVideos[videoIndex] ?? null);

  const isLightboxOpen = lightboxIndex !== null || videoIndex !== null;

  // Lock background scrolling while a lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isLightboxOpen]);

  const stepImage = useCallback(
    (direction: "prev" | "next") => {
      setLightboxIndex((current) => {
        if (current === null || visibleImages.length === 0) return current;
        const offset = direction === "next" ? 1 : -1;
        return (current + offset + visibleImages.length) % visibleImages.length;
      });
    },
    [visibleImages.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") stepImage("next");
      if (event.key === "ArrowLeft") stepImage("prev");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, stepImage]);

  useEffect(() => {
    if (videoIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVideoIndex(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [videoIndex]);

  const counterText = (index: number | null, total: number) =>
    (controls?.counterTemplate || "{current} of {total}")
      .replace("{current}", String((index ?? 0) + 1))
      .replace("{total}", String(total));

  /*  render  */
  const imageHeading = (
    <>
      <div className="inline-flex items-center gap-3 lg:justify-start justify-center">
        <span className="w-8 h-0.5 bg-blue-500 inline-block"></span>
        <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">
          {data?.imageGallery?.badge || "Photo Gallery"}
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight mt-3">
        {data?.imageGallery?.title?.normal}{" "}
        <span className="text-blue-600">
          {data?.imageGallery?.title?.highlighted}
        </span>
      </h2>

      {/* <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-3 max-w-[520px] mx-auto lg:mx-0">
        {data?.imageGallery?.desc}
      </p> */}
    </>
  );

  const imageControls = (
    <div className="flex flex-wrap justify-center lg:justify-end items-center gap-2.5">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => handleFilterChange(filter.id)}
            className={`px-4 py-2.5 cursor-pointer rounded-xl text-sm font-semibold transition-all duration-300 border ${
              isActive
                ? "bg-blue-800 text-white border-blue-700 shadow-md shadow-teal-700/20"
                : "bg-white text-slate-600 border-slate-200 hover:border-blue-600 hover:text-blue-700"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );

  const videoHeading = (
    <>
      <div className="inline-flex items-center gap-3 lg:justify-start justify-center">
        <span className="w-8 h-0.5 bg-blue-500 inline-block"></span>
        <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">
          {data?.videoGallery?.badge || "Video Gallery"}
        </span>
      </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mt-3">
          {data?.videoGallery?.title?.normal}{" "}
          <span className="text-blue-600">
            {data?.videoGallery?.title?.highlighted}
          </span>
        </h2>
    </>
  );

  const videoControls = (
    <div className="flex flex-wrap justify-center lg:justify-end items-center gap-2.5">
      <span className="text-sm font-semibold text-slate-500 mr-1">
        {data?.videoGallery?.sortLabel || "Sort"}
      </span>
      {sortOptions.map((option) => {
        const isActive = sortOrder === option.id;
        return (
          <button
            key={option.id}
            onClick={() => handleSortChange(option.id)}
            className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
              isActive
                ? "bg-teal-700 text-white border-teal-700 shadow-md shadow-teal-700/20"
                : "bg-white text-slate-600 border-slate-200 hover:border-teal-600 hover:text-teal-700"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      <BannerPage
        title={banner?.title || "Gallery"}
        home={banner?.home || "Home"}
        current={banner?.current || "Gallery"}
        bgImage={banner?.bgImage}
      />

      <section className={`relative overflow-hidden ${className}`}>
        {/* Soft background rings, matching the rest of the template */}
        <div className="absolute -top-32 -left-32 w-[380px] h-[380px] rounded-full border-[24px] border-emerald-500/10 pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full border-[28px] border-emerald-500/10 pointer-events-none" />

        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${contentClassName}`}
        >
          {/*  IMAGE GALLERY  */}
          <div className="pt-10 md:pt-14">
            {/* Desktop: heading left, filters right. Mobile/tablet: heading centered, filters below. */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
              <ScrollReveal
                as="div"
                className="lg:col-span-5 text-center lg:text-left"
                direction="left"
                mobileDirection="up"
                distance={40}
                duration={0.7}
              >
                {imageHeading}
              </ScrollReveal>
              <ScrollReveal
                as="div"
                className="lg:col-span-7"
                direction="right"
                mobileDirection="up"
                distance={40}
                duration={0.7}
                delay={0.1}
              >
                {imageControls}
              </ScrollReveal>
            </div>

            {visibleImages.length === 0 ? (
              <EmptyState
                text={data?.imageGallery?.emptyText || "No photos found."}
              />
            ) : (
              <>
                {/* Mobile/tablet: swipeable row | Desktop: 4 column grid */}
                <div
                  ref={imageScrollerRef}
                  onScroll={imageDots.handleScroll}
                  className="mt-8 flex lg:grid lg:grid-cols-4 gap-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-none pb-4 pt-2 px-1 focus:outline-none"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {visibleImages.map((item, index) => (
                    <ScrollReveal
                      key={item.id}
                      as="button"
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className="group relative shrink-0 w-[78vw] sm:w-[46vw] lg:w-full snap-start block text-left bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
                      direction="up"
                      distance={34}
                      duration={0.6}
                      delay={0.04}
                      staggerChildren={0.06}
                      index={index}
                    >
                      <div className="relative h-56 sm:h-60 lg:h-52 w-full overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          loading="lazy"
                          sizes="(min-width: 1280px) 295px, (min-width: 1024px) calc((100vw - 100px) / 4), (min-width: 640px) 46vw, 78vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <span className="w-10 h-10 rounded-full bg-white/95 text-teal-700 flex items-center justify-center shadow-lg mb-2 self-start">
                            <Maximize2 className="w-4 h-4" />
                          </span>
                          <h3 className="text-white font-bold text-base leading-snug">
                            {item.title}
                          </h3>
                        </div>

                        {/* Always visible category chip */}
                        {/* <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-teal-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {filters.find((f) => f.id === item.category)?.label ||
                            item.category}
                        </span> */}
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                <SnapDots
                  activeDot={imageDots.activeDot}
                  totalDots={imageDots.totalDots}
                  onSelect={imageDots.scrollToPage}
                />
              </>
            )}

            {filteredImages.length > imageLimit && (
              <LoadMoreButton
                label={
                  imagesExpanded
                    ? data?.imageGallery?.loadLessLabel || "Load Less"
                    : data?.imageGallery?.loadMoreLabel || "Load More"
                }
                icon={
                  imagesExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )
                }
                onClick={() => setImagesExpanded((current) => !current)}
              />
            )}
          </div>

          {/*  VIDEO GALLERY  */}
          <div className="pt-10  pb-12 md:pb-16">
            {/* Desktop: heading left, sort right. Mobile/tablet: heading centered, sort below. */}
            <div className="flex lg:justify-between justify-center flex-col lg:flex-row">
              <ScrollReveal
                as="div"
                className="lg:col-span-5 text-center  lg:text-left"
                direction="left"
                mobileDirection="up"
                distance={40}
                duration={0.7}
              >
                {videoHeading}
              </ScrollReveal>
              <ScrollReveal
                as="p"
                className="text-slate-600 text-base leading-relaxed text-center lg:text-start mt-3 max-w-[520px] mx-auto lg:mx-0"
                direction="right"
                mobileDirection="up"
                distance={40}
                duration={0.7}
                delay={0.1}
              >
                {data?.videoGallery?.desc}
              </ScrollReveal>{" "}
            </div>

            {visibleVideos.length === 0 ? (
              <EmptyState
                text={data?.videoGallery?.emptyText || "No videos found."}
              />
            ) : (
              <>
                {/* Mobile/tablet: swipeable row | Desktop: 4 column grid */}
                <div
                  ref={videoScrollerRef}
                  onScroll={videoDots.handleScroll}
                  className="mt-8 flex lg:grid lg:grid-cols-4 gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-none pb-4 pt-2 px-1 focus:outline-none"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {visibleVideos.map((item, index) => (
                    <ScrollReveal
                      key={item.id}
                      as="button"
                      type="button"
                      onClick={() => setVideoIndex(index)}
                      className="group relative shrink-0 w-[78vw] sm:w-[46vw] lg:w-full snap-start block text-left bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
                      direction="up"
                      distance={34}
                      duration={0.6}
                      delay={0.04}
                      staggerChildren={0.06}
                      index={index}
                    >
                      <div className="relative cursor-pointer h-56 sm:h-60 lg:h-52 w-full overflow-hidden">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          loading="lazy"
                          sizes="(min-width: 1280px) 295px, (min-width: 1024px) calc((100vw - 100px) / 4), (min-width: 640px) 46vw, 78vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Hover overlay with play button */}
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <span className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-lg mb-2 self-start group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-5 h-5 ml-0.5" />
                          </span>
                          <h3 className="text-white font-bold text-base leading-snug">
                            {item.title}
                          </h3>
                        </div> */}

                        {/* Always visible play icon + duration */}
                        <span className="absolute cursor-pointer inset-0 m-auto w-14 h-14 rounded-full bg-white/90 backdrop-blur-md text-blue-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-6 h-6 ml-0.5" />
                        </span>
                        {item.duration && (
                          <span className="absolute bottom-3 right-3 bg-slate-900/85 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                            {item.duration}
                          </span>
                        )}
                      </div>

                      {/* Caption bar, visible on every breakpoint */}
                      <div className="bg-white px-4 py-3">
                        <h3 className="text-sm  min-h-10 font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-800 mt-1">
                          {/* {item.publishedAt} */} {item.description}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                <SnapDots
                  activeDot={videoDots.activeDot}
                  totalDots={videoDots.totalDots}
                  onSelect={videoDots.scrollToPage}
                />
              </>
            )}

            {sortedVideos.length > videoLimit && (
              <LoadMoreButton
                label={
                  videosExpanded
                    ? data?.videoGallery?.loadLessLabel || "Load Less"
                    : data?.videoGallery?.loadMoreLabel || "Load More"
                }
                icon={
                  videosExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )
                }
                onClick={() => setVideosExpanded((current) => !current)}
              />
            )}
          </div>
        </div>
      </section>

      {/*  IMAGE LIGHTBOX  */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label={controls?.closeLabel || "Close"}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Slider arrows */}
          <button
            onClick={(event) => {
              event.stopPropagation();
              stepImage("prev");
            }}
            aria-label={controls?.prevLabel || "Previous"}
            className="absolute left-2 sm:left-6 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-teal-700 text-white flex items-center justify-center transition-all border border-white/20 z-10"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              stepImage("next");
            }}
            aria-label={controls?.nextLabel || "Next"}
            className="absolute right-2 sm:right-6 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-teal-700 text-white flex items-center justify-center transition-all border border-white/20 z-10"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Selected image */}
          <figure
            onClick={(event) => event.stopPropagation()}
            className="max-w-5xl w-full flex flex-col items-center gap-4"
          >
            <div className="relative h-[72vh] w-full max-w-5xl">
              <Image
                src={activeImage.image}
                alt={activeImage.title}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-contain rounded-2xl shadow-2xl"
              />
            </div>
            <figcaption className="text-center text-white space-y-1">
              <p className="font-bold text-lg sm:text-xl">
                {activeImage.title}
              </p>
              <p className="text-white/70 text-sm max-w-xl">
                {activeImage.description}
              </p>
              <p className="text-teal-400 text-xs font-semibold tracking-widest uppercase pt-1">
                {counterText(lightboxIndex, visibleImages.length)}
              </p>
            </figcaption>
          </figure>
        </div>
      )}

      {/*  VIDEO LIGHTBOX  */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          onClick={() => setVideoIndex(null)}
          className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={() => setVideoIndex(null)}
            aria-label={controls?.closeLabel || "Close"}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          <figure
            onClick={(event) => event.stopPropagation()}
            className="max-w-5xl w-full flex flex-col items-center gap-4"
          >
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
              <iframe
                key={activeVideo.id}
                src={`${activeVideo.videoUrl}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <figcaption className="text-center text-white space-y-1">
              <p className="font-bold text-lg sm:text-xl">
                {activeVideo.title}
              </p>
              <p className="text-white/70 text-sm max-w-xl">
                {activeVideo.description}
              </p>
              <p className="text-teal-400 text-xs font-semibold tracking-widest uppercase pt-1">
                {counterText(videoIndex, visibleVideos.length)}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
