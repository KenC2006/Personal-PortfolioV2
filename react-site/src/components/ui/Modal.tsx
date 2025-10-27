"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { ModalData, Project, Experience } from "@/types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData | null;
}

export default function Modal({ isOpen, onClose, data }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!data) return null;

  const renderProjectModal = (project: Project) => (
    <>
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
          {project.title}
        </h1>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-300">
            {project.timeframe}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech.map((tech: string, index: number) => (
          <span
            key={index}
            className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-xs font-medium hover:bg-white/15 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="space-y-4 text-white leading-relaxed text-base">
        {project.details.map((detail: string, index: number) => {
          const formattedDetail = detail
            .split("\n\n")
            .map((paragraph) => {
              return paragraph.replace(/\*(.*?)\*/g, "<em class='text-gray-300 italic'>$1</em>");
            })
            .join("</p><p class='text-white'>");
          return (
            <p
              key={index}
              className="text-white"
              dangerouslySetInnerHTML={{ __html: formattedDetail }}
            />
          );
        })}
      </div>

      {(project.github || project.liveUrl) && (
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex gap-4">
            {project.github && (
              <button
                onClick={() =>
                  window.open(project.github, "_blank", "noopener,noreferrer")
                }
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors shadow-lg"
              >
                <Github size={18} />
                View on GitHub
              </button>
            )}
            {project.liveUrl && (
              <button
                onClick={() =>
                  window.open(project.liveUrl, "_blank", "noopener,noreferrer")
                }
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
              >
                <ExternalLink size={18} />
                Live Demo
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );

  const renderExperienceModal = (experience: Experience) => (
    <>
      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg">
          <Image
            src={experience.logoPath}
            alt={experience.companyName}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            {experience.companyName}
          </h2>
          <div className="text-gray-300 text-lg font-medium mt-1">
            {experience.title}
          </div>
        </div>
      </div>
      <div className="mb-8">
        <span className="text-gray-300 text-sm font-medium">
          {experience.timeframe}
        </span>
      </div>
      <div className="space-y-4 text-white leading-relaxed text-base">
        {experience.details.map((detail: string, index: number) => (
          <p key={index} className="text-white">
            {detail}
          </p>
        ))}
      </div>
    </>
  );

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={modalRef}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={handleOverlayClick}
        >
          <div
            className="relative w-full max-w-3xl bg-gradient-to-br from-zinc-900/95 via-black/90 to-zinc-900/95 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 sm:p-12 max-h-[90vh] overflow-y-auto shadow-2xl shadow-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>
            {data.type === "project"
              ? renderProjectModal(data.data)
              : renderExperienceModal(data.data)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
