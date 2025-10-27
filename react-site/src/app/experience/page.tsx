import type { Metadata } from "next";
import Experience from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "Experience - Ken Chen",
  description:
    "Professional experience and work history of Ken Chen - Software engineering roles and technical positions.",
};

export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Experience />
      </div>
    </main>
  );
}
