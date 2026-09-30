"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  ChartNoAxesColumn,
  Check,
  ChevronDown,
  CircleHelp,
  CirclePlay,
  Clock3,
  FileText,
  GraduationCap,
  Heart,
  Languages,
  MonitorPlay,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
  X,
} from "lucide-react";
import BannerPage from "@/app/components/shared/BannerPage";
import SocialLinks from "@/app/components/shared/SocialLinks";
import type {
  EducationCourseDetail,
  EducationCourseDetailPageData,
  EducationCourseItem,
} from "@/data";

type CourseDetailProps = {
  course: EducationCourseItem;
  detail: EducationCourseDetail;
  banner: EducationCourseDetailPageData["banner"];
  instructor: EducationCourseDetailPageData["instructor"];
  includes: EducationCourseDetailPageData["includes"];
  help: EducationCourseDetailPageData["help"];
  promo: EducationCourseDetailPageData["promo"];
};

const benefitItems = [
  { label: "Hands-on Projects", Icon: BriefcaseBusiness },
  { label: "Lifetime Access", Icon: CirclePlay },
  { label: "Certificate of Completion", Icon: Award },
  { label: "Job-ready Skills", Icon: GraduationCap },
];

export default function CourseDetail({
  course,
  detail,
  banner,
  instructor,
  includes,
  help,
  promo,
}: CourseDetailProps) {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const discount = Math.max(
    0,
    Math.round(
      (1 -
        Number(course.price.replace(/[^\d.]/g, "")) /
          Number(course.oldPrice.replace(/[^\d.]/g, ""))) *
        100,
    ),
  );

  return (
    <>
      <BannerPage
        title={banner.title}
        home={banner.home}
        crumbs={[{ label: "Courses", href: "/courses" }]}
        current={course.title}
        bgImage={banner.bgImage}
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1300px] grid-cols-1 items-start gap-8 px-4 py-8 md:py-12 sm:px-6 sm:py-11 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-9 lg:px-7">
          <main className="min-w-0 ">
            <header className="border-b border-slate-200 pb-6">
              <span className="inline-flex rounded-md bg-[#d9f7f0] px-3 py-1 text-sm font-bold text-[#079b82]">
                {course.category}
              </span>
              <h2 className="mt-2 text-[27px] font-bold leading-tight text-[#0b3158] sm:text-[40px]">
                {course.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm md:text-base leading-6 text-slate-600">
                {course.description} {detail.about}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-slate-600 sm:text-base">
                <span className="inline-flex items-center gap-2"><ChartNoAxesColumn className="h-6 w-6 text-[#0b3158]" />{detail.level}</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="h-6 w-6 text-[#0b3158]" />{course.duration}</span>
                <span className="inline-flex items-center gap-2"><UsersRound className="h-6 w-6 text-[#0b3158]" />{course.studentsLabel}</span>
              </div>
            </header>

            <section className="pt-5">
              <h3 className="text-xl lg:text-2xl font-bold text-[#0b3158]">About This Course</h3>
              <p className="mt-1 text-sm md:text-base leading-6 text-slate-600">{detail.about}</p>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {benefitItems.map(({ label, Icon }) => (
                  <div key={label} className="flex min-h-[68px] items-center gap-2 rounded-md bg-[#f2f7fc] px-3 py-3 text-sm font-semibold leading-5 text-[#040e1b]">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d9f7f0] text-[#0bb99a]">
                      <Icon className="h-[28px] w-[28px]" />
                    </span>
                    {label}
                  </div>
                ))}
              </div>
            </section>

            <section className="pt-5">
              <h3 className="text-lg lg:text-2xl font-bold text-[#0b3158]">What You’ll Learn</h3>
              <ul className="mt-2 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                {detail.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2 text-sm sm:text-base leading-5 text-slate-600">
                    <Check className="mt-0.5 h-6 w-6 shrink-0 stroke-[3] text-[#13b99b]" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </section>

            <section className="pt-6">
              <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
                <h3 className="text-lg lg:text-2xl font-bold text-[#0b3158]">Course Curriculum</h3>
                <p className="text-sm font-medium text-slate-500">{detail.modules.length} Modules · {detail.lessons} Lessons · {course.duration}</p>
              </div>
              <div className="space-y-1.5">
                {detail.modules.map((module, index) => {
                  const expanded = expandedModule === index;
                  return (
                    <div key={module.title} className="overflow-hidden rounded-md border border-[#e6edf5] bg-[#f5f8fc]">
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setExpandedModule(expanded ? null : index)}
                        className="flex cursor-pointer min-h-11 w-full items-center gap-3 px-3 py-2 text-left text-sm font-semibold text-[#031020] sm:px-4 sm:text-base"
                      >
                        <span className="min-w-0 flex-1">Module {index + 1}: {module.title}</span>
                        <span className="hidden shrink-0 text-xs font-medium text-slate-500 sm:inline">{module.lessons} Lessons</span>
                        <span className="hidden shrink-0 items-center gap-1 text-sm font-medium text-slate-500 sm:flex"><Clock3 className="h-3.5 w-3.5" />{module.duration}</span>
                        <ChevronDown className={`h-4 w-4 shrink-0 text-[#315274] transition-transform ${expanded ? "rotate-180" : ""}`} />
                      </button>
                      {expanded && (
                        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e6edf5] bg-white px-4 py-3 text-sm text-slate-600">
                          <span>{module.title} with guided lessons and practical exercises.</span>
                          <span className="sm:hidden">{module.lessons} lessons · {module.duration}</span>
                          <span className="hidden items-center gap-1 sm:flex"><MonitorPlay className="h-3.5 w-3.5 text-[#12ad92]" />On-demand lessons</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="pt-6">
              <h3 className="mb-2 text-lg lg:text-2xl font-bold text-[#0b3158]">About the Instructor</h3>
              <div className=" md:flex md:justify-between justify-center gap-5 rounded-md border border-slate-200 p-3 sm:p-4">
                <div className="relative h-24 sm:w-36 sm:h-36 w-24 overflow-hidden rounded-md bg-[#eaf2f8]">
                  <Image src={instructor.image} alt={instructor.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="min-w-0 mt-4 sm:mt-0">
                  <div className="flex flex-wrap  items-center gap-2">
                    <h4 className="font-bold text-base md:text-xl text-[#0b3158]">{instructor.name}</h4>
                    <span className="rounded  bg-[#e1f2ff] px-2 py-0.5 text-[13px] font-bold text-[#1380bc]">{instructor.role}</span>
                  </div>
                  <p className="mt-0.5 text-sm md:text-base text-slate-700">{instructor.title}</p>
                  <p className="mt-2 text-sm mb-5 sm:mb-0 max-w-[500px] leading-5 text-slate-600">{instructor.bio}</p>
                  <SocialLinks
                    className="mt-4"
                    shareText={course.title}
                    fallbackUrl={`/courses/${course.slug}`}
                    ariaPrefix={`Share ${course.title}`}
                  />
                </div>
                <div className="flex gap-5 border-t border-slate-200 pt-3 text-center sm:block sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                  <p className="text-base md:text-3xl font-bold text-[#0b3158]">{instructor.experience}</p>
                  <p className="text-[14px] text-slate-500">Years Experience</p>
                  <p className="mt-2 text-base md:text-3xl font-bold text-[#0b3158]">{instructor.students}</p>
                  <p className="text-[14px] text-slate-500">Students Trained</p>
                </div>
              </div>
            </section>
          </main>

          <aside className="min-w-0 space-y-3 lg:sticky lg:top-28 ">
            <div className="overflow-hidden rounded-md  border-slate-100 bg-white shadow-[0_8px_28px_rgba(15,46,74,0.08)]">
              <div className="group relative aspect-[16/9] overflow-hidden bg-[#e6eef4]">
                <Image src={course.image} alt={`${course.title} course preview`} fill sizes="(max-width: 1024px) 100vw, 340px" className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.03]" />
                <button type="button" onClick={() => setIsPreviewOpen(true)} className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-2 text-sm md:text-base font-semibold text-white transition-colors hover:bg-[#0a6ca7]">
                  <CirclePlay className="h-4 w-4" /> Watch Preview
                </button>
              </div>
              <div className="p-4">
                {/* <div className="flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[27px] font-extrabold leading-none text-[#12b99a]">{course.price}</span>
                    <span className="text-sm text-slate-400 line-through">{course.oldPrice}</span>
                  </div>
                  {discount > 0 && <span className="rounded bg-[#dcf7f1] px-2 py-1 text-[11px] font-bold text-[#079b82]">{discount}% Off</span>}
                </div> */}
                <Link href={`/apply?course=${course.slug}`} className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#073566] px-4 text-sm font-bold text-white transition-colors hover:bg-[#0a6ca7]">
                  Enroll Now <ArrowRight className="h-4 w-4" />
                </Link>
                <button type="button" aria-pressed={isWishlisted} onClick={() => setIsWishlisted(!isWishlisted)} className="mt-2 flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-semibold text-[#26415e] transition-colors hover:border-[#12b99a] hover:text-[#079b82]">
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-[#12b99a] text-[#12b99a]" : ""}`} />
                  {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
                </button>
                <dl className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-sm md:text-base">
                  <DetailRow Icon={Clock3} label="Duration" value={course.duration} />
                  <DetailRow Icon={FileText} label="Lectures" value={`${detail.lessons} Lessons`} />
                  <DetailRow Icon={ChartNoAxesColumn} label="Level" value={detail.level} />
                  <DetailRow Icon={Languages} label="Language" value={detail.language} />
                  <DetailRow Icon={ShieldCheck} label="Certificate" value="Yes" />
                  <DetailRow Icon={MonitorPlay} label="Access" value="Lifetime" />
                  <DetailRow Icon={Clock3} label="Last Updated" value={detail.updated} />
                </dl>
              </div>
            </div>

            <div className="rounded-md bg-[#f2f7fc] p-4">
              <h3 className="text-base font-bold text-[#15375b]">This Course Includes:</h3>
              <ul className="mt-2 space-y-1.5">
                {includes.map((item) => <li key={item} className="flex items-start gap-2 text-sm md:text-base leading-5 text-slate-600"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 stroke-[3] text-[#12b99a]" />{item}</li>)}
              </ul>
            </div>

            <div className="flex items-start gap-3 rounded-md bg-[#f2f7fc] p-4">
              <span className="flex h-12 w-12 md:w-16 md:h-16 shrink-0 items-center justify-center rounded-full bg-[#168bd0] text-white"><CircleHelp className="h-7 w-7 md:w-9 md:h-9" /></span>
              <div className="min-w-0">
                <h3 className="text-base md:text-lg font-bold text-[#15375b]">{help.title}</h3>
                <p className="mt-1 text-sm leading-5 text-slate-600">{help.description}</p>
                <Link href={help.href} className="mt-2 inline-flex min-h-9 items-center gap-2 rounded-md bg-[#073566] px-3 text-sm md:text-base font-bold text-white transition-colors hover:bg-[#0a6ca7]">{help.button}<ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>

            <div className="rounded-md bg-[#effaf8] px-5 py-5 text-center">
              <GraduationCap className="mx-auto h-12 w-12 md:w-16 md:h-16 text-[#13b99b]" />
              <h3 className="mt-2 text-xl md:text-2xl font-bold leading-tight text-[#10365b]">{promo.title}<br />{promo.highlight}</h3>
              <p className="mx-auto mt-2 max-w-[250px] text-base leading-5 text-slate-600">{promo.description}</p>
            </div>
          </aside>
        </div>
      </section>

      {isPreviewOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#041827]/80 p-4" role="dialog" aria-modal="true" aria-label={`${course.title} preview`} onClick={() => setIsPreviewOpen(false)}>
          <div className="relative w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setIsPreviewOpen(false)} aria-label="Close preview" className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#15375b] shadow hover:bg-white"><X className="h-5 w-5" /></button>
            <div className="relative aspect-video bg-[#e6eef4]">
              <Image src={course.image} alt="" fill sizes="(max-width: 672px) 100vw, 672px" className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-[#071e31]/25"><CirclePlay className="h-16 w-16 text-white drop-shadow-lg" /></div>
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-xs font-bold uppercase text-[#079b82]">Course Preview</p>
              <h2 className="mt-1 text-xl font-extrabold text-[#0b3158]">{course.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{detail.about}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DetailRow({
  Icon,
  label,
  value,
}: {
  Icon: typeof Clock3;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-[#17395d]">
      <dt className="flex items-center gap-2 text-slate-500"><Icon className="h-4 w-4 text-[#315274]" />{label}</dt>
      <dd className="text-left font-semibold">{value}</dd>
    </div>
  );
}