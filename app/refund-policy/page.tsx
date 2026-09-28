import { site } from "@/data";
import LegalPage from "../components/layout/legal/LegalPage";

export default function RefundPolicyPage() {
  return <LegalPage data={site.legal.EducationRefund1} />;
}
