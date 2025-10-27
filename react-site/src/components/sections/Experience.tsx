"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { experiences } from "@/data/experiences";

export default function ExperienceSection() {
  return (
    <>
      <section className="py-24 pb-96">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-16"
          >
            <div className="inline-block relative bg-gradient-to-br from-zinc-800/60 via-zinc-900/50 to-zinc-800/60 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl shadow-white/5 px-8 py-8">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4 leading-tight pb-1">
                Experience
              </h2>
              <p className="text-lg text-gray-400 pb-1">Companies and organizations I've worked for</p>
              {/* Bottle overlay */}
              <div className="absolute -top-6 -right-8 lg:-top-8 lg:-right-10 rotate-12">
                <Image
                  src="/res/bottle.gif"
                  alt="Bottle"
                  width={80}
                  height={80}
                  className="w-16 h-16 lg:w-20 lg:h-20 object-contain drop-shadow-xl"
                  unoptimized
                />
              </div>
            </div>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 lg:left-10 top-0 bottom-0 w-1 bg-gray-300 rounded-full"></div>

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="relative flex items-start gap-6 lg:gap-10 group"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-zinc-700/70 to-zinc-800/70 backdrop-blur-xl border-4 border-gray-300 flex items-center justify-center group-hover:scale-110 transition-all duration-0 shadow-lg shadow-white/10">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg overflow-hidden bg-zinc-800/80 border border-gray-300 transition-all duration-0">
                        <Image
                          src={experience.logoPath}
                          alt={experience.companyName}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-gradient-to-br from-zinc-800/70 via-zinc-900/60 to-zinc-800/70 backdrop-blur-xl border border-white/10 rounded-lg p-6 lg:p-8 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-white/10 transition-all duration-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                          {experience.title}
                        </h3>
                        <div className="text-white text-lg font-semibold">
                          {experience.companyName}
                        </div>
                      </div>
                      <div className="text-sm text-gray-300 font-medium whitespace-nowrap">
                        {experience.timeframe}
                      </div>
                    </div>

                    <p className="text-white leading-relaxed">
                      {experience.preview}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
