import type { Metadata } from "next";
import Contact from "../components/layout/contact/Contact";

export const metadata: Metadata = {
  title: "Contact Us | Edusity",
  description:
    "Get in touch with Edusity. Send us a message, call our admissions team or visit our campus to find the right program for you.",
};

export default function ContactPage() {
  return (
    <>
      <Contact />
    </>
  );
}
