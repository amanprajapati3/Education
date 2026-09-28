import { site } from "@/data";
import LegalPage from "../components/layout/legal/LegalPage";

export default function PrivacyPage() {
  return <LegalPage data={site.legal.EducationPrivacy1} />;
}
