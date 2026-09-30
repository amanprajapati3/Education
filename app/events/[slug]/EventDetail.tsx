"use client";

import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Headphones,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Tag,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import BannerPage from "@/app/components/shared/BannerPage";
import ScrollReveal from "@/app/components/shared/ScrollReveal";
import { FaFilePdf } from "react-icons/fa6";
import type {
  EducationEventArticle,
  EducationEventContactData,
  EducationEventDetailContent,
  EducationEventItem,
} from "@/data";

type EventDetailProps = {
  event: EducationEventItem;
  article: EducationEventArticle;
  banner: {
    title: string;
    home: string;
    current: string;
    bgImage: string;
  };
  contact: EducationEventContactData;
  content: EducationEventDetailContent;
};

const HIGHLIGHT_ICONS: LucideIcon[] = [
  UsersRound,
  Lightbulb,
  BriefcaseBusiness,
  MessageCircle,
  CheckCircle2,
];

function formatEventDate(
  event: EducationEventItem,
  monthNames: EducationEventDetailContent["monthNames"],
) {
  const monthKey = event.date.month.toUpperCase() as keyof typeof monthNames;
  const month =
    monthNames[monthKey] ??
    `${event.date.month.charAt(0)}${event.date.month.slice(1).toLowerCase()}`;
  return `${event.date.day} ${month} ${event.date.year}`;
}

