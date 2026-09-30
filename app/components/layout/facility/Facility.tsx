"use client";

import React from "react";
import Image from "next/image";
import BannerPage from "../../shared/BannerPage";
import { site, EducationFacilityIcon } from "@/data";
import { 
  Users, 
  Monitor, 
  BookOpen, 
  FlaskConical, 
  Activity, 
  Utensils, 
  Home as HomeIcon, 
  Bus 
} from "lucide-react";
import ScrollReveal from "../../shared/ScrollReveal";

const AQUA = "#19C2A1";

// Icon mapping helper. Keyed by EducationFacilityIcon so a new icon added to
// that union has to be handled here.
const iconMap: Record<EducationFacilityIcon, React.ReactNode> = {
  Users: <Users className="w-6 md:w-8 md:h-8 h-6 text-blue-950"  />,
  Monitor: <Monitor className="w-6 md:w-8 md:h-8 h-6 text-blue-950" />,
  BookOpen: <BookOpen className="w-6 md:w-8 md:h-8 h-6 text-blue-950" />,
  FlaskConical: <FlaskConical className="w-6 md:w-8 md:h-8 h-6 text-blue-950" />,
  Activity: <Activity className="w-6 md:w-8 md:h-8 h-6 text-blue-950" />,
  Utensils: <Utensils className="w-6 md:w-8 md:h-8 h-6 text-blue-950" />,
  Home: <HomeIcon className="w-6 md:w-8 md:h-8 h-6 text-blue-950" />,
  Bus: <Bus className="w-6 md:w-8 md:h-8 h-6 text-blue-950" />,
};

export default function Facility() {
  const facilityData = site.facility;
  const { banner, badge, title, desc, facilityItems } = facilityData;

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
          className="text-center max-w-3xl mx-auto mb-8 space-y-0"
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

          <h2 className="text-3xl sm:text-4xl pt-2 pb-3 lg:text-6xl font-bold text-blue-950 tracking-tight">
            {title.normal}{" "}
            <span style={{ color: AQUA }}>{title.highlighted}</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {desc}
          </p>
        </ScrollReveal>

        {/* Facilities Grid (3x3 on desktop, 2x2 on tablet, 1 col on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {facilityItems.map((item, itemIndex) => (
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
                {/* Image Container */}
                <div className="relative h-[220px] sm:h-[240px] w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 392px, (min-width: 1024px) calc((100vw - 104px) / 3), (min-width: 640px) calc((100vw - 68px) / 2), calc(100vw - 32px)"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Area */}
                <div className="p-4 space-y-2 ">
                  {/* Icon & Title Row matching image layout */}
                  <div className="flex  gap-4">
                    <div className="w-12 md:w-14 md:h-14 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                      {iconMap[item.icon as EducationFacilityIcon] || (
                        <Users className="w-6 h-6" style={{ color: AQUA }} />
                      )}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-blue-900 leading-snug">
                      {item.title}
                    </h3>
                        {/* Description */}
                  <p className="text-slate-600 text-sm pt-3 md:text-[15px] leading-relaxed">
                    {item.desc}
                  </p>
                    </div>
                    
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}