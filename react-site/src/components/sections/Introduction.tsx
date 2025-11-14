"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { personalInfo } from "@/data/constants";

export default function Introduction() {

  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden py-20"
    >
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-gradient-to-br from-zinc-800/60 via-zinc-900/50 to-zinc-800/60 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-white/5 p-8 lg:p-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-5xl lg:text-7xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
                  {personalInfo.name}
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl lg:text-3xl"
              >
                <span className="text-gray-300">{personalInfo.title} </span>
                <span className="text-white font-bold">Software Engineer</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="text-lg text-gray-200 leading-relaxed"
              >
                {personalInfo.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-lg">{personalInfo.location}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex gap-4 flex-wrap pt-4"
              >
                <Link href="/projects">
                  <Button variant="primary" size="md">
                    View My Work
                  </Button>
                </Link>
                <Link href="/experience">
                  <Button variant="secondary" size="md">
                    My Experience
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center items-center"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-white via-gray-300 to-white rounded-xl blur-xl opacity-10"></div>
                <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-xl overflow-visible border-2 border-white/20 shadow-2xl shadow-white/10">
                  <Image
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    width={384}
                    height={384}
                    className="w-full h-full object-cover rounded-xl"
                    priority
                  />
                  {/* Chestpin overlay */}
                  <div className="absolute -top-6 -left-6 lg:-top-8 lg:-left-8">
                    <Image
                      src="/res/chestpin.png"
                      alt="Badge"
                      width={100}
                      height={100}
                      className="w-20 h-20 lg:w-28 lg:h-28 object-contain drop-shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
