import type { Metadata } from "next";
import Process from "../components/layout/process/Process";

export const metadata: Metadata = {
  title: "Admission Process | Edusity",
  description:
    "Follow the simple step-by-step admission process at Edusity, from exploring programs and submitting documents to receiving your offer and confirming your seat.",
};

export default function ProcessPage() {
  return (
    <>
      <Process />
    </>
  );
}
