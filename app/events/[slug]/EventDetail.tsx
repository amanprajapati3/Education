"use client";

import Image from "next/image";
import Link from "next/link";
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
import { FaFilePdf } from "react-icons/fa6";
import type { EducationEventContactData, EducationEventItem } from "@/data";

type EventDetailProps = {
  event: EducationEventItem;
  banner: {
    title: string;
    home: string;
    current: string;
    bgImage: string;
  };
  contact: EducationEventContactData;
};

const categoryHighlights: Record<
  string,
  { label: string; Icon: LucideIcon }[]
> = {
  Seminars: [
    { label: "Expert Panel Discussion", Icon: UsersRound },
    { label: "Insights and Future Skills", Icon: Lightbulb },
    { label: "Career Guidance", Icon: BriefcaseBusiness },
    { label: "Live Q&A Session", Icon: MessageCircle },
    { label: "Industry Networking", Icon: UsersRound },
  ],
  Workshops: [
    { label: "Guided Practice", Icon: BriefcaseBusiness },
    { label: "Hands-on Learning", Icon: Lightbulb },
    { label: "Expert Instruction", Icon: UsersRound },
    { label: "Live Q&A Session", Icon: MessageCircle },
    { label: "Take-home Skills", Icon: CheckCircle2 },
  ],
  Webinars: [
    { label: "Expert Presentation", Icon: UsersRound },
    { label: "Flexible Online Access", Icon: Lightbulb },
    { label: "Practical Guidance", Icon: BriefcaseBusiness },
    { label: "Live Q&A Session", Icon: MessageCircle },
    { label: "Digital Resources", Icon: CheckCircle2 },
  ],
  "Guest Lectures": [
    { label: "Guest Speaker", Icon: UsersRound },
    { label: "Industry Insights", Icon: Lightbulb },
    { label: "Career Perspectives", Icon: BriefcaseBusiness },
    { label: "Live Q&A Session", Icon: MessageCircle },
    { label: "Meet the Speaker", Icon: UsersRound },
  ],
  "Campus Activities": [
    { label: "Campus Community", Icon: UsersRound },
    { label: "Get Involved", Icon: Lightbulb },
    { label: "Student-led Activities", Icon: BriefcaseBusiness },
    { label: "Meet Other Students", Icon: MessageCircle },
    { label: "Make a Difference", Icon: CheckCircle2 },
  ],
  "Cultural Events": [
    { label: "Student Performances", Icon: UsersRound },
    { label: "Celebrate Creativity", Icon: Lightbulb },
    { label: "Campus Community", Icon: BriefcaseBusiness },
    { label: "Shared Experiences", Icon: MessageCircle },
    { label: "All Are Welcome", Icon: CheckCircle2 },
  ],
};

const monthNames: Record<string, string> = {
  JAN: "January",
  FEB: "February",
  MAR: "March",
  APR: "April",
  MAI: "May",
  JUN: "June",
  JUL: "July",
  AUG: "August",
  SEP: "September",
  OCT: "October",
  NOV: "November",
  DEC: "December",
};

const categoryDescriptions: Record<string, string> = {
  Seminars: "seminar",
  Workshops: "workshop",
  Webinars: "webinar",
  "Guest Lectures": "guest lecture",
  "Campus Activities": "campus activity",
  "Cultural Events": "cultural event",
};

function formatEventDate(event: EducationEventItem) {
  const month =
    monthNames[event.date.month.toUpperCase()] ??
    `${event.date.month.charAt(0)}${event.date.month.slice(1).toLowerCase()}`;
  return `${event.date.day} ${month} ${event.date.year}`;
}

