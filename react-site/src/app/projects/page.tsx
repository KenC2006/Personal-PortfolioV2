import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects - Ken Chen",
  description:
    "Featured projects and work by Ken Chen - Full-stack applications, AI/ML projects, games, and hardware builds.",
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Projects />
      </div>
    </main>
  );
}
