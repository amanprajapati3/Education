import type { Metadata } from "next";
import Achievement from "../components/layout/achievement/Achievement";

export const metadata: Metadata = {
  title: "Achievements | Edusity",
  description:
    "Explore the awards, milestones and student outcomes behind Edusity, from 12,500+ learners enrolled to national recognition for academic innovation.",
};

export default function AchievementPage() {
  return (
    <>
      <Achievement />
    </>
  );
}
