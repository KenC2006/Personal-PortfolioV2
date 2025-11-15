"use client";

import { Github, Linkedin, Mail, Download } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, contactLinks } from "@/data/constants";
import { memo, useCallback } from "react";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  download: Download,
};

function Navigation() {
  const pathname = usePathname();

  const handleResumeDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/res/KenChen_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-black/90 via-zinc-900/85 to-black/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/40 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 sm:gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold relative px-3 py-2 rounded-xl transition-all duration-200 ${
                  pathname === link.href
                    ? "text-white bg-gradient-to-br from-white/20 to-gray-400/10"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex gap-2 sm:gap-3 items-center">
            {contactLinks.map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.target}
                  rel={link.rel}
                  onClick={
                    link.icon === "download" ? handleResumeDownload : undefined
                  }
                  className={`flex items-center justify-center gap-2 rounded-xl border transition-all duration-200 ${
                    link.icon === "download"
                      ? "px-4 py-2 bg-gradient-to-r from-white to-gray-200 text-black border-white/40 hover:from-gray-100 hover:to-white hover:-translate-y-0.5"
                      : "w-10 h-10 bg-gradient-to-br from-zinc-800/60 to-black/50 backdrop-blur-sm text-gray-300 border-white/20 hover:from-zinc-700/70 hover:to-zinc-800/60 hover:border-white/30 hover:text-white"
                  }`}
                  aria-label={link.label}
                >
                  {link.icon === "download" && (
                    <span className="text-sm font-bold hidden sm:inline">Resume</span>
                  )}
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Memoize Navigation, but it will still re-render when pathname changes
// This is expected and desired for active link highlighting
export default memo(Navigation);