export default function EventDetail({
  event,
  article,
  banner,
  contact,
  content,
}: EventDetailProps) {
  const date = formatEventDate(event, content.monthNames);
  const eventType = `${article.eventType.charAt(0).toUpperCase()}${article.eventType.slice(1)}`;

  return (
    <main className="bg-[#f7fafc]">
      <BannerPage
        title={banner.title}
        home={banner.home}
        crumbs={[
          { label: content.breadcrumbLabel, href: content.breadcrumbHref },
        ]}
        current={event.title}
        bgImage={banner.bgImage}
      />

      <section className="mx-auto grid max-w-325 grid-cols-1 items-start gap-6 px-4 py-8 sm:px-6 md:gap-8 md:py-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-7">
        <div className="min-w-0">
          <ScrollReveal
            as="div"
            className="relative sm:aspect-[2.2/1] min-h-48 overflow-hidden rounded-md bg-[#e5edf3]"
            direction="left"
            mobileDirection="up"
            distance={50}
            duration={0.75}
          >
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover"
            />
          </ScrollReveal>

          <ScrollReveal
            as="section"
            className="pt-5"
            direction="up"
            distance={40}
            duration={0.7}
          >
            <SectionHeading>{content.aboutHeading}</SectionHeading>
            <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
              {event.desc} {article.overview}
            </p>
            <blockquote className="mt-4 rounded-md border-l-[3px] border-[#19c2a1] bg-[#eef6fc] px-4 py-3 text-sm leading-6 text-[#254565] sm:px-5 md:text-base">
              <span className="mr-1 text-2xl font-extrabold leading-none text-[#19c2a1]">
                “
              </span>
              {article.quote}
            </blockquote>
          </ScrollReveal>

          <ScrollReveal
            as="section"
            className="pt-5"
            direction="up"
            distance={40}
            duration={0.7}
          >
            <SectionHeading>{content.highlightsHeading}</SectionHeading>
            <div className="mt-3 grid grid-cols-2 divide-x divide-y divide-slate-200 border-y border-slate-200 sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
              {article.highlights.map((label, highlightIndex) => {
                const Icon = HIGHLIGHT_ICONS[highlightIndex % HIGHLIGHT_ICONS.length];
                return (
                <ScrollReveal
                  key={label}
                  as="div"
                  className="flex min-h-28 flex-col items-center justify-center gap-2 px-2 py-3 text-center"
                  direction="up"
                  distance={26}
                  duration={0.55}
                  delay={0.04}
                  staggerChildren={0.05}
                  index={highlightIndex}
                >
                  <span className="flex h-12 md:w-16 md:h-16 w-12 items-center justify-center rounded-full bg-[#eaf3fb] text-[#0b5e8e]">
                    <Icon className="h-6 md:w-8 md:h-8 w-6" />
                  </span>
                  <span className="text-sm min-h-10 font-semibold leading-5 text-[#17395d]">
                    {label}
                  </span>
                </ScrollReveal>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal
            as="section"
            className="pt-5"
            direction="up"
            distance={40}
            duration={0.7}
          >
            <SectionHeading>{content.attendeesHeading}</SectionHeading>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {article.attendees.map((attendee) => (
                <li
                  key={attendee}
                  className="flex items-start gap-2 text-sm leading-5 text-slate-600 md:text-base"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#13a995]" />
                  {attendee}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <ScrollReveal
          as="aside"
          className="min-w-0 space-y-3 lg:sticky lg:top-6"
          direction="right"
          mobileDirection="up"
          distance={60}
          duration={0.8}
          delay={0.1}
        >
          <ScrollReveal
            as="section"
            className="rounded-md border border-[#e1eaf1] bg-white p-4 shadow-[0_5px_18px_rgba(14,49,82,0.06)] sm:p-5"
            direction="up"
            distance={36}
            duration={0.65}
          >
            <h2 className="text-lg md:text-xl font-bold text-[#0b3158]">
              {content.detailsHeading}
            </h2>
            <dl className="mt-3 space-y-3">
              <EventInfo Icon={CalendarDays} label={content.detailLabels.date} value={date} />
              <EventInfo Icon={Clock3} label={content.detailLabels.time} value={event.time} />
              <EventInfo
                Icon={MapPin}
                label={content.detailLabels.venue}
                value={article.venue}
              />
              <EventInfo
                Icon={UsersRound}
                label={content.detailLabels.type}
                value={eventType}
              />
              <EventInfo
                Icon={Tag}
                label={content.detailLabels.seats}
                value={content.seatAvailability}
              />
            </dl>
          </ScrollReveal>

          <ScrollReveal
            as="section"
            className="overflow-hidden rounded-md border border-[#e1eaf1] bg-white shadow-[0_5px_18px_rgba(14,49,82,0.06)]"
            direction="up"
            distance={36}
            duration={0.65}
            delay={0.06}
          >
            <div className="bg-[#075b91] px-4 py-3 text-white">
              <h2 className="text-lg font-bold">{content.enquiry.title}</h2>
              <p className="text-sm leading-5 text-white/90">
                {content.enquiry.description}
              </p>
            </div>
            <form action={content.enquiry.action} method="get" className="space-y-3 p-4">
              <input type="hidden" name="event" value={event.title} />
              {content.enquiry.fields.map((field) => (
                <FormField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              ))}
              <label className="block text-sm font-semibold text-[#17395d]">
                {content.enquiry.interestLabel}
                <select
                  name="interest"
                  defaultValue={event.category}
                  className="mt-1 min-h-10 w-full rounded border border-slate-300 bg-white px-3 text-sm font-normal text-slate-600 outline-none focus:border-[#0a8d9d] focus:ring-2 focus:ring-[#19c2a1]/20"
                >
                  <option value={event.category}>{event.category}</option>
                  <option value={content.enquiry.otherInterest.value}>
                    {content.enquiry.otherInterest.label}
                  </option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-[#17395d]">
                {content.enquiry.messageLabel}{" "}
                <span className="font-normal text-slate-500">
                  {content.enquiry.optionalLabel}
                </span>
                <textarea
                  name="message"
                  rows={3}
                  placeholder={content.enquiry.messagePlaceholder}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-[#0a8d9d] focus:ring-2 focus:ring-[#19c2a1]/20"
                />
              </label>
              <button
                type="submit"
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#11a99b] px-4 text-sm font-bold text-white transition-colors hover:bg-[#078c83]"
              >
                {content.enquiry.submitLabel} <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </ScrollReveal>

          <a
            href={content.brochure.href}
            download={content.brochure.filename}
            className="flex min-h-16 items-center justify-between gap-3 rounded-md bg-[#edf5fb] px-4 py-3 text-[#0b3158] transition-colors hover:bg-[#e1eef8]"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white text-[#D32F2F]">
                <FaFilePdf className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-base font-bold">
                  {content.brochure.title}
                </span>
                <span className="block text-sm text-slate-600">
                  {content.brochure.description}
                </span>
              </span>
            </span>
            <Download className="h-5 w-5 shrink-0" />
          </a>
          <ScrollReveal
            as="div"
            className="rounded-md bg-blue-50 p-4"
            direction="up"
            distance={36}
            duration={0.65}
            delay={0.06}
          >
            <div className="flex items-start gap-3 mb-2">
              <span className="flex h-11 sm:w-14 sm:h-14 w-11 shrink-0 items-center justify-center  text-[#0b5e8e]">
                <Headphones className="h-6 sm:w-9 sm:h-9 w-6" />
              </span>
              <div className="min-w-0">
                <h2 className="text-base font-bold text-[#0b3158]">
                  {content.help.title}
                </h2>
                <p className="mt-1 text-sm leading-5 text-slate-600">
                  {content.help.description}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-11 sm:w-14 sm:h-14 w-11 shrink-0 items-center justify-center  text-[#0b5e8e]">
                <Phone className="h-6 sm:w-9 sm:h-9 w-6" />
              </span>
              <div className="min-w-0">
                <a
                  href={contact.phone.href}
                  className="block text-base font-bold text-[#0b3158] transition-colors hover:text-[#078c88]"
                >
                  {contact.phone.value}
                </a>
                <p className="mt-0.5 text-sm leading-5 text-slate-600">
                  {contact.phone.note}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-start gap-3 border-t border-[#dbe8f2] pt-3">
              <span className="flex h-11 sm:w-14 sm:h-14 w-11 shrink-0 items-center justify-center  text-[#0b5e8e]">
                <Mail className="h-6 sm:w-9 sm:h-9 w-6" />
              </span>
              <div className="min-w-0">
                <a
                  href={contact.email.href}
                  className="block text-base font-bold text-[#0b3158] transition-colors hover:text-[#078c88]"
                >
                  {contact.email.value}
                </a>
                <p className="mt-0.5 text-sm leading-5 text-slate-600">
                  {contact.email.note}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </ScrollReveal>
      </section>
    </main>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-lg font-bold text-[#0b3158] md:text-xl">
      <span className="h-0.5 w-7 shrink-0 bg-[#19c2a1]" />
      {children}
    </h2>
  );
}

function EventInfo({
  Icon,
  label,
  value,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-[#0b5e8e]" />
      <div className="min-w-0">
        <dt className="text-sm font-semibold text-[#17395d]">{label}</dt>
        <dd className="text-sm leading-5 text-slate-600">{value}</dd>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-[#17395d]">
      {label} <span className="text-[#d94747">*</span>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-1 min-h-10 w-full rounded border border-slate-300 px-3 text-sm font-normal text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#0a8d9d] focus:ring-2 focus:ring-[#19c2a1]/20"
      />
    </label>
  );
}
