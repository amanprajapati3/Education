import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Target,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import BannerPage from "@/app/components/shared/BannerPage";
import SocialLinks from "@/app/components/shared/SocialLinks";
import ScrollReveal from "@/app/components/shared/ScrollReveal";
import type {
  EducationFacultyDetailPageData,
  EducationFacultyItem,
  EducationFacultyProfile,
} from "@/data";

type FacultyDetailProps = {
  member: EducationFacultyItem;
  profile: EducationFacultyProfile;
  pageData: EducationFacultyDetailPageData;
};

const VALUE_ICONS: Record<string, LucideIcon> = {
  users: UsersRound,
  lightbulb: Lightbulb,
  book: BookOpen,
  target: Target,
};

export default function FacultyDetail({ member, profile, pageData }: FacultyDetailProps) {
  const nameParts = member.name.trim().split(" ");
  const highlightedName = nameParts.pop() || member.name;
  const firstName = nameParts.join(" ");

  return (
    <main className="bg-white">
      <BannerPage
        title={pageData.banner.title}
        home={pageData.banner.home}
        crumbs={[{ label: "Faculty", href: "/faculty" }]}
        current={member.name}
        bgImage={pageData.banner.bgImage}
      />

      <section className="mx-auto max-w-310 px-4 py-8 sm:px-6 md:py-12 lg:px-7">
        <ScrollReveal
          as="header"
          className="mb-6"
          direction="up"
          distance={40}
          duration={0.7}
        >
          <p className="flex items-center gap-2 text-sm font-bold uppercase text-[#0b3158]">
            <span className="h-0.5 w-7 bg-[#19c2a1]" /> Our Faculty
          </p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold leading-tight text-[#0b3158] sm:text-4xl">
            {firstName}{" "}<span className="text-[#19c2a1]">{highlightedName}</span>
          </h2>
          <p className="mt-1 text-base md:text-lg font-semibold text-[#0b3158]">{member.designation}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-7">
          <ScrollReveal
            as="aside"
            className="overflow-hidden rounded-lg border border-[#e4edf4] bg-white shadow-[0_5px_18px_rgba(14,49,82,0.07)]"
            direction="left"
            mobileDirection="up"
            distance={60}
            duration={0.8}
          >
            <div className="relative aspect-[4/4.6] bg-[#e9f0f5] ">
              <Image
                src={member.image}
                alt={member.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 290px"
                className="object-cover rounded-xl"
              />
              <div className="absolute inset-x-0 bottom-0 rounded-xl flex items-center gap-3 bg-[#073566]/95 px-4 py-3 text-white">
                <span className="text-2xl md:text-4xl font-bold">{profile.yearsExperience}</span>
                <span className="text-base leading-5">Years of<br />Teaching Experience</span>
              </div>
            </div>
            <dl className="space-y-3 p-4 text-base text-slate-700">
              <ProfileInfo Icon={Mail} value={profile.email} href={`mailto:${profile.email}`} />
              <ProfileInfo Icon={Phone} value={profile.phone} href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`} />
              <ProfileInfo Icon={MapPin} value={profile.location} />
              <ProfileInfo Icon={GraduationCap} value={profile.qualification} />
              <ProfileInfo Icon={UsersRound} value={profile.department} />
            </dl>
            <SocialLinks
              heading="Follow Me"
              links={profile.socials}
              ariaPrefix={member.name}
            />
          </ScrollReveal>

          <div className="min-w-0">
            <ScrollReveal
              as="section"
              direction="right"
              mobileDirection="up"
              distance={50}
              duration={0.75}
            >
              <h3 className="text-2xl md:text-4xl font-bold text-[#0b3158] sm:text-[27px]">
                About <span className="text-[#19c2a1]">{member.name}</span>
              </h3>
              <p className="mt-2 text-sm md:text-base leading-6 text-slate-600">{profile.about[0]}</p>
              <p className="mt-3 text-sm md:text-base leading-6 text-slate-600">{profile.about[1]}</p>
              <blockquote className="mt-4 rounded-md border-l-[3px] border-[#19c2a1] bg-[#f1f7fc] px-4 py-4 text-sm italic leading-6 text-[#254565] sm:px-5">
                <span className="mb-1 block text-3xl md:text-5xl font-extrabold leading-none text-[#19c2a1]">“</span>
                <span className="text-sm md:text-base">{profile.quote}</span>
                <cite className="mt-2 block text-right text-base font-semibold not-italic text-[#0b3158]">— {member.name}</cite>
              </blockquote>
            </ScrollReveal>

            <ScrollReveal
              as="section"
              className="mt-5 grid grid-cols-2 divide-x divide-y divide-slate-200 border-y border-slate-200 sm:grid-cols-4 sm:divide-y-0"
              direction="up"
              distance={40}
              duration={0.7}
            >
              {profile.values.map((value, index) => {
                const Icon = VALUE_ICONS[value.icon] || BookOpen;
                return (
                  <ScrollReveal
                    key={value.label}
                    as="div"
                    className="flex min-h-28 flex-col items-center justify-center gap-2 px-2 py-3 text-center"
                    direction="up"
                    distance={26}
                    duration={0.55}
                    delay={0.04}
                    staggerChildren={0.05}
                    index={index}
                  >
                    <span className={`flex h-14 w-14 md:w-20 md:h-20 items-center justify-center rounded-full text-white ${index === 1 || index === 3 ? "bg-[#19c2a1]" : "bg-[#073566]"}`}>
                      <Icon className="h-7 w-7 md:w-10 sm:h-10" />
                    </span>
                    <span className="text-sm md:text-base font-semibold leading-5 text-[#17395d]">{value.label}</span>
                  </ScrollReveal>
                );
              })}
            </ScrollReveal>

            <ScrollReveal
              as="section"
              className="mt-5 grid gap-4 md:grid-cols-2"
              direction="up"
              distance={40}
              duration={0.7}
            >
              <ScrollReveal
                as="article"
                className="rounded-md bg-[#f5f8fc] p-4 sm:p-5"
                direction="left"
                mobileDirection="up"
                distance={34}
                duration={0.6}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#d9f7f0] text-[#0aa98e]"><GraduationCap className="h-7 w-7" /></span>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-[#0b3158]">Teaching Philosophy</h3>
                    <p className="mt-1 text-sm md:text-base leading-6 text-slate-600">{profile.philosophy}</p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal
                as="article"
                className="rounded-md bg-[#f1f7fc] p-4 sm:p-5"
                direction="right"
                mobileDirection="up"
                distance={34}
                duration={0.6}
                delay={0.1}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#dceeff] text-[#0a6ca7]"><BookOpen className="h-7 w-7" /></span>
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-bold text-[#0b3158]">Areas of Interest</h3>
                    <ul className="mt-2 space-y-1.5">
                      {profile.interests.map((interest) => (
                        <li key={interest} className="flex items-start gap-2 text-sm md:text-base leading-5 text-slate-600">
                          <Check className="mt-0.5 h-6 w-6 shrink-0 stroke-3 text-[#0a6ca7]" />{interest}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-310 px-4 pb-8 sm:px-6 sm:pb-10 lg:px-7">
        <ScrollReveal
          as="div"
          className="relative isolate overflow-hidden rounded-lg bg-[#052746]"
          direction="up"
          distance={50}
          duration={0.8}
        >
          <Image
            src={pageData.cta.image}
            alt="Students learning together"
            fill
            sizes="(max-width: 1240px) 100vw, 1240px"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#052746] via-[#052746]/95 to-[#052746]/30" />
          <div className="relative max-w-2xl px-5 py-8 text-white sm:px-8 sm:py-10">
            <p className="text-base font-bold uppercase tracking-wide text-[#19c2a1]">{pageData.cta.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
              {pageData.cta.title}<br /><span className="text-[#19c2a1]">{pageData.cta.highlight}</span>
            </h2>
            <p className="mt-2 max-w-lg text-sm md:text-base leading-6 text-white/85">{pageData.cta.description}</p>
            <Link href={pageData.cta.href} className="swp swp-aqua mt-4 inline-flex min-h-11 items-center gap-2 rounded-md px-5 text-base font-bold text-[#062a45]">
              <span>{pageData.cta.button}</span><ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}

function ProfileInfo({
  Icon,
  value,
  href,
}: {
  Icon: LucideIcon;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-[#0b3158]" />
      <dd className="min-w-0 wrap-break-word leading-5">
        {href ? <a href={href} className="transition-colors hover:text-[#079b82]">{value}</a> : value}
      </dd>
    </div>
  );
}