export default function EventDetail({
  event,
  banner,
  contact,
}: EventDetailProps) {
  const highlights =
    categoryHighlights[event.category] ?? categoryHighlights.Seminars;
  const date = formatEventDate(event);
  const eventType = categoryDescriptions[event.category] ?? "event";

  return (
    <main className="bg-[#f7fafc]">
      <BannerPage
        title={banner.title}
        home={banner.home}
        crumbs={[{ label: "Events", href: "/events" }]}
        current={event.title}
        bgImage={banner.bgImage}
      />

      <section className="mx-auto grid max-w-325 grid-cols-1 items-start gap-6 px-4 py-8 sm:px-6 md:gap-8 md:py-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-7">
        <div className="min-w-0">
          <div className="relative sm:aspect-[2.2/1] min-h-48 overflow-hidden rounded-md bg-[#e5edf3]">
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover"
            />
          </div>

          <section className="pt-5">
            <SectionHeading>About This Event</SectionHeading>
            <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
              {event.desc} Join us at {event.location} on {date} for this{" "}
              {eventType}. Hear fresh perspectives, connect with the Edusity
              community, and leave with ideas you can put into practice.
            </p>
            <blockquote className="mt-4 rounded-md border-l-[3px] border-[#19c2a1] bg-[#eef6fc] px-4 py-3 text-sm leading-6 text-[#254565] sm:px-5 md:text-base">
              <span className="mr-1 text-2xl font-extrabold leading-none text-[#19c2a1]">
                “
              </span>
              Make time to learn, meet new people, and take your next step
              forward.
            </blockquote>
          </section>

          <section className="pt-5">
            <SectionHeading>Event Highlights</SectionHeading>
            <div className="mt-3 grid grid-cols-2 divide-x divide-y divide-slate-200 border-y border-slate-200 sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
              {highlights.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex min-h-28 flex-col items-center justify-center gap-2 px-2 py-3 text-center"
                >
                  <span className="flex h-12 md:w-16 md:h-16 w-12 items-center justify-center rounded-full bg-[#eaf3fb] text-[#0b5e8e]">
                    <Icon className="h-6 md:w-8 md:h-8 w-6" />
                  </span>
                  <span className="text-sm min-h-10 font-semibold leading-5 text-[#17395d]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-5">
            <SectionHeading>Who Should Attend?</SectionHeading>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {[
                `Anyone interested in ${event.title.toLowerCase()}`,
                "Students looking to learn and connect",
                "Recent graduates exploring new opportunities",
                "Members of the community ready to take part",
              ].map((attendee) => (
                <li
                  key={attendee}
                  className="flex items-start gap-2 text-sm leading-5 text-slate-600 md:text-base"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#13a995]" />
                  {attendee}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="min-w-0 space-y-3 lg:sticky lg:top-6">
          <section className="rounded-md border border-[#e1eaf1] bg-white p-4 shadow-[0_5px_18px_rgba(14,49,82,0.06)] sm:p-5">
            <h2 className="text-lg md:text-xl font-bold text-[#0b3158]">
              Event Details
            </h2>
            <dl className="mt-3 space-y-3">
              <EventInfo Icon={CalendarDays} label="Date" value={date} />
              <EventInfo Icon={Clock3} label="Time" value={event.time} />
              <EventInfo
                Icon={MapPin}
                label="Venue"
                value={`${event.location}, Edusity Campus`}
              />
              <EventInfo
                Icon={UsersRound}
                label="Event Type"
                value={event.category}
              />
              <EventInfo
                Icon={Tag}
                label="Seats"
                value="Limited seats available"
              />
            </dl>
          </section>

          <section className="overflow-hidden rounded-md border border-[#e1eaf1] bg-white shadow-[0_5px_18px_rgba(14,49,82,0.06)]">
            <div className="bg-[#075b91] px-4 py-3 text-white">
              <h2 className="text-lg font-bold">Enquire About This Event</h2>
              <p className="text-sm leading-5 text-white/90">
                Send us your details and our team will be in touch.
              </p>
            </div>
            <form action="/enquiry" method="get" className="space-y-3 p-4">
              <input type="hidden" name="event" value={event.title} />
              <FormField
                label="Full Name"
                name="name"
                placeholder="Enter your full name"
              />
              <FormField
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email address"
              />
              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
              />
              <label className="block text-sm font-semibold text-[#17395d]">
                Select Your Interest
                <select
                  name="interest"
                  defaultValue={event.category}
                  className="mt-1 min-h-10 w-full rounded border border-slate-300 bg-white px-3 text-sm font-normal text-slate-600 outline-none focus:border-[#0a8d9d] focus:ring-2 focus:ring-[#19c2a1]/20"
                >
                  <option value={event.category}>{event.category}</option>
                  <option value="Other Events">Other Events</option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-[#17395d]">
                Message{" "}
                <span className="font-normal text-slate-500">(Optional)</span>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Write your message here..."
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-[#0a8d9d] focus:ring-2 focus:ring-[#19c2a1]/20"
                />
              </label>
              <button
                type="submit"
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#11a99b] px-4 text-sm font-bold text-white transition-colors hover:bg-[#078c83]"
              >
                Submit Enquiry <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </section>

          <a
            href="/downloads/edusity-event-brochure.pdf"
            download="edusity-event-brochure.pdf"
            className="flex min-h-16 items-center justify-between gap-3 rounded-md bg-[#edf5fb] px-4 py-3 text-[#0b3158] transition-colors hover:bg-[#e1eef8]"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white text-[#D32F2F]">
                <FaFilePdf className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-base font-bold">
                  Download Event Brochure
                </span>
                <span className="block text-sm text-slate-600">
                  See the full events calendar
                </span>
              </span>
            </span>
            <Download className="h-5 w-5 shrink-0" />
          </a>
          <div classsName="rounded-md bg-blue-50 p-4">
            <div className="flex items-start gap-3 mb-2">
              <span className="flex h-11 sm:w-14 sm:h-14 w-11 shrink-0 items-center justify-center  text-[#0b5e8e]">
                <Headphones className="h-6 sm:w-9 sm:h-9 w-6" />
              </span>
              <div className="min-w-0">
                <h2 className="text-base font-bold text-[#0b3158]">
                  Need Help?
                </h2>
                <p className="mt-1 text-sm leading-5 text-slate-600">
                  Our team can help with event questions and registration.
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
          </div>
        </aside>
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
