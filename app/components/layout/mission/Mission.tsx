import Image from "next/image";
import BannerPage from "@/app/components/shared/BannerPage";
import { site } from "@/data";
import { Eye } from "lucide-react";
import { PiMountainsLight } from "react-icons/pi";
import ScrollReveal from "../../shared/ScrollReveal";


const AQUA = "#19C2A1";

export default function Mission() {
  const missionData = site.mission
  const { banner, vision, mission } = missionData;

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Reusable Banner Page receiving props */}
      <BannerPage 
        title={banner.title} 
        home={banner.home} 
        current={banner.current} 
        bgImage={banner.bgImage} 
      />

      {/* First Section: Vision (Content Left, Image Right on Desktop / Content Top, Image Below on Mobile) */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-5">
          
          {/* Content Column */}
          <ScrollReveal
            as="div"
            className="w-full md:w-1/2 space-y-0"
            direction="left"
            mobileDirection="up"
            distance={60}
            duration={0.8}
          >
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
              <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
                {vision.badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl max-w-[400px] font-bold text-slate-900 my-3">
              {vision.title.normal}{" "}
              <span style={{ color: AQUA }}>{vision.title.highlighted}</span>
            </h2>

            <p className="text-slate-600 text-base max-w-[400px] ">
              {vision.desc}
            </p>
          </ScrollReveal>

          {/* Image Column with Floating Card */}
          <ScrollReveal
            as="div"
            className="w-full md:w-1/2 relative pb-10 sm:pb-8 lg:pb-0"
            direction="right"
            mobileDirection="up"
            distance={60}
            duration={0.8}
            delay={0.1}
          >
            <div className="relative lg:right-20 sm:right-10 rounded-3xl overflow-hidden shadow-lg h-[240px] w-full bg-slate-100">
              <Image
                src={vision.image}
                alt="Our Vision"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* Floating Info Card */}
            <div className="absolute hidden  top-20 -right-12 sm:-right-8 bg-white rounded-2xl p-5 shadow-xl border border-slate-100 sm:flex  gap-4 max-w-[250px]">
              <div className="w-12 md:w-14 md:h-14 h-12 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 text-white">
                <Eye className="w-6 md:h-8 md:w-8 h-6" />
              </div>
              <p className="text-sm  font-bold text-slate-800 leading-snug">
                &ldquo;{vision.quote}&rdquo;
              </p>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Second Section: Mission (Image Left, Content Right on Desktop / Content Top, Image Below on Mobile) */}
      <section className="pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50">
        <div className="flex flex-col md:flex-row-reverse gap-12 ">
          
          {/* Content Column */}
          <ScrollReveal
            as="div"
            className="w-full  md:w-1/2 space-y-0"
            direction="right"
            mobileDirection="up"
            distance={60}
            duration={0.8}
          >
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
              <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
                {mission.badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl max-w-[400px] py-3 font-bold text-slate-900 ">
              {mission.title.normal}{" "}
              <span style={{ color: AQUA }}>{mission.title.highlighted}</span>
            </h2>

            <p className="text-slate-600 max-w-[400px] text-base">
              {mission.desc}
            </p>
          </ScrollReveal>

          {/* Image Column with Floating Card */}
          <ScrollReveal
            as="div"
            className="w-full md:w-1/2 relative pb-10 sm:pb-8 lg:pb-0"
            direction="left"
            mobileDirection="up"
            distance={60}
            duration={0.8}
            delay={0.1}
          >
            <div className="relative lg:ml-10 rounded-3xl overflow-hidden shadow-lg h-[240px] w-full lg:w-[90%] bg-slate-100">
              <Image
                src={mission.image}
                alt="Our Mission"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* Floating Info Card */}
            <div className="absolute top-20 hidden -left-12 sm:-left-8 bg-white rounded-2xl p-5 shadow-xl border border-slate-100 sm:flex  gap-4 max-w-[250px]">
              <div className="w-12 md:w-14 md:h-14 h-12 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 text-white">
                <PiMountainsLight className="w-6 md:h-8 md:w-8 h-6" />
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                &ldquo;{mission.quote}&rdquo;
              </p>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </main>
  );
}