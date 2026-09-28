import { site } from "@/data";
import LegalPage from "../components/layout/legal/LegalPage";

export default function TermsPage() {
  return <LegalPage data={site.legal.EducationTerms1} />;
}
