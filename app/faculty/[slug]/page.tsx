import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getFacultyMemberBySlug,
  getFacultyMembers,
  getFacultyProfileBySlug,
  site,
} from "@/data";
import FacultyDetail from "./FacultyDetail";

type FacultyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getFacultyMembers().map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: FacultyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getFacultyMemberBySlug(slug);

  return {
    title: member ? `${member.name} | Edusity Faculty` : "Faculty Details | Edusity",
    description: member?.quote,
  };
}

export default async function FacultyProfilePage({ params }: FacultyPageProps) {
  const { slug } = await params;
  const member = getFacultyMemberBySlug(slug);
  const profile = getFacultyProfileBySlug(slug);

  if (!member || !profile) notFound();

  return (
    <FacultyDetail
      member={member}
      profile={profile}
      pageData={site.facultyDetailPage}
    />
  );
}