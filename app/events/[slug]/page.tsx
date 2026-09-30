import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventBySlug, getEventItems, site } from "@/data";
import EventDetail from "./EventDetail";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getEventItems().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  return {
    title: event ? `${event.title} | Edusity Events` : "Event Details | Edusity",
    description: event?.desc,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) notFound();

  return <EventDetail event={event} banner={site.events.banner} contact={site.events.detailPage.contact} />;
}