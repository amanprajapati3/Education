import type { Metadata } from "next";
import Gallery from "../components/layout/gallery/Gallery";

export const metadata: Metadata = {
  title: "Gallery | Edusity",
  description:
    "Browse photos and videos from campus life, events, classrooms, student activities and facilities at Edusity.",
};

export default function GalleryPage() {
  return (
    <>
      <Gallery />
    </>
  );
}
