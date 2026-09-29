import type { Metadata } from "next";
import Enquiry from "../components/layout/enquiry/Enquiry";

export const metadata: Metadata = {
  title: "Enquiry Form | Edusity",
  description:
    "Send an enquiry to Edusity about admissions, courses, campus facilities or anything else. Our team replies within one business day.",
};

export default function EnquiryPage() {
  return (
    <>
      <Enquiry />
    </>
  );
}
