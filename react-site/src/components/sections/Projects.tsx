"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { projects } from "@/data/projects";
import { Project, ModalData } from "@/types";
import Modal from "@/components/ui/Modal";
import TechTag from "@/components/ui/TechTag";

export default function Projects() {
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setModalData({ type: "project", data: project });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <>
      <section className="py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-16"
          >
            <div className="inline-block relative bg-gradient-to-br from-zinc-800/60 via-zinc-900/50 to-zinc-800/60 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl shadow-white/5 px-8 py-8">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4 leading-tight pb-1">
                Featured Projects
              </h2>
              <p className="text-lg text-gray-400 pb-1">
                A collection of my projects and stuff I find Interesting
              </p>
              {/* Rubix overlay */}
              <div className="absolute -top-6 -right-8 lg:-top-8 lg:-right-10 rotate-12">
                <Image
                  src="/res/rubix.png"
                  alt="Rubix Cube"
                  width={80}
                  height={80}
                  className="w-16 h-16 lg:w-20 lg:h-20 object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div
                  onClick={() => openModal(project)}
                  className="group relative bg-gradient-to-br from-zinc-800/70 via-zinc-900/60 to-zinc-800/70 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 cursor-pointer h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/5 group-hover:via-white/3 group-hover:to-white/5 transition-all duration-500"></div>

                  <div className="relative flex flex-col md:flex-row h-full">
                    <div className="flex-1 p-6 lg:p-8 flex flex-col z-10 min-h-0">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                          {project.title}
                        </h3>
                        <span className="text-sm text-gray-300 font-medium">
                          {project.timeframe}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, techIndex) => (
                          <TechTag key={techIndex}>{tech}</TechTag>
                        ))}
                      </div>

                      <div className="flex-1 overflow-hidden">
                        <p
                          className="text-sm text-white leading-relaxed line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: project.preview }}
                        />
                      </div>
                    </div>

                    <div className="relative md:w-56 md:h-full h-56 shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent via-transparent to-black/30 z-10 pointer-events-none"></div>
                      {project.gifImage ? (
                        <>
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="224px"
                            className="object-cover group-hover:opacity-0 transition-opacity duration-500"
                          />
                          <Image
                            src={project.gifImage}
                            alt={`${project.title} animation`}
                            fill
                            sizes="224px"
                            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          />
                        </>
                      ) : (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="224px"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={closeModal} data={modalData} />
    </>
  );
}
