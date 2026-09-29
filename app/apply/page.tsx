import type { Metadata } from "next";
import Apply from "../components/layout/apply/Apply";

export const metadata: Metadata = {
  title: "Apply Now | Edusity",
  description:
    "Apply to Edusity online. Submit your personal and academic details, upload your documents and our admissions team will review your application.",
};

export default function ApplyPage() {
  return (
    <>
      <Apply />
    </>
  );
}